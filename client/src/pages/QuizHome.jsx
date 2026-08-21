import { useNavigate } from "react-router-dom";
import { Brain, Trophy, Clock, ArrowRight } from "lucide-react";

function QuizHome() {
  const navigate = useNavigate();

  const levels = [
    {
      id: "beginner",
      title: "Beginner",
      description: "Learn the basics of Japanese culture and daily life.",
      icon: "🟢"
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: "Test your knowledge of life and etiquette in Japan.",
      icon: "🟡"
    },
    {
      id: "pro",
      title: "Pro",
      description: "Challenge yourself with advanced Japan-life questions.",
      icon: "🔴"
    }
  ];

  return (
    <div className="page">
      <div className="hero">

        <div className="hero-icon">
          <Brain size={42} />
        </div>

        <p className="eyebrow">LIFE IN JAPAN</p>

        <h1>Japan Life Quiz</h1>

        <p className="hero-description">
          Test your knowledge about Japanese culture, transportation,
          waste management, workplace etiquette and daily life.
        </p>

        <div className="quiz-info">
          <div>
            <Brain size={22} />
            <span>30 Questions</span>
          </div>

          <div>
            <Clock size={22} />
            <span>30 Seconds Each</span>
          </div>

          <div>
            <Trophy size={22} />
            <span>Score Based</span>
          </div>
        </div>

        <h2 className="level-title">
          Choose Your Level
        </h2>

        <div className="level-grid">
          {levels.map((level) => (
            <button
              key={level.id}
              className="level-card"
              onClick={() => navigate(`/learn-japanese/${level.id}`)}
            >
              <span className="level-icon">
                {level.icon}
              </span>

              <div>
                <h3>{level.title}</h3>
                <p>{level.description}</p>
              </div>

              <ArrowRight size={22} />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default QuizHome;