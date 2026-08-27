function QuizOption({
  option,
  index,
  selected,
  correctAnswer,
  submitted,
  onClick
}) {
  let baseClasses = "w-full p-5 rounded-2xl text-left cursor-pointer flex items-center gap-5 text-lg font-medium transition-all duration-300 border-2 shadow-sm";
  let stateClasses = "bg-white/60 backdrop-blur-sm border-transparent hover:border-rose-400 hover:bg-white hover:shadow-md hover:-translate-y-1";
  let letterClasses = "w-10 h-10 rounded-full flex items-center justify-center font-bold text-gray-600 bg-gray-100 transition-colors";

  if (submitted) {
    if (option === correctAnswer) {
      stateClasses = "bg-emerald-50 border-emerald-500 shadow-md";
      letterClasses = "w-10 h-10 rounded-full flex items-center justify-center font-bold text-emerald-700 bg-emerald-200";
    } else if (selected === option) {
      stateClasses = "bg-rose-50 border-rose-500 shadow-md";
      letterClasses = "w-10 h-10 rounded-full flex items-center justify-center font-bold text-rose-700 bg-rose-200";
    } else {
      stateClasses = "bg-white/40 border-transparent opacity-60";
    }
  } else if (selected === option) {
    stateClasses = "bg-rose-50 border-rose-400 shadow-md transform -translate-y-1";
    letterClasses = "w-10 h-10 rounded-full flex items-center justify-center font-bold text-rose-700 bg-rose-200";
  }

  return (
    <button
      type="button"
      className={`${baseClasses} ${stateClasses}`}
      onClick={onClick}
      disabled={submitted}
    >
      <span className={letterClasses}>
        {String.fromCharCode(65 + index)}
      </span>

      <span className="flex-1 text-slate-800">
        {option}
      </span>
    </button>
  );
}

export default QuizOption;