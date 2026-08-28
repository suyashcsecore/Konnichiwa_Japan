from pathlib import Path

import joblib


MODEL_PATH = Path(__file__).parent.parent / "models" / "chatbot_model.joblib"


class CareerPredictor:
    def __init__(self) -> None:
        self.artifact = joblib.load(MODEL_PATH)
        self.model = self.artifact["model"]

    def predict(self, user_input: str) -> dict:
        profile = self._format_profile(user_input)
        prediction = self.model.predict([profile])[0]
        proba = self.model.predict_proba([profile])[0]
        classes = self.model.named_steps["classifier"].classes_

        ranked = sorted(zip(classes, proba), key=lambda x: x[1], reverse=True)
        return {
            "prediction": ranked[0][0],
            "confidence": round(float(ranked[0][1]) * 100, 2),
            "alternatives": [
                {"career": c, "confidence": round(float(p) * 100, 2)}
                for c, p in ranked[1:3]
            ],
        }

    def _format_profile(self, text: str) -> str:
        return text.lower().strip()
