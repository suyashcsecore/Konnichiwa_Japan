import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flag,
  Check,
  ArrowRight,
  X
} from "lucide-react";

import QuizHeader from "../components/quiz/QuizHeader";
import QuizCard from "../components/quiz/QuizCard";
import { quizQuestions } from "../data/quizQuestions";

function QuizPage() {
  const navigate = useNavigate();
  const { level } = useParams();

  const questions = quizQuestions[level] || quizQuestions.beginner;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showEndDialog, setShowEndDialog] = useState(false);

  const question = questions[currentQuestion];

  useEffect(() => {
    if (submitted || showEndDialog) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, showEndDialog]);

  const handleSelect = (option) => {
    if (!submitted) {
      setSelected(option);
    }
  };

  const handleSubmit = () => {
    if (!selected) {
      return;
    }

    setSubmitted(true);
  };

  const handleNext = () => {
    const isCorrect = selected === question.answer;
    const newScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(newScore);
    }

    if (currentQuestion === questions.length - 1) {
      navigate("/learn-japanese/result", {
        state: {
          score: newScore,
          total: questions.length,
          level,
          completed: true
        }
      });

      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelected(null);
    setSubmitted(false);
    setTimeLeft(30);
  };

  const handleEndQuiz = () => {
    const isCurrentCorrect = selected === question.answer;
    const finalScore = isCurrentCorrect
      ? score + 1
      : score;

    navigate("/learn-japanese/result", {
      state: {
        score: finalScore,
        total: questions.length,
        attempted: currentQuestion + (submitted ? 1 : 0),
        level,
        completed: false
      }
    });
  };

  const levelName =
    level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <div className="page">

      <div className="quiz-container">

        <div className="quiz-top-row">

          <div className={`quiz-level ${level}`}>
            {levelName}
          </div>

          <button
            className="end-quiz-button"
            onClick={() => setShowEndDialog(true)}
          >
            <Flag size={17} />
            End Quiz
          </button>

        </div>

        <QuizHeader
          current={currentQuestion + 1}
          total={questions.length}
          timeLeft={timeLeft}
        />

        <QuizCard
          question={question}
          selected={selected}
          submitted={submitted}
          onSelect={handleSelect}
        />

        {!submitted && selected && (
          <button
            className="floating-action-button"
            onClick={handleSubmit}
          >
            <Check size={20} />
            Submit Answer
          </button>
        )}

        {submitted && (
          <button
            className="floating-action-button"
            onClick={handleNext}
          >
            {currentQuestion === questions.length - 1
              ? "See Result"
              : "Next Question"}

            <ArrowRight size={20} />
          </button>
        )}

      </div>

      {showEndDialog && (
        <div className="dialog-overlay">

          <div className="end-dialog">

            <button
              className="close-dialog"
              onClick={() => setShowEndDialog(false)}
            >
              <X size={20} />
            </button>

            <div className="dialog-icon">
              <Flag size={28} />
            </div>

            <h2>End Quiz?</h2>

            <p>
              Are you sure you want to end the quiz?
              Your current progress will be submitted.
            </p>

            <div className="dialog-buttons">

              <button
                className="secondary-button"
                onClick={() => setShowEndDialog(false)}
              >
                Continue Quiz
              </button>

              <button
                className="danger-button"
                onClick={handleEndQuiz}
              >
                End Quiz
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default QuizPage;