import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { mannersQuestions } from "../data/puzzleData";

function MannersGame() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const question = mannersQuestions[current];

  const choose = (option) => {
    if (selected) {
      return;
    }

    setSelected(option);

    if (option === question.answer) {
      setScore((previous) => previous + 1);
    }
  };

  const next = () => {
    if (current === mannersQuestions.length - 1) {
      navigate("/puzzles");
      return;
    }

    setCurrent((previous) => previous + 1);
    setSelected(null);
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

        <p className="eyebrow">
          🚆 JAPAN MANNERS
        </p>

        <h1>
          Right or Wrong?
        </h1>

        <div className="game-progress">
          Question {current + 1} / {mannersQuestions.length}
          <span>Score: {score}</span>
        </div>

        <div className="scenario-card">

          <h2>
            {question.question}
          </h2>

        </div>

        <div className="answer-grid">

          {question.options.map((option, index) => {

            const isSelected = selected === option;
            const isCorrect = option === question.answer;

            let className = "scenario-option";

            if (selected) {
              if (isCorrect) {
                className += " correct";
              } else if (isSelected) {
                className += " wrong";
              }
            }

            return (
              <button
                key={option}
                className={className}
                onClick={() => choose(option)}
                disabled={Boolean(selected)}
              >
                <span>
                  {String.fromCharCode(65 + index)}
                </span>

                {option}

                {selected && isCorrect && (
                  <Check size={20} />
                )}

                {selected && isSelected && !isCorrect && (
                  <X size={20} />
                )}
              </button>
            );
          })}

        </div>

        {selected && (
          <button
            className="floating-action-button"
            onClick={next}
          >
            {current === mannersQuestions.length - 1
              ? "Finish"
              : "Next Question"}
          </button>
        )}

      </div>

    </div>
  );
}

export default MannersGame;