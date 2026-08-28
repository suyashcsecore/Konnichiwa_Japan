import csv
import math
import pickle
import re
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Mapping, Sequence

from backend.core.api_manager import APIKeyPoolExhaustedError, APIManager
from backend.core.logger import get_logger
from backend.chatbot.fallback import extractive_summary_from_chunks

LOGGER = get_logger(__name__)
RAW_DATA_DIR = Path(__file__).resolve().parent.parent / "data" / "processed"


@dataclass(frozen=True)
class DatasetChunk:
    """Searchable dataset text chunk with source metadata."""
    source: str
    row_id: int
    text: str
    metadata: Mapping[str, Any]


class TfidfVectorizerPure:
    """Pure Python implementation of TF-IDF."""
    def __init__(self, max_features=12000):
        self.max_features = max_features
        self.vocab = {}
        self.idf = {}
        self.stop_words = {"the", "is", "in", "and", "to", "a", "of", "for", "with", "on", "at", "by", "from", "as", "an"}
    
    def tokenize(self, text: str) -> list[str]:
        words = re.findall(r'\b[a-z0-9]+\b', text.lower())
        return [w for w in words if w not in self.stop_words]
        
    def fit_transform(self, docs: list[str]):
        tf_list = []
        df = defaultdict(int)
        
        for doc in docs:
            tokens = self.tokenize(doc)
            if len(tokens) > 1:
                bigrams = [f"{tokens[i]} {tokens[i+1]}" for i in range(len(tokens)-1)]
                tokens.extend(bigrams)
                
            tf = defaultdict(int)
            for token in tokens:
                tf[token] += 1
            
            tf_list.append(tf)
            for token in set(tokens):
                df[token] += 1
                
        N = len(docs)
        for token, count in df.items():
            self.idf[token] = math.log((1 + N) / (1 + count)) + 1
            
        sorted_vocab = sorted(self.idf.items(), key=lambda x: x[1], reverse=True)[:self.max_features]
        self.vocab = {k: v for k, v in sorted_vocab}
        
        return self._transform_tf_list(tf_list)
        
    def transform(self, docs: list[str]):
        tf_list = []
        for doc in docs:
            tokens = self.tokenize(doc)
            if len(tokens) > 1:
                bigrams = [f"{tokens[i]} {tokens[i+1]}" for i in range(len(tokens)-1)]
                tokens.extend(bigrams)
            tf = defaultdict(int)
            for token in tokens:
                tf[token] += 1
            tf_list.append(tf)
        return self._transform_tf_list(tf_list)
        
    def _transform_tf_list(self, tf_list):
        matrix = []
        for tf in tf_list:
            vec = {}
            norm = 0.0
            for term, count in tf.items():
                if term in self.vocab:
                    val = count * self.vocab[term]
                    vec[term] = val
                    norm += val * val
            norm = math.sqrt(norm)
            if norm > 0:
                vec = {k: v / norm for k, v in vec.items()}
            matrix.append(vec)
        return matrix


def cosine_similarity_pure(query_vec, matrix):
    """Compute cosine similarity natively."""
    scores = []
    for doc_vec in matrix:
        score = 0.0
        for term, val in query_vec.items():
            if term in doc_vec:
                score += val * doc_vec[term]
        scores.append(score)
    return scores


class DatasetRAGEngine:
    """Build and query a lightweight vector index over local career datasets natively."""

    def __init__(self, raw_dir: Path = RAW_DATA_DIR, max_rows_per_file: int = 2500) -> None:
        self.raw_dir = raw_dir
        self.max_rows_per_file = max_rows_per_file
        self.chunks: list[DatasetChunk] = []
        self._vectorizer: TfidfVectorizerPure | None = None
        self._matrix: list[dict] = []
        self._temp_chunks: list[DatasetChunk] = []
        self._temp_matrix: list[dict] = []
        self._combined_matrix: list[dict] = []

    def discover_dataset_files(self, limit: int | None = None) -> list[Path]:
        if not self.raw_dir.exists():
            return []
        files = sorted(path for path in self.raw_dir.glob("*.csv") if path.is_file())
        return files if limit is None else files[:limit]

    def build_index(self) -> int:
        self.chunks = self._load_chunks()
        if not self.chunks:
            self._vectorizer = None
            self._matrix = []
            return 0
        self._vectorizer = TfidfVectorizerPure()
        self._matrix = self._vectorizer.fit_transform([chunk.text for chunk in self.chunks])
        self._temp_chunks = []
        self._temp_matrix = []
        self._combined_matrix = self._matrix[:]
        LOGGER.info("Built RAG index with %s chunks from %s.", len(self.chunks), self.raw_dir)
        return len(self.chunks)

    def save_index(self, out_path: Path) -> None:
        if self._vectorizer is None or not self._matrix:
            raise RuntimeError("Index not built; call build_index() before saving.")
        out_path.parent.mkdir(parents=True, exist_ok=True)
        payload = {
            "vectorizer": self._vectorizer,
            "matrix": self._matrix,
            "chunks": self.chunks,
        }
        with out_path.open('wb') as f:
            pickle.dump(payload, f)
        LOGGER.info("Saved RAG index to %s", out_path)

    def load_index(self, in_path: Path) -> int:
        if not in_path.exists():
            raise FileNotFoundError(in_path)
        with in_path.open('rb') as f:
            payload = pickle.load(f)
        self._vectorizer = payload.get("vectorizer")
        self._matrix = payload.get("matrix", [])
        self.chunks = payload.get("chunks", [])
        LOGGER.info("Loaded RAG index from %s with %s chunks", in_path, len(self.chunks))
        return len(self.chunks)

    def retrieve(self, query: str, top_k: int = 5) -> list[DatasetChunk]:
        if not query.strip() or top_k <= 0:
            return []
        if self._vectorizer is None or not self._matrix:
            self.build_index()
        if self._vectorizer is None or not self._matrix or not self.chunks:
            return []
        matrix = self._combined_matrix if self._combined_matrix else self._matrix
        query_vector = self._vectorizer.transform([query])[0]
        scores = cosine_similarity_pure(query_vector, matrix)
        
        ranked_indexes = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:top_k]
        
        all_chunks = self.chunks + self._temp_chunks
        results: list[DatasetChunk] = []
        for idx in ranked_indexes:
            if idx < 0 or idx >= len(all_chunks):
                continue
            if scores[idx] <= 0:
                continue
            results.append(all_chunks[idx])
        return results

    def context_block(self, query: str, top_k: int = 5) -> str:
        chunks = self.retrieve(query, top_k)
        if not chunks:
            return "No relevant local dataset context was retrieved."
        lines = []
        for chunk in chunks:
            lines.append(f"Source: {chunk.source} row {chunk.row_id}\n{chunk.text}")
        return "\n\n".join(lines)

    def add_temporary_chunks(self, texts: Sequence[str], source: str = "uploaded_resume") -> int:
        if self._vectorizer is None or not self._matrix:
            self.build_index()
        if self._vectorizer is None:
            return 0
        new_chunks = []
        texts_list = [str(t) for t in texts if t]
        if not texts_list:
            return 0
        start_id = -1 - len(self._temp_chunks)
        for i, t in enumerate(texts_list):
            new_chunks.append(DatasetChunk(source=source, row_id=start_id - i, text=t, metadata={}))
        temp_mat = self._vectorizer.transform(texts_list)
        if not self._temp_matrix:
            self._temp_matrix = temp_mat
        else:
            self._temp_matrix.extend(temp_mat)
        self._temp_chunks.extend(new_chunks)
        self._combined_matrix = self._matrix + self._temp_matrix
        return len(self._temp_chunks)

    def clear_temporary_chunks(self) -> None:
        self._temp_chunks = []
        self._temp_matrix = []
        self._combined_matrix = self._matrix[:]

    def _load_chunks(self) -> list[DatasetChunk]:
        chunks = []
        for path in self.discover_dataset_files():
            try:
                with path.open('r', encoding='utf-8') as f:
                    reader = csv.DictReader(f)
                    if not reader.fieldnames:
                        continue
                    for row_id, row in enumerate(reader):
                        if row_id >= self.max_rows_per_file:
                            break
                        text = self._row_to_text(row)
                        if text:
                            chunks.append(
                                DatasetChunk(
                                    source=path.name,
                                    row_id=row_id,
                                    text=text,
                                    metadata={"columns": list(reader.fieldnames)},
                                )
                            )
            except Exception as exc:
                LOGGER.warning("Skipping dataset %s because it could not be read: %s", path.name, exc)
                continue
        return chunks

    @staticmethod
    def _row_to_text(row: dict) -> str:
        parts = []
        for column, value in row.items():
            if value:
                cleaned = str(value).strip()
                if cleaned:
                    parts.append(f"{column}: {cleaned}")
        return " | ".join(parts)


class KimiRAGChatbot:
    """Kimi-powered chatbot with local dataset context and session history support."""

    def __init__(
        self,
        api_manager: APIManager | None = None,
        rag_engine: DatasetRAGEngine | None = None,
        reranker: Any | None = None,
        model: str | None = None,
    ) -> None:
        self.api_manager = api_manager or APIManager()
        self.rag_engine = rag_engine or DatasetRAGEngine()
        self.reranker = reranker
        self.model = model

    def answer(
        self,
        user_query: str,
        history: Sequence[Mapping[str, str]] | None = None,
        uploaded_resume_context: str = "",
        internet_context: str = "",
    ) -> str:
        added_temp = 0
        if uploaded_resume_context and uploaded_resume_context.strip():
            try:
                added_temp = self.rag_engine.add_temporary_chunks([uploaded_resume_context], source="uploaded_resume")
            except Exception:
                added_temp = 0

        retrieved = self.rag_engine.retrieve(user_query, top_k=5)
        
        dataset_context = "\n\n".join(f"Source: {c.source} row {c.row_id}\n{c.text}" for c in retrieved)
        system_prompt = (
            "You are an AI job advisor. Ground answers in the supplied local dataset context when it is relevant. "
            "If the dataset is insufficient, state the limitation and give practical next steps. "
            "Do not claim live internet access unless internet context is explicitly supplied.\n\n"
            f"Local dataset context:\n{dataset_context or 'No relevant local dataset context was retrieved.'}\n\n"
            f"Uploaded resume context:\n{uploaded_resume_context[:5000] or 'None'}\n\n"
            f"Internet context supplied by app:\n{internet_context[:3000] or 'None'}"
        )
        messages: list[dict[str, str]] = [{"role": "system", "content": system_prompt}]
        for item in list(history or [])[-10:]:
            role = item.get("role", "")
            content = item.get("content", "")
            if role in {"user", "assistant"} and content:
                messages.append({"role": role, "content": content})
        messages.append({"role": "user", "content": user_query})
        provider = self.api_manager.preferred_chat_provider()
        model = self.model or self.api_manager.provider_model(provider)
        try:
            return self.api_manager.chat_completion(
                messages=messages,
                provider=provider,
                model=model,
                max_tokens=1200,
                temperature=0.25,
                extra_body={"thinking": {"type": "disabled"}},
            )
        except Exception as exc:
            if isinstance(exc, APIKeyPoolExhaustedError):
                fallback = extractive_summary_from_chunks(user_query, retrieved, top_n=3)
                return fallback.summary
            raise
        finally:
            try:
                if added_temp:
                    self.rag_engine.clear_temporary_chunks()
            except Exception:
                pass


def build_mock_interview_prompt(target_role: str, latest_answer: str, history: Sequence[Mapping[str, str]]) -> str:
    """Build a grounded multi-turn mock interview prompt for the chatbot."""
    recent_history = "\n".join(f"{item.get('role', '')}: {item.get('content', '')}" for item in list(history)[-6:])
    return (
        "Continue a realistic mock interview. Ask one concise follow-up question after briefly evaluating the latest answer. "
        "Use the target role and conversation history.\n\n"
        f"Target role: {target_role}\nConversation:\n{recent_history}\nLatest answer:\n{latest_answer}"
    )
