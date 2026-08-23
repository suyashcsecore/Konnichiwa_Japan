import { useState } from "react";
import {
  FileText,
  Sparkles,
  Languages,
  Copy,
  Check,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HealthHeader from "../components/health/HealthHeader";
import { getHealthProfile } from "../utils/healthStorage";
import "../health.css";

export default function MedicalTranslator() {
  const navigate = useNavigate();

  const [profile] = useState(() => getHealthProfile());
  const [language, setLanguage] = useState("en");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSummary = () => {
    setGenerated(true);
    setCopied(false);
  };

  const englishSummary = `
PATIENT MEDICAL SUMMARY

Name: ${profile.name || "Not provided"}
Date of Birth: ${profile.dateOfBirth || "Not provided"}
Blood Group: ${profile.bloodGroup || "Not provided"}

Allergies:
${
  profile.allergies?.length
    ? profile.allergies.join(", ")
    : "None reported"
}

Medical Conditions:
${
  profile.conditions?.length
    ? profile.conditions.join(", ")
    : "None reported"
}

Current Medication:
${
  profile.medications?.length
    ? profile.medications
        .map(
          (medicine) =>
            `${medicine.name} - ${medicine.dosage} - ${medicine.frequency}`
        )
        .join("\n")
    : "None reported"
}

Previous Surgery:
${
  profile.surgeries?.length
    ? profile.surgeries
        .map(
          (surgery) =>
            `${surgery.name} - ${surgery.year}`
        )
        .join("\n")
    : "None reported"
}

Emergency Contact:
${profile.emergencyContact?.name || "Not provided"}
${profile.emergencyContact?.phone || ""}
${profile.emergencyContact?.relationship || ""}

Insurance:
${profile.insurance?.provider || "Not provided"}
Policy Number: ${
    profile.insurance?.policyNumber || "Not provided"
}
`;

  const japaneseSummary = `
患者医療情報

氏名：${profile.name || "未記入"}
生年月日：${profile.dateOfBirth || "未記入"}
血液型：${profile.bloodGroup || "未記入"}

アレルギー：
${
  profile.allergies?.length
    ? profile.allergies.join("、")
    : "報告なし"
}

既往症：
${
  profile.conditions?.length
    ? profile.conditions.join("、")
    : "報告なし"
}

現在の薬：
${
  profile.medications?.length
    ? profile.medications
        .map(
          (medicine) =>
            `${medicine.name} - ${medicine.dosage} - ${medicine.frequency}`
        )
        .join("\n")
    : "報告なし"
}

手術歴：
${
  profile.surgeries?.length
    ? profile.surgeries
        .map(
          (surgery) =>
            `${surgery.name} - ${surgery.year}`
        )
        .join("\n")
    : "報告なし"
}

緊急連絡先：
${profile.emergencyContact?.name || "未記入"}
${profile.emergencyContact?.phone || ""}
${profile.emergencyContact?.relationship || ""}

保険：
${profile.insurance?.provider || "未記入"}
保険証番号：${
    profile.insurance?.policyNumber || "未記入"
}
`;

  const currentSummary =
    language === "en"
      ? englishSummary
      : japaneseSummary;

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(currentSummary);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
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
            <Languages size={28} />
          </div>

          <div>
            <h2>Medical Translator</h2>

            <p>
              Convert your saved health information into a
              simple hospital-friendly summary.
            </p>
          </div>
        </div>
      </div>

      <div className="translator-info">
        <FileText size={20} />

        <div>
          <strong>Your Health Passport</strong>

          <p>
            The summary below is generated from the information
            saved in your Health Passport.
          </p>
        </div>
      </div>

      <div className="translator-profile">
        <div>
          <span>Patient</span>
          <strong>{profile.name || "Not provided"}</strong>
        </div>

        <div>
          <span>Blood Group</span>
          <strong>{profile.bloodGroup || "Not provided"}</strong>
        </div>

        <div>
          <span>Conditions</span>
          <strong>
            {profile.conditions?.length || 0}
          </strong>
        </div>

        <div>
          <span>Allergies</span>
          <strong>
            {profile.allergies?.length || 0}
          </strong>
        </div>
      </div>

      {!generated && (
        <div className="translator-start-card">
          <div className="translator-start-icon">
            <Sparkles size={38} />
          </div>

          <h3>Ready to create your medical summary?</h3>

          <p>
            Your saved health information will be organized
            into a clear format that can help you communicate
            with healthcare professionals in Japan.
          </p>

          <button
            className="health-primary-button"
            onClick={generateSummary}
          >
            <Sparkles size={18} />
            Generate Medical Summary
          </button>
        </div>
      )}

      {generated && (
        <div className="translator-result">

          <div className="translator-result-header">
            <div>
              <span className="result-label">
                GENERATED SUMMARY
              </span>

              <h3>
                {language === "en"
                  ? "Medical Summary"
                  : "医療情報サマリー"}
              </h3>

              <p>
                Communication assistance only
              </p>
            </div>

            <div className="translator-actions">

              <div className="language-switch">
                <button
                  className={
                    language === "en"
                      ? "language-active"
                      : ""
                  }
                  onClick={() => setLanguage("en")}
                >
                  English
                </button>

                <button
                  className={
                    language === "jp"
                      ? "language-active"
                      : ""
                  }
                  onClick={() => setLanguage("jp")}
                >
                  日本語
                </button>
              </div>

              <button
                className="copy-button"
                onClick={copySummary}
              >
                {copied ? (
                  <>
                    <Check size={17} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={17} />
                    Copy
                  </>
                )}
              </button>

            </div>
          </div>

          <div
            className={`medical-summary ${
              language === "jp"
                ? "japanese"
                : ""
            }`}
          >
            <pre>{currentSummary}</pre>
          </div>

          <div className="translator-disclaimer">
            <strong>Important:</strong>

            <span>
              This tool translates and organizes information
              provided by the user. It does not diagnose
              conditions, interpret medical reports, or replace
              professional medical advice.
            </span>
          </div>

        </div>
      )}
    </div>
  );
}