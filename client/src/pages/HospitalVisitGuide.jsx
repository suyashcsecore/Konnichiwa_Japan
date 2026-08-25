import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Stethoscope,
  AlertTriangle,
  Clock,
  UserRound,
  FileText,
  Pill,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HealthHeader from "../components/health/HealthHeader";
import "../health.css";

const checklistItems = [
  {
    title: "Bring your Health Passport",
    description: "Keep your important medical information ready."
  },
  {
    title: "Bring your identification",
    description: "Carry your passport, residence card, or other valid ID."
  },
  {
    title: "Bring your insurance information",
    description: "Keep your health insurance card or insurance details with you."
  },
  {
    title: "Prepare your symptoms",
    description: "Write down what you are feeling, when it started, and how serious it is."
  },
  {
    title: "Prepare your medicines",
    description: "Make a list of medicines you currently take and their dosage."
  },
  {
    title: "Prepare allergy information",
    description: "Know and communicate any medicine or food allergies."
  },
  {
    title: "Check the clinic hours",
    description: "Confirm opening hours and whether an appointment is required."
  },
  {
    title: "Prepare Japanese phrases",
    description: "Use the Doctor Communication feature if you need help communicating."
  }
];

const preparationGuidelines = [
  {
    icon: <UserRound size={21} />,
    title: "Before leaving",
    text: "Take your identification, insurance information, Health Passport, medicines, and any previous medical documents."
  },
  {
    icon: <FileText size={21} />,
    title: "Prepare your medical information",
    text: "Know your symptoms, allergies, current medicines, previous surgeries, and important medical history."
  },
  {
    icon: <Pill size={21} />,
    title: "Bring your medicines",
    text: "If possible, carry the medicine packaging or a written list showing the medicine name, dosage, and frequency."
  },
  {
    icon: <Clock size={21} />,
    title: "Check before visiting",
    text: "Check the hospital or clinic opening hours and confirm whether appointments are necessary."
  }
];

const visitSteps = [
  {
    number: "01",
    title: "Reception",
    text: "Tell the reception staff that you would like to see a doctor. Present your identification and insurance information if requested."
  },
  {
    number: "02",
    title: "Explain your symptoms",
    text: "Describe what you are feeling, where it hurts, when it started, and whether the symptoms are getting better or worse."
  },
  {
    number: "03",
    title: "Medical examination",
    text: "Follow the doctor's instructions and answer questions about your medical history, medicines, and allergies."
  },
  {
    number: "04",
    title: "Treatment and medicine",
    text: "Listen carefully to the doctor's instructions. Ask about the medicine name, dosage, timing, and possible precautions."
  },
  {
    number: "05",
    title: "Payment and documents",
    text: "Complete the payment process and keep your receipt, prescription, medical documents, and other important paperwork."
  }
];

const questions = [
  {
    question: "What is causing my symptoms?",
    japanese: "症状の原因は何ですか？"
  },
  {
    question: "How should I take this medicine?",
    japanese: "この薬はどのように飲めばいいですか？"
  },
  {
    question: "Are there any side effects?",
    japanese: "副作用はありますか？"
  },
  {
    question: "When should I come back?",
    japanese: "いつまた来ればいいですか？"
  }
];

export default function HospitalVisitGuide() {
  const navigate = useNavigate();

  const [checkedItems, setCheckedItems] = useState([]);

  const toggleChecklist = (index) => {
    setCheckedItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  const completed = checkedItems.length;
  const total = checklistItems.length;
  const progress = Math.round((completed / total) * 100);

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
            <ClipboardCheck size={28} />
          </div>

          <div>
            <h2>Hospital Visit Guide</h2>

            <p>
              Simple guidelines and a checklist to help you prepare
              for a hospital or clinic visit in Japan.
            </p>
          </div>
        </div>
      </div>

      <div className="hospital-guide-section">
        <div className="hospital-section-header">
          <div>
            <span>BEFORE YOUR VISIT</span>

            <h3>How to Prepare</h3>

            <p>
              A few simple things can make your hospital visit
              easier and more organized.
            </p>
          </div>
        </div>

        <div className="hospital-guideline-grid">
          {preparationGuidelines.map((item, index) => (
            <div
              className="hospital-guideline-card"
              key={index}
            >
              <div className="checklist-item-icon">
                {item.icon}
              </div>

              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hospital-guide-section">
        <div className="hospital-section-header">
          <div>
            <span>YOUR CHECKLIST</span>

            <h3>Hospital Visit Checklist</h3>

            <p>
              Tap each item after you have prepared it.
            </p>
          </div>

          <div className="hospital-checklist-count">
            {completed}/{total}
          </div>
        </div>

        <div className="hospital-checklist">
          {checklistItems.map((item, index) => {
            const checked = checkedItems.includes(index);

            return (
              <button
                type="button"
                key={index}
                className={
                  checked
                    ? "hospital-checklist-item checked"
                    : "hospital-checklist-item"
                }
                onClick={() => toggleChecklist(index)}
              >
                <div className="checklist-icon">
                  {checked ? (
                    <CheckCircle2 size={22} />
                  ) : (
                    <Circle size={22} />
                  )}
                </div>

                <div>
                  <span>{item.title}</span>
                  <p>{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="hospital-progress-card">
          <div className="hospital-progress-header">
            <div>
              <span>PREPARATION PROGRESS</span>
              <h3>Ready for your visit?</h3>
            </div>

            <strong>{progress}%</strong>
          </div>

          <div className="hospital-progress-bar">
            <div
              className="hospital-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p>
            {completed === total
              ? "Everything on your checklist is ready."
              : `${total - completed} item${
                  total - completed === 1 ? "" : "s"
                } remaining.`}
          </p>

          {completed === total && (
            <div className="hospital-ready-message">
              <ShieldCheck size={19} />
              You are ready for your hospital visit.
            </div>
          )}
        </div>
      </div>

      <div className="hospital-guide-section">
        <div className="hospital-section-header">
          <div>
            <span>DURING YOUR VISIT</span>

            <h3>What Usually Happens</h3>

            <p>
              A simple overview of the usual hospital or clinic process.
            </p>
          </div>
        </div>

        <div className="hospital-visit-steps">
          {visitSteps.map((step) => (
            <div
              className="hospital-visit-step"
              key={step.number}
            >
              <div className="hospital-step-number">
                {step.number}
              </div>

              <div className="hospital-step-content">
                <div>
                  <h4>{step.title}</h4>
                </div>

                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hospital-guide-section">
        <div className="hospital-section-header">
          <div>
            <span>COMMUNICATION</span>

            <h3>Useful Questions to Ask</h3>

            <p>
              You can show these questions to a doctor if you need help
              communicating.
            </p>
          </div>
        </div>

        <div className="doctor-question-grid">
          {questions.map((item, index) => (
            <div
              className="doctor-question-card"
              key={index}
            >
              <Stethoscope size={20} />

              <div>
                <strong>{item.question}</strong>
                <span>{item.japanese}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hospital-guide-section">
        <div className="hospital-section-header">
          <div>
            <span>PAYMENT & DOCUMENTS</span>

            <h3>After Your Visit</h3>
          </div>
        </div>

        <div className="hospital-payment-card">
          <CreditCard size={24} />

          <div>
            <p>
              Keep your receipt and any medical documents you receive.
            </p>

            <p>
              If you receive a prescription, follow the instructions
              provided by the doctor or pharmacist.
            </p>

            <p>
              Keep your next appointment date somewhere safe if a
              follow-up visit is required.
            </p>
          </div>
        </div>
      </div>

      <div className="hospital-guide-section">
        <div className="hospital-important-card">
          <div className="hospital-important-icon">
            <AlertTriangle size={22} />
          </div>

          <div>
            <h3>Important</h3>

            <ul>
              <li>
                Hospital procedures can vary between facilities.
              </li>

              <li>
                Check the hospital's opening hours before visiting.
              </li>

              <li>
                Some clinics may require an appointment.
              </li>

              <li>
                Bring your identification and insurance information.
              </li>

              <li>
                For serious or life-threatening emergencies, seek
                emergency medical assistance immediately.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="hospital-emergency-note">
        <AlertTriangle size={20} />

        <div>
          <strong>Need emergency help?</strong>

          <span>
            This guide is for general preparation and does not replace
            emergency medical care.
          </span>
        </div>
      </div>
    </div>
  );
}