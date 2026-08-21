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
    <div className="page">

      <div className="puzzle-home">

        <div className="puzzle-hero">

          <div className="puzzle-hero-icon">
            🇯🇵
          </div>

          <p className="eyebrow">
            LIFE IN JAPAN
          </p>

          <h1>
            Japan Life Games
          </h1>

          <p>
            Learn Japanese culture and everyday life
            through fun interactive challenges.
          </p>

        </div>

        <div className="games-grid">

          {games.map((game) => (
            <button
              key={game.path}
              className="game-card"
              onClick={() => navigate(game.path)}
            >

              <div className="game-card-top">

                <div className="game-icon">
                  {game.icon}
                </div>

                <span className="game-tag">
                  {game.tag}
                </span>

              </div>

              <h2>
                {game.title}
              </h2>

              <p>
                {game.description}
              </p>

              <div className="play-game">
                Play Game
                <ArrowRight size={18} />
              </div>

            </button>
          ))}

        </div>

      </div>

    </div>
  );
}

export default PuzzleHome;