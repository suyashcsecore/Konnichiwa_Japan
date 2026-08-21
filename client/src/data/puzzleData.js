export const garbageItems = [
  {
    id: 1,
    name: "Plastic Bottle",
    emoji: "🧴",
    answer: "plastic"
  },
  {
    id: 2,
    name: "Banana Peel",
    emoji: "🍌",
    answer: "burnable"
  },
  {
    id: 3,
    name: "Glass Bottle",
    emoji: "🍾",
    answer: "glass"
  },
  {
    id: 4,
    name: "Newspaper",
    emoji: "📰",
    answer: "paper"
  },
  {
    id: 5,
    name: "Aluminium Can",
    emoji: "🥫",
    answer: "can"
  },
  {
    id: 6,
    name: "Used Tissue",
    emoji: "🧻",
    answer: "burnable"
  },
  {
    id: 7,
    name: "Cardboard Box",
    emoji: "📦",
    answer: "paper"
  },
  {
    id: 8,
    name: "Broken Glass",
    emoji: "🪟",
    answer: "glass"
  }
];

export const mannersQuestions = [
  {
    question: "You enter a Japanese home. What should you normally do?",
    options: [
      "Remove your shoes",
      "Keep your shoes on",
      "Run inside",
      "Leave your bag outside"
    ],
    answer: "Remove your shoes"
  },
  {
    question: "You are on a crowded train. What is generally considered polite?",
    options: [
      "Talk loudly",
      "Play music loudly",
      "Keep your voice low",
      "Shout to friends"
    ],
    answer: "Keep your voice low"
  },
  {
    question: "Your phone rings on a train. What is the better choice?",
    options: [
      "Answer loudly",
      "Ignore or silence it",
      "Put it on speaker",
      "Start a video call"
    ],
    answer: "Ignore or silence it"
  },
  {
    question: "Someone gives you a business card. What is generally appropriate?",
    options: [
      "Immediately fold it",
      "Throw it away",
      "Receive it respectfully",
      "Put it on the floor"
    ],
    answer: "Receive it respectfully"
  },
  {
    question: "You are late for a meeting. What should you do?",
    options: [
      "Say nothing",
      "Inform the person as soon as possible",
      "Arrive and laugh",
      "Cancel without telling"
    ],
    answer: "Inform the person as soon as possible"
  }
];

export const packingScenarios = [
  {
    title: "Travelling to Japan ✈️",
    description: "Select everything you should pack.",
    items: [
      { name: "Passport", emoji: "🛂", important: true },
      { name: "Visa Documents", emoji: "📄", important: true },
      { name: "Phone Charger", emoji: "🔌", important: true },
      { name: "10 kg Sand", emoji: "🏖️", important: false },
      { name: "Gaming Chair", emoji: "🪑", important: false },
      { name: "Travel Insurance", emoji: "📋", important: true }
    ]
  },

  {
    title: "Going to a Japanese Bank 🏦",
    description: "Choose the necessary items.",
    items: [
      { name: "Residence Card", emoji: "🪪", important: true },
      { name: "Passport", emoji: "🛂", important: true },
      { name: "Phone", emoji: "📱", important: true },
      { name: "Toy Robot", emoji: "🤖", important: false },
      { name: "Huge TV", emoji: "📺", important: false },
      { name: "Bank Documents", emoji: "📄", important: true }
    ]
  },

  {
    title: "Going to University 🎓",
    description: "Pack useful things.",
    items: [
      { name: "Student ID", emoji: "🎫", important: true },
      { name: "Notebook", emoji: "📓", important: true },
      { name: "Laptop", emoji: "💻", important: true },
      { name: "Kitchen Stove", emoji: "🍳", important: false },
      { name: "Gaming Chair", emoji: "🪑", important: false },
      { name: "Pen", emoji: "🖊️", important: true }
    ]
  },

  {
    title: "Going Shopping 🛍️",
    description: "Select useful items.",
    items: [
      { name: "Wallet", emoji: "👛", important: true },
      { name: "Phone", emoji: "📱", important: true },
      { name: "Reusable Bag", emoji: "🛍️", important: true },
      { name: "Sleeping Bag", emoji: "🛏️", important: false },
      { name: "Huge Television", emoji: "📺", important: false },
      { name: "Cash", emoji: "💴", important: true }
    ]
  },

  {
    title: "Going to Hospital 🏥",
    description: "Choose the important items.",
    items: [
      { name: "Insurance Card", emoji: "🏥", important: true },
      { name: "Passport", emoji: "🛂", important: true },
      { name: "Medicine", emoji: "💊", important: true },
      { name: "Beach Ball", emoji: "🏖️", important: false },
      { name: "Game Console", emoji: "🎮", important: false },
      { name: "Emergency Contact", emoji: "📞", important: true }
    ]
  }
];

export const survivalScenarios = [
  {
    scenario:
      "You arrive in Japan and realize you missed the last train. What should you do?",
    options: [
      "Walk onto the railway tracks",
      "Check available transport or safe accommodation options",
      "Sleep on the road",
      "Enter a restricted station area"
    ],
    answer:
      "Check available transport or safe accommodation options"
  },
  {
    scenario:
      "You don't understand an instruction from your Japanese supervisor.",
    options: [
      "Pretend you understood",
      "Ignore the instruction",
      "Politely ask for clarification",
      "Leave immediately"
    ],
    answer:
      "Politely ask for clarification"
  },
  {
    scenario:
      "You cannot find your garbage collection point.",
    options: [
      "Leave garbage anywhere",
      "Check your building or municipality instructions",
      "Put it on the train",
      "Leave it outside a random house"
    ],
    answer:
      "Check your building or municipality instructions"
  },
  {
    scenario:
      "You lose your wallet while travelling.",
    options: [
      "Ignore it",
      "Report it and contact the appropriate authorities",
      "Steal another wallet",
      "Enter a restricted area"
    ],
    answer:
      "Report it and contact the appropriate authorities"
  }
];

export const memoryCards = [
  {
    id: 1,
    value: "🍣",
    name: "Sushi"
  },
  {
    id: 2,
    value: "🍣",
    name: "Sushi"
  },
  {
    id: 3,
    value: "🚅",
    name: "Shinkansen"
  },
  {
    id: 4,
    value: "🚅",
    name: "Shinkansen"
  },
  {
    id: 5,
    value: "⛩️",
    name: "Shrine"
  },
  {
    id: 6,
    value: "⛩️",
    name: "Shrine"
  },
  {
    id: 7,
    value: "🍵",
    name: "Tea"
  },
  {
    id: 8,
    value: "🍵",
    name: "Tea"
  },
  {
    id: 9,
    value: "🗻",
    name: "Mount Fuji"
  },
  {
    id: 10,
    value: "🗻",
    name: "Mount Fuji"
  },
  {
    id: 11,
    value: "🎋",
    name: "Tanabata"
  },
  {
    id: 12,
    value: "🎋",
    name: "Tanabata"
  }
];

export const cultureQuestions = [
  {
    scenario:
      "Your Japanese colleague gives you a small gift after helping you. What is the best response?",
    options: [
      "Thank them politely",
      "Throw it away",
      "Ignore them",
      "Demand another gift"
    ],
    answer: "Thank them politely"
  },
  {
    scenario:
      "You are entering a traditional Japanese room. You notice shoes are left at the entrance.",
    options: [
      "Remove your shoes",
      "Jump on the furniture",
      "Keep muddy shoes on",
      "Ignore the entrance"
    ],
    answer: "Remove your shoes"
  },
  {
    scenario:
      "You are eating noodles in a quiet public place.",
    options: [
      "Make as much noise as possible",
      "Follow the local setting and etiquette",
      "Throw food around",
      "Leave your table dirty"
    ],
    answer: "Follow the local setting and etiquette"
  },
  {
    scenario:
      "You need help from a Japanese stranger.",
    options: [
      "Demand help",
      "Ask politely",
      "Shout",
      "Push them"
    ],
    answer: "Ask politely"
  }
];