import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { packingScenarios } from "../data/puzzleData";

function PackingGame() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const scenario = packingScenarios[current];

  const toggleItem = (name) => {
    if (checked) return;

    if (selected.includes(name)) {
      setSelected(selected.filter((item) => item !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  const checkBag = () => {
    let points = 0;

    scenario.items.forEach((item) => {
      const chosen = selected.includes(item.name);

      if (item.important && chosen) {
        points += 10;
      }

      if (!item.important && chosen) {
        points -= 5;
      }
    });

    if (points < 0) points = 0;

    setScore((prev) => prev + points);
    setChecked(true);
  };

  const nextScenario = () => {
    if (current === packingScenarios.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent(current + 1);
    setSelected([]);
    setChecked(false);
  };

  const playAgain = () => {
    setCurrent(0);
    setSelected([]);
    setChecked(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="page">

        <div className="game-container">

          <h1>🎉 Packing Mission Complete!</h1>

          <div className="scenario-card">

            <h2>Your Final Score</h2>

            <h1>{score}</h1>

            <p>
              {score >= 180
                ? "Excellent! You are ready for Japan."
                : score >= 120
                ? "Good Job! Keep practicing."
                : "Practice again to improve."}
            </p>

            <button
              className="floating-action-button"
              onClick={playAgain}
            >
              Play Again
            </button>

            <button
              className="back-button"
              onClick={() => navigate("/puzzles")}
            >
              Back to Games
            </button>

          </div>

        </div>

      </div>
    );
  }

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
          🎒 PACK YOUR JAPAN BAG
        </p>

        <h1>
          {scenario.title}
        </h1>

        <div className="game-progress">
          <span>
            Situation {current + 1} / {packingScenarios.length}
          </span>

          <span>
            Score : {score}
          </span>
        </div>

        <div className="scenario-card">
          <h2>{scenario.description}</h2>
        </div>

        <div className="packing-grid">

          {scenario.items.map((item) => {

            const chosen = selected.includes(item.name);

            let className = "pack-card";

            if (chosen) {
              className += " selected";
            }

            if (checked) {

              if (item.important && chosen) {
                className += " correct";
              }

              if (!item.important && chosen) {
                className += " wrong";
              }
            }

            return (

              <div
                key={item.name}
                className={className}
                onClick={() => toggleItem(item.name)}
              >

                <div className="pack-emoji">
                  {item.emoji}
                </div>

                <div className="pack-name">
                  {item.name}
                </div>

                {checked && chosen && (
                  item.important
                    ? <Check size={22}/>
                    : <X size={22}/>
                )}

              </div>

            );

          })}

              </div>
              {!checked ? (

          <button
            className="floating-action-button"
            onClick={checkBag}
            disabled={selected.length === 0}
          >
            Check Bag
          </button>

        ) : (

          <button
            className="floating-action-button"
            onClick={nextScenario}
          >
            {current === packingScenarios.length - 1
              ? "Finish Mission 🎉"
              : "Next Situation →"}
          </button>

        )}

      </div>

    </div>
  );
}

export default PackingGame;