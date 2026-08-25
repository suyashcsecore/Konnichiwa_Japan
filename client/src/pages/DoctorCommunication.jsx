import { useEffect, useState } from "react";
import {
  MessageCircle,
  Volume2,
  Square,
  Check,
  ArrowLeft,
  Stethoscope,
  AlertTriangle,
  Thermometer,
  Pill,
  MapPin,
  Clock,
  HeartPulse
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HealthHeader from "../components/health/HealthHeader";
import "../health.css";

const communicationCategories = [
  {
    title: "General",
    icon: <MessageCircle size={18} />,
    phrases: [
      {
        english: "I don't feel well.",
        japanese: "体調がよくありません。",
        pronunciation: "Taichou ga yoku arimasen."
      },
      {
        english: "I need to see a doctor.",
        japanese: "医師に診てもらいたいです。",
        pronunciation: "Ishi ni mite moraitai desu."
      },
      {
        english: "I don't understand Japanese very well.",
        japanese: "日本語があまり分かりません。",
        pronunciation: "Nihongo ga amari wakarimasen."
      },
      {
        english: "Can you speak slowly, please?",
        japanese: "ゆっくり話していただけますか？",
        pronunciation: "Yukkuri hanashite itadakemasu ka?"
      }
    ]
  },
  {
    title: "Symptoms",
    icon: <Thermometer size={18} />,
    phrases: [
      {
        english: "I have a fever.",
        japanese: "熱があります。",
        pronunciation: "Netsu ga arimasu."
      },
      {
        english: "I have a headache.",
        japanese: "頭が痛いです。",
        pronunciation: "Atama ga itai desu."
      },
      {
        english: "I have stomach pain.",
        japanese: "お腹が痛いです。",
        pronunciation: "Onaka ga itai desu."
      },
      {
        english: "I feel dizzy.",
        japanese: "めまいがします。",
        pronunciation: "Memai ga shimasu."
      },
      {
        english: "I am having difficulty breathing.",
        japanese: "息苦しいです。",
        pronunciation: "Ikigurushii desu."
      }
    ]
  },
  {
    title: "Medication",
    icon: <Pill size={18} />,
    phrases: [
      {
        english: "I am currently taking medication.",
        japanese: "現在、薬を飲んでいます。",
        pronunciation: "Genzai, kusuri o nonde imasu."
      },
      {
        english: "I am allergic to this medicine.",
        japanese: "この薬にアレルギーがあります。",
        pronunciation: "Kono kusuri ni arerugii ga arimasu."
      },
      {
        english: "What medicine should I take?",
        japanese: "どの薬を飲めばいいですか？",
        pronunciation: "Dono kusuri o nomeba ii desu ka?"
      },
      {
        english: "How often should I take this medicine?",
        japanese: "この薬はどのくらいの頻度で飲みますか？",
        pronunciation: "Kono kusuri wa dono kurai no hindo de nomimasu ka?"
      }
    ]
  },
  {
    title: "Location of Pain",
    icon: <MapPin size={18} />,
    phrases: [
      {
        english: "It hurts here.",
        japanese: "ここが痛いです。",
        pronunciation: "Koko ga itai desu."
      },
      {
        english: "The pain is on the left side.",
        japanese: "左側が痛いです。",
        pronunciation: "Hidarigawa ga itai desu."
      },
      {
        english: "The pain is on the right side.",
        japanese: "右側が痛いです。",
        pronunciation: "Migigawa ga itai desu."
      },
      {
        english: "The pain is very strong.",
        japanese: "とても痛いです。",
        pronunciation: "Totemo itai desu."
      }
    ]
  },
  {
    title: "Emergency",
    icon: <AlertTriangle size={18} />,
    phrases: [
      {
        english: "I need urgent medical help.",
        japanese: "緊急の医療援助が必要です。",
        pronunciation: "Kinkyuu no iryou enjo ga hitsuyou desu."
      },
      {
        english: "Please call an ambulance.",
        japanese: "救急車を呼んでください。",
        pronunciation: "Kyuukyuusha o yonde kudasai."
      },
      {
        english: "I cannot breathe properly.",
        japanese: "うまく呼吸できません。",
        pronunciation: "Umaku kokyuu dekimasen."
      },
      {
        english: "I have severe pain.",
        japanese: "激しい痛みがあります。",
        pronunciation: "Hageshii itami ga arimasu."
      }
    ]
  }
];

export default function DoctorCommunication() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(false);

  const currentCategory = communicationCategories.find(
    (category) => category.title === selectedCategory
  );

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      return undefined;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();

      const japaneseVoice = availableVoices.some(
        (voice) =>
          voice.lang &&
          voice.lang.toLowerCase().startsWith("ja")
      );

      setVoiceAvailable(japaneseVoice);
    };

    loadVoices();

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      loadVoices
    );

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        loadVoices
      );

      window.speechSynthesis.cancel();
    };
  }, []);

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setSpeaking(false);
  };

  const speakJapanese = (text) => {
    if (!("speechSynthesis" in window)) {
      alert(
        "Speech is not supported by this browser. Please use Google Chrome or Microsoft Edge."
      );
      return;
    }

    stopSpeaking();

    const availableVoices = window.speechSynthesis.getVoices();

    const japaneseVoice = availableVoices.find(
      (voice) =>
        voice.lang &&
        voice.lang.toLowerCase().startsWith("ja")
    );

    if (!japaneseVoice) {
      setVoiceAvailable(false);

      alert(
        "Japanese voice is not available on this computer. Please install a Japanese speech voice in Windows Settings and restart the browser."
      );

      return;
    }

    setVoiceAvailable(true);

    const speech = new SpeechSynthesisUtterance(text);

    speech.voice = japaneseVoice;
    speech.lang = japaneseVoice.lang || "ja-JP";
    speech.rate = 0.85;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => {
      setSpeaking(true);
    };

    speech.onend = () => {
      setSpeaking(false);
    };

    speech.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  const selectPhrase = (phrase) => {
    stopSpeaking();
    setSelectedPhrase(phrase);
  };

  const playSelectedPhrase = () => {
    if (!selectedPhrase) {
      return;
    }

    speakJapanese(selectedPhrase.japanese);
  };

  return (
    <div className="health-page">
      <HealthHeader />

      <div className="health-page-title">
        <button
          className="health-back-button"
          onClick={() => navigate("/health")}
        >
          <ArrowLeft size={17} />
          Back to Health Center
        </button>

        <div className="translator-title-row">
          <div className="translator-title-icon">
            <Stethoscope size={28} />
          </div>

          <div>
            <h2>Doctor Communication</h2>

            <p>
              Helpful Japanese phrases for communicating
              during a hospital or clinic visit.
            </p>
          </div>
        </div>
      </div>

      <div className="doctor-emergency-banner">
        <AlertTriangle size={21} />

        <div>
          <strong>Emergency?</strong>

          <span>
            If you are experiencing a life-threatening emergency,
            contact emergency services immediately.
          </span>
        </div>

        <button
          onClick={() => navigate("/health/emergency")}
        >
          Open Emergency Card
        </button>
      </div>

      <div className="doctor-layout">
        <aside className="doctor-sidebar">
          <div className="doctor-sidebar-title">
            <MessageCircle size={18} />
            Communication Topics
          </div>

          {communicationCategories.map((category) => (
            <button
              key={category.title}
              className={
                selectedCategory === category.title
                  ? "doctor-category active"
                  : "doctor-category"
              }
              onClick={() => {
                stopSpeaking();
                setSelectedCategory(category.title);
                setSelectedPhrase(null);
              }}
            >
              {category.icon}

              <span>{category.title}</span>
            </button>
          ))}
        </aside>

        <main className="doctor-content">
          <div className="doctor-content-header">
            <div>
              <span className="result-label">
                JAPAN HEALTH COMMUNICATION
              </span>

              <h3>{selectedCategory}</h3>

              <p>
                Select a phrase to show the doctor.
              </p>
            </div>

            <div className="doctor-language">
              <span>English → Japanese</span>
            </div>
          </div>

          <div className="doctor-voice-status">
            <div>
              <Volume2 size={18} />

              <span>
                {voiceAvailable
                  ? "Japanese voice available"
                  : "Japanese voice not detected"}
              </span>
            </div>

            {!voiceAvailable && (
              <small>
                Install a Japanese speech voice in Windows
                to enable audio.
              </small>
            )}
          </div>

          <div className="doctor-phrases">
            {currentCategory?.phrases.map((phrase, index) => (
              <button
                key={index}
                className={
                  selectedPhrase === phrase
                    ? "doctor-phrase selected"
                    : "doctor-phrase"
                }
                onClick={() => selectPhrase(phrase)}
              >
                <div className="doctor-phrase-number">
                  {index + 1}
                </div>

                <div className="doctor-phrase-text">
                  <strong>{phrase.english}</strong>

                  <span>{phrase.japanese}</span>

                  <small>{phrase.pronunciation}</small>
                </div>

                {selectedPhrase === phrase && (
                  <Check
                    size={20}
                    className="phrase-check"
                  />
                )}
              </button>
            ))}
          </div>
        </main>
      </div>

      {selectedPhrase && (
        <div className="doctor-floating-card">
          <div className="doctor-floating-icon">
            <HeartPulse size={25} />
          </div>

          <div className="doctor-floating-content">
            <span>SHOW THIS TO THE DOCTOR</span>

            <h3>{selectedPhrase.japanese}</h3>

            <p>{selectedPhrase.english}</p>

            <small>
              {selectedPhrase.pronunciation}
            </small>
          </div>

          <div className="doctor-audio-controls">
            {!speaking ? (
              <button
                className="doctor-speak-button"
                onClick={playSelectedPhrase}
              >
                <Volume2 size={21} />
                Play Japanese
              </button>
            ) : (
              <button
                className="doctor-speak-button speaking"
                onClick={stopSpeaking}
              >
                <Square size={18} fill="currentColor" />
                Stop Voice
              </button>
            )}

            <button
              className="doctor-cancel-button"
              onClick={() => {
                stopSpeaking();
                setSelectedPhrase(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="doctor-tip">
        <Clock size={18} />

        <div>
          <strong>Helpful tip</strong>

          <span>
            You can select a phrase and show the Japanese
            sentence directly to the doctor or hospital staff.
          </span>
        </div>
      </div>
    </div>
  );
}