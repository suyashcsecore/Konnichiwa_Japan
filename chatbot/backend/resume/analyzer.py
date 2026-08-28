"""ATS resume analysis, keyword scoring, and resume export utilities."""

from __future__ import annotations

from io import BytesIO
import re
from typing import Any, Mapping, Sequence

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

from backend.core.api_manager import APIManager

WEAK_VERB_REPLACEMENTS: dict[str, list[str]] = {
    "helped": ["Spearheaded", "Accelerated", "Partnered"],
    "did": ["Executed", "Delivered", "Implemented"],
    "made": ["Built", "Produced", "Launched"],
    "worked on": ["Owned", "Engineered", "Advanced"],
    "responsible for": ["Directed", "Managed", "Orchestrated"],
    "handled": ["Resolved", "Coordinated", "Administered"],
}

METRIC_PATTERN = re.compile(r"(\d+(?:\.\d+)?\s?%|\$\s?\d+|₹\s?\d+|\b\d+\b|\b\d+x\b)", re.IGNORECASE)


def normalize_keyword(value: str) -> str:
    """Normalize a keyword for case-insensitive ATS matching."""
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9+#.\s-]", " ", value.lower())).strip()


def normalize_keywords(keywords: Sequence[str]) -> list[str]:
    """Return unique, non-empty normalized keywords in source order."""
    output: list[str] = []
    seen: set[str] = set()
    for keyword in keywords:
        normalized = normalize_keyword(str(keyword))
        if normalized and normalized not in seen:
            seen.add(normalized)
            output.append(normalized)
    return output


def calculate_ats_match_score(resume_text: str, required_keywords: Sequence[str]) -> dict[str, Any]:
    """Calculate ATS score with the required formula: found keywords divided by total keywords."""
    normalized_resume = normalize_keyword(resume_text)
    required = normalize_keywords(required_keywords)
    found: list[str] = []
    missing: list[str] = []
    for keyword in required:
        pattern = re.compile(rf"(?<![a-z0-9+#.]){re.escape(keyword)}(?![a-z0-9+#.])", re.IGNORECASE)
        if pattern.search(normalized_resume):
            found.append(keyword)
        else:
            missing.append(keyword)
    total = len(required)
    score = (len(found) / total) * 100 if total else 0.0
    return {
        "score": score,
        "found_keywords": found,
        "missing_keywords": missing,
        "found_count": len(found),
        "total_required_keywords": total,
    }


def split_resume_bullets(resume_text: str) -> list[str]:
    """Extract bullet-like resume statements from text."""
    lines = [line.strip(" -•\t") for line in resume_text.splitlines() if line.strip(" -•\t")]
    if lines:
        return lines
    return [part.strip() for part in re.split(r"(?<=[.!?])\s+", resume_text) if part.strip()]


def flag_weak_action_verbs(resume_text: str) -> list[dict[str, str]]:
    """Find weak resume verbs and recommend stronger replacements."""
    findings: list[dict[str, str]] = []
    lowered = resume_text.lower()
    for weak, replacements in WEAK_VERB_REPLACEMENTS.items():
        if re.search(rf"\b{re.escape(weak)}\b", lowered):
            findings.append(
                {
                    "weak_phrase": weak,
                    "recommended_replacements": ", ".join(replacements),
                }
            )
    return findings


def find_quantifiable_impact_gaps(resume_text: str) -> list[dict[str, str]]:
    """Flag resume bullets that do not contain numerical impact evidence."""
    gaps: list[dict[str, str]] = []
    for bullet in split_resume_bullets(resume_text):
        if len(bullet.split()) >= 4 and METRIC_PATTERN.search(bullet) is None:
            gaps.append(
                {
                    "bullet": bullet,
                    "recommendation": "Add a metric such as percentage improvement, revenue, cost, volume, latency, or team size.",
                }
            )
    return gaps


def formatting_sanity_check(text: str, parser_warnings: Sequence[str] | None = None) -> list[str]:
    """Return ATS formatting warnings from parser warnings and text-level signals."""
    warnings = list(parser_warnings or [])
    if len(re.findall(r"\s{4,}", text)) > 4:
        warnings.append("Repeated wide spacing can indicate columns or hidden text.")
    if len(re.findall(r"[|]{2,}", text)) > 0:
        warnings.append("Dense table separators can reduce ATS parsing quality.")
    if len(text) < 300:
        warnings.append("Resume text is short; ATS systems may lack enough evidence to score accurately.")
    return dedupe_strings(warnings)


def analyze_resume_text(
    resume_text: str,
    required_keywords: Sequence[str],
    parser_warnings: Sequence[str] | None = None,
) -> dict[str, Any]:
    """Run keyword, action verb, impact, and formatting checks over resume text."""
    ats = calculate_ats_match_score(resume_text, required_keywords)
    return {
        "ats": ats,
        "action_verb_findings": flag_weak_action_verbs(resume_text),
        "impact_gaps": find_quantifiable_impact_gaps(resume_text),
        "formatting_warnings": formatting_sanity_check(resume_text, parser_warnings),
    }


def generate_resume_summaries(
    resume_text: str,
    target_role: str,
    api_manager: APIManager | None = None,
) -> list[str]:
    """Generate three role-specific summaries through an LLM with deterministic fallback."""
    if api_manager is None:
        role = target_role.strip() or "target role"
        return [
            f"Results-driven {role} candidate with demonstrated experience translating technical skills into measurable business outcomes.",
            f"Analytical {role} profile with strengths in execution, collaboration, and continuous improvement across complex projects.",
            f"Impact-focused {role} professional prepared to deliver reliable, ATS-aligned evidence of skills, ownership, and outcomes.",
        ]
    prompt = (
        "Generate exactly three ATS-optimized professional summary paragraphs for the target role. "
        "Keep each paragraph under 70 words and avoid inventing facts.\n\n"
        f"Target role: {target_role}\nResume text:\n{resume_text[:6000]}"
    )
    response = api_manager.chat_completion(
        messages=[
            {"role": "system", "content": "You write concise, evidence-based resume summaries."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=700,
        temperature=0.2,
    )
    summaries = [line.strip(" -0123456789.") for line in response.splitlines() if line.strip()]
    return summaries[:3] if summaries else generate_resume_summaries(resume_text, target_role, None)


def build_resume_pdf(profile: Mapping[str, Any]) -> bytes:
    """Build a lightweight ATS-friendly PDF resume from structured profile data."""
    buffer = BytesIO()
    document = SimpleDocTemplate(buffer, pagesize=LETTER, rightMargin=42, leftMargin=42, topMargin=42, bottomMargin=42)
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle("ResumeTitle", parent=styles["Title"], fontSize=18, leading=22, spaceAfter=8)
    heading_style = ParagraphStyle("ResumeHeading", parent=styles["Heading2"], fontSize=11, leading=14, spaceBefore=10, spaceAfter=4)
    body_style = ParagraphStyle("ResumeBody", parent=styles["BodyText"], fontSize=9.5, leading=12)
    story: list[Any] = []
    name = str(profile.get("name", "Candidate")).strip() or "Candidate"
    story.append(Paragraph(name, title_style))
    contact = " | ".join(str(profile.get(key, "")).strip() for key in ["email", "phone", "location", "linkedin"] if str(profile.get(key, "")).strip())
    if contact:
        story.append(Paragraph(contact, body_style))
    sections = [
        ("Professional Summary", profile.get("summary", "")),
        ("Skills", profile.get("skills", "")),
        ("Experience", profile.get("experience", "")),
        ("Projects", profile.get("projects", "")),
        ("Education", profile.get("education", "")),
    ]
    for heading, content in sections:
        text = str(content).strip()
        if text:
            story.append(Spacer(1, 6))
            story.append(Paragraph(heading, heading_style))
            for line in split_resume_bullets(text):
                story.append(Paragraph(line, body_style))
    document.build(story)
    return buffer.getvalue()


def dedupe_strings(values: Sequence[str]) -> list[str]:
    """Return unique strings in source order."""
    output: list[str] = []
    seen: set[str] = set()
    for value in values:
        cleaned = value.strip()
        if cleaned and cleaned not in seen:
            seen.add(cleaned)
            output.append(cleaned)
    return output
