"""Simple reranker for RAG retrieval results using labeled relevance examples."""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable, List

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score, recall_score, accuracy_score


@dataclass
class RerankerResult:
    row_id: int
    source: str
    text: str
    score: float


class Reranker:
    """A lightweight reranker that scores query/chunk pairs."""

    def __init__(self, model_path: Path | None = None):
        self.model_path = model_path
        self.pipeline: Pipeline | None = None
        if model_path is not None and model_path.exists():
            self.load(model_path)

    def fit(self, training_csv: Path, output_path: Path | None = None) -> dict[str, Any]:
        df = pd.read_csv(training_csv).fillna("")
        df = df[df["label"].isin([0, 1])]
        df["feature_text"] = df["query"] + " [SEP] " + df["text"]
        X = df["feature_text"].tolist()
        y = df["label"].astype(int).tolist()
        X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.15, random_state=42, stratify=y if len(set(y)) > 1 else None)
        pipeline = Pipeline(
            [
                ("vectorizer", TfidfVectorizer(stop_words="english", ngram_range=(1, 2), max_features=12000)),
                ("classifier", LogisticRegression(max_iter=200, C=1.0, class_weight="balanced")),
            ]
        )
        pipeline.fit(X_train, y_train)
        self.pipeline = pipeline
        if output_path is not None:
            self.save(output_path)
        y_pred = pipeline.predict(X_val)
        scores = pipeline.predict_proba(X_val)[:, 1]
        metrics = {
            "accuracy": float(accuracy_score(y_val, y_pred)),
            "precision": float(precision_score(y_val, y_pred, zero_division=0)),
            "recall": float(recall_score(y_val, y_pred, zero_division=0)),
            "examples": len(y_val),
        }
        return metrics

    def predict_scores(self, query: str, chunks: Iterable[dict[str, Any]]) -> list[RerankerResult]:
        if self.pipeline is None:
            return []
        candidates = []
        texts = []
        for chunk in chunks:
            feature_text = f"{query} [SEP] {chunk['text']}"
            texts.append(feature_text)
            candidates.append(chunk)
        scores = self.pipeline.predict_proba(texts)[:, 1].tolist()
        return [RerankerResult(row_id=c["row_id"], source=c["source"], text=c["text"], score=float(score)) for c, score in zip(candidates, scores)]

    def rerank(self, query: str, chunks: Iterable[dict[str, Any]]) -> list[RerankerResult]:
        scored = self.predict_scores(query, chunks)
        return sorted(scored, key=lambda item: item.score, reverse=True)

    def save(self, output_path: Path) -> None:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump(self.pipeline, output_path)

    def load(self, model_path: Path) -> None:
        self.pipeline = joblib.load(model_path)
        self.model_path = model_path
