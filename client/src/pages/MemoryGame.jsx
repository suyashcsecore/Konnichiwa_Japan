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
    <div className="page overflow-hidden relative min-h-screen flex items-center justify-center">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-sky-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>

      <div className="game-container w-full max-w-5xl relative z-10 p-6 md:p-10 bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] rounded-[3rem]">

        <button
          className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full font-bold text-gray-600 hover:text-sky-600 hover:border-sky-200 hover:bg-sky-50 transition-all shadow-sm mb-8"
          onClick={() => navigate("/puzzles")}
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Back to Games
        </button>

        <div className="text-center mb-10 border-b border-gray-200/50 pb-8">

          <p className="text-sm font-black tracking-[0.25em] text-sky-500 mb-3 uppercase flex items-center justify-center gap-2">
            <span className="text-2xl">🧠</span> MEMORY MATCH
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-6 pb-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-transparent bg-clip-text">
            Japan Memory Challenge
          </h1>

          <p className="text-slate-500 text-lg mb-8 font-medium">Find all matching pairs.</p>

          <div className="flex justify-center items-center gap-8 text-slate-500">
            <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl font-bold">
              Moves: <span className="text-sky-500">{moves}</span>
            </span>
            <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl font-bold">
              Matches: <span className="text-indigo-500">{matched.length / 2} / {memoryCards.length / 2}</span>
            </span>
          </div>

        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">

          {cards.map((card) => {

            const visible =
              flipped.includes(card.id) ||
              matched.includes(card.id);

            return (
              <div key={card.id} className="relative aspect-square">
                <button
                  className={`w-full h-full rounded-[2rem] transition-all duration-300 flex items-center justify-center border-2 focus:outline-none shadow-sm ${
                    visible 
                      ? matched.includes(card.id) 
                          ? "bg-emerald-50 border-emerald-300 shadow-md" 
                          : "bg-white border-sky-200 shadow-md"
                      : "bg-gradient-to-br from-sky-100 to-indigo-100 border-white hover:-translate-y-1 hover:shadow-lg"
                  }`}
                  onClick={() => chooseCard(card.id)}
                  disabled={visible}
                >
                  
                  {visible ? (
                    <div className="flex flex-col items-center justify-center p-2 animate-in zoom-in duration-300">
                      <span className="text-4xl md:text-5xl mb-2 drop-shadow-sm">
                        {card.value}
                      </span>
                      <small className="text-xs font-bold text-slate-500 text-center leading-tight">
                        {card.name}
                      </small>
                    </div>
                  ) : (
                    <span className="text-4xl text-sky-300 opacity-50 font-black drop-shadow-sm animate-in zoom-in duration-300">?</span>
                  )}

                </button>
              </div>
            );
          })}

        </div>

        {completed && (
          <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] border border-white shadow-xl">
            <h2 className="text-4xl font-black text-slate-800 mb-4">
              🎉 You found them all!
            </h2>
            <p className="text-xl text-slate-500 mb-8 font-medium">
              Completed in <span className="font-bold text-sky-500">{moves}</span> moves.
            </p>
            <button
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-black text-lg rounded-2xl hover:from-sky-600 hover:to-indigo-600 transition-all hover:shadow-[0_15px_30px_rgba(14,165,233,0.4)] hover:-translate-y-1"
              onClick={restart}
            >
              <RotateCcw size={22} />
              Play Again
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default MemoryGame;