import { useLocation, useNavigate } from "react-router-dom";
import {
  Trophy,
  RotateCcw,
  ArrowRight,
  Home
} from "lucide-react";

function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score || 0;
  const total = location.state?.total || 30;
  const level = location.state?.level || "beginner";
  const completed = location.state?.completed ?? true;
  const attempted = location.state?.attempted || total;

  const percentage = Math.round((score / total) * 100);

  let resultLevel = "Beginner";

  if (percentage >= 90) {
    resultLevel = "Japan Pro";
  } else if (percentage >= 70) {
    resultLevel = "Japan Ready";
  } else if (percentage >= 40) {
    resultLevel = "Explorer";
  }

  const levelName =
    level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <div className="page relative flex justify-center items-center overflow-hidden py-10 min-h-screen">
      {/* Celebration background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(244,63,94,0.1)_0%,rgba(255,255,255,0)_70%)] animate-pulse"></div>

      <div className="relative z-10 w-full max-w-2xl bg-white/80 backdrop-blur-2xl p-10 md:p-14 text-center rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(225,29,72,0.2)] border border-white/60">

        <div className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center bg-gradient-to-br from-yellow-100 to-amber-200 text-amber-600 shadow-xl shadow-amber-500/20 mb-8 animate-bounce-slow">
          <Trophy size={48} className="drop-shadow-sm" />
        </div>

        <p className="text-sm font-black tracking-widest text-rose-500 mb-2">
          {completed ? "QUIZ COMPLETED" : "QUIZ ENDED"}
        </p>

        <h1 className="text-5xl font-black text-slate-800 mb-4">
          {completed
            ? "Great Job!"
            : "Quiz Ended"}
        </h1>

        <div className="inline-block px-6 py-2 rounded-full bg-rose-50 text-rose-600 font-bold text-sm uppercase tracking-wider mb-8">
          {levelName} Level
        </div>

        <div className="mb-2">
          <span className="text-8xl font-black bg-gradient-to-br from-rose-500 to-orange-500 text-transparent bg-clip-text drop-shadow-sm">
            {score}
          </span>
          <span className="text-4xl text-gray-300 font-bold ml-2">/{total}</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-500 mb-10">{percentage}% Accuracy</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white shadow-sm flex flex-col items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Attempted</span>
            <strong className="text-2xl text-slate-700">{attempted}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white shadow-sm flex flex-col items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Correct</span>
            <strong className="text-2xl text-emerald-500">{score}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white shadow-sm flex flex-col items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</span>
            <strong className="text-xl text-rose-500 whitespace-nowrap">{resultLevel}</strong>
          </div>
        </div>

        {!completed && (
          <div className="px-4 py-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium mb-6">
            You ended the quiz before completing all {total} questions.
          </div>
        )}

        <p className="text-slate-500 mb-10">
          Keep learning about Japan and improve your
          knowledge before your journey.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-rose-500 bg-white border-2 border-rose-100 hover:bg-rose-50 hover:border-rose-300 transition-all shadow-sm"
            onClick={() => navigate(`/learn-japanese/${level}`)}
          >
            <RotateCcw size={20} />
            Try Again
          </button>

          <button
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-[0_10px_20px_rgba(244,63,94,0.3)] hover:shadow-[0_15px_30px_rgba(244,63,94,0.4)] transition-all hover:-translate-y-1"
            onClick={() => navigate("/puzzles")}
          >
            Try Puzzles
            <ArrowRight size={20} />
          </button>

          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/learn-japanese");
            }}
          >
            <Home size={20} />
            Home
          </button>
        </div>

      </div>

    </div>
  );
}

export default QuizResult;