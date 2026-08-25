import { useState } from "react";
import {
  QrCode,
  ShieldCheck,
  ArrowLeft,
  Download,
  User,
  HeartPulse,
  AlertTriangle,
  Pill,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import HealthHeader from "../components/health/HealthHeader";
import { getHealthProfile } from "../utils/healthStorage";
import "../health.css";

export default function QRMedicalCard() {
  const navigate = useNavigate();
  const [profile] = useState(() => getHealthProfile());

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
            `${medicine.name || "Medicine"} ${medicine.dosage || ""} ${
              medicine.frequency || ""
            }`
        )
        .join(", ")
    : "None reported";

  const emergencyName =
    profile.emergencyContact?.name || "Not provided";

  const emergencyPhone =
    profile.emergencyContact?.phone || "Not provided";

  const qrData = JSON.stringify({
    type: "Japan Health Bridge Emergency Medical Card",
    name: profile.name || "Not provided",
    dateOfBirth: profile.dateOfBirth || "Not provided",
    bloodGroup: profile.bloodGroup || "Not provided",
    allergies,
    medicalConditions: conditions,
    medications,
    emergencyContact: {
      name: emergencyName,
      phone: emergencyPhone
    }
  });

  const downloadQR = () => {
    const canvas = document.getElementById("medical-qr-code");

    if (!canvas) {
      return;
    }

    const link = document.createElement("a");
    link.download = "japan-health-bridge-medical-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
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
            <QrCode size={28} />
          </div>

          <div>
            <h2>QR Medical Card</h2>

            <p>
              Quickly share essential medical information with
              healthcare professionals.
            </p>
          </div>
        </div>
      </div>

      <div className="translator-info">
        <ShieldCheck size={20} />

        <div>
          <strong>Private Medical Information</strong>

          <p>
            This QR code contains essential information from
            your Health Passport. Show it only to trusted
            healthcare professionals.
          </p>
        </div>
      </div>

      <div className="qr-medical-layout">
        <section className="qr-card">
          <div className="qr-card-header">
            <div>
              <span className="result-label">
                JAPAN HEALTH BRIDGE
              </span>

              <h3>Emergency Medical Card</h3>

              <p>
                Scan to view essential medical information
              </p>
            </div>

            <QrCode size={35} />
          </div>

          <div className="qr-patient">
            <User size={22} />

            <div>
              <span>Patient</span>
              <strong>
                {profile.name || "Not provided"}
              </strong>
            </div>
          </div>

          <div className="qr-information-grid">
            <div>
              <HeartPulse size={18} />
              <span>Blood Group</span>
              <strong>
                {profile.bloodGroup || "Not provided"}
              </strong>
            </div>

            <div>
              <AlertTriangle size={18} />
              <span>Allergies</span>
              <strong>{allergies}</strong>
            </div>

            <div>
              <HeartPulse size={18} />
              <span>Conditions</span>
              <strong>{conditions}</strong>
            </div>

            <div>
              <Pill size={18} />
              <span>Medication</span>
              <strong>{medications}</strong>
            </div>

            <div>
              <Phone size={18} />
              <span>Emergency Contact</span>
              <strong>{emergencyName}</strong>
              <small>{emergencyPhone}</small>
            </div>
          </div>

          <div className="qr-warning">
            <ShieldCheck size={17} />

            <span>
              Verify critical medical information with the
              patient or healthcare professional.
            </span>
          </div>
        </section>

        <section className="qr-generator">
          <div className="qr-code-wrapper">
            <QRCodeCanvas
              id="medical-qr-code"
              value={qrData}
              size={240}
              level="M"
              includeMargin
            />
          </div>

          <h3>Scan Medical Information</h3>

          <p>
            A healthcare professional can scan this QR code
            using a smartphone camera.
          </p>

          <button
            className="health-primary-button"
            onClick={downloadQR}
          >
            <Download size={18} />
            Download QR Card
          </button>
        </section>
      </div>

      <div className="passport-disclaimer">
        <ShieldCheck size={17} />

        <span>
          The QR code contains information entered into the
          Health Passport. It does not contain your complete
          medical history or provide medical advice.
        </span>
      </div>
    </div>
  );
}