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
    <div className="page">

      <div className="result-card">

        <div className="result-icon">
          <Trophy size={48} />
        </div>

        <p className="eyebrow">
          {completed ? "QUIZ COMPLETED" : "QUIZ ENDED"}
        </p>

        <h1>
          {completed
            ? "Great Job!"
            : "Quiz Ended"}
        </h1>

        <div className="result-level-name">
          {levelName} Level
        </div>

        <div className="score">
          {score}
          <span>/{total}</span>
        </div>

        <h2>{percentage}%</h2>

        <div className="result-stats">

          <div>
            <span>Questions Attempted</span>
            <strong>{attempted}</strong>
          </div>

          <div>
            <span>Correct Answers</span>
            <strong>{score}</strong>
          </div>

          <div>
            <span>Result</span>
            <strong>{resultLevel}</strong>
          </div>

        </div>

        {!completed && (
          <p className="ended-message">
            You ended the quiz before completing all
            {total} questions.
          </p>
        )}

        <p className="result-message">
          Keep learning about Japan and improve your
          knowledge before your journey.
        </p>

        <div className="result-buttons">

          <button
            className="secondary-button"
            onClick={() => navigate(`/learn-japanese/${level}`)}
          >
            <RotateCcw size={18} />
            Try Again
          </button>

          <button
            className="primary-button"
            onClick={() => navigate("/puzzles")}
          >
            Try Puzzles
            <ArrowRight size={18} />
          </button>

          <button
            className="home-button"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/");
            }}
          >
            <Home size={18} />
            Home
          </button>

        </div>

      </div>

    </div>
  );
}

export default QuizResult;