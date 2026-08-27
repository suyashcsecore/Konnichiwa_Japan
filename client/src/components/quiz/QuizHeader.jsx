import { Clock } from "lucide-react";

function QuizHeader({ current, total, timeLeft }) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-end mb-3 font-bold text-gray-700">
        <span className="text-lg">Question <span className="text-rose-600 text-xl font-black">{current}</span> <span className="text-gray-400">/ {total}</span></span>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-300 ${
          timeLeft <= 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-rose-50 text-rose-500'
        }`}>
          <Clock size={20} className={timeLeft <= 10 ? 'animate-bounce' : ''} />
          <span className="font-black text-lg">{timeLeft}s</span>
        </div>
      </div>

      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-rose-400 to-orange-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default QuizHeader;