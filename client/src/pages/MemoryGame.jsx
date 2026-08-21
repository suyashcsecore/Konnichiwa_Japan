import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { memoryCards } from "../data/puzzleData";

function shuffleCards(cards) {
  const shuffled = [...cards];
  let seed = 12345;

  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;

    const randomIndex = Math.floor(
      (seed / 233280) * (i + 1)
    );

    const temp = shuffled[i];
    shuffled[i] = shuffled[randomIndex];
    shuffled[randomIndex] = temp;
  }

  return shuffled;
}

function MemoryGame() {
  const navigate = useNavigate();

  const [cards, setCards] = useState(() =>
    shuffleCards(memoryCards)
  );

  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const chooseCard = (id) => {
    if (
      flipped.includes(id) ||
      matched.includes(id) ||
      flipped.length === 2
    ) {
      return;
    }

    const newFlipped = [...flipped, id];

    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((previous) => previous + 1);

      const first = cards.find(
        (card) => card.id === newFlipped[0]
      );

      const second = cards.find(
        (card) => card.id === newFlipped[1]
      );

      if (first.value === second.value) {
        setMatched((previous) => [
          ...previous,
          first.id,
          second.id
        ]);

        setTimeout(() => {
          setFlipped([]);
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      }
    }
  };

  const restart = () => {
    setCards(shuffleCards(memoryCards));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const completed =
    matched.length === memoryCards.length;

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
            🧠 MEMORY MATCH
          </p>

          <h1>
            Japan Memory Challenge
          </h1>

          <p>
            Find all matching pairs.
          </p>

          <div className="game-progress">
            <span>
              Moves: {moves}
            </span>

            <span>
              Matches: {matched.length / 2}
            </span>
          </div>

        </div>

        <div className="memory-grid">

          {cards.map((card) => {

            const visible =
              flipped.includes(card.id) ||
              matched.includes(card.id);

            return (
              <button
                key={card.id}
                className={
                  visible
                    ? "memory-card flipped"
                    : "memory-card"
                }
                onClick={() => chooseCard(card.id)}
              >

                {visible ? (
                  <div>
                    <span className="memory-emoji">
                      {card.value}
                    </span>

                    <small>
                      {card.name}
                    </small>
                  </div>
                ) : (
                  <span className="memory-question">
                    ?
                  </span>
                )}

              </button>
            );
          })}

        </div>

        {completed && (
          <div className="memory-complete">

            <h2>
              🎉 You found them all!
            </h2>

            <p>
              Completed in {moves} moves.
            </p>

            <button
              className="primary-button"
              onClick={restart}
            >
              <RotateCcw size={18} />
              Play Again
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default MemoryGame;