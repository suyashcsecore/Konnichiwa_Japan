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
      <div className="page overflow-hidden relative min-h-screen flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(244,63,94,0.1)_0%,rgba(255,255,255,0)_70%)] animate-pulse"></div>

        <div className="relative z-10 w-full max-w-2xl bg-white/80 backdrop-blur-2xl p-10 md:p-14 text-center rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(244,63,94,0.2)] border border-white/60">
          <div className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center bg-gradient-to-br from-rose-100 to-orange-200 text-orange-600 shadow-xl shadow-orange-500/20 mb-8 animate-bounce-slow">
            <span className="text-5xl drop-shadow-sm">🎒</span>
          </div>

          <h1 className="text-4xl font-black text-slate-800 mb-2">🎉 Packing Mission Complete!</h1>
          <h2 className="text-xl font-bold text-gray-500 mb-8">Your Final Score</h2>

          <div className="mb-8">
            <span className="text-8xl font-black bg-gradient-to-br from-rose-500 to-orange-500 text-transparent bg-clip-text drop-shadow-sm">{score}</span>
          </div>

          <p className="text-lg text-slate-600 font-medium mb-12">
            {score >= 180
              ? "Excellent! You are perfectly packed and ready for Japan."
              : score >= 120
              ? "Good Job! You're mostly ready, but maybe double-check your list."
              : "Keep practicing to make sure you bring what you need!"}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="flex justify-center items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              onClick={playAgain}
            >
              Play Again
            </button>
            <button
              className="flex justify-center items-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
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
    <div className="page overflow-hidden relative min-h-screen flex items-center justify-center">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-orange-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-rose-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>

      <div className="game-container w-full max-w-5xl relative z-10 p-6 md:p-10 bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] rounded-[3rem]">

        <button
          className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full font-bold text-gray-600 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all shadow-sm mb-8"
          onClick={() => navigate("/puzzles")}
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Back to Games
        </button>

        <div className="text-center mb-10 border-b border-gray-200/50 pb-8">

          <p className="text-sm font-black tracking-[0.25em] text-orange-500 mb-3 uppercase flex items-center justify-center gap-2">
            <span className="text-2xl">🎒</span> PACK YOUR JAPAN BAG
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 pb-2 bg-gradient-to-r from-orange-500 to-rose-500 text-transparent bg-clip-text">
            {scenario.title}
          </h1>

          <div className="flex justify-center items-center gap-8 text-slate-500">
            <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl font-bold">
              Situation: <span className="text-orange-500">{current + 1} / {packingScenarios.length}</span>
            </span>
            <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl font-bold">
              Score: <span className="text-rose-500 text-xl">{score}</span>
            </span>
          </div>

        </div>

        <div className="mb-10 bg-white/80 p-8 md:p-12 rounded-[2.5rem] shadow-lg border border-white text-center">
          <h2 className="text-2xl md:text-3xl font-black text-slate-700 leading-relaxed">
            {scenario.description}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {scenario.items.map((item) => {
            const chosen = selected.includes(item.name);
            let baseClasses = "flex flex-col items-center justify-center p-6 bg-white/60 backdrop-blur-md border-2 rounded-[2rem] transition-all duration-300 cursor-pointer";
            let stateClasses = "border-transparent hover:border-orange-300 hover:bg-white hover:-translate-y-1 hover:shadow-md";

            if (chosen) {
              stateClasses = "bg-orange-50 border-orange-400 shadow-md transform -translate-y-2 scale-[1.02]";
            }

            if (checked) {
              if (item.important && chosen) {
                stateClasses = "bg-emerald-50 border-emerald-500 shadow-lg text-emerald-900 ring-4 ring-emerald-100";
              } else if (!item.important && chosen) {
                stateClasses = "bg-rose-50 border-rose-500 shadow-lg text-rose-900 ring-4 ring-rose-100";
              } else if (item.important && !chosen) {
                stateClasses = "bg-gray-100 border-gray-300 opacity-60"; // Missed important item
              } else {
                stateClasses = "bg-white/40 border-transparent opacity-50";
              }
            }

            return (
              <div
                key={item.name}
                className={`${baseClasses} ${stateClasses} ${checked ? 'pointer-events-none' : ''}`}
                onClick={() => toggleItem(item.name)}
              >
                <div className="text-5xl mb-4 transition-transform group-hover:scale-110 drop-shadow-sm">
                  {item.emoji}
                </div>
                <div className="font-bold text-slate-700 text-center text-sm md:text-base">
                  {item.name}
                </div>

                {checked && chosen && (
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md ${item.important ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                    {item.important ? <Check size={18} /> : <X size={18} />}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!checked ? (
          <button
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-8 py-4 rounded-full font-black text-lg text-white transition-all duration-300 shadow-[0_10px_25px_rgba(249,115,22,0.4)] hover:shadow-[0_15px_35px_rgba(249,115,22,0.6)] hover:-translate-y-1 ${selected.length === 0 ? 'opacity-50 cursor-not-allowed bg-gray-400 shadow-none hover:shadow-none hover:translate-y-0' : 'bg-gradient-to-r from-orange-500 to-rose-500'}`}
            onClick={checkBag}
            disabled={selected.length === 0}
          >
            Check Bag
          </button>
        ) : (
          <button
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-8 py-4 rounded-full font-black text-lg text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.6)] hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
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