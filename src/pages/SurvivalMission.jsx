import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Map, Check, X } from "lucide-react";
import { survivalScenarios } from "../data/puzzleData";

function SurvivalMission() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const scenario = survivalScenarios[current];

  const choose = (option) => {
    if (selected) {
      return;
    }

    setSelected(option);

    if (option === scenario.answer) {
      setScore((previous) => previous + 1);
    }
  };

  const next = () => {
    if (current === survivalScenarios.length - 1) {
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

        <div className="mission-header">

          <Map size={40} />

          <p className="eyebrow">
            JAPAN SURVIVAL MISSION
          </p>

          <h1>
            What Would You Do?
          </h1>

          <div className="game-progress">
            Mission {current + 1} / {survivalScenarios.length}
            <span>Score: {score}</span>
          </div>

        </div>

        <div className="scenario-card mission">

          <span className="mission-label">
            SITUATION
          </span>

          <h2>
            {scenario.scenario}
          </h2>

        </div>

        <div className="answer-grid">

          {scenario.options.map((option, index) => {

            const correct = option === scenario.answer;
            const chosen = option === selected;

            let className = "scenario-option";

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
            {current === survivalScenarios.length - 1
              ? "Complete Mission"
              : "Next Situation"}
          </button>
        )}

      </div>

    </div>
  );
}

export default SurvivalMission;