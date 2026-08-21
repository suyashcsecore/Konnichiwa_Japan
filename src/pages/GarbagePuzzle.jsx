import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, RotateCcw } from "lucide-react";
import { garbageItems } from "../data/puzzleData";

function GarbagePuzzle() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const item = garbageItems[current];

  const categories = [
    {
      id: "burnable",
      name: "Burnable",
      emoji: "🔥"
    },
    {
      id: "plastic",
      name: "Plastic",
      emoji: "♻️"
    },
    {
      id: "paper",
      name: "Paper",
      emoji: "📄"
    },
    {
      id: "glass",
      name: "Glass",
      emoji: "🍾"
    },
    {
      id: "can",
      name: "Can",
      emoji: "🥫"
    }
  ];

  const handleAnswer = (answer) => {
    if (feedback) {
      return;
    }

    if (answer === item.answer) {
      setScore((previous) => previous + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
  };

  const nextItem = () => {
    if (current === garbageItems.length - 1) {
      navigate("/puzzles");
      return;
    }

    setCurrent((previous) => previous + 1);
    setFeedback(null);
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="page">

      <div className="game-container">

        <button
          className="back-button"
          onClick={() => navigate("/puzzles")}
        >
          <ArrowLeft size={18} />
          Games
        </button>

        <div className="game-header">

          <p className="eyebrow">
            ♻️ GARBAGE SORT
          </p>

          <h1>
            Sort It Right!
          </h1>

          <p>
            Put each item into the correct waste category.
          </p>

          <div className="game-progress">
            {current + 1} / {garbageItems.length}
            <span>Score: {score}</span>
          </div>

        </div>

        <div className="garbage-item">

          <div className="garbage-emoji">
            {item.emoji}
          </div>

          <h2>
            {item.name}
          </h2>

          <p>
            Which category does this belong to?
          </p>

        </div>

        <div className="garbage-grid">

          {categories.map((category) => (
            <button
              key={category.id}
              className="garbage-category"
              onClick={() => handleAnswer(category.id)}
              disabled={Boolean(feedback)}
            >
              <span>{category.emoji}</span>
              {category.name}
            </button>
          ))}

        </div>

        {feedback && (
          <div
            className={
              feedback === "correct"
                ? "feedback correct-feedback"
                : "feedback wrong-feedback"
            }
          >

            {feedback === "correct" ? (
              <>
                <Check />
                Correct! Great job.
              </>
            ) : (
              <>
                <X />
                Not quite. Try to remember the category.
              </>
            )}

            <button
              className="primary-button"
              onClick={nextItem}
            >
              {current === garbageItems.length - 1
                ? "Finish"
                : "Next"}
            </button>

          </div>
        )}

        {current === garbageItems.length - 1 && feedback && (
          <button
            className="restart-button"
            onClick={restart}
          >
            <RotateCcw size={18} />
            Play Again
          </button>
        )}

      </div>

    </div>
  );
}

export default GarbagePuzzle;