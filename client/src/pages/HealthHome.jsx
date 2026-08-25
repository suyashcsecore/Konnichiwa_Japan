import {
  HeartPulse,
  FileText,
  Languages,
  MessageCircle,
  Siren,
  ShieldCheck,
  ArrowRight,
  History,
  QrCode,
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HealthHeader from "../components/health/HealthHeader";
import { ClipboardCheck } from "lucide-react";
import "../health.css";

export default function HealthHome() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const features = [
    {
      title: "My Health Passport",
      description:
        "Store important medical information in one easy-to-access profile.",
      icon: <FileText />,
      path: "/health/passport"
    },
    {
      title: "Medical Translator",
      description:
        "Convert important medical information into a Japanese-friendly summary.",
      icon: <Languages />,
      path: "/health/translator"
    },
    {
      title: "Doctor Communication",
      description:
        "Use simple English and Japanese communication cards during a hospital visit.",
      icon: <MessageCircle />,
      path: "/health/doctor"
    },
    {
      title: "Emergency Card",
      description:
        "Quickly display critical medical information in English and Japanese.",
      icon: <Siren />,
      path: "/health/emergency"
    },
    {
  title: "Previous Medical History",
  description:
    "Store previous medical reports and create a doctor-friendly summary for hospital visits.",
  icon: <History />,
  path: "/health/history"
    },
    {
  title: "QR Medical Card",
  description:
    "Generate a QR code containing essential medical information for quick sharing.",
  icon: <QrCode />,
  path: "/health/qr-card"
    },
    {
  title: "Find Hospital / Clinic",
  description:
    "Find nearby hospitals and clinics in Japan and get essential location and contact information.",
  icon: <MapPin />,
  path: "/health/hospitals"
    },
    {
  title: "Hospital Visit Guide",
  description:
    "Prepare for your hospital visit with useful guidelines and a simple checklist.",
  icon: <ClipboardCheck size={28} />,
  path: "/health/hospital-guide"
}
  ];

  return (
    <div className="health-page">
      <HealthHeader />

      <section className="health-hero">
        <div>
          <div className="health-badge">
            <ShieldCheck size={16} />
            Your health information, organized
          </div>

          <h2>
            A bridge between
            <span> you and Japanese healthcare</span>
          </h2>

          <p>
            Keep your medical history organized and make communication
            easier when visiting a hospital or clinic in Japan.
          </p>

          <button
            className="health-primary-button"
            onClick={() => handleNavigate("/health/passport")}
          >
            Open Health Passport
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="health-hero-icon">
          <HeartPulse size={100} />
        </div>
      </section>

      <section className="health-warning">
        <strong>Important:</strong> Japan Health Bridge is a communication
        and information tool. It does not diagnose medical conditions or
        provide treatment recommendations.
      </section>

      <section className="health-features">
        {features.map((feature) => (
          <button
            key={feature.title}
            className="health-feature-card"
            onClick={() => handleNavigate(feature.path)}
          >
            <div className="health-feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

            <span>
              Open
              <ArrowRight size={16} />
            </span>
          </button>
        ))}
      </section>
    </div>
  );
}