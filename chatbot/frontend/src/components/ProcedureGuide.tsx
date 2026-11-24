import { useState } from 'react'

interface Procedure {
  id: string
  title: string
  titleJa: string
  romaji: string
  timeline: string
  location: string
  requiredDocs: string[]
  steps: string[]
  tips: string
  phrases: { ja: string; romaji: string; en: string }[]
}

const PROCEDURES: Procedure[] = [
  {
    id: 'residence-card',
    title: 'Residence Card & Address Registration',
    titleJa: '在留カード・転入届',
    romaji: 'Zairyū Kādo / Tennyū-todoke',
    timeline: 'Within 14 days of moving in',
    location: 'Local Municipal Office (City/Ward Hall - Kuyakusho/Shiyakusho)',
    requiredDocs: [
      'Valid Passport',
      'Residence Card (Zairyū Card received at the airport)',
      'Proof of Address (Lease agreement, Dorm certificate, or Hotel receipt)',
      'Application Form (Moving-in Notification / 転入届 at City Hall)'
    ],
    steps: [
      'Take a numbered ticket at the Resident Affairs (Shimin-ka / Koseki Jūmin-ka) counter.',
      'Fill out the Moving-in Notification (Tennyū-todoke / 転入届). Staff can assist with Katakana writing.',
      'Submit your Passport and Residence Card; staff will print your official address on the back of the card.',
      'Proceed to the National Health Insurance and National Pension counters in the same building.'
    ],
    tips: 'Do not delay past 14 days, as address registration is legally required for bank accounts, cell phones, and insurance.',
    phrases: [
      { ja: '住所の登録をしたいです。', romaji: 'Jūsho no tōroku o shitai desu.', en: 'I want to register my address.' },
      { ja: '転入届はどこですか？', romaji: 'Tennyū-todoke wa doko desu ka?', en: 'Where is the moving-in notification counter?' }
    ]
  },
  {
    id: 'bank-account',
    title: 'Opening a Japanese Bank Account',
    titleJa: '銀行口座開設（ゆうちょ銀行）',
    romaji: 'Ginkō Kōza Kaisetsu (Yūcho Ginkō)',
    timeline: 'After address registration',
    location: 'Japan Post Bank (Yūcho Ginkō) or Online (Sony Bank / SBI Shinsei)',
    requiredDocs: [
      'Residence Card with your registered Japanese address printed on the back',
      'Student ID Card (Gakuseishō)',
      'Passport',
      'Japanese Phone Number (or school/dorm phone)',
      'Personal Seal (Hanko) or signature'
    ],
    steps: [
      'Visit your nearest Japan Post Bank (Yūcho Ginkō) branch.',
      'Inform the reception that you are an international student opening a new account.',
      'Fill out the account application (name matching your Residence Card).',
      'Receive your bank passbook (Tsūchō) on the spot; cash card arrives by registered mail within 1-2 weeks.'
    ],
    tips: 'Major banks (MUFG, SMBC, Mizuho) typically require 6 months in Japan before offering general accounts. Japan Post Bank welcomes new students immediately.',
    phrases: [
      { ja: '口座を開設したいです。', romaji: 'Kōza o kaisetsu shitai desu.', en: 'I would like to open an account.' },
      { ja: '留学生です。通帳を作りたいです。', romaji: 'Ryūgakusei desu. Tsūchō o tsukuritai desu.', en: 'I am an international student. I want to create a passbook.' }
    ]
  },
  {
    id: 'sim-card',
    title: 'Mobile Phone & Japanese SIM Card',
    titleJa: 'SIMカード・携帯電話契約',
    romaji: 'SIM Kādo / Keitai Denwa Keiyaku',
    timeline: 'First 1-3 days in Japan',
    location: 'Online or Electronics Retailers (Bic Camera, Yodobashi Camera)',
    requiredDocs: [
      'Residence Card (or Passport for prepaid/tourist SIMs)',
      'Credit Card or Debit Card (some carriers require Japanese cards)',
      'Japanese Address or Student Accommodation Proof'
    ],
    steps: [
      'Ensure your smartphone is SIM-unlocked before leaving your home country.',
      'Choose a low-cost carrier (MVNO): ahamo, LINEMO, povo 2.0, Rakuten Mobile, or foreigner-friendly Mobal / GTN.',
      'Sign up online or at a store counter. Choose eSIM for instant digital activation.',
      'Test your Japanese 070/080/090 phone number with a test call.'
    ],
    tips: 'A Japanese phone number is required before City Hall and Yūcho Bank can finalize your files. Mobal and GTN accept foreign credit cards.',
    phrases: [
      { ja: '音声通話付きSIMが欲しいです。', romaji: 'Onsei tsūwa-tsuki SIM ga hoshii desu.', en: 'I want a SIM card with voice calling.' },
      { ja: '月々の料金はいくらですか？', romaji: 'Tsukizuki no ryōkin wa ikura desu ka?', en: 'How much is the monthly fee?' }
    ]
  },
  {
    id: 'hanko-seal',
    title: 'Personal Seal (Hanko / Inkan)',
    titleJa: '印鑑・判子',
    romaji: 'Inkan / Hanko',
    timeline: 'Before signing apartment or financial contracts',
    location: 'Hanko Shop (Hanko-ya), Don Quijote automated stamp machines, or online',
    requiredDocs: [
      'Your English or Katakana name spelling'
    ],
    steps: [
      'Decide on your seal text: First name, last name, or initials carved in Katakana or alphabet.',
      'Choose a Mitome-in (10mm - 12mm circular seal).',
      'Have it carved in 15 minutes at automated stamp kiosks inside Don Quijote (¥500-¥1,500) or at a professional Hanko craftsman shop.'
    ],
    tips: 'While Yucho Bank permits signatures, a Hanko makes apartment leasing, university administration, and delivery receipt seamless.',
    phrases: [
      { ja: 'カタカナで印鑑を作れますか？', romaji: 'Katakana de inkan o tsukuremasu ka?', en: 'Can you make a seal in Katakana?' },
      { ja: '認印が欲しいです。', romaji: 'Mitome-in ga hoshii desu.', en: 'I would like a daily unrecognized seal (Mitome-in).' }
    ]
  },
  {
    id: 'health-insurance',
    title: 'National Health Insurance (NHI)',
    titleJa: '国民健康保険（国保）',
    romaji: 'Kokumin Kenkō Hoken (Kokuho)',
    timeline: 'Same day as address registration',
    location: 'National Health Insurance counter at City/Ward Hall',
    requiredDocs: [
      'Residence Card',
      'Passport',
      'Student ID or Certificate of Enrollment'
    ],
    steps: [
      'Head to the National Health Insurance section after address registration.',
      'Submit the enrollment form. The insurance covers 70% of medical and dental expenses.',
      'Crucial: Apply for the Student Income Exemption / Reduction (Gakusei Nōfu Tokurei / 減額申請).',
      'Receive your physical Health Insurance Card (Hokenshō).'
    ],
    tips: 'With the student reduction, monthly premiums are typically only ¥1,000 to ¥2,000 instead of standard adult rates.',
    phrases: [
      { ja: '国民健康保険に加入したいです。', romaji: 'Kokumin kenkō hoken ni kanyū shitai desu.', en: 'I want to enroll in National Health Insurance.' },
      { ja: '学生の保険料減額申請をお願いします。', romaji: 'Gakusei no hokenryō gengaku shinsei o onegaishimasu.', en: 'Please apply for the student premium reduction.' }
    ]
  },
  {
    id: 'work-permit',
    title: 'Part-Time Work Permit',
    titleJa: '資格外活動許可',
    romaji: 'Shikakugai Katsudō Kyoka',
    timeline: 'At airport immigration or during stay',
    location: 'Airport Immigration Counter or Regional Immigration Bureau',
    requiredDocs: [
      'Application Form for Permission to Engage in Activity Other than Permitted',
      'Passport',
      'Residence Card'
    ],
    steps: [
      'Submit the one-page form at the airport immigration counter upon arrival for instant stamping.',
      'Check the back of your Residence Card for the black seal granting up to 28 hours per week.',
      'During official university vacations (summer/winter), students can work up to 40 hours per week (8 hours/day).'
    ],
    tips: 'Working without this permit or in prohibited establishments (bars, clubs, gambling) is strictly illegal and leads to deportation.',
    phrases: [
      { ja: '資格外活動許可を申請したいです。', romaji: 'Shikakugai katsudō kyoka o shinsei shitai desu.', en: 'I want to apply for permission for part-time work.' }
    ]
  }
]

export function ProcedureGuide() {
  const [selectedId, setSelectedId] = useState(PROCEDURES[0].id)
  const current = PROCEDURES.find(p => p.id === selectedId) || PROCEDURES[0]

  return (
    <div className="guide-layout">
      <div className="guide-sidebar">
        <h3 className="guide-sidebar-title">Relocation Steps</h3>
        <div className="guide-nav-list">
          {PROCEDURES.map((p, index) => (
            <button
              key={p.id}
              className={`guide-nav-item ${selectedId === p.id ? 'active' : ''}`}
              onClick={() => setSelectedId(p.id)}
            >
              <span className="guide-step-num">{index + 1}</span>
              <div className="guide-nav-meta">
                <span className="guide-nav-label">{p.title}</span>
                <span className="guide-nav-sub">{p.titleJa}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="guide-main">
        <div className="guide-header-card">
          <div className="guide-badge">{current.timeline}</div>
          <h2 className="guide-title">{current.title}</h2>
          <div className="guide-japanese-tag">{current.titleJa} ({current.romaji})</div>
          <div className="guide-location-tag">📍 <strong>Where:</strong> {current.location}</div>
        </div>

        <div className="guide-section">
          <h4 className="guide-section-heading">📋 Required Documents</h4>
          <ul className="guide-doc-list">
            {current.requiredDocs.map((doc, i) => (
              <li key={i} className="guide-doc-item">
                <span className="check-bullet">✓</span> {doc}
              </li>
            ))}
          </ul>
        </div>

        <div className="guide-section">
          <h4 className="guide-section-heading">👣 Step-by-Step Instructions</h4>
          <ol className="guide-step-list">
            {current.steps.map((st, i) => (
              <li key={i} className="guide-step-item">
                <span className="step-badge">{i + 1}</span>
                <p>{st}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="guide-tip-card">
          <strong>💡 Helpful Tip:</strong> {current.tips}
        </div>

        <div className="guide-section">
          <h4 className="guide-section-heading">🗣️ Useful Japanese Phrases</h4>
          <div className="guide-phrases-grid">
            {current.phrases.map((ph, i) => (
              <div key={i} className="guide-phrase-box">
                <div className="phrase-ja">{ph.ja}</div>
                <div className="phrase-romaji">{ph.romaji}</div>
                <div className="phrase-en">{ph.en}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
