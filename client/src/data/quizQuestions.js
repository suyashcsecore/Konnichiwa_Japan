const beginnerQuestions = [
  {
    id: 1,
    question: "What is ね called in romaji?",
    options: ["ne", "ni", "nu", "no"],
    answer: "ne",
    explanation: "ね is pronounced 'ne'."
  },
  {
    id: 2,
    question: "What is カ called in romaji?",
    options: ["ka", "ki", "ku", "ke"],
    answer: "ka",
    explanation: "カ is pronounced 'ka'."
  },
  {
    id: 3,
    question: "What is ほ called in romaji?",
    options: ["ho", "ha", "he", "hi"],
    answer: "ho",
    explanation: "ほ is pronounced 'ho'."
  },
  {
    id: 4,
    question: "What is ミ called in romaji?",
    options: ["mi", "ma", "mu", "me"],
    answer: "mi",
    explanation: "ミ is pronounced 'mi'."
  },
  {
    id: 5,
    question: "What is ゆ called in romaji?",
    options: ["yu", "yo", "ya", "yi"],
    answer: "yu",
    explanation: "ゆ is pronounced 'yu'."
  },
  {
    id: 6,
    question: "What is ソ called in romaji?",
    options: ["so", "sa", "su", "se"],
    answer: "so",
    explanation: "ソ is pronounced 'so'."
  },
  {
    id: 7,
    question: "What is き called in romaji?",
    options: ["ki", "ke", "ko", "ku"],
    answer: "ki",
    explanation: "き is pronounced 'ki'."
  },
  {
    id: 8,
    question: "What is ツ called in romaji?",
    options: ["tsu", "to", "te", "ta"],
    answer: "tsu",
    explanation: "ツ is pronounced 'tsu'."
  },
  {
    id: 9,
    question: "What is ふ called in romaji?",
    options: ["fu", "ha", "ho", "he"],
    answer: "fu",
    explanation: "ふ is commonly romanized as 'fu'."
  },
  {
    id: 10,
    question: "What is メ called in romaji?",
    options: ["me", "mi", "mo", "ma"],
    answer: "me",
    explanation: "メ is pronounced 'me'."
  },
  {
    id: 11,
    question: "What is ら called in romaji?",
    options: ["ra", "ri", "ru", "re"],
    answer: "ra",
    explanation: "ら is pronounced 'ra'."
  },
  {
    id: 12,
    question: "What is ニ called in romaji?",
    options: ["ni", "na", "nu", "ne"],
    answer: "ni",
    explanation: "ニ is pronounced 'ni'."
  },
  {
    id: 13,
    question: "What is こ called in romaji?",
    options: ["ko", "ka", "ke", "ku"],
    answer: "ko",
    explanation: "こ is pronounced 'ko'."
  },
  {
    id: 14,
    question: "What is シ called in romaji?",
    options: ["shi", "sa", "su", "se"],
    answer: "shi",
    explanation: "シ is pronounced 'shi'."
  },
  {
    id: 15,
    question: "What is た called in romaji?",
    options: ["ta", "te", "to", "chi"],
    answer: "ta",
    explanation: "た is pronounced 'ta'."
  },
  {
     id: 16,
  question: "What is ヨ called in romaji?",
  options: ["yo", "yu", "ya", "ye"],
  answer: "yo",
  explanation: "ヨ is pronounced 'yo'."
  },
  {
    id: 17,
    question: "What is ね called in romaji?",
    options: ["nu", "ne", "ni", "no"],
    answer: "ne",
    explanation: "ね is pronounced 'ne'."
  },
  {
    id: 18,
    question: "What is さ called in romaji?",
    options: ["sa", "shi", "su", "se"],
    answer: "sa",
    explanation: "さ is pronounced 'sa'."
  },
  {
    id: 19,
    question: "What is ハ called in romaji?",
    options: ["ha", "hi", "he", "ho"],
    answer: "ha",
    explanation: "ハ is pronounced 'ha'."
  },
  {
    id: 20,
    question: "What is り called in romaji?",
    options: ["ri", "ra", "ru", "re"],
    answer: "ri",
    explanation: "り is pronounced 'ri'."
  },
  {
    id: 21,
    question: "What is キャ called in romaji?",
    options: ["kya", "ka", "kyu", "kyo"],
    answer: "kya",
    explanation: "キャ is pronounced 'kya'. It combines キ (ki) with a small ャ (ya)."
  },
  {
    id: 22,
    question: "What is ぴょ called in romaji?",
    options: ["pyo", "pya", "pyu", "po"],
    answer: "pyo",
    explanation: "ぴょ is pronounced 'pyo'. It combines ぴ (pi) with a small ょ (yo)."
  },
  {
    id: 23,
    question: "What is ジ called in romaji?",
    options: ["ji", "chi", "zu", "jo"],
    answer: "ji",
    explanation: "ジ is pronounced 'ji'."
  },
  {
    id: 24,
    question: "What is す called in romaji?",
    options: ["su", "sa", "shi", "so"],
    answer: "su",
    explanation: "す is pronounced 'su'."
  },
  {
    id: 25,
    question: "What is チョ called in romaji?",
    options: ["cho", "cha", "chu", "chi"],
    answer: "cho",
    explanation: "チョ is pronounced 'cho'. It combines チ (chi) with a small ョ (yo)."
  },
  {
    id: 26,
    question: "What is も called in romaji?",
    options: ["mo", "mu", "me", "ma"],
    answer: "mo",
    explanation: "も is pronounced 'mo'."
  },
  {
    id: 27,
    question: "What is ユ called in romaji?",
    options: ["yu", "yo", "ya", "yū"],
    answer: "yu",
    explanation: "ユ is pronounced 'yu'."
  },
  {
    id: 28,
    question: "What is ひ called in romaji?",
    options: ["hi", "ha", "he", "ho"],
    answer: "hi",
    explanation: "ひ is pronounced 'hi'."
  },
  {
    id: 29,
    question: "What is リョ called in romaji?",
    options: ["ryo", "rya", "ryu", "riyo"],
    answer: "ryo",
    explanation: "リョ is pronounced 'ryo'. It combines リ (ri) with a small ョ (yo)."
  },
  {
    id: 30,
    question: "What is ぺ called in romaji?",
    options: ["pe", "pi", "pu", "po"],
    answer: "pe",
    explanation: "ぺ is pronounced 'pe'."
  }
];

const intermediateQuestions = beginnerQuestions.map((question, index) => ({
  ...question,
  id: index + 1,
  question: `Lorem ipsum dolor sit amet, intermediate question ${index + 1}?`
}));

const proQuestions = beginnerQuestions.map((question, index) => ({
  ...question,
  id: index + 1,
  question: `Lorem ipsum dolor sit amet, pro question ${index + 1}?`
}));

export const quizQuestions = {
  beginner: beginnerQuestions,
  intermediate: intermediateQuestions,
  pro: proQuestions
};