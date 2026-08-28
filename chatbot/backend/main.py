from __future__ import annotations

import json
from io import BytesIO
from pathlib import Path
from typing import Any

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from openai import APIConnectionError, APIError, AuthenticationError, RateLimitError

from backend.chatbot.rag_engine import DatasetRAGEngine
from backend.core.api_manager import APIKeyPoolExhaustedError, APIManager
from backend.core.document_parser import extract_text
from backend.core.logger import get_logger
from backend.resume.analyzer import analyze_resume_text, build_resume_pdf

LOGGER = get_logger(__name__)

app = FastAPI(title="Job Advisor AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BACKEND_DIR = Path(__file__).parent
DATA_DIR = BACKEND_DIR / "data" / "processed"
ENV_PATH = BACKEND_DIR / ".env"

_rag_engine: DatasetRAGEngine | None = None


def _get_rag_engine() -> DatasetRAGEngine:
    global _rag_engine
    if _rag_engine is None:
        _rag_engine = DatasetRAGEngine(raw_dir=DATA_DIR)
        count = _rag_engine.build_index()
        LOGGER.info("Initialized RAG engine with %d chunks", count)
    return _rag_engine


class ChatRequest(BaseModel):
    message: str
    history: list[dict[str, str]] = []
    resume_text: str = ""


class ChatResponse(BaseModel):
    response: str
    provider: str


class ResumeAnalysisRequest(BaseModel):
    resume_text: str
    keywords: list[str] = []


class ResumeAnalysisResponse(BaseModel):
    score: float
    found_keywords: list[str]
    missing_keywords: list[str]
    weak_verbs: list[dict[str, str]]
    impact_gaps: list[dict[str, str]]


class ResumeBuildRequest(BaseModel):
    name: str
    email: str
    phone: str
    location: str
    linkedin: str
    summary: str
    skills: str
    experience: str
    projects: str
    education: str


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    try:
        api_manager = APIManager(env_path=ENV_PATH)
        rag_engine = _get_rag_engine()

        context = rag_engine.context_block(request.message, top_k=5)

        resume_block = ""
        if request.resume_text.strip():
            resume_block = f"\n\nUser's uploaded resume:\n{request.resume_text[:4000]}"

        system_prompt = (
            "You are Konnichiwa Japan AI, a specialized assistant for the Konnichiwa Japan project.\n\n"
            "STRICT TOPIC LIMITS - You ONLY answer questions about:\n"
            "- Japanese culture, lifestyle, and tourism\n"
            "- Learning the Japanese language\n"
            "- The Konnichiwa Japan website features (Garbage Collector, Puzzles, etc.)\n"
            "- Moving to and living in Japan\n"
            "- Traveling in Tokyo, Osaka, Kyoto, and other cities\n\n"
            "IF THE USER ASKS ABOUT ANYTHING OUTSIDE THESE TOPICS, politely redirect them. "
            "For example: 'I'm focused on helping with the Konnichiwa Japan project. Is there something about Japan I can help you with?'\n\n"
            "NEVER reveal your underlying model name, architecture, or technical details about yourself. "
            "If asked what model you are, say: 'I'm Konnichiwa Japan AI, your Japanese culture and lifestyle assistant!'\n\n"
            "Be concise and actionable. Use bullet points for lists."
            f"{resume_block}\n\n"
            f"Dataset context:\n{context}"
        )

        messages = [{"role": "system", "content": system_prompt}]
        for msg in request.history[-10:]:
            if msg.get("role") in ("user", "assistant") and msg.get("content"):
                messages.append({"role": msg["role"], "content": msg["content"]})
        messages.append({"role": "user", "content": request.message})

        provider = api_manager.preferred_chat_provider()
        model = api_manager.provider_model(provider)
        response = api_manager.chat_completion(
            messages=messages,
            provider=provider,
            model=model,
            max_tokens=1200,
            temperature=0.7,
        )

        return ChatResponse(response=response, provider=provider)

    except (APIKeyPoolExhaustedError, AuthenticationError, APIError, APIConnectionError, RateLimitError) as e:
        LOGGER.warning("API unavailable, using fallback: %s", type(e).__name__)
        from backend.chatbot.fallback import extractive_summary_from_chunks

        rag_engine = _get_rag_engine()
        chunks = rag_engine.retrieve(request.message, top_k=5)
        fallback = extractive_summary_from_chunks(request.message, chunks)
        return ChatResponse(response=fallback.summary, provider="local-fallback")

    except Exception as e:
        LOGGER.exception("Chat endpoint error")
        return ChatResponse(
            response="I'm having trouble connecting to the AI service right now. Please check that the backend is running and API keys are configured.",
            provider="error",
        )


@app.post("/api/analyze-resume", response_model=ResumeAnalysisResponse)
async def analyze_resume(request: ResumeAnalysisRequest) -> ResumeAnalysisResponse:
    analysis = analyze_resume_text(request.resume_text, request.keywords)
    ats = analysis["ats"]
    return ResumeAnalysisResponse(
        score=ats["score"],
        found_keywords=ats["found_keywords"],
        missing_keywords=ats["missing_keywords"],
        weak_verbs=analysis.get("action_verb_findings", []),
        impact_gaps=analysis.get("impact_gaps", []),
    )


@app.post("/api/upload-resume")
async def upload_resume(file: UploadFile = File(...)) -> JSONResponse:
    try:
        contents = await file.read()
        parsed = extract_text(BytesIO(contents), file.filename)
        return JSONResponse(
            content={
                "text": parsed.text,
                "filename": file.filename,
                "warnings": parsed.warnings,
            }
        )
    except ValueError as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
    except Exception as e:
        LOGGER.exception("Upload error for %s", file.filename)
        return JSONResponse(content={"error": f"Failed to process file: {str(e)}"}, status_code=500)


@app.post("/api/build-resume")
async def build_resume(request: ResumeBuildRequest) -> JSONResponse:
    try:
        resume_data = {
            "name": request.name,
            "email": request.email,
            "phone": request.phone,
            "location": request.location,
            "linkedin": request.linkedin,
            "summary": request.summary,
            "skills": request.skills,
            "experience": request.experience,
            "projects": request.projects,
            "education": request.education,
        }
        pdf_bytes = build_resume_pdf(resume_data)
        import base64

        pdf_base64 = base64.b64encode(pdf_bytes).decode("utf-8")
        return JSONResponse(content={"pdf": pdf_base64, "filename": "resume.pdf"})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok", "service": "Job Advisor AI"}
