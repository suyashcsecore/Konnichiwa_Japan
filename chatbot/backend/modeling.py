from datetime import UTC, datetime
import json
from pathlib import Path

import joblib
import pandas as pd
import sklearn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score, classification_report, top_k_accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

__version__ = "1.0.0"

BACKEND_DIR = Path(__file__).parent
MODEL_ARTIFACT_PATH = BACKEND_DIR / "models" / "chatbot_model.joblib"
METRICS_PATH = BACKEND_DIR / "models" / "chatbot_metrics.json"


def build_estimator() -> Pipeline:
    return Pipeline(
        steps=[
            (
                "vectorizer",
                TfidfVectorizer(
                    stop_words="english",
                    ngram_range=(1, 2),
                    max_features=6000,
                    sublinear_tf=True,
                ),
            ),
            (
                "classifier",
                MultinomialNB(alpha=0.1),
            ),
        ]
    )


def can_stratify(labels: pd.Series, test_size: float) -> bool:
    counts = labels.value_counts()
    test_count = max(1, int(round(len(labels) * test_size)))
    train_count = len(labels) - test_count
    return counts.min() >= 2 and test_count >= labels.nunique() and train_count >= labels.nunique()


def train_career_model(master: pd.DataFrame, test_size: float = 0.2) -> tuple[dict, dict]:
    features = master["profile_text"].astype(str)
    labels = master["target_career"].astype(str)
    stratify = labels if can_stratify(labels, test_size) else None
    x_train, x_test, y_train, y_test = train_test_split(
        features,
        labels,
        test_size=test_size,
        random_state=42,
        stratify=stratify,
    )
    model = build_estimator()
    model.fit(x_train, y_train)
    predictions = model.predict(x_test)
    probabilities = model.predict_proba(x_test)
    classes = model.named_steps["classifier"].classes_
    accuracy = accuracy_score(y_test, predictions)
    top_3_accuracy = top_k_accuracy_score(y_test, probabilities, k=3, labels=classes)
    top_5_accuracy = top_k_accuracy_score(y_test, probabilities, k=5, labels=classes)
    label_distribution = {label: int(count) for label, count in labels.value_counts().sort_index().items()}
    source_distribution = {}
    if "source" in master.columns:
        source_distribution = {label: int(count) for label, count in master["source"].value_counts().sort_index().items()}
    metadata = {
        "schema_version": 1,
        "application_version": __version__,
        "trained_at_utc": datetime.now(UTC).replace(microsecond=0).isoformat(),
        "record_count": int(len(master)),
        "training_records": int(len(x_train)),
        "test_records": int(len(x_test)),
        "target_count": int(labels.nunique()),
        "estimator": "MultinomialNB",
        "accuracy": round(float(accuracy), 4),
        "top_3_accuracy": round(float(top_3_accuracy), 4),
        "top_5_accuracy": round(float(top_5_accuracy), 4),
        "dependencies": {
            "pandas": pd.__version__,
            "scikit_learn": sklearn.__version__,
            "joblib": joblib.__version__,
        },
    }
    metrics = {
        "metadata": metadata,
        "label_distribution": label_distribution,
        "source_distribution": source_distribution,
        "classification_report": classification_report(y_test, predictions, output_dict=True, zero_division=0),
    }
    artifact = {
        "model": model,
        "metadata": metadata,
        "feature_columns": ["profile_text"],
        "target_column": "target_career",
    }
    return artifact, metrics


def save_training_outputs(
    artifact: dict,
    metrics: dict,
    artifact_path: Path = MODEL_ARTIFACT_PATH,
    metrics_path: Path = METRICS_PATH,
) -> None:
    artifact_path.parent.mkdir(parents=True, exist_ok=True)
    metrics_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(artifact, artifact_path, compress=3)
    with metrics_path.open("w", encoding="utf-8") as file:
        json.dump(metrics, file, indent=2)


def load_artifact(artifact_path: Path = MODEL_ARTIFACT_PATH) -> dict:
    return joblib.load(artifact_path)


def predict_top_careers(artifact: dict, profile_text: str, top_n: int = 5) -> list[dict]:
    model = artifact["model"]
    probabilities = model.predict_proba([profile_text])[0]
    classes = model.named_steps["classifier"].classes_
    ranked = sorted(zip(classes, probabilities, strict=True), key=lambda item: item[1], reverse=True)
    return [{"career": str(career), "confidence": float(probability)} for career, probability in ranked[:top_n]]
