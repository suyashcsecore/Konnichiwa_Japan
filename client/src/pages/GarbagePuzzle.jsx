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
    <div className="page overflow-hidden relative min-h-screen flex items-center justify-center">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-emerald-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>

      <div className="game-container w-full max-w-5xl relative z-10 p-6 md:p-10 bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] rounded-[3rem]">

        <button
          className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full font-bold text-gray-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all shadow-sm mb-8"
          onClick={() => navigate("/puzzles")}
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Back to Games
        </button>

        <div className="text-center mb-12 border-b border-gray-200/50 pb-10">

          <p className="text-sm font-black tracking-[0.25em] text-emerald-500 mb-3 uppercase">
            ♻️ GARBAGE SORT
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-6">
            Sort It Right!
          </h1>

          <div className="flex justify-center items-center gap-8 text-slate-500">
            <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl font-bold">
              Progress: <span className="text-emerald-500">{current + 1} / {garbageItems.length}</span>
            </span>
            <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl font-bold">
              Score: <span className="text-blue-500 text-xl">{score}</span>
            </span>
          </div>

        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-between mb-12">
          
          <div className="flex-1 flex flex-col items-center justify-center p-10 bg-white/80 rounded-[2.5rem] border border-white shadow-xl shadow-gray-200/50 transform transition-transform hover:scale-[1.02]">
            <div className="text-[6rem] mb-6 drop-shadow-md animate-bounce-slow">
              {item.emoji}
            </div>

            <h2 className="text-3xl font-black text-slate-800 mb-4">
              {item.name}
            </h2>

            <p className="text-gray-500 font-medium">
              Which bin does this belong to?
            </p>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex flex-col items-center justify-center p-6 bg-white/60 backdrop-blur-md border-2 border-dashed border-gray-300 rounded-[2rem] hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                onClick={() => handleAnswer(category.id)}
                disabled={Boolean(feedback)}
              >
                <span className="text-4xl mb-3 transform transition-transform group-hover:scale-110">{category.emoji}</span>
                <span className="font-bold text-slate-700">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <div
            className={`flex items-center justify-between p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-lg ${
              feedback === "correct"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-rose-50 border border-rose-200 text-rose-800"
            }`}
          >
            <div className="flex items-center gap-4 text-xl font-bold">
              {feedback === "correct" ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700">
                    <Check size={28} />
                  </div>
                  Correct! Great job.
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-rose-200 flex items-center justify-center text-rose-700">
                    <X size={28} />
                  </div>
                  Not quite. Try to remember the category.
                </>
              )}
            </div>

            <button
              className={`px-8 py-4 rounded-xl font-black text-white transition-transform hover:-translate-y-1 shadow-md ${
                feedback === "correct" ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30" : "bg-rose-500 hover:bg-rose-600 shadow-rose-500/30"
              }`}
              onClick={nextItem}
            >
              {current === garbageItems.length - 1
                ? "Finish"
                : "Next Item"}
            </button>
          </div>
        )}

        {current === garbageItems.length - 1 && feedback && (
          <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <button
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all hover:shadow-xl shadow-slate-800/20 hover:-translate-y-1"
              onClick={restart}
            >
              <RotateCcw size={20} />
              Play Again
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default GarbagePuzzle;