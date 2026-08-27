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
    <div className="page overflow-hidden relative min-h-screen flex items-center justify-center">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-amber-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-rose-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>

      <div className="game-container w-full max-w-4xl relative z-10 p-6 md:p-10 bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] rounded-[3rem]">

        <button
          className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full font-bold text-gray-600 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all shadow-sm mb-8"
          onClick={() => navigate("/puzzles")}
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Back to Games
        </button>

        <div className="text-center mb-10 border-b border-gray-200/50 pb-8">

          <p className="text-sm font-black tracking-[0.25em] text-amber-500 mb-3 uppercase flex items-center justify-center gap-2">
            <Map size={24} className="text-amber-500" /> JAPAN SURVIVAL MISSION
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-6 bg-gradient-to-r from-amber-500 to-rose-500 text-transparent bg-clip-text">
            What Would You Do?
          </h1>

          <div className="flex justify-center items-center gap-8 text-slate-500">
            <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl font-bold">
              Mission: <span className="text-amber-500">{current + 1} / {survivalScenarios.length}</span>
            </span>
            <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl font-bold">
              Score: <span className="text-rose-500 text-xl">{score}</span>
            </span>
          </div>

        </div>

        <div className="mb-10 bg-white/80 p-8 md:p-12 rounded-[2.5rem] shadow-lg border border-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-600 font-black text-xs px-4 py-1 rounded-b-xl uppercase tracking-widest">
            Situation
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mt-4">
            {scenario.scenario}
          </h2>
        </div>

        <div className="flex flex-col gap-4">

          {scenario.options.map((option, index) => {

            const correct = option === scenario.answer;
            const chosen = option === selected;

            let baseClasses = "flex items-center gap-5 p-5 w-full text-left rounded-2xl font-bold text-lg transition-all duration-300 border-2 shadow-sm";
            let stateClasses = "bg-white/60 border-transparent hover:border-amber-400 hover:bg-white hover:shadow-md hover:-translate-y-1";
            let letterClasses = "w-12 h-12 rounded-full flex items-center justify-center font-black text-gray-500 bg-gray-100 transition-colors";

            if (selected) {
              if (correct) {
                stateClasses = "bg-emerald-50 border-emerald-500 shadow-md text-emerald-900";
                letterClasses = "bg-emerald-200 text-emerald-700";
              } else if (chosen) {
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

                {selected && correct && (
                  <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700">
                    <Check size={24} />
                  </div>
                )}

                {selected && chosen && !correct && (
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
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-8 py-4 rounded-full font-black text-lg text-white bg-gradient-to-r from-amber-500 to-rose-500 shadow-[0_10px_25px_rgba(245,158,11,0.4)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.6)] hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
            onClick={next}
          >
            {current === survivalScenarios.length - 1
              ? "Complete Mission 🎉"
              : "Next Situation"}
          </button>
        )}

      </div>

    </div>
  );
}

export default SurvivalMission;