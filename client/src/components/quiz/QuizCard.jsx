import QuizOption from "./QuizOption";

function QuizCard({
  question,
  selected,
  submitted,
  onSelect
}) {
  return (
    <div className="w-full">

      <h2 className="text-3xl md:text-4xl font-black mb-10 text-slate-800 leading-tight">
        {question.question}
      </h2>

      <div className="flex flex-col gap-4">
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
        <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-lg font-bold text-indigo-800 mb-2 flex items-center gap-2">
            <span className="text-2xl">💡</span> Why?
          </h3>
          <p className="text-indigo-900/80 leading-relaxed text-lg">{question.explanation}</p>
        </div>
      )}

    </div>
  );
}

export default QuizCard;