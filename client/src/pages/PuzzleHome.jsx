import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Train,
  Luggage,
  Map,
  Brain,
  CircleHelp,
  ArrowRight
} from "lucide-react";

function PuzzleHome() {
  const navigate = useNavigate();

  const games = [
    {
      path: "/puzzles/garbage",
      title: "Garbage Sort Challenge",
      description:
        "Sort Japanese waste correctly before the timer runs out.",
      icon: <Trash2 size={30} />,
      tag: "Useful"
    },
    {
      path: "/puzzles/manners",
      title: "Japan Manners",
      description:
        "Can you identify what is polite and what is not?",
      icon: <Train size={30} />,
      tag: "Learn"
    },
    {
      path: "/puzzles/packing",
      title: "Pack Your Japan Bag",
      description:
        "Choose what you really need before your Japan journey.",
      icon: <Luggage size={30} />,
      tag: "Challenge"
    },
    {
      path: "/puzzles/survival",
      title: "Japan Survival Mission",
      description:
        "Make the right decision in real-life Japan situations.",
      icon: <Map size={30} />,
      tag: "Scenario"
    },
    {
      path: "/puzzles/memory",
      title: "Japan Memory Match",
      description:
        "Find matching Japanese culture cards.",
      icon: <Brain size={30} />,
      tag: "Brain Game"
    },
    {
      path: "/puzzles/culture",
      title: "Culture Challenge",
      description:
        "What would you do in these Japanese cultural situations?",
      icon: <CircleHelp size={30} />,
      tag: "Culture"
    }
  ];

  return (
    <div className="page overflow-hidden relative min-h-screen">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">

        <div className="text-center mb-16">

          <div className="inline-flex items-center justify-center w-28 h-28 mb-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-50 to-blue-50 shadow-[0_0_50px_rgba(99,102,241,0.2)] animate-bounce-slow">
            <span className="text-6xl drop-shadow-md">🇯🇵</span>
          </div>

          <p className="text-sm font-black tracking-[0.3em] text-indigo-600 mb-4 uppercase">
            Life in Japan
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 text-transparent bg-clip-text">
            Japan Life Games
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Learn Japanese culture and everyday life
            through fun interactive challenges.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {games.map((game) => (
            <button
              key={game.path}
              className="group relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] hover:bg-white/90 flex flex-col h-full"
              onClick={() => navigate(game.path)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-300"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    {game.icon}
                  </div>

                  <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-xs font-bold uppercase tracking-wider group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    {game.tag}
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-3 text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {game.title}
                </h2>

                <p className="text-slate-500 leading-relaxed flex-grow mb-6">
                  {game.description}
                </p>

                <div className="flex items-center text-indigo-500 font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="mr-2 group-hover:mr-4 transition-all">Play Game</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}

export default PuzzleHome;