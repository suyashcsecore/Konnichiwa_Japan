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

const intermediateQuestions = [
  {
    id: 1,
    question: "What is the correct pronunciation of たべもの?",
    options: ["tabemono", "tabemona", "tatemono", "kobemono"],
    answer: "tabemono",
    explanation: "たべもの (食べ物) is pronounced 'tabemono' and means 'food'."
  },
  {
    id: 2,
    question: "What does でんしゃ mean?",
    options: ["Bicycle", "Train", "Car", "Bus"],
    answer: "Train",
    explanation: "でんしゃ means 'train'."
  },
  {
    id: 3,
    question: "What is the correct pronunciation of スーパー?",
    options: ["suupaa", "supa", "supara", "sūpae"],
    answer: "suupaa",
    explanation: "スーパー is pronounced 'suupaa' and means 'supermarket'."
  },
  {
    id: 4,
    question: "What does おいしい mean?",
    options: ["Hot", "Delicious", "Expensive", "Small"],
    answer: "Delicious",
    explanation: "おいしい means 'delicious' or 'tasty'."
  },
  {
    id: 5,
    question: "What is the pronunciation of 山?",
    options: ["yama", "kawa", "sora", "mori"],
    answer: "yama",
    explanation: "山 is pronounced 'yama' and means 'mountain'."
  },
  {
    id: 6,
    question: "What does きょう mean?",
    options: ["Tomorrow", "Yesterday", "Today", "Morning"],
    answer: "Today",
    explanation: "きょう means 'today'."
  },
  {
    id: 7,
    question: "What is the correct pronunciation of こうえん?",
    options: ["kouen", "kounen", "koen", "kouin"],
    answer: "kouen",
    explanation: "こうえん is pronounced 'kouen' and means 'park'."
  },
  {
    id: 8,
    question: "What does コーヒー mean?",
    options: ["Tea", "Juice", "Coffee", "Water"],
    answer: "Coffee",
    explanation: "コーヒー means 'coffee'."
  },
  {
    id: 9,
    question: "What does 水 mean?",
    options: ["Fire", "Water", "Mountain", "Tree"],
    answer: "Water",
    explanation: "水 is pronounced 'mizu' and means 'water'."
  },
  {
    id: 10,
    question: "What is the correct pronunciation of せんせい?",
    options: ["sensei", "sensai", "sensee", "senzei"],
    answer: "sensei",
    explanation: "せんせい is pronounced 'sensei' and means 'teacher'."
  },
  {
    id: 11,
    question: "What does みず mean?",
    options: ["Milk", "Water", "Rice", "Soup"],
    answer: "Water",
    explanation: "みず means 'water'. The kanji is 水."
  },
  {
    id: 12,
    question: "What is the correct pronunciation of びょういん?",
    options: ["byouin", "byouan", "biyouin", "byoin"],
    answer: "byouin",
    explanation: "びょういん is pronounced 'byouin' and means 'hospital'."
  },
  {
    id: 13,
    question: "What does たかい mean?",
    options: ["Cheap", "High / Expensive", "Fast", "Quiet"],
    answer: "High / Expensive",
    explanation: "たかい can mean 'high' or 'expensive', depending on context."
  },
  {
    id: 14,
    question: "What is the pronunciation of 大?",
    options: ["dai", "suki", "chiisai", "naka"],
    answer: "dai",
    explanation: "大 can be read 'dai' in words such as 大学. Its basic meaning is 'big' or 'large'."
  },
  {
    id: 15,
    question: "What does テレビ mean?",
    options: ["Radio", "Television", "Computer", "Telephone"],
    answer: "Television",
    explanation: "テレビ means 'television' or 'TV'."
  },
  {
    id: 16,
    question: "What is the correct pronunciation of ともだち?",
    options: ["tomodachi", "tomodaki", "tomotachi", "tomodate"],
    answer: "tomodachi",
    explanation: "ともだち is pronounced 'tomodachi' and means 'friend'."
  },
  {
    id: 17,
    question: "What does 人 mean?",
    options: ["Person", "Woman", "Child", "Teacher"],
    answer: "Person",
    explanation: "人 is pronounced 'hito' and means 'person'."
  },
  {
    id: 18,
    question: "What does あたらしい mean?",
    options: ["Old", "New", "Interesting", "Difficult"],
    answer: "New",
    explanation: "あたらしい means 'new'."
  },
  {
    id: 19,
    question: "What is the correct pronunciation of レストラン?",
    options: ["resutoran", "resutoranto", "resutaran", "restoran"],
    answer: "resutoran",
    explanation: "レストラン is pronounced 'resutoran' and means 'restaurant'."
  },
  {
    id: 20,
    question: "What does しごと mean?",
    options: ["School", "Work / Job", "Holiday", "House"],
    answer: "Work / Job",
    explanation: "しごと means 'work' or 'job'."
  },
  {
    id: 21,
    question: "What is the pronunciation of 日?",
    options: ["hi", "mizu", "ki", "tsuki"],
    answer: "hi",
    explanation: "日 can be pronounced 'hi' and means 'sun' or 'day' in basic usage."
  },
  {
    id: 22,
    question: "What does えき mean?",
    options: ["Station", "Airport", "School", "Store"],
    answer: "Station",
    explanation: "えき means 'station'."
  },
  {
    id: 23,
    question: "What is the correct pronunciation of くだもの?",
    options: ["kudamono", "kudamona", "kukumomo", "kupamono"],
    answer: "kudamono",
    explanation: "くだもの is pronounced 'kudamono' and means 'fruit'."
  },
  {
    id: 24,
    question: "What does コンビニ mean?",
    options: ["Convenience store", "Supermarket", "Restaurant", "Department store"],
    answer: "Convenience store",
    explanation: "コンビニ means 'convenience store'."
  },
  {
    id: 25,
    question: "What is the pronunciation of 川?",
    options: ["kawa", "yama", "mizu", "sora"],
    answer: "kawa",
    explanation: "川 is pronounced 'kawa' and means 'river'."
  },
  {
    id: 26,
    question: "What does 早い mean?",
    options: ["Late", "Early / Fast", "Slow", "Near"],
    answer: "Early / Fast",
    explanation: "早い(hayai) can mean 'early' or 'fast', depending on context."
  },
  {
    id: 27,
    question: "What is the correct pronunciation of きょうしつ?",
    options: ["kyoushitsu", "knoushitsu", "kyousuru", "kyoushito"],
    answer: "kyoushitsu",
    explanation: "きょうしつ is pronounced 'kyoushitsu' and means 'classroom'."
  },
  {
    id: 28,
    question: "What does 月 mean?",
    options: ["Sun", "Moon", "Mountain", "Rain"],
    answer: "Moon",
    explanation: "月 is pronounced 'tsuki' and means 'moon'."
  },
  {
    id: 29,
    question: "What is the correct pronunciation of ばんごはん?",
    options: ["bangohan", "bangohon", "bangan", "banrgoan"],
    answer: "bangohan",
    explanation: "ばんごはん is pronounced 'bangohan' and means 'dinner'."
  },
  {
    id: 30,
    question: "What does 木 mean?",
    options: ["Tree / Wood", "Flower", "Mountain", "Grass"],
    answer: "Tree / Wood",
    explanation: "木 is pronounced 'ki' and means 'tree' or 'wood'."
  }
];

const proQuestions = [
  {
    id: 1,
    question: "まいにち べんきょうします。",
    options: [
      "I study every day.",
      "I studied yesterday.",
      "I study only on Sundays.",
      "I am going to study tomorrow."
    ],
    answer: "I study every day.",
    explanation: "まいにち means 'every day', and べんきょうします means 'study'."
  },
  {
    id: 2,
    question: "What is the correct reading of 電車?",
    options: ["densha", "dengai", "denki", "denwa"],
    answer: "densha",
    explanation: "電車 is read でんしゃ (densha) and means 'train'."
  },
  {
    id: 3,
    question: "ここで しゃしんを とっても いいです。",
    options: [
      "You must listen to music here.",
      "You cannot take pictures here.",
      "You may take a picture here.",
      "You should not take a picture here."
    ],
    answer: "You may take a picture here.",
    explanation: "～ても いいです means 'it is okay to / may'."
  },
  {
    id: 4,
    question: "きょうは あまり さむくないです。",
    options: [
      "Today is very cold.",
      "Today is not very cold.",
      "Today is hotter than yesterday.",
      "Today is a little cold."
    ],
    answer: "Today is not very cold.",
    explanation: "あまり～ない means 'not very...'."
  },
  {
    id: 5,
    question: "What does 駅 mean?",
    options: ["School", "Station", "Hospital", "Library"],
    answer: "Station",
    explanation: "駅 is read えき (eki) and means 'station'."
  },
  {
    id: 6,
    question: "わたしは まいあさ コーヒーを のみます。",
    options: [
      "I drink coffee every morning.",
      "I buy coffee every morning.",
      "I make coffee every night.",
      "I drank coffee this morning."
    ],
    answer: "I drink coffee every morning.",
    explanation: "まいあさ means 'every morning', and のみます means 'drink'."
  },
  {
    id: 7,
    question: "ここで たばこを すっては いけません。",
    options: [
      "You may smoke here.",
      "You should smoke here.",
      "You do not have to smoke here.",
      "You must not smoke here."
    ],
    answer: "You must not smoke here.",
    explanation: "～ては いけません means 'must not / may not'."
  },
  {
    id: 8,
    question: "What is the correct reading of 日本?",
    options: ["nihongo", "nihon", "nipponjin", "nigatsu"],
    answer: "nihon",
    explanation: "日本 is commonly read にほん (nihon) and means 'Japan'."
  },
  {
    id: 9,
    question: "わたしは えいごが わかります。",
    options: [
      "I speak English.",
      "I study English.",
      "I understand English.",
      "I teach English."
    ],
    answer: "I understand English.",
    explanation: "わかります means 'understand / know'."
  },
  {
    id: 10,
    question: "あした しごとが あります。",
    options: [
      "I worked yesterday.",
      "I have work tomorrow.",
      "I am at work now.",
      "I do not have work tomorrow."
    ],
    answer: "I have work tomorrow.",
    explanation: "あした means 'tomorrow', and しごとが あります means 'there is work / I have work'."
  },
  {
    id: 11,
    question: "What does 学校 mean?",
    options: ["Student", "Teacher", "School", "Class"],
    answer: "School",
    explanation: "学校 is read がっこう (gakkou) and means 'school'."
  },
  {
    id: 12,
    question: "この かばんは おもいです。",
    options: [
      "This bag is light.",
      "This bag is new.",
      "This bag is expensive.",
      "This bag is heavy."
    ],
    answer: "This bag is heavy.",
    explanation: "おもい means 'heavy'."
  },
  {
    id: 13,
    question: "しゅくだいを しなければ なりません。",
    options: [
      "I must do my homework.",
      "I don't have any homework.",
      "I finished my homework.",
      "I can do my homework."
    ],
    answer: "I must do my homework.",
    explanation: "～なければ なりません means 'must / have to'."
  },
  {
    id: 14,
    question: "What is the correct reading of 水?",
    options: ["mizu", "ki", "hi", "tsuki"],
    answer: "mizu",
    explanation: "水 is read みず (mizu) and means 'water'."
  },
  {
    id: 15,
    question: "きょうは テストが ありません。",
    options: [
      "There is a test today.",
      "There was a test yesterday.",
      "There is no test today.",
      "The test is tomorrow."
    ],
    answer: "There is no test today.",
    explanation: "ありません means 'there is not / do not have'."
  },
  {
    id: 16,
    question: "ここに なまえを かいてください。",
    options: [
      "Please say your name here.",
      "Please write your name here.",
      "Please read your name here.",
      "Please remember your name here."
    ],
    answer: "Please write your name here.",
    explanation: "～てください means 'please do...', and かいて means 'write'."
  },
  {
    id: 17,
    question: "What does 山 mean?",
    options: ["River", "Forest", "Mountain", "Sea"],
    answer: "Mountain",
    explanation: "山 is read やま (yama) and means 'mountain'."
  },
  {
    id: 18,
    question: "わたしは にほんごが すこし わかります。",
    options: [
      "I understand a little Japanese.",
      "I speak Japanese very well.",
      "I study Japanese every day.",
      "I cannot understand Japanese."
    ],
    answer: "I understand a little Japanese.",
    explanation: "すこし means 'a little', and わかります means 'understand'."
  },
  {
    id: 19,
    question: "What is the correct reading of 毎日?",
    options: ["mainichi", "maiasa", "maishuu", "maiban"],
    answer: "mainichi",
    explanation: "毎日 is read まいにち (mainichi) and means 'every day'."
  },
  {
    id: 20,
    question: "この へやに つくえが あります。",
    options: [
      "There is a chair in this room.",
      "There is a desk in this room.",
      "There is a student in this room.",
      "There is a window in this room."
    ],
    answer: "There is a desk in this room.",
    explanation: "つくえ means 'desk', and あります is used for inanimate things."
  },
  {
    id: 21,
    question: "ここで しゃしんを とっても いいですか。",
    options: [
      "Do I have to take a picture here?",
      "Did you take a picture here?",
      "May I take a picture here?",
      "Why are you taking a picture here?"
    ],
    answer: "May I take a picture here?",
    explanation: "～ても いいですか means 'May I...?' or 'Is it okay if I...?'."
  },
  {
    id: 22,
    question: "What does 人 mean?",
    options: ["Friend", "Person", "Man", "Child"],
    answer: "Person",
    explanation: "人 is read ひと (hito) and means 'person'."
  },
  {
    id: 23,
    question: "あした はやく おきなければ なりません。",
    options: [
      "I must get up early tomorrow.",
      "I got up early yesterday.",
      "I do not need to get up early tomorrow.",
      "I can sleep late tomorrow."
    ],
    answer: "I must get up early tomorrow.",
    explanation: "はやく means 'early', and おきなければ なりません means 'must get up'."
  },
  {
    id: 24,
    question: "この くつは あまり たかくないです。",
    options: [
      "These shoes are very expensive.",
      "These shoes are not very expensive.",
      "These shoes are very big.",
      "These shoes are too small."
    ],
    answer: "These shoes are not very expensive.",
    explanation: "たかい can mean 'expensive', and あまり～ない means 'not very...'."
  },
  {
    id: 25,
    question: "What is the correct reading of 木?",
    options: ["mori", "ki", "kawa", "ko"],
    answer: "ki",
    explanation: "木 is read き (ki) and means 'tree / wood'."
  },
  {
    id: 26,
    question: "わたしは まいばん ほんを よみます。",
    options: [
      "I buy a book every night.",
      "I write a book every night.",
      "I read a book every night.",
      "I study every morning."
    ],
    answer: "I read a book every night.",
    explanation: "まいばん means 'every night', and よみます means 'read'."
  },
  {
    id: 27,
    question: "ここに くるまで まってください。",
    options: [
      "Please wait here until I come.",
      "Please come here after waiting.",
      "Please wait outside until tomorrow.",
      "Please come here before me."
    ],
    answer: "Please wait here until I come.",
    explanation: "まってください means 'please wait', and ここに くるまで means 'until I come here'."
  },
  {
    id: 28,
    question: "What does 電気 mean?",
    options: [
      "Electricity / Light",
      "Telephone",
      "Train",
      "Computer"
    ],
    answer: "Electricity / Light",
    explanation: "電気 is read でんき (denki) and can mean 'electricity' or 'light'."
  },
  {
    id: 29,
    question: "にちようびは うちで やすみます。",
    options: [
      "I work at home on Sunday.",
      "I study at school on Sunday.",
      "I rest at home on Sunday.",
      "I go shopping on Sunday."
    ],
    answer: "I rest at home on Sunday.",
    explanation: "にちようび means 'Sunday', うち means 'home', and やすみます means 'rest'."
  },
  {
    id: 30,
    question: "What is the correct reading of 口?",
    options: ["mimi", "me", "kuchi", "hana"],
    answer: "kuchi",
    explanation: "口 is read くち (kuchi) and means 'mouth'."
  }
];

export const quizQuestions = {
  beginner: beginnerQuestions,
  intermediate: intermediateQuestions,
  pro: proQuestions
};