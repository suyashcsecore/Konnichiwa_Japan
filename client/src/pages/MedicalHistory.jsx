import { useCallback, useEffect, useState } from "react";
import {
  FileText,
  Upload,
  Eye,
  Languages,
  X,
  CalendarDays,
  Hospital,
  Stethoscope,
  AlertTriangle,
  ArrowLeft,
  ShieldCheck,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getHealthProfile,
  saveHealthProfile
} from "../utils/healthStorage";
import { useUser } from "@clerk/clerk-react";
import HealthHeader from "../components/health/HealthHeader";

const API_URL = "http://localhost:5000/api/health";

export default function MedicalHistory() {
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();

  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    title: "",
    date: "",
    hospital: "",
    doctor: "",
    diagnosis: "",
    notes: "",
    file: null,
    fileName: ""
  });

  const [selectedReport, setSelectedReport] = useState(null);
  const [language, setLanguage] = useState("en");

  const fetchMedicalHistory = useCallback(async (clerkId) => {
    try {
      const response = await fetch(
        `${API_URL}/medical-history/${clerkId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load medical history"
        );
      }

      return data.reports || [];
    } catch (err) {
      console.error("Medical history loading error:", err);
      throw err;
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) {
      return;
    }

    let cancelled = false;

    const loadMedicalHistory = async () => {
      try {
        const data = await fetchMedicalHistory(user.id);

        if (!cancelled) {
          setReports(data);
          setError("");
          setLoadingReports(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Failed to load medical history"
          );
          setLoadingReports(false);
        }
      }
    };

    loadMedicalHistory();

    return () => {
      cancelled = true;
    };
  }, [
    isLoaded,
    isSignedIn,
    user?.id,
    fetchMedicalHistory
  ]);

  const handleChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF medical report.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Please choose a PDF smaller than 10 MB.");
      return;
    }

    setError("");
    setSuccess("");

    setForm((current) => ({
      ...current,
      file,
      fileName: file.name
    }));
  };

  const addReport = async () => {
    if (!user?.id) {
      setError(
        "Please sign in before uploading a medical report."
      );
      return;
    }

    if (!form.file) {
      setError("Please select a PDF medical report.");
      return;
    }

    if (!form.title.trim()) {
      setError("Please enter the report title.");
      return;
    }

    if (!form.diagnosis.trim()) {
      setError(
        "Please enter the diagnosis or medical issue."
      );
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("medicalReport", form.file);
      formData.append("clerkId", user.id);
      formData.append("title", form.title);
      formData.append("date", form.date);
      formData.append("hospital", form.hospital);
      formData.append("doctor", form.doctor);
      formData.append("diagnosis", form.diagnosis);
      formData.append("notes", form.notes);

      const response = await fetch(
        `${API_URL}/medical-history/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to process medical report"
        );
      }

      setSuccess(
        "Medical report uploaded and processed successfully."
      );

      setReports((current) => [
        data.report,
        ...current
      ]);

      setForm({
        title: "",
        date: "",
        hospital: "",
        doctor: "",
        diagnosis: "",
        notes: "",
        file: null,
        fileName: ""
      });
    } catch (err) {
      console.error(
        "Medical report upload error:",
        err
      );

      setError(
        err.message || "Failed to upload medical report"
      );
    } finally {
      setUploading(false);
    }
  };

  const deleteReport = async (report) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${report.title || "Medical Report"}"?`
  );

  if (!confirmed) {
    return;
  }

  try {
    setError("");
    setSuccess("");

    const response = await fetch(
      `${API_URL}/medical-history/${report._id}`,
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete medical report"
      );
    }

    setReports((current) =>
      current.filter(
        (item) => item._id !== report._id
      )
    );

    if (selectedReport?._id === report._id) {
      setSelectedReport(null);
    }

    setSuccess("Medical report deleted successfully.");

  } catch (err) {
    console.error("Delete medical report error:", err);

    setError(
      err.message || "Failed to delete medical report"
    );
  }
};
  const openReport = (
    report,
    selectedLanguage = "en"
  ) => {
    setSelectedReport(report);
    setLanguage(selectedLanguage);
    setError("");
    setSuccess("");
  };

  const getEnglishSummary = (report) => {
    if (report.englishSummary) {
      return report.englishSummary;
    }

    return `
PREVIOUS MEDICAL HISTORY

Report:
${report.title || "Not provided"}

Date:
${report.date || "Not provided"}

Hospital / Clinic:
${report.hospital || "Not provided"}

Doctor:
${report.doctor || "Not provided"}

Diagnosis / Medical Issue:
${report.diagnosis || "Not provided"}

Additional Notes:
${report.notes || "None provided"}
`;
  };

  const getJapaneseSummary = (report) => {
    if (report.japaneseSummary) {
      return report.japaneseSummary;
    }

    return `
過去の医療情報

診療記録：
${report.title || "未記入"}

日付：
${report.date || "未記入"}

病院・クリニック：
${report.hospital || "未記入"}

医師：
${report.doctor || "未記入"}

診断・病気：
${report.diagnosis || "未記入"}

追加情報：
${report.notes || "記載なし"}
`;
  };

  const addToHealthPassport = (report) => {
    if (!report) {
      setError("No medical report selected.");
      return;
    }

    const profile = getHealthProfile() || {};

    const existingConditions = Array.isArray(
      profile.conditions
    )
      ? profile.conditions
      : [];

    const newCondition =
      typeof report.diagnosis === "string"
        ? report.diagnosis.trim()
        : "";

    if (!newCondition) {
      setError(
        "This report does not contain a diagnosis or medical issue."
      );
      return;
    }

    const alreadyExists = existingConditions.some(
      (condition) =>
        String(condition).trim().toLowerCase() ===
        newCondition.toLowerCase()
    );

    if (alreadyExists) {
      setSuccess(
        "This medical condition is already in your Health Passport."
      );
      return;
    }

    const updatedConditions = [
      ...existingConditions,
      newCondition
    ];

    const updatedProfile = {
      ...profile,
      conditions: updatedConditions
    };

    saveHealthProfile(updatedProfile);

    setSuccess(
      `"${newCondition}" has been added to your Health Passport.`
    );

    setSelectedReport(null);

    navigate("/health/passport");
  };

  if (!isLoaded) {
    return (
      <div className="health-page">
        <HealthHeader />

        <div className="medical-history-empty">
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="health-page">
        <HealthHeader />

        <div className="medical-history-empty">
          <div>
            <ShieldCheck size={28} />
          </div>

          <h3>Please sign in</h3>

          <p>
            You need to sign in to access your medical
            history.
          </p>
        </div>
      </div>
    );
  }

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

        <div className="medical-history-title-row">
          <div className="medical-history-title-icon">
            <FileText size={28} />
          </div>

          <div>
            <h2>Previous Medical History</h2>

            <p>
              Upload previous medical reports and generate
              doctor-friendly English and Japanese summaries.
            </p>
          </div>
        </div>
      </div>

      <div className="medical-history-safety">
        <ShieldCheck size={20} />

        <div>
          <strong>
            Medical history communication tool
          </strong>

          <span>
            This feature organizes information from previous
            medical reports. It does not diagnose conditions or
            recommend treatment.
          </span>
        </div>
      </div>

      {error && (
        <div
          style={{
            margin: "20px 0",
            padding: "14px 18px",
            borderRadius: "10px",
            background: "#fee2e2",
            color: "#991b1b"
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            margin: "20px 0",
            padding: "14px 18px",
            borderRadius: "10px",
            background: "#dcfce7",
            color: "#166534"
          }}
        >
          {success}
        </div>
      )}

      <div className="medical-upload-card">
        <div className="medical-upload-header">
          <div className="medical-upload-icon">
            <Upload size={22} />
          </div>

          <div>
            <h3>Add Previous Medical Report</h3>

            <p>
              Upload a PDF. The backend will extract the text,
              use AI to summarize it, translate it into
              Japanese, and save the result in MongoDB.
            </p>
          </div>
        </div>

        <label className="medical-file-upload">
          <Upload size={28} />

          <strong>
            {form.fileName
              ? form.fileName
              : "Upload previous medical report"}
          </strong>

          <span>
            PDF only • Maximum 10 MB
          </span>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            hidden
          />
        </label>

        <div className="medical-form-grid">
          <div className="medical-form-group">
            <label>
              <FileText size={15} />
              Report Title
            </label>

            <input
              type="text"
              placeholder="Example: Blood Test Report"
              value={form.title}
              onChange={(event) =>
                handleChange(
                  "title",
                  event.target.value
                )
              }
            />
          </div>

          <div className="medical-form-group">
            <label>
              <CalendarDays size={15} />
              Date
            </label>

            <input
              type="date"
              value={form.date}
              onChange={(event) =>
                handleChange(
                  "date",
                  event.target.value
                )
              }
            />
          </div>

          <div className="medical-form-group">
            <label>
              <Hospital size={15} />
              Hospital / Clinic
            </label>

            <input
              type="text"
              placeholder="Hospital or clinic name"
              value={form.hospital}
              onChange={(event) =>
                handleChange(
                  "hospital",
                  event.target.value
                )
              }
            />
          </div>

          <div className="medical-form-group">
            <label>
              <Stethoscope size={15} />
              Doctor
            </label>

            <input
              type="text"
              placeholder="Doctor name"
              value={form.doctor}
              onChange={(event) =>
                handleChange(
                  "doctor",
                  event.target.value
                )
              }
            />
          </div>

          <div className="medical-form-group">
            <label>
              <AlertTriangle size={15} />
              Diagnosis / Medical Issue
            </label>

            <input
              type="text"
              placeholder="Example: Asthma"
              value={form.diagnosis}
              onChange={(event) =>
                handleChange(
                  "diagnosis",
                  event.target.value
                )
              }
            />
          </div>

          <div className="medical-form-group">
            <label>
              Additional Notes
            </label>

            <input
              type="text"
              placeholder="Important information"
              value={form.notes}
              onChange={(event) =>
                handleChange(
                  "notes",
                  event.target.value
                )
              }
            />
          </div>
        </div>

        <button
          className="medical-add-report-button"
          onClick={addReport}
          disabled={uploading}
        >
          <Upload size={17} />

          {uploading
            ? "Processing Medical Report..."
            : "Add Medical Report"}
        </button>
      </div>

      <div className="medical-history-section">
        <div className="medical-history-section-header">
          <div>
            <span>MEDICAL RECORDS</span>

            <h3>Previous Reports</h3>

            <p>
              Previous medical information stored in your
              medical history.
            </p>
          </div>

          <div className="medical-history-count">
            {reports.length}
          </div>
        </div>

        {loadingReports ? (
          <div className="medical-history-empty">
            <div>
              <FileText size={28} />
            </div>

            <h3>Loading medical history...</h3>

            <p>
              Retrieving your previous medical reports.
            </p>
          </div>
        ) : reports.length === 0 ? (
          <div className="medical-history-empty">
            <div>
              <FileText size={28} />
            </div>

            <h3>No previous reports yet</h3>

            <p>
              Upload your previous medical report above.
              Your report will be processed and stored
              securely in the database.
            </p>
          </div>
        ) : (
          <div className="medical-reports-grid">
            {reports.map((report) => (
              <div
                className="medical-report-card"
                key={report._id}
              >
                <div className="medical-report-card-top">
                  <div className="medical-report-file-icon">
                    <FileText size={22} />
                  </div>

                  <div className="medical-report-main">
                    <h3>
                      {report.title || "Medical Report"}
                    </h3>

                    <span className="medical-report-type">
                      Previous Medical Report
                    </span>
                  </div>
                </div>

                <div className="medical-report-details">
                  <div>
                    <CalendarDays size={15} />
                    {report.date ||
                      "Date not provided"}
                  </div>

                  <div>
                    <Hospital size={15} />
                    {report.hospital ||
                      "Hospital not provided"}
                  </div>

                  <div>
                    <Stethoscope size={15} />
                    {report.diagnosis ||
                      "Diagnosis not provided"}
                  </div>
                </div>

               <div className="medical-report-actions">
  <button
    className="medical-view-button"
    onClick={() =>
      openReport(report, "en")
    }
  >
    <Eye size={15} />
    View Summary
  </button>

  <button
    className="medical-japanese-button"
    onClick={() =>
      openReport(report, "ja")
    }
  >
    <Languages size={15} />
    Japanese
  </button>

  <button
    className="medical-pdf-button"
    onClick={() => {
      window.open(
        `${API_URL}/medical-history/report/${report._id}/pdf`,
        "_blank"
      );
    }}
  >
    <FileText size={15} />
    View Original PDF
  </button>

  <button
    className="medical-delete-button"
    onClick={() => deleteReport(report)}
  >
    <Trash2 size={15} />
    Delete
  </button>
</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedReport && (
        <div
          className="medical-summary-overlay"
          onClick={() =>
            setSelectedReport(null)
          }
        >
          <div
            className="medical-summary-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="medical-summary-modal-header">
              <div>
                <span>
                  DOCTOR COMMUNICATION SUMMARY
                </span>

                <h2>
                  {selectedReport.title ||
                    "Medical Report"}
                </h2>
              </div>

              <button
                className="medical-modal-close"
                type="button"
                onClick={() =>
                  setSelectedReport(null)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="medical-summary-language">
              <button
                type="button"
                className={
                  language === "en"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setLanguage("en")
                }
              >
                English
              </button>

              <button
                type="button"
                className={
                  language === "ja"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setLanguage("ja")
                }
              >
                日本語
              </button>
            </div>

            <div className="medical-doctor-summary">
              <div className="doctor-summary-header">
                <Languages size={22} />

                <div>
                  <h3>
                    {language === "en"
                      ? "Previous Medical History"
                      : "過去の医療情報"}
                  </h3>

                  <span>
                    {language === "en"
                      ? "Prepared for communication with healthcare professionals"
                      : "医療従事者とのコミュニケーション用"}
                  </span>
                </div>
              </div>

              <div className="doctor-summary-grid">
                <div>
                  <span>
                    {language === "en"
                      ? "Date"
                      : "日付"}
                  </span>

                  <strong>
                    {selectedReport.date ||
                      (language === "en"
                        ? "Not provided"
                        : "未記入")}
                  </strong>
                </div>

                <div>
                  <span>
                    {language === "en"
                      ? "Hospital"
                      : "病院"}
                  </span>

                  <strong>
                    {selectedReport.hospital ||
                      (language === "en"
                        ? "Not provided"
                        : "未記入")}
                  </strong>
                </div>

                <div>
                  <span>
                    {language === "en"
                      ? "Doctor"
                      : "医師"}
                  </span>

                  <strong>
                    {selectedReport.doctor ||
                      (language === "en"
                        ? "Not provided"
                        : "未記入")}
                  </strong>
                </div>

                <div>
                  <span>
                    {language === "en"
                      ? "Diagnosis"
                      : "診断"}
                  </span>

                  <strong>
                    {selectedReport.diagnosis ||
                      (language === "en"
                        ? "Not provided"
                        : "未記入")}
                  </strong>
                </div>
              </div>

              <div className="history-highlight diagnosis">
                <Stethoscope size={20} />

                <div>
                  <span>
                    {language === "en"
                      ? "Medical Issue"
                      : "病気・症状"}
                  </span>

                  <strong>
                    {selectedReport.diagnosis ||
                      (language === "en"
                        ? "No diagnosis provided"
                        : "診断情報なし")}
                  </strong>
                </div>
              </div>

              <div className="history-highlight">
                <FileText size={20} />

                <div>
                  <span>
                    {language === "en"
                      ? "AI Medical Summary"
                      : "AI 医療概要"}
                  </span>

                  <strong>
                    {language === "en"
                      ? getEnglishSummary(
                          selectedReport
                        )
                      : getJapaneseSummary(
                          selectedReport
                        )}
                  </strong>
                </div>
              </div>

              {selectedReport.originalFileName && (
                <div className="history-highlight">
                  <FileText size={20} />

                  <div>
                    <span>
                      {language === "en"
                        ? "Original Report"
                        : "元の診療記録"}
                    </span>

                    <strong>
                      {selectedReport.originalFileName}
                    </strong>
                  </div>
                </div>
              )}

              <div className="history-highlight warning">
                <AlertTriangle size={20} />

                <div>
                  <span>
                    {language === "en"
                      ? "Important"
                      : "重要"}
                  </span>

                  <strong>
                    {language === "en"
                      ? "This summary is for communication only. Critical medical information should be verified with a healthcare professional."
                      : "この概要はコミュニケーションのみを目的としています。重要な医療情報は医療従事者に確認してください。"}
                  </strong>
                </div>
              </div>

              <div className="health-passport-add-section">
                <div className="health-passport-add-info">
                  <ShieldCheck size={20} />

                  <div>
                    <strong>
                      Add to Health Passport
                    </strong>

                    <span>
                      Add the medical issue from this
                      report to your saved Health
                      Passport.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="health-passport-add-button"
                  onClick={() =>
                    addToHealthPassport(
                      selectedReport
                    )
                  }
                >
                  <ShieldCheck size={17} />
                  Add to Health Passport
                </button>
              </div>

              <div className="medical-history-text">
                <pre
                  className={
                    language === "ja"
                      ? "japanese-summary"
                      : ""
                  }
                >
                  {language === "en"
                    ? getEnglishSummary(
                        selectedReport
                      )
                    : getJapaneseSummary(
                        selectedReport
                      )}
                </pre>
              </div>
            </div>

            <div className="medical-summary-modal-footer">
              <ShieldCheck size={15} />

              <span>
                Medical information should be verified
                with the patient or healthcare
                professional when possible.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}