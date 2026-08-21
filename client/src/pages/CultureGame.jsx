import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { cultureQuestions } from "../data/puzzleData";

function CultureGame() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const question = cultureQuestions[current];

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

    if (current === cultureQuestions.length - 1) {
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
          🎌 CULTURE CHALLENGE
        </p>

        <h1>
          What Would You Do?
        </h1>

        <div className="game-progress">
          Situation {current + 1} / {cultureQuestions.length}
          <span>Score: {score}</span>
        </div>

        <div className="scenario-card">

          <h2>
            {question.scenario}
          </h2>

        </div>

        <div className="answer-grid">

          {question.options.map((option, index) => {

            const correct =
              option === question.answer;

            const chosen =
              option === selected;

            let className =
              "scenario-option";

            if (selected) {

              if (correct) {
                className += " correct";
              } else if (chosen) {
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

                {selected && correct && (
                  <Check size={20} />
                )}

                {selected && chosen && !correct && (
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
            {current === cultureQuestions.length - 1
              ? "Finish"
              : "Next Situation"}
          </button>
        )}

      </div>

    </div>
  );
}

export default CultureGame;