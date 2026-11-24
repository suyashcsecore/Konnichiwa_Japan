import { useState } from 'react'

interface PhraseItem {
  ja: string
  romaji: string
  en: string
  context?: string
}

interface PhraseCategory {
  id: string
  title: string
  icon: string
  phrases: PhraseItem[]
}

const CATEGORIES: PhraseCategory[] = [
  {
    id: 'emergency',
    title: 'Emergency & Urgent Help',
    icon: '🚨',
    phrases: [
      { ja: '助けてください！', romaji: 'Tasukete kudasai!', en: 'Please help me!' },
      { ja: '救急車を呼んでください！', romaji: 'Kyūkyūsha o yonde kudasai!', en: 'Please call an ambulance! (Dial 119)' },
      { ja: '警察を呼んでください！', romaji: 'Keisatsu o yonde kudasai!', en: 'Please call the police! (Dial 110)' },
      { ja: '火事です！', romaji: 'Kaji desu!', en: 'Fire! (Dial 119)' },
      { ja: '英語が話せる人はいますか？', romaji: 'Eigo ga hanaseru hito wa imasu ka?', en: 'Does anyone speak English?' },
      { ja: '病院に行きたいです。', romaji: 'Byōin ni ikitai desu.', en: 'I want to go to a hospital.' },
      { ja: '気分が悪いです。', romaji: 'Kibun ga warui desu.', en: 'I feel sick / unwell.' },
      { ja: 'ここが痛いです。', romaji: 'Koko ga itai desu.', en: 'It hurts here.' }
    ]
  },
  {
    id: 'combini',
    title: 'Convenience Store (Combini)',
    icon: '🏪',
    phrases: [
      { ja: '温めてください。', romaji: 'Atatamete kudasai.', en: 'Please warm this up in the microwave.' },
      { ja: '袋はいりません。', romaji: 'Fukuro wa irimasen.', en: "I don't need a plastic bag." },
      { ja: 'お箸をつけてください。', romaji: 'Ohashi o tsukete kudasai.', en: 'Please include chopsticks.' },
      { ja: 'スプーンをつけてください。', romaji: 'Supūn o tsukete kudasai.', en: 'Please include a spoon.' },
      { ja: 'レシートは結構です。', romaji: 'Reshīto wa kekkō desu.', en: 'No receipt needed, thank you.' },
      { ja: 'お会計をお願いします。', romaji: 'O-kaikei o onegaishimasu.', en: 'Check please / I am ready to pay.' },
      { ja: 'Suicaで支払います。', romaji: 'Suica de shiharaimasu.', en: 'I will pay with Suica / IC card.' }
    ]
  },
  {
    id: 'transit',
    title: 'Train & Subway Station',
    icon: '🚆',
    phrases: [
      { ja: 'この電車は〜に行きますか？', romaji: 'Kono densha wa ~ ni ikimasu ka?', en: 'Does this train go to ~?' },
      { ja: '〜線はどこですか？', romaji: '~sen wa doko desu ka?', en: 'Where is the ~ line?' },
      { ja: '改札口はどこですか？', romaji: 'Kaisatsuguchi wa doko desu ka?', en: 'Where is the ticket gate?' },
      { ja: 'Suicaのチャージはどこでできますか？', romaji: 'Suica no chāji wa doko de dekimasu ka?', en: 'Where can I recharge my Suica card?' },
      { ja: '次の駅で降ります。', romaji: 'Tsugi no eki de orimasu.', en: 'I am getting off at the next station (Sumimasen).' },
      { ja: '落とし物をしました。', romaji: 'Otoshimono o shimashita.', en: 'I lost something / Lost and Found.' }
    ]
  },
  {
    id: 'dining',
    title: 'Restaurant & Food Orders',
    icon: '🍜',
    phrases: [
      { ja: 'すみません、注文をお願いします。', romaji: 'Sumimasen, chūmon o onegaishimasu.', en: 'Excuse me, I would like to order.' },
      { ja: 'これをお願いします。', romaji: 'Kore o onegaishimasu.', en: 'I will have this one, please.' },
      { ja: 'おすすめは何ですか？', romaji: 'Osusume wa nan desu ka?', en: 'What do you recommend?' },
      { ja: 'お冷をお願いします。', romaji: 'Ohīya o onegaishimasu.', en: 'Can I have cold water, please?' },
      { ja: 'お会計は別々でできますか？', romaji: 'O-kaikei wa betsubetsu de dekimasu ka?', en: 'Can we pay separately / split the bill?' },
      { ja: 'ごちそうさまでした！', romaji: 'Gochisōsama deshita!', en: 'Thank you for the meal! (Said when leaving)' }
    ]
  },
  {
    id: 'city-hall',
    title: 'City Hall & Official Forms',
    icon: '🏛️',
    phrases: [
      { ja: '転入届の手続きをしたいです。', romaji: 'Tennyū-todoke no tetsuzuki o shitai desu.', en: 'I want to submit a moving-in notification.' },
      { ja: '住民票が欲しいです。', romaji: 'Jūminhyō ga hoshii desu.', en: 'I need a certificate of residence.' },
      { ja: 'ここに名前を書いてください。', romaji: 'Koko ni namae o kaite kudasai.', en: 'Please write your name here (Instructions from staff).' },
      { ja: '漢字が読めません。', romaji: 'Kanji ga yomemasen.', en: "I cannot read Kanji (ask for Hiragana/English)." },
      { ja: '国民健康保険の窓口はどこですか？', romaji: 'Kokumin kenkō hoken no madoguchi wa doko desu ka?', en: 'Where is the National Health Insurance counter?' }
    ]
  }
]

export function PhrasesGuide() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const activeCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0]

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  return (
    <div className="phrases-container">
      <div className="emergency-banner">
        <div className="emergency-col">
          <span className="emergency-badge">Police</span>
          <span className="emergency-number">📞 110</span>
          <span className="emergency-desc">Crime, Accident, Lost Property</span>
        </div>
        <div className="emergency-col">
          <span className="emergency-badge" style={{ backgroundColor: '#ef4444' }}>Ambulance / Fire</span>
          <span className="emergency-number">🚑 119</span>
          <span className="emergency-desc">Life-threatening medical, Fire</span>
        </div>
        <div className="emergency-col">
          <span className="emergency-badge" style={{ backgroundColor: '#3b82f6' }}>Medical Advice</span>
          <span className="emergency-number">🏥 #7119</span>
          <span className="emergency-desc">When unsure if you need an ambulance</span>
        </div>
      </div>

      <div className="phrases-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`phrases-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
          >
            <span className="phrases-tab-icon">{cat.icon}</span>
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      <div className="phrases-cards-grid">
        {activeCategory.phrases.map((p, i) => (
          <div key={i} className="phrase-card">
            <div className="phrase-card-header">
              <span className="phrase-ja-text">{p.ja}</span>
              <button
                className="phrase-copy-btn"
                onClick={() => copyText(p.ja, i)}
                title="Copy Japanese text"
              >
                {copiedIndex === i ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="phrase-romaji-text">{p.romaji}</div>
            <div className="phrase-en-text">{p.en}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
