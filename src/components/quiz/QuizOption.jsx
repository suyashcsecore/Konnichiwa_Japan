function QuizOption({
  option,
  index,
  selected,
  correctAnswer,
  submitted,
  onClick
}) {
  let className = "quiz-option";

  if (submitted) {
    if (option === correctAnswer) {
      className += " correct";
    } else if (selected === option) {
      className += " wrong";
    }
  } else if (selected === option) {
    className += " selected";
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={submitted}
    >
      <span className="option-letter">
        {String.fromCharCode(65 + index)}
      </span>

      <span className="option-text">
        {option}
      </span>
    </button>
  );
}

export default QuizOption;