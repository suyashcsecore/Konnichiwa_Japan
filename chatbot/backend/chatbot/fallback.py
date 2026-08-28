"""Fallback utilities for degraded API key state or local-only query responses."""
from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Iterable


GREETING_RESPONSES = {
    "hi": "Hi there! I'm Konnichiwa Japan AI. I can help you with Japanese culture, language, travel, and the Konnichiwa Japan project. What would you like to know?",
    "hello": "Hello! Welcome to Konnichiwa Japan AI. I'm here to help with Japan, culture, language, and travel. How can I assist you?",
    "hey": "Hey! I'm your AI Japan assistant. Ask me anything about Japanese culture, language, or traveling to Japan.",
    "how are you": "I'm doing great, thanks for asking! I'm ready to help you with any questions about Japan you have.",
    "good morning": "Good morning! Hope you're having a productive day. Let me know if you need help with anything related to Japan.",
    "good afternoon": "Good afternoon! I'm here if you need help with Japanese culture, language, or travel.",
    "good evening": "Good evening! I can help you with Japan travel tips, language advice, or cultural insights.",
    "thank you": "You're welcome! Feel free to ask if you have more questions.",
    "thanks": "You're welcome! Let me know if there's anything else I can help with.",
}


@dataclass
class FallbackSummary:
    query: str
    summary: str
    sources: list[str]


def _extract_skills_from_chunks(chunks: Iterable[object]) -> list[str]:
    """Extract skill mentions from dataset chunks."""
    skills = []
    for chunk in chunks:
        text = getattr(chunk, "text", "")
        match = re.search(r"skills:\s*([^|]+)", text, re.IGNORECASE)
        if match:
            skill_list = [s.strip() for s in match.group(1).split(",") if s.strip()]
            skills.extend(skill_list)
    return list(dict.fromkeys(skills))[:10]


def _extract_careers_from_chunks(chunks: Iterable[object]) -> list[str]:
    """Extract career labels from dataset chunks."""
    careers = []
    for chunk in chunks:
        text = getattr(chunk, "text", "")
        match = re.search(r"career_label:\s*(.+?)(?:\s*\||$)", text, re.IGNORECASE)
        if match:
            career = match.group(1).strip()
            if career:
                careers.append(career)
    return list(dict.fromkeys(careers))


def _format_dataset_info(chunks: Iterable[object]) -> str:
    """Format dataset chunks as readable information."""
    lines = []
    for chunk in chunks:
        text = getattr(chunk, "text", "")
        parts = [p.strip() for p in text.split("|") if p.strip()]
        formatted = ", ".join(parts)
        if len(formatted) > 200:
            formatted = formatted[:200] + "..."
        lines.append(f"  - {formatted}")
    return "\n".join(lines[:5])


def extractive_summary_from_chunks(query: str, chunks: Iterable[object], top_n: int = 3) -> FallbackSummary:
    """Create a conversational fallback answer from retrieved dataset chunks.

    The engine only requires chunk objects with `.text`, `.source`, and `.row_id`.
    """
    query_lower = query.lower().strip()
    sources = []
    chunks_list = list(chunks)

    for chunk in chunks_list:
        sources.append(f"{getattr(chunk, 'source', 'unknown')} row {getattr(chunk, 'row_id', -1)}")

    # Check for greetings
    for greeting, response in GREETING_RESPONSES.items():
        if greeting in query_lower:
            return FallbackSummary(query=query, summary=response, sources=[])

    # General fallback
    summary = "I am Konnichiwa Japan AI! My primary AI services are currently unavailable due to an API error. When I'm back online, I can help you with Japanese culture, language, travel, and more."

    return FallbackSummary(query=query, summary=summary, sources=sources)
