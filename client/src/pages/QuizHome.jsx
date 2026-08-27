import { useNavigate } from "react-router-dom";
import { Brain, Trophy, Clock, ArrowRight } from "lucide-react";

function QuizHome() {
  const navigate = useNavigate();

  const levels = [
    {
      id: "beginner",
      title: "Beginner",
      description: "Test Your Basic Hiragana And Katakana Skills.",
      icon: "🟢"
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: "Test your knowledge of Japanese Vocabulary and Basic Kanji.",
      icon: "🟡"
    },
    {
      id: "pro",
      title: "Pro",
      description: "Challenge yourself with Sentences and Some Kanji",
      icon: "🔴"
    }
  ];

  return (
    <div className="page overflow-hidden relative">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="hero relative z-10 max-w-4xl mx-auto text-center px-4 py-12 md:py-20">

        <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-rose-100 to-orange-100 shadow-[0_0_40px_rgba(244,63,94,0.3)] animate-bounce-slow">
          <Brain size={48} className="text-rose-500" />
        </div>

        <p className="text-sm font-black tracking-[0.25em] text-rose-600 mb-4 uppercase">
          Master Life in Japan
        </p>

        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-rose-600 via-red-500 to-orange-500 text-transparent bg-clip-text">
          Japan Life Quiz
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Test your knowledge about Japanese culture, transportation,
          waste management, workplace etiquette and daily life.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <div className="flex items-center gap-3 px-6 py-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl shadow-rose-900/5 transition hover:-translate-y-1">
            <Brain size={24} className="text-rose-500" />
            <span className="font-bold text-gray-700">30 Questions</span>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl shadow-rose-900/5 transition hover:-translate-y-1">
            <Clock size={24} className="text-orange-500" />
            <span className="font-bold text-gray-700">30 Seconds Each</span>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl shadow-rose-900/5 transition hover:-translate-y-1">
            <Trophy size={24} className="text-yellow-500" />
            <span className="font-bold text-gray-700">Score Based</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Choose Your Level
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level) => (
            <button
              key={level.id}
              className="group relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(225,29,72,0.3)] hover:bg-white/90"
              onClick={() => navigate(`/learn-japanese/${level.id}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-5xl mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 origin-left">
                  {level.icon}
                </span>

                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-rose-600 transition-colors">
                  {level.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed flex-grow">
                  {level.description}
                </p>

                <div className="mt-8 flex items-center justify-between text-rose-500 font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>Start Quiz</span>
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default QuizHome;