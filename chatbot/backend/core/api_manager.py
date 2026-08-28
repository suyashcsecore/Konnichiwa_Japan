"""Thread-safe API key firewall for OpenAI-compatible providers."""

from __future__ import annotations

from dataclasses import dataclass, field
from io import BytesIO
import json
import os
from pathlib import Path
import re
import threading
from typing import Any, Callable, Dict, List, Mapping, Optional, Sequence

from dotenv import load_dotenv
from openai import APIConnectionError, APIError, AuthenticationError, OpenAI, RateLimitError
import tiktoken

from backend.core.logger import get_logger

LOGGER = get_logger(__name__)
DEFAULT_SAFE_TOKEN_QUOTA = 1_000_000
DEFAULT_SOFT_CAP_RATIO = 0.80
GROQ_SOFT_CAP_RATIO = 0.40
DEFAULT_MODEL = "kimi-k2.6"
DEFAULT_BASE_URL = "https://api.moonshot.cn/v1"
DEFAULT_OPENAI_BASE_URL = "https://api.openai.com/v1"
DEFAULT_TRANSCRIPTION_MODEL = "gpt-4o-mini-transcribe"
DEFAULT_OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
DEFAULT_OPENROUTER_MODEL = "moonshotai/kimi-k2.6"
DEFAULT_FIREWORKS_BASE_URL = "https://api.fireworks.ai/inference/v1"
DEFAULT_FIREWORKS_MODEL = "accounts/fireworks/models/kimi-k2p6"
DEFAULT_NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1"
DEFAULT_NVIDIA_MODEL = "moonshotai/kimi-k2.6"
DEFAULT_CLOUDFLARE_MODEL = "@cf/moonshotai/kimi-k2.6"
DEFAULT_GROQ_BASE_URL = "https://api.groq.com/openai/v1"
DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile"
CHAT_PROVIDER_PRIORITY = ["groq", "moonshot", "openrouter", "fireworks", "nvidia", "cloudflare"]
CHATBOT_MODEL_FAMILY_VARIABLES = ["CHATBOT_MODEL_FAMILY", "CHATBOT_MODEL"]
CHATBOT_MODEL_FAMILY_MAP = {
    "kimi-k2.6": {
        "moonshot": "kimi-k2.6",
        "openrouter": "moonshotai/kimi-k2.6",
        "fireworks": "accounts/fireworks/models/kimi-k2p6",
        "nvidia": "moonshotai/kimi-k2.6",
        "cloudflare": "@cf/moonshotai/kimi-k2.6",
        "groq": "llama-3.3-70b-versatile",
    }
}


class APIKeyPoolExhaustedError(RuntimeError):
    """Raised when every key in a provider pool is exhausted or unavailable."""


@dataclass
class APIKeyState:
    """Mutable accounting state for one API key."""

    key: str
    safe_quota_tokens: int = DEFAULT_SAFE_TOKEN_QUOTA
    soft_cap_ratio: float = DEFAULT_SOFT_CAP_RATIO
    used_tokens: int = 0
    status: str = "active"
    failures: int = 0
    last_error: str = ""

    @property
    def soft_cap_tokens(self) -> int:
        """Return the soft-cap threshold for this key."""
        return int(self.safe_quota_tokens * self.soft_cap_ratio)

    def can_spend(self, estimated_tokens: int) -> bool:
        """Return whether this key can safely spend the estimated tokens."""
        return self.status == "active" and (self.used_tokens + estimated_tokens) < self.soft_cap_tokens


@dataclass
class ProviderConfig:
    """Configuration for an OpenAI-compatible provider."""

    provider: str
    base_url: str
    model: str
    key_env_var: str
    quota_env_var: str
    keys: List[APIKeyState] = field(default_factory=list)


@dataclass(frozen=True)
class LabeledAPIKey:
    """API key parsed from a label-style local `.env` line."""

    label: str
    value: str


@dataclass(frozen=True)
class APIHealthCheckResult:
    """Redacted outcome from a safe API key validation check."""

    provider: str
    key: str
    status: str
    model: str
    detail: str


class APIManager:
    """Manage provider keys, token accounting, rotation, and retry behavior."""

    def __init__(self, provider_configs: Optional[Sequence[ProviderConfig]] = None, env_path: Path | None = None) -> None:
        """Initialize the manager from explicit configs or environment variables.

        Args:
            provider_configs: Optional provider configurations for tests or custom runtime wiring.
            env_path: Optional path to the .env file.
        """
        self._env_values, self._labeled_keys = load_application_environment(env_path)
        self._lock = threading.Lock()
        self._encoding_cache: Dict[str, Any] = {}
        self._tokenizer_available = True
        self._tokenizer_timeout_seconds = 2.0
        self._provider_configs: Dict[str, ProviderConfig] = {}
        self._client_factory: Callable[[str, str], OpenAI] = lambda api_key, base_url: OpenAI(
            api_key=api_key,
            base_url=base_url,
        )
        configs = list(provider_configs) if provider_configs is not None else [
            self._load_groq_config(),
            self._load_moonshot_config(),
            self._load_openrouter_config(),
            self._load_fireworks_config(),
            self._load_nvidia_config(),
            self._load_cloudflare_config(),
            self._load_openai_config(),
        ]
        for config in configs:
            self._provider_configs[config.provider] = config

    def _load_groq_config(self) -> ProviderConfig:
        """Load the Groq provider config from environment variables."""
        keys = collect_provider_keys(
            self._env_values,
            self._labeled_keys,
            array_names=["GROQ_API_KEYS", "GROQ_KEYS"],
            single_names=["GROQ_API_KEY"],
            label_keywords=["groq"],
        )
        quota = parse_int(get_env_value(self._env_values, ["GROQ_SAFE_TOKEN_QUOTA"]), DEFAULT_SAFE_TOKEN_QUOTA)
        states = [APIKeyState(key=key, safe_quota_tokens=quota, soft_cap_ratio=GROQ_SOFT_CAP_RATIO) for key in keys]
        return ProviderConfig(
            provider="groq",
            base_url=get_env_value(self._env_values, ["GROQ_BASE_URL"], DEFAULT_GROQ_BASE_URL),
            model=resolve_chat_provider_model(
                provider="groq",
                values=self._env_values,
                provider_specific_names=["GROQ_MODEL"],
                default_model=DEFAULT_GROQ_MODEL,
            ),
            key_env_var="GROQ_API_KEYS",
            quota_env_var="GROQ_SAFE_TOKEN_QUOTA",
            keys=states,
        )

    def _load_moonshot_config(self) -> ProviderConfig:
        """Load the Moonshot/Kimi provider config from environment variables."""
        keys = collect_provider_keys(
            self._env_values,
            self._labeled_keys,
            array_names=["MOONSHOT_API_KEYS", "MOONSHOT_KEYS", "KIMI_KEYS"],
            single_names=["MOONSHOT_API_KEY", "MOONSHOT_API_KEY", "KIMI_API_KEY"],
            label_keywords=["moonshot", "kimi"],
        )
        quota = parse_int(get_env_value(self._env_values, ["MOONSHOT_SAFE_TOKEN_QUOTA", "MOONSHOT_SAFE_TOKEN_QUOTA"]), DEFAULT_SAFE_TOKEN_QUOTA)
        states = [APIKeyState(key=key, safe_quota_tokens=quota) for key in keys]
        return ProviderConfig(
            provider="moonshot",
            base_url=get_env_value(self._env_values, ["MOONSHOT_BASE_URL", "MOONSHOT_BASE_URL"], DEFAULT_BASE_URL),
            model=resolve_chat_provider_model(
                provider="moonshot",
                values=self._env_values,
                provider_specific_names=["MOONSHOT_MODEL", "MOONSHOT_MODEL"],
                default_model=DEFAULT_MODEL,
            ),
            key_env_var="MOONSHOT_API_KEYS",
            quota_env_var="MOONSHOT_SAFE_TOKEN_QUOTA",
            keys=states,
        )

    def _load_openrouter_config(self) -> ProviderConfig:
        """Load OpenRouter provider config from professional and legacy variables."""
        keys = collect_provider_keys(
            self._env_values,
            self._labeled_keys,
            array_names=["OPENROUTER_API_KEYS", "OPENROUTER_KEYS"],
            single_names=["OPENROUTER_API_KEY", "OPENROUTER_API_KEY"],
            label_keywords=["open router", "openrouter"],
        )
        quota = parse_int(get_env_value(self._env_values, ["OPENROUTER_SAFE_TOKEN_QUOTA", "OPENROUTER_SAFE_TOKEN_QUOTA"]), DEFAULT_SAFE_TOKEN_QUOTA)
        states = [APIKeyState(key=key, safe_quota_tokens=quota) for key in keys]
        return ProviderConfig(
            provider="openrouter",
            base_url=get_env_value(self._env_values, ["OPENROUTER_BASE_URL", "OPENROUTER_BASE_URL"], DEFAULT_OPENROUTER_BASE_URL),
            model=resolve_chat_provider_model(
                provider="openrouter",
                values=self._env_values,
                provider_specific_names=["OPENROUTER_MODEL", "OPENROUTER_MODEL"],
                default_model=DEFAULT_OPENROUTER_MODEL,
            ),
            key_env_var="OPENROUTER_API_KEYS",
            quota_env_var="OPENROUTER_SAFE_TOKEN_QUOTA",
            keys=states,
        )

    def _load_fireworks_config(self) -> ProviderConfig:
        """Load Fireworks AI provider config from professional and label-style variables."""
        keys = collect_provider_keys(
            self._env_values,
            self._labeled_keys,
            array_names=["FIREWORKS_API_KEYS", "FIREWORKS_API_KEYS"],
            single_names=["FIREWORKS_API_KEY", "FIREWORKS_API_KEY"],
            label_keywords=["fireworks"],
        )
        quota = parse_int(get_env_value(self._env_values, ["FIREWORKS_SAFE_TOKEN_QUOTA", "FIREWORKS_SAFE_TOKEN_QUOTA"]), DEFAULT_SAFE_TOKEN_QUOTA)
        states = [APIKeyState(key=key, safe_quota_tokens=quota) for key in keys]
        return ProviderConfig(
            provider="fireworks",
            base_url=get_env_value(self._env_values, ["FIREWORKS_BASE_URL", "FIREWORKS_BASE_URL"], DEFAULT_FIREWORKS_BASE_URL),
            model=resolve_chat_provider_model(
                provider="fireworks",
                values=self._env_values,
                provider_specific_names=["FIREWORKS_MODEL", "FIREWORKS_MODEL"],
                default_model=DEFAULT_FIREWORKS_MODEL,
            ),
            key_env_var="FIREWORKS_API_KEYS",
            quota_env_var="FIREWORKS_SAFE_TOKEN_QUOTA",
            keys=states,
        )

    def _load_nvidia_config(self) -> ProviderConfig:
        """Load NVIDIA NIM provider config from professional and label-style variables."""
        keys = collect_provider_keys(
            self._env_values,
            self._labeled_keys,
            array_names=["NVIDIA_NIM_API_KEYS", "NVIDIA_NIM_API_KEYS"],
            single_names=["NVIDIA_NIM_API_KEY", "NVIDIA_API_KEY", "NVIDIA_NIM_API_KEY"],
            label_keywords=["nvidia", "nim"],
        )
        quota = parse_int(get_env_value(self._env_values, ["NVIDIA_NIM_SAFE_TOKEN_QUOTA", "NVIDIA_NIM_SAFE_TOKEN_QUOTA"]), DEFAULT_SAFE_TOKEN_QUOTA)
        states = [APIKeyState(key=key, safe_quota_tokens=quota) for key in keys]
        return ProviderConfig(
            provider="nvidia",
            base_url=get_env_value(self._env_values, ["NVIDIA_NIM_BASE_URL", "NVIDIA_NIM_BASE_URL"], DEFAULT_NVIDIA_BASE_URL),
            model=resolve_chat_provider_model(
                provider="nvidia",
                values=self._env_values,
                provider_specific_names=["NVIDIA_NIM_MODEL", "NVIDIA_NIM_MODEL"],
                default_model=DEFAULT_NVIDIA_MODEL,
            ),
            key_env_var="NVIDIA_NIM_API_KEYS",
            quota_env_var="NVIDIA_NIM_SAFE_TOKEN_QUOTA",
            keys=states,
        )

    def _load_cloudflare_config(self) -> ProviderConfig:
        """Load Cloudflare Workers AI provider config when account metadata exists."""
        keys = collect_provider_keys(
            self._env_values,
            self._labeled_keys,
            array_names=["CLOUDFLARE_WORKERS_API_KEYS", "CLOUDFLARE_WORKERS_API_KEYS"],
            single_names=["CLOUDFLARE_WORKERS_API_KEY", "CLOUDFLARE_API_TOKEN", "CLOUDFLARE_API_KEY"],
            label_keywords=["worker ai", "workers ai", "cloudflare"],
        )
        account_id = get_env_value(self._env_values, ["CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_ACCOUNT_ID"], "")
        base_url = get_env_value(
            self._env_values,
            ["CLOUDFLARE_WORKERS_BASE_URL", "CLOUDFLARE_WORKERS_BASE_URL"],
            f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1" if account_id else "",
        )
        quota = parse_int(get_env_value(self._env_values, ["CLOUDFLARE_WORKERS_SAFE_TOKEN_QUOTA", "CLOUDFLARE_WORKERS_SAFE_TOKEN_QUOTA"]), DEFAULT_SAFE_TOKEN_QUOTA)
        states = [APIKeyState(key=key, safe_quota_tokens=quota) for key in keys if base_url]
        return ProviderConfig(
            provider="cloudflare",
            base_url=base_url,
            model=resolve_chat_provider_model(
                provider="cloudflare",
                values=self._env_values,
                provider_specific_names=["CLOUDFLARE_WORKERS_MODEL", "CLOUDFLARE_WORKERS_MODEL"],
                default_model=DEFAULT_CLOUDFLARE_MODEL,
            ),
            key_env_var="CLOUDFLARE_WORKERS_API_KEYS",
            quota_env_var="CLOUDFLARE_WORKERS_SAFE_TOKEN_QUOTA",
            keys=states,
        )

    def _load_openai_config(self) -> ProviderConfig:
        """Load OpenAI provider config for speech transcription when configured."""
        keys = collect_provider_keys(
            self._env_values,
            self._labeled_keys,
            array_names=["OPENAI_API_KEYS", "OPENAI_KEYS"],
            single_names=["OPENAI_API_KEY", "OPENAI_API_KEY"],
            label_keywords=["openai", "open ai"],
        )
        quota = parse_int(get_env_value(self._env_values, ["OPENAI_SAFE_TOKEN_QUOTA", "OPENAI_SAFE_TOKEN_QUOTA"]), DEFAULT_SAFE_TOKEN_QUOTA)
        states = [APIKeyState(key=key, safe_quota_tokens=quota) for key in keys]
        return ProviderConfig(
            provider="openai",
            base_url=get_env_value(self._env_values, ["OPENAI_BASE_URL", "OPENAI_BASE_URL"], DEFAULT_OPENAI_BASE_URL),
            model=get_env_value(self._env_values, ["OPENAI_TRANSCRIPTION_MODEL", "OPENAI_TRANSCRIPTION_MODEL"], DEFAULT_TRANSCRIPTION_MODEL),
            key_env_var="OPENAI_API_KEYS",
            quota_env_var="OPENAI_SAFE_TOKEN_QUOTA",
            keys=states,
        )

    def set_client_factory(self, factory: Callable[[str, str], OpenAI]) -> None:
        """Replace the client factory for tests or controlled dependency injection.

        Args:
            factory: Callable receiving API key and base URL and returning an OpenAI-compatible client.
        """
        self._client_factory = factory

    def estimate_tokens(self, messages: Sequence[Mapping[str, Any]], model: str = DEFAULT_MODEL) -> int:
        """Estimate request tokens using tiktoken with an OpenAI-compatible fallback.

        Args:
            messages: Chat messages that will be submitted to a provider.
            model: Target model name.

        Returns:
            Estimated input token count plus a small protocol overhead.
        """
        total = 0
        for message in messages:
            total += 4
            content = message.get("content", "")
            if isinstance(content, str):
                total += self._count_text_tokens(content, model)
            elif isinstance(content, list):
                total += self._count_text_tokens(json.dumps(content, ensure_ascii=False), model)
            else:
                total += self._count_text_tokens(str(content), model)
        return total + 4

    def _count_text_tokens(self, text: str, model: str) -> int:
        """Count text tokens with tiktoken and use a deterministic fallback if unavailable."""
        encoding = self._load_encoding(model)
        if encoding is not None:
            return len(encoding.encode(text))
        return max(1, (len(text) + 3) // 4)

    def _load_encoding(self, model: str) -> Optional[Any]:
        """Load a tiktoken encoding without allowing tokenizer startup to block requests."""
        if model in self._encoding_cache:
            return self._encoding_cache[model]
        if not self._tokenizer_available:
            return None
        result: Dict[str, Any] = {}

        def load() -> None:
            try:
                result["encoding"] = tiktoken.encoding_for_model(model)
            except KeyError:
                result["encoding"] = tiktoken.get_encoding("o200k_base")
            except Exception as exc:
                result["error"] = exc

        worker = threading.Thread(target=load, daemon=True)
        worker.start()
        worker.join(self._tokenizer_timeout_seconds)
        if worker.is_alive():
            self._tokenizer_available = False
            LOGGER.critical("tiktoken startup exceeded timeout; using conservative heuristic token estimates.")
            return None
        if "error" in result:
            self._tokenizer_available = False
            LOGGER.critical("tiktoken failed to initialize; using conservative heuristic token estimates: %s", result["error"])
            return None
        encoding = result.get("encoding")
        self._encoding_cache[model] = encoding
        return encoding

    def provider_status(self, provider: str = "moonshot") -> List[Dict[str, Any]]:
        """Return redacted provider key state for diagnostics.

        Args:
            provider: Provider identifier.

        Returns:
            List of redacted key status dictionaries.
        """
        config = self._get_provider(provider)
        with self._lock:
            return [
                {
                    "key": redact_key(state.key),
                    "status": state.status,
                    "used_tokens": state.used_tokens,
                    "safe_quota_tokens": state.safe_quota_tokens,
                    "soft_cap_tokens": state.soft_cap_tokens,
                    "failures": state.failures,
                    "last_error": state.last_error,
                }
                for state in config.keys
            ]

    def configured_providers(self) -> list[str]:
        """Return providers that currently have at least one usable key configured."""
        return [name for name, config in self._provider_configs.items() if config.keys]

    def configuration_warnings(self) -> list[str]:
        """Return non-secret configuration issues detected in the local environment."""
        warnings: list[str] = []
        configured_family = get_env_value(self._env_values, CHATBOT_MODEL_FAMILY_VARIABLES, "")
        if configured_family and not normalize_chat_model_family(configured_family) in CHATBOT_MODEL_FAMILY_MAP:
            warnings.append(f"Chatbot model family `{configured_family}` is not recognized by the provider mapping.")
        has_worker_labels = any("worker ai" in item.label or "workers ai" in item.label or "cloudflare" in item.label for item in self._labeled_keys)
        cloudflare_config = self._provider_configs.get("cloudflare")
        if has_worker_labels and (cloudflare_config is None or not cloudflare_config.keys):
            warnings.append("Cloudflare Workers AI keys were detected but no account ID/base URL is configured.")
        return warnings

    def preferred_chat_provider(self) -> str:
        """Return the highest-priority configured provider for text chat."""
        for provider in CHAT_PROVIDER_PRIORITY:
            config = self._provider_configs.get(provider)
            if config is not None and config.keys:
                return provider
        raise APIKeyPoolExhaustedError("No chat provider API keys are configured.")

    def provider_model(self, provider: str) -> str:
        """Return the configured model for a provider."""
        return self._get_provider(provider).model

    def chat_completion(
        self,
        messages: Sequence[Mapping[str, Any]],
        provider: str = "auto",
        model: Optional[str] = None,
        max_tokens: int = 1024,
        temperature: float = 0.3,
        extra_body: Optional[Mapping[str, Any]] = None,
    ) -> str:
        """Call an OpenAI-compatible chat completion endpoint with protected key rotation.

        Args:
            messages: Chat messages for the model.
            provider: Provider identifier.
            model: Optional model override.
            max_tokens: Maximum output tokens requested.
            temperature: Sampling temperature.
            extra_body: Provider-specific request body fields.

        Returns:
            Assistant text content.

        Raises:
            APIKeyPoolExhaustedError: If no usable key remains.
            APIError: If a non-quota provider error occurs.
        """
        resolved_provider = self.preferred_chat_provider() if provider == "auto" else provider
        config = self._get_provider(resolved_provider)
        selected_model = model or config.model
        estimated_tokens = self.estimate_tokens(messages, selected_model) + max_tokens
        last_error: Optional[BaseException] = None
        attempted_keys: set[str] = set()

        while True:
            state = self._select_key(config, estimated_tokens, attempted_keys)
            attempted_keys.add(state.key)
            client = self._client_factory(state.key, config.base_url)
            request_extra_body = dict(extra_body or {})
            if config.provider != "moonshot":
                request_extra_body.pop("thinking", None)
            try:
                response = client.chat.completions.create(
                    model=selected_model,
                    messages=list(messages),
                    max_tokens=max_tokens,
                    temperature=temperature,
                    extra_body=request_extra_body,
                )
                content = response.choices[0].message.content or ""
                actual_tokens = extract_usage_tokens(response, estimated_tokens)
                self._record_success(state, actual_tokens)
                return content
            except (RateLimitError, AuthenticationError, APIConnectionError, APIError) as exc:
                last_error = exc
                if is_exhaustion_error(exc):
                    self._mark_exhausted(state, exc)
                    if len(attempted_keys) >= len(config.keys):
                        raise APIKeyPoolExhaustedError("All API keys are exhausted or rate-limited.") from exc
                    continue
                raise

            if len(attempted_keys) >= len(config.keys):
                break

        raise APIKeyPoolExhaustedError("No API key could complete the request.") from last_error

    def model_list_health_check(self, provider: str) -> list[APIHealthCheckResult]:
        """Validate configured keys through provider model-list endpoints without token generation."""
        config = self._get_provider(provider)
        results: list[APIHealthCheckResult] = []
        for state in config.keys:
            if state.status != "active":
                results.append(APIHealthCheckResult(provider, redact_key(state.key), state.status, config.model, state.last_error))
                continue
            client = self._client_factory(state.key, config.base_url)
            try:
                client.models.list()
                results.append(APIHealthCheckResult(provider, redact_key(state.key), "available", config.model, "models endpoint responded"))
            except (RateLimitError, AuthenticationError, APIConnectionError, APIError) as exc:
                if is_exhaustion_error(exc):
                    self._mark_exhausted(state, exc)
                    results.append(APIHealthCheckResult(provider, redact_key(state.key), "exhausted", config.model, "quota or rate limit response"))
                else:
                    self._mark_unavailable(state, exc)
                    results.append(APIHealthCheckResult(provider, redact_key(state.key), "unavailable", config.model, sanitize_error_detail(exc, state.key)))
        return results

    def chat_ping_health_check(self, provider: str = "auto") -> APIHealthCheckResult:
        """Run one minimal chat completion through the rotation path for integration validation."""
        resolved_provider = self.preferred_chat_provider() if provider == "auto" else provider
        config = self._get_provider(resolved_provider)
        response = self.chat_completion(
            messages=[
                {"role": "system", "content": "Reply with one word."},
                {"role": "user", "content": "ok"},
            ],
            provider=resolved_provider,
            max_tokens=2,
            temperature=0.0,
        )
        return APIHealthCheckResult(resolved_provider, "rotation-pool", "available", config.model, response[:40])

    def audio_transcription(
        self,
        audio_bytes: bytes,
        filename: str = "interview.wav",
        provider: str = "openai",
        model: Optional[str] = None,
    ) -> str:
        """Transcribe audio through an OpenAI-compatible transcription endpoint with key rotation."""
        config = self._get_provider(provider)
        selected_model = model or config.model
        estimated_tokens = max(256, len(audio_bytes) // 4)
        last_error: Optional[BaseException] = None
        attempted_keys: set[str] = set()

        while True:
            state = self._select_key(config, estimated_tokens, attempted_keys)
            attempted_keys.add(state.key)
            client = self._client_factory(state.key, config.base_url)
            try:
                audio_file = BytesIO(audio_bytes)
                audio_file.name = filename
                response = client.audio.transcriptions.create(model=selected_model, file=audio_file)
                transcript = getattr(response, "text", "")
                self._record_success(state, estimated_tokens)
                return str(transcript).strip()
            except (RateLimitError, AuthenticationError, APIConnectionError, APIError) as exc:
                last_error = exc
                if is_exhaustion_error(exc):
                    self._mark_exhausted(state, exc)
                    if len(attempted_keys) >= len(config.keys):
                        raise APIKeyPoolExhaustedError("All transcription API keys are exhausted or rate-limited.") from exc
                    continue
                raise

            if len(attempted_keys) >= len(config.keys):
                break

        raise APIKeyPoolExhaustedError("No API key could transcribe the audio.") from last_error

    def _get_provider(self, provider: str) -> ProviderConfig:
        """Return provider config or raise a typed pool error."""
        config = self._provider_configs.get(provider)
        if config is None:
            raise APIKeyPoolExhaustedError(f"Unknown API provider: {provider}")
        if not config.keys:
            raise APIKeyPoolExhaustedError(f"No API keys configured for provider: {provider}")
        return config

    def _select_key(self, config: ProviderConfig, estimated_tokens: int, attempted_keys: set[str]) -> APIKeyState:
        """Select the next active key that remains under its soft cap."""
        with self._lock:
            for state in config.keys:
                if state.status == "active" and not state.can_spend(estimated_tokens):
                    state.status = "soft_cap_reached"
                    state.last_error = "80 percent soft token cap reached"
                    LOGGER.critical("API key %s rotated at 80%% soft token cap.", redact_key(state.key))
            for state in config.keys:
                if state.key not in attempted_keys and state.can_spend(estimated_tokens):
                    return state
        raise APIKeyPoolExhaustedError("No active API key remains below the configured soft cap.")

    def _record_success(self, state: APIKeyState, tokens: int) -> None:
        """Record token usage and rotate the key if it crossed its soft cap."""
        with self._lock:
            state.used_tokens += max(tokens, 0)
            if state.used_tokens >= state.soft_cap_tokens:
                state.status = "soft_cap_reached"
                state.last_error = "80 percent soft token cap reached after request"
                LOGGER.critical("API key %s reached soft token cap after request.", redact_key(state.key))

    def _mark_exhausted(self, state: APIKeyState, exc: BaseException) -> None:
        """Mark a key as exhausted or unusable after an API quota/rate failure."""
        with self._lock:
            state.status = "exhausted"
            state.failures += 1
            state.last_error = sanitize_error_detail(exc, state.key)
            LOGGER.critical("API key %s marked exhausted after provider error: %s", redact_key(state.key), state.last_error)

    def _mark_unavailable(self, state: APIKeyState, exc: BaseException) -> None:
        """Mark a key unavailable after a non-quota provider validation failure."""
        with self._lock:
            state.status = "unavailable"
            state.failures += 1
            state.last_error = sanitize_error_detail(exc, state.key)


def parse_key_list(raw_value: str) -> List[str]:
    """Parse API key arrays stored as JSON, CSV, or semicolon-delimited strings."""
    value = raw_value.strip()
    if not value:
        return []
    try:
        parsed = json.loads(value)
        if isinstance(parsed, list):
            return [str(item).strip() for item in parsed if str(item).strip()]
    except json.JSONDecodeError:
        return [part.strip().strip('"').strip("'") for part in value.replace(";", ",").split(",") if part.strip()]
    return []


def load_application_environment(env_path: Path | None = None) -> tuple[dict[str, str], list[LabeledAPIKey]]:
    """Load professional dotenv variables and label-style local key entries."""
    path = env_path or Path(".env")
    named_values: dict[str, str] = {}
    labeled_keys: list[LabeledAPIKey] = []
    raw_lines: list[str] = []
    if path.exists():
        raw_lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
        if all(is_comment_or_assignment(line) for line in raw_lines):
            load_dotenv(dotenv_path=path, override=False)
        for line in raw_lines:
            stripped = line.strip()
            if not stripped or stripped.startswith("#"):
                continue
            if "=" in stripped:
                key, value = stripped.split("=", 1)
                normalized_key = key.strip().removeprefix("export ").strip()
                normalized_value = strip_wrapping_quotes(value.strip())
                named_values[normalized_key] = normalized_value
                os.environ.setdefault(normalized_key, normalized_value)
            elif ":" in stripped:
                label, value = stripped.split(":", 1)
                secret = strip_wrapping_quotes(value.strip())
                if secret:
                    labeled_keys.append(LabeledAPIKey(label=label.strip().lower(), value=secret))
    for key, value in os.environ.items():
        named_values.setdefault(key, value)
    return named_values, labeled_keys


def is_comment_or_assignment(line: str) -> bool:
    """Return whether a `.env` line is safe for python-dotenv parsing."""
    stripped = line.strip()
    return not stripped or stripped.startswith("#") or "=" in stripped


def strip_wrapping_quotes(value: str) -> str:
    """Remove one matching pair of wrapping quotes from an environment value."""
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1]
    return value


def get_env_value(values: Mapping[str, str], names: Sequence[str], default: str = "") -> str:
    """Return the first non-empty environment value for the provided variable names."""
    for name in names:
        value = values.get(name, "").strip()
        if value:
            return value
    return default


def collect_provider_keys(
    values: Mapping[str, str],
    labeled_keys: Sequence[LabeledAPIKey],
    array_names: Sequence[str],
    single_names: Sequence[str],
    label_keywords: Sequence[str],
) -> list[str]:
    """Collect provider keys from professional variables, legacy variables, and label-style lines."""
    output: list[str] = []
    for name in array_names:
        output.extend(parse_key_list(values.get(name, "")))
    for name in single_names:
        value = values.get(name, "").strip()
        if value:
            output.append(strip_wrapping_quotes(value))
    lowered_keywords = [keyword.lower() for keyword in label_keywords]
    for item in labeled_keys:
        if any(keyword in item.label for keyword in lowered_keywords):
            output.append(item.value)
    return dedupe_keys(output)


def dedupe_keys(keys: Sequence[str]) -> list[str]:
    """Return API keys in source order without duplicates."""
    output: list[str] = []
    seen: set[str] = set()
    for key in keys:
        cleaned = key.strip()
        if cleaned and cleaned not in seen:
            seen.add(cleaned)
            output.append(cleaned)
    return output


def resolve_chat_provider_model(
    provider: str,
    values: Mapping[str, str],
    provider_specific_names: Sequence[str],
    default_model: str,
) -> str:
    """Resolve a provider model from specific overrides or a shared chatbot model family."""
    provider_override = get_env_value(values, provider_specific_names, "")
    if provider_override:
        return provider_override
    family = get_env_value(values, CHATBOT_MODEL_FAMILY_VARIABLES, "")
    normalized_family = normalize_chat_model_family(family)
    mapped_models = CHATBOT_MODEL_FAMILY_MAP.get(normalized_family, {})
    return mapped_models.get(provider, default_model)


def normalize_chat_model_family(value: str) -> str:
    """Normalize a shared chatbot model family string for provider mapping."""
    lowered = value.strip().lower()
    if not lowered:
        return ""
    normalized = re.sub(r"[^a-z0-9.]+", "-", lowered).strip("-")
    if normalized in {"moonshotai-kimi-k2.6", "kimi-k2p6", "kimi-k2-6"}:
        return "kimi-k2.6"
    return normalized


def parse_int(raw_value: Optional[str], default: int) -> int:
    """Parse a positive integer environment setting with a safe default."""
    if raw_value is None:
        return default
    try:
        parsed = int(raw_value)
    except ValueError:
        return default
    return parsed if parsed > 0 else default


def redact_key(key: str) -> str:
    """Return a redacted API key suitable for logs and UI diagnostics."""
    if len(key) <= 8:
        return "****"
    return f"{key[:4]}****{key[-4:]}"


def sanitize_error_detail(exc: BaseException, key: str) -> str:
    """Return provider error text with the active API key removed."""
    detail = str(exc)
    if key:
        detail = detail.replace(key, redact_key(key))
    return detail


def extract_usage_tokens(response: Any, fallback: int) -> int:
    """Extract provider usage tokens from an OpenAI-compatible response object."""
    usage = getattr(response, "usage", None)
    if usage is None:
        return fallback
    total_tokens = getattr(usage, "total_tokens", None)
    if isinstance(total_tokens, int):
        return total_tokens
    if isinstance(usage, Mapping):
        value = usage.get("total_tokens")
        if isinstance(value, int):
            return value
    return fallback


def is_exhaustion_error(exc: BaseException) -> bool:
    """Return whether an exception should force key retirement and retry."""
    status_code = getattr(exc, "status_code", None)
    body = str(getattr(exc, "body", "")) + " " + str(exc)
    lowered = body.lower()
    return status_code in {402, 429} or "insufficient_quota" in lowered or "payment required" in lowered
