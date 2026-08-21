import QuizOption from "./QuizOption";

function QuizCard({
  question,
  selected,
  submitted,
  onSelect
}) {
  return (
    <div className="quiz-card">

      <h2 className="quiz-question">
        {question.question}
      </h2>

      <div className="quiz-options">
        {question.options.map((option, index) => (
          <QuizOption
            key={`${question.id}-${index}`}
            option={option}
            index={index}
            selected={selected}
            correctAnswer={question.answer}
            submitted={submitted}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>

      {submitted && question.explanation && (
        <div className="quiz-explanation">
          <h3>Why?</h3>
          <p>{question.explanation}</p>
        </div>
      )}

    </div>
  );
}

export default QuizCard;