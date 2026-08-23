import { useState } from "react";
import {
  User,
  Pill,
  AlertTriangle,
  Activity,
  Phone,
  ShieldCheck,
  Save,
  HeartPulse,
  CalendarDays,
  FileText,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HealthHeader from "../components/health/HealthHeader";
import { getHealthProfile, saveHealthProfile } from "../utils/healthStorage";

export default function HealthPassport() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(() => getHealthProfile());
  const [saved, setSaved] = useState(false);

  const updateProfile = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value
    }));
    setSaved(false);
  };

  const updateEmergencyContact = (field, value) => {
    setProfile((current) => ({
      ...current,
      emergencyContact: {
        ...current.emergencyContact,
        [field]: value
      }
    }));
    setSaved(false);
  };

  const updateInsurance = (field, value) => {
    setProfile((current) => ({
      ...current,
      insurance: {
        ...current.insurance,
        [field]: value
      }
    }));
    setSaved(false);
  };

  const updateAllergy = (value) => {
    setProfile((current) => ({
      ...current,
      allergies: value ? [value] : []
    }));
    setSaved(false);
  };

  const updateCondition = (value) => {
    setProfile((current) => ({
      ...current,
      conditions: value ? [value] : []
    }));
    setSaved(false);
  };

  const updateMedication = (field, value) => {
    setProfile((current) => ({
      ...current,
      medications: [
        {
          ...(current.medications?.[0] || {}),
          [field]: value
        }
      ]
    }));
    setSaved(false);
  };

  const updateSurgery = (field, value) => {
    setProfile((current) => ({
      ...current,
      surgeries: [
        {
          ...(current.surgeries?.[0] || {}),
          [field]: value
        }
      ]
    }));
    setSaved(false);
  };

  const handleSave = () => {
    saveHealthProfile(profile);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3500);
  };

  const medication = profile.medications?.[0] || {};
  const surgery = profile.surgeries?.[0] || {};

  return (
    <div className="health-page">
      <HealthHeader />

      <div className="health-passport-container">

        <div className="health-passport-top">
          <div>
            <button
              className="health-back-button"
              onClick={() => navigate("/health")}
            >
              ← Back to Health Center
            </button>

            <div className="health-passport-heading">
              <div className="health-passport-heading-icon">
                <HeartPulse size={28} />
              </div>

              <div>
                <h2>My Health Passport</h2>
                <p>
                  Keep your essential medical information organized and
                  ready to share with healthcare professionals in Japan.
                </p>
              </div>
            </div>
          </div>

          <div className="health-passport-secure">
            <ShieldCheck size={18} />
            <span>Private Health Information</span>
          </div>
        </div>

        <div className="health-passport-banner">
          <div className="health-passport-banner-icon">
            <FileText size={23} />
          </div>

          <div>
            <strong>Your information at a glance</strong>
            <p>
              Review your medical details before visiting a hospital or
              clinic. Keep this information accurate and up to date.
            </p>
          </div>
        </div>

        <section className="passport-section">
          <div className="passport-section-heading">
            <div className="passport-section-icon">
              <User size={20} />
            </div>

            <div>
              <h3>Personal Information</h3>
              <p>Basic information used to identify you.</p>
            </div>
          </div>

          <div className="passport-form-grid">

            <div className="passport-field">
              <label>Full Name</label>
              <div className="passport-input-wrapper">
                <User size={17} />
                <input
                  type="text"
                  value={profile.name || ""}
                  onChange={(e) =>
                    updateProfile("name", e.target.value)
                  }
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="passport-field">
              <label>Date of Birth</label>
              <div className="passport-input-wrapper">
                <CalendarDays size={17} />
                <input
                  type="date"
                  value={profile.dateOfBirth || ""}
                  onChange={(e) =>
                    updateProfile("dateOfBirth", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="passport-field">
              <label>Blood Group</label>
              <div className="passport-input-wrapper">
                <HeartPulse size={17} />
                <select
                  value={profile.bloodGroup || ""}
                  onChange={(e) =>
                    updateProfile("bloodGroup", e.target.value)
                  }
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

          </div>
        </section>

        <div className="passport-two-column">

          <section className="passport-section">
            <div className="passport-section-heading">
              <div className="passport-section-icon warning">
                <AlertTriangle size={20} />
              </div>

              <div>
                <h3>Allergies</h3>
                <p>Important allergies doctors should know about.</p>
              </div>
            </div>

            <div className="passport-field">
              <label>Known Allergy</label>
              <div className="passport-input-wrapper">
                <AlertTriangle size={17} />
                <input
                  type="text"
                  value={profile.allergies?.[0] || ""}
                  onChange={(e) =>
                    updateAllergy(e.target.value)
                  }
                  placeholder="e.g. Penicillin"
                />
              </div>
            </div>

            <div className="passport-info-message">
              <AlertTriangle size={16} />
              <span>
                Add allergies that may be important during emergency
                treatment.
              </span>
            </div>
          </section>

          <section className="passport-section">
            <div className="passport-section-heading">
              <div className="passport-section-icon">
                <Activity size={20} />
              </div>

              <div>
                <h3>Medical Conditions</h3>
                <p>Existing conditions healthcare staff should know.</p>
              </div>
            </div>

            <div className="passport-field">
              <label>Medical Condition</label>
              <div className="passport-input-wrapper">
                <Activity size={17} />
                <input
                  type="text"
                  value={profile.conditions?.[0] || ""}
                  onChange={(e) =>
                    updateCondition(e.target.value)
                  }
                  placeholder="e.g. Asthma"
                />
              </div>
            </div>
          </section>

        </div>

        <section className="passport-section">
          <div className="passport-section-heading">
            <div className="passport-section-icon">
              <Pill size={20} />
            </div>

            <div>
              <h3>Current Medication</h3>
              <p>List medication you are currently taking.</p>
            </div>
          </div>

          <div className="passport-form-grid three">

            <div className="passport-field">
              <label>Medicine Name</label>
              <div className="passport-input-wrapper">
                <Pill size={17} />
                <input
                  type="text"
                  value={medication.name || ""}
                  onChange={(e) =>
                    updateMedication("name", e.target.value)
                  }
                  placeholder="e.g. Example Medicine"
                />
              </div>
            </div>

            <div className="passport-field">
              <label>Dosage</label>
              <div className="passport-input-wrapper">
                <FileText size={17} />
                <input
                  type="text"
                  value={medication.dosage || ""}
                  onChange={(e) =>
                    updateMedication("dosage", e.target.value)
                  }
                  placeholder="e.g. 10mg"
                />
              </div>
            </div>

            <div className="passport-field">
              <label>Frequency</label>
              <div className="passport-input-wrapper">
                <CalendarDays size={17} />
                <input
                  type="text"
                  value={medication.frequency || ""}
                  onChange={(e) =>
                    updateMedication("frequency", e.target.value)
                  }
                  placeholder="e.g. Once daily"
                />
              </div>
            </div>

          </div>
        </section>

        <section className="passport-section">
          <div className="passport-section-heading">
            <div className="passport-section-icon">
              <FileText size={20} />
            </div>

            <div>
              <h3>Previous Surgery</h3>
              <p>Record any important previous surgical procedures.</p>
            </div>
          </div>

          <div className="passport-form-grid two">

            <div className="passport-field">
              <label>Surgery / Procedure</label>
              <div className="passport-input-wrapper">
                <FileText size={17} />
                <input
                  type="text"
                  value={surgery.name || ""}
                  onChange={(e) =>
                    updateSurgery("name", e.target.value)
                  }
                  placeholder="e.g. Appendectomy"
                />
              </div>
            </div>

            <div className="passport-field">
              <label>Year</label>
              <div className="passport-input-wrapper">
                <CalendarDays size={17} />
                <input
                  type="text"
                  value={surgery.year || ""}
                  onChange={(e) =>
                    updateSurgery("year", e.target.value)
                  }
                  placeholder="e.g. 2024"
                />
              </div>
            </div>

          </div>
        </section>

        <div className="passport-two-column">

          <section className="passport-section">
            <div className="passport-section-heading">
              <div className="passport-section-icon emergency">
                <Phone size={20} />
              </div>

              <div>
                <h3>Emergency Contact</h3>
                <p>Someone who can be contacted in an emergency.</p>
              </div>
            </div>

            <div className="passport-form-stack">

              <div className="passport-field">
                <label>Name</label>
                <div className="passport-input-wrapper">
                  <User size={17} />
                  <input
                    type="text"
                    value={profile.emergencyContact?.name || ""}
                    onChange={(e) =>
                      updateEmergencyContact("name", e.target.value)
                    }
                    placeholder="Contact name"
                  />
                </div>
              </div>

              <div className="passport-field">
                <label>Phone</label>
                <div className="passport-input-wrapper">
                  <Phone size={17} />
                  <input
                    type="tel"
                    value={profile.emergencyContact?.phone || ""}
                    onChange={(e) =>
                      updateEmergencyContact("phone", e.target.value)
                    }
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div className="passport-field">
                <label>Relationship</label>
                <div className="passport-input-wrapper">
                  <User size={17} />
                  <input
                    type="text"
                    value={
                      profile.emergencyContact?.relationship || ""
                    }
                    onChange={(e) =>
                      updateEmergencyContact(
                        "relationship",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Parent, Friend"
                  />
                </div>
              </div>

            </div>
          </section>

          <section className="passport-section">
            <div className="passport-section-heading">
              <div className="passport-section-icon">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h3>Insurance</h3>
                <p>Basic insurance information for healthcare visits.</p>
              </div>
            </div>

            <div className="passport-form-stack">

              <div className="passport-field">
                <label>Insurance Provider</label>
                <div className="passport-input-wrapper">
                  <ShieldCheck size={17} />
                  <input
                    type="text"
                    value={profile.insurance?.provider || ""}
                    onChange={(e) =>
                      updateInsurance("provider", e.target.value)
                    }
                    placeholder="Insurance provider"
                  />
                </div>
              </div>

              <div className="passport-field">
                <label>Policy Number</label>
                <div className="passport-input-wrapper">
                  <FileText size={17} />
                  <input
                    type="text"
                    value={profile.insurance?.policyNumber || ""}
                    onChange={(e) =>
                      updateInsurance(
                        "policyNumber",
                        e.target.value
                      )
                    }
                    placeholder="Policy number"
                  />
                </div>
              </div>

            </div>
          </section>

        </div>

        <div className="passport-save-area">

          <div className="passport-save-info">
            <ShieldCheck size={21} />

            <div>
              <strong>Your information stays on this device</strong>
              <span>
                Save your changes before leaving this page.
              </span>
            </div>
          </div>

          <button
            className="passport-save-button"
            onClick={handleSave}
          >
            <Save size={19} />
            Save Health Passport
          </button>

        </div>

        {saved && (
          <div className="health-save-success">
            <div className="health-save-icon">
              <CheckCircle2 size={22} />
            </div>

            <div className="health-save-content">
              <strong>Health Information Saved</strong>
              <span>
                Your Health Passport has been updated successfully.
              </span>
            </div>

            <div className="health-save-status">
              <ShieldCheck size={17} />
              Saved
            </div>
          </div>
        )}

        <div className="passport-disclaimer">
          <ShieldCheck size={17} />

          <span>
            Japan Health Bridge is a communication and information
            tool. It does not diagnose medical conditions or provide
            treatment recommendations.
          </span>
        </div>

      </div>
    </div>
  );
}