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
    <div className="page relative overflow-hidden flex flex-col justify-center items-center">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="quiz-container w-full max-w-4xl relative z-10 p-6 md:p-10 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_25px_50px_-12px_rgba(225,29,72,0.25)] rounded-[3rem]" style={{ marginTop: '2rem' }}>

        <div className="quiz-top-row flex items-center justify-between mb-8 border-b border-gray-200/50 pb-6">

          <div className={`px-5 py-2 rounded-full font-black text-sm uppercase tracking-widest ${
            level === 'beginner' ? 'bg-green-100 text-green-700' :
            level === 'intermediate' ? 'bg-orange-100 text-orange-700' :
            'bg-rose-100 text-rose-700'
          }`}>
            {levelName}
          </div>

          <button
            className="flex items-center gap-2 px-5 py-2 rounded-full font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 hover:text-rose-600 transition-colors"
            onClick={() => setShowEndDialog(true)}
          >
            <Flag size={18} />
            End Quiz
          </button>

        </div>

        <QuizHeader
          current={currentQuestion + 1}
          total={questions.length}
          timeLeft={timeLeft}
        />

        <div className="mt-8">
          <QuizCard
            question={question}
            selected={selected}
            submitted={submitted}
            onSelect={handleSelect}
          />
        </div>

        {!submitted && selected && (
          <button
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-8 py-4 rounded-full font-black text-lg text-white bg-gradient-to-r from-rose-500 to-orange-500 shadow-[0_10px_25px_rgba(244,63,94,0.4)] hover:shadow-[0_15px_35px_rgba(244,63,94,0.6)] hover:-translate-y-1 transition-all duration-300"
            onClick={handleSubmit}
          >
            <Check size={24} />
            Submit Answer
          </button>
        )}

        {submitted && (
          <button
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-8 py-4 rounded-full font-black text-lg text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.6)] hover:-translate-y-1 transition-all duration-300"
            onClick={handleNext}
          >
            {currentQuestion === questions.length - 1
              ? "See Result"
              : "Next Question"}

            <ArrowRight size={24} />
          </button>
        )}

      </div>

      {showEndDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-[2rem] p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200">
            
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              onClick={() => setShowEndDialog(false)}
            >
              <X size={20} />
            </button>

            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
              <Flag size={32} />
            </div>

            <h2 className="text-3xl font-extrabold mb-3 text-slate-800">End Quiz?</h2>

            <p className="text-slate-500 leading-relaxed mb-8">
              Are you sure you want to end the quiz?
              Your current progress will be submitted.
            </p>

            <div className="flex flex-col gap-3">
              <button
                className="w-full py-4 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors"
                onClick={handleEndQuiz}
              >
                End Quiz
              </button>
              
              <button
                className="w-full py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                onClick={() => setShowEndDialog(false)}
              >
                Continue Quiz
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default QuizPage;