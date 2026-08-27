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
    <div className="page overflow-hidden relative min-h-screen flex items-center justify-center">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>

      <div className="game-container w-full max-w-4xl relative z-10 p-6 md:p-10 bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] rounded-[3rem]">

        <button
          className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full font-bold text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm mb-8"
          onClick={() => navigate("/puzzles")}
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Back to Games
        </button>

        <div className="text-center mb-10 border-b border-gray-200/50 pb-8">

          <p className="text-sm font-black tracking-[0.25em] text-indigo-500 mb-3 uppercase flex items-center justify-center gap-2">
            <span className="text-2xl">🚆</span> JAPAN MANNERS
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-6 pb-2 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-transparent bg-clip-text">
            Right or Wrong?
          </h1>

          <div className="flex justify-center items-center gap-8 text-slate-500">
            <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl font-bold">
              Question: <span className="text-indigo-500">{current + 1} / {mannersQuestions.length}</span>
            </span>
            <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl font-bold">
              Score: <span className="text-fuchsia-500 text-xl">{score}</span>
            </span>
          </div>

        </div>

        <div className="mb-10 bg-white/80 p-8 md:p-12 rounded-[2.5rem] shadow-lg border border-white text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
            {question.question}
          </h2>
        </div>

        <div className="flex flex-col gap-4">

          {question.options.map((option, index) => {

            const isSelected = selected === option;
            const isCorrect = option === question.answer;

            let baseClasses = "flex items-center gap-5 p-5 w-full text-left rounded-2xl font-bold text-lg transition-all duration-300 border-2 shadow-sm";
            let stateClasses = "bg-white/60 border-transparent hover:border-indigo-400 hover:bg-white hover:shadow-md hover:-translate-y-1";
            let letterClasses = "w-12 h-12 rounded-full flex items-center justify-center font-black text-gray-500 bg-gray-100 transition-colors";

            if (selected) {
              if (isCorrect) {
                stateClasses = "bg-emerald-50 border-emerald-500 shadow-md text-emerald-900";
                letterClasses = "bg-emerald-200 text-emerald-700";
              } else if (isSelected) {
                stateClasses = "bg-rose-50 border-rose-500 shadow-md text-rose-900";
                letterClasses = "bg-rose-200 text-rose-700";
              } else {
                stateClasses = "bg-white/40 border-transparent opacity-50";
              }
            }

            return (
              <button
                key={option}
                className={`${baseClasses} ${stateClasses}`}
                onClick={() => choose(option)}
                disabled={Boolean(selected)}
              >
                <span className={letterClasses}>
                  {String.fromCharCode(65 + index)}
                </span>

                <span className="flex-1">
                  {option}
                </span>

                {selected && isCorrect && (
                  <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700">
                    <Check size={24} />
                  </div>
                )}

                {selected && isSelected && !isCorrect && (
                  <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-700">
                    <X size={24} />
                  </div>
                )}
              </button>
            );
          })}

        </div>

        {selected && (
          <button
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-8 py-4 rounded-full font-black text-lg text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-[0_10px_25px_rgba(99,102,241,0.4)] hover:shadow-[0_15px_35px_rgba(99,102,241,0.6)] hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
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