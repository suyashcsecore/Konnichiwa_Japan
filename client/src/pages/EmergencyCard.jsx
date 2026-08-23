import { useState } from "react";
import {
  AlertTriangle,
  User,
  HeartPulse,
  Pill,
  Phone,
  ShieldAlert,
  Languages,
  ArrowLeft,
  Volume2,
  Square
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HealthHeader from "../components/health/HealthHeader";
import { getHealthProfile } from "../utils/healthStorage";

export default function EmergencyCard() {
  const navigate = useNavigate();

  const [profile] = useState(() => getHealthProfile());
  const [language, setLanguage] = useState("en");
  const [speaking, setSpeaking] = useState(false);

  const allergies = profile.allergies?.length
    ? profile.allergies.join(", ")
    : "None reported";

  const conditions = profile.conditions?.length
    ? profile.conditions.join(", ")
    : "None reported";

  const medications = profile.medications?.length
    ? profile.medications
        .map(
          (medicine) =>
            `${medicine.name || "Medicine"} ${
              medicine.dosage || ""
            } ${medicine.frequency || ""}`
        )
        .join(", ")
    : "None reported";

  const emergencyName =
    profile.emergencyContact?.name || "Not provided";

  const emergencyPhone =
    profile.emergencyContact?.phone || "Not provided";

  const emergencyRelationship =
    profile.emergencyContact?.relationship || "Not provided";

  const speakEmergencyCard = () => {
    if (!window.speechSynthesis) {
      alert("Voice playback is not supported in this browser.");
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const text =
      language === "en"
        ? `Emergency medical information. My name is ${
            profile.name || "not provided"
          }. My blood group is ${
            profile.bloodGroup || "not provided"
          }. My allergies are ${allergies}. My medical conditions are ${
            conditions
          }. My current medication is ${medications}. My emergency contact is ${
            emergencyName
          }. The phone number is ${emergencyPhone}.`
        : `緊急時の医療情報です。氏名は ${
            profile.name || "未記入"
          } です。血液型は ${
            profile.bloodGroup || "未記入"
          } です。アレルギーは ${allergies} です。既往症は ${
            conditions
          } です。現在の薬は ${medications} です。緊急連絡先は ${
            emergencyName
          } です。電話番号は ${emergencyPhone} です。`;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = language === "en" ? "en-US" : "ja-JP";
    speech.rate = 0.85;
    speech.pitch = 1;

    speech.onstart = () => {
      setSpeaking(true);
    };

    speech.onend = () => {
      setSpeaking(false);
    };

    speech.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="health-page emergency-page">
      <HealthHeader />

      <div className="health-page-title emergency-page-title">
        <button
          className="health-back-button"
          onClick={() => navigate("/health")}
        >
          <ArrowLeft size={17} />
          Back to Health Center
        </button>

        <div className="emergency-title-row">
          <div className="emergency-title-icon">
            <ShieldAlert size={30} />
          </div>

          <div>
            <h2>Emergency Card</h2>
            <p>
              Quickly show essential medical information to
              emergency staff or healthcare professionals.
            </p>
          </div>
        </div>
      </div>

      <div className="emergency-warning">
        <AlertTriangle size={23} />

        <div>
          <strong>Emergency Information</strong>

          <span>
            This card is for communication purposes. In a
            life-threatening emergency, seek immediate medical
            assistance.
          </span>
        </div>
      </div>

      <div className="emergency-controls">
        <div className="emergency-language">
          <Languages size={19} />

          <button
            className={
              language === "en"
                ? "emergency-language-button active"
                : "emergency-language-button"
            }
            onClick={() => setLanguage("en")}
          >
            English
          </button>

          <button
            className={
              language === "ja"
                ? "emergency-language-button active"
                : "emergency-language-button"
            }
            onClick={() => setLanguage("ja")}
          >
            日本語
          </button>
        </div>

        <button
          className={
            speaking
              ? "emergency-speak-button speaking"
              : "emergency-speak-button"
          }
          onClick={speakEmergencyCard}
        >
          {speaking ? (
            <>
              <Square size={17} />
              Stop Voice
            </>
          ) : (
            <>
              <Volume2 size={18} />
              Read Aloud
            </>
          )}
        </button>
      </div>

      <div className="emergency-card">
        <div className="emergency-card-main">
          <div className="emergency-brand-panel">
            <span className="emergency-brand">
              JAPAN HEALTH
              <br />
              BRIDGE
            </span>

            <div className="emergency-badge">
              <AlertTriangle size={21} />
              <span>EMERGENCY</span>
            </div>

            <h3>
              {language === "en"
                ? "Emergency Medical Information"
                : "緊急医療情報"}
            </h3>

            <p>
              {language === "en"
                ? "Essential health information for emergency communication."
                : "緊急時の医療コミュニケーションに必要な情報です。"}
            </p>
          </div>

          <div className="emergency-details">
            <div className="emergency-patient">
              <div className="emergency-avatar">
                <User size={29} />
              </div>

              <div className="emergency-patient-info">
                <span>
                  {language === "en"
                    ? "Patient Name"
                    : "患者氏名"}
                </span>

                <strong>
                  {profile.name || "Not provided"}
                </strong>
              </div>
            </div>

            <div className="emergency-grid">
              <div className="emergency-info-box blood">
                <HeartPulse size={21} />

                <span>
                  {language === "en"
                    ? "Blood Group"
                    : "血液型"}
                </span>

                <strong>
                  {profile.bloodGroup || "Not provided"}
                </strong>
              </div>

              <div className="emergency-info-box allergy">
                <AlertTriangle size={21} />

                <span>
                  {language === "en"
                    ? "Allergies"
                    : "アレルギー"}
                </span>

                <strong>
                  {language === "en"
                    ? allergies
                    : allergies === "None reported"
                    ? "報告なし"
                    : allergies}
                </strong>
              </div>

              <div className="emergency-info-box">
                <HeartPulse size={21} />

                <span>
                  {language === "en"
                    ? "Medical Conditions"
                    : "既往症"}
                </span>

                <strong>
                  {language === "en"
                    ? conditions
                    : conditions === "None reported"
                    ? "報告なし"
                    : conditions}
                </strong>
              </div>

              <div className="emergency-info-box">
                <Pill size={21} />

                <span>
                  {language === "en"
                    ? "Current Medication"
                    : "現在の薬"}
                </span>

                <strong>
                  {language === "en"
                    ? medications
                    : medications === "None reported"
                    ? "報告なし"
                    : medications}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="emergency-contact-section">
          <div className="emergency-section-title">
            <div className="emergency-contact-icon">
              <Phone size={20} />
            </div>

            <div>
              <span>
                {language === "en"
                  ? "Emergency Contact"
                  : "緊急連絡先"}
              </span>

              <strong>
                {language === "en"
                  ? "Contact person"
                  : "緊急連絡先"}
              </strong>
            </div>
          </div>

          <div className="emergency-contact-details">
            <div>
              <span>
                {language === "en" ? "Name" : "氏名"}
              </span>

              <strong>{emergencyName}</strong>
            </div>

            <div>
              <span>
                {language === "en" ? "Phone" : "電話番号"}
              </span>

              <strong>{emergencyPhone}</strong>
            </div>

            <div>
              <span>
                {language === "en"
                  ? "Relationship"
                  : "続柄"}
              </span>

              <strong>{emergencyRelationship}</strong>
            </div>
          </div>
        </div>

        <div className="emergency-footer">
          <ShieldAlert size={18} />

          <span>
            {language === "en"
              ? "Please use this information to assist the patient during an emergency."
              : "緊急時の患者対応のため、この情報をご利用ください。"}
          </span>
        </div>
      </div>

      <div className="emergency-note">
        <strong>Important</strong>

        <span>
          Medical information shown here comes from the
          user's Health Passport. Always verify critical
          information with the patient or healthcare
          professional when possible.
        </span>
      </div>
    </div>
  );
}