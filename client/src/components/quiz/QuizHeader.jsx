import { Clock } from "lucide-react";

function QuizHeader({ current, total, timeLeft }) {
  const percentage = (current / total) * 100;

  return (
    <div className="quiz-header">
      <div className="quiz-header-top">
        <span>Question {current} of {total}</span>

        <div className="timer">
          <Clock size={18} />
          <span>{timeLeft}s</span>
        </div>
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default QuizHeader;