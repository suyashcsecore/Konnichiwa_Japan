import { useState } from "react";
import {
  FileText,
  Upload,
  Trash2,
  Eye,
  Languages,
  X,
  CalendarDays,
  Hospital,
  Stethoscope,
  AlertTriangle,
  ArrowLeft,
  ShieldCheck,
  Image as ImageIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HealthHeader from "../components/health/HealthHeader";

export default function MedicalHistory() {
  const navigate = useNavigate();

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem("japanMedicalHistory");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }

    return [];
  });

  const [form, setForm] = useState({
    title: "",
    date: "",
    hospital: "",
    doctor: "",
    diagnosis: "",
    notes: "",
    fileName: "",
    fileType: "",
    filePreview: ""
  });

  const [selectedReport, setSelectedReport] = useState(null);
  const [language, setLanguage] = useState("en");

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

    if (
      file.type !== "application/pdf" &&
      !file.type.startsWith("image/")
    ) {
      alert("Please upload a PDF or image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Please choose a file smaller than 10 MB.");
      return;
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        setForm((current) => ({
          ...current,
          fileName: file.name,
          fileType: file.type,
          filePreview: reader.result
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setForm((current) => ({
        ...current,
        fileName: file.name,
        fileType: file.type,
        filePreview: ""
      }));
    }
  };

  const saveReports = (updatedReports) => {
    setReports(updatedReports);

    localStorage.setItem(
      "japanMedicalHistory",
      JSON.stringify(updatedReports)
    );
  };

  const addReport = () => {
    if (!form.title.trim()) {
      alert("Please enter the report title.");
      return;
    }

    if (!form.diagnosis.trim()) {
      alert("Please enter the diagnosis or medical issue.");
      return;
    }

    const newReport = {
      id: Date.now(),
      title: form.title,
      date: form.date,
      hospital: form.hospital,
      doctor: form.doctor,
      diagnosis: form.diagnosis,
      notes: form.notes,
      fileName: form.fileName,
      fileType: form.fileType,
      filePreview: form.filePreview
    };

    const updatedReports = [
      newReport,
      ...reports
    ];

    saveReports(updatedReports);

    setForm({
      title: "",
      date: "",
      hospital: "",
      doctor: "",
      diagnosis: "",
      notes: "",
      fileName: "",
      fileType: "",
      filePreview: ""
    });
  };

  const deleteReport = (id) => {
    const updatedReports = reports.filter(
      (report) => report.id !== id
    );

    saveReports(updatedReports);

    if (selectedReport?.id === id) {
      setSelectedReport(null);
    }
  };

  const getEnglishSummary = (report) => {
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

Previous Report:
${report.fileName || "No report attached"}
`;
  };

  const getJapaneseSummary = (report) => {
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

以前の診療記録：
${report.fileName || "ファイルなし"}
`;
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

        <div className="medical-history-title-row">
          <div className="medical-history-title-icon">
            <FileText size={28} />
          </div>

          <div>
            <h2>Previous Medical History</h2>

            <p>
              Keep previous medical reports and important
              health information ready for future hospital visits.
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
            medical visits. It does not diagnose conditions or
            recommend treatment.
          </span>
        </div>
      </div>

      <div className="medical-upload-card">
        <div className="medical-upload-header">
          <div className="medical-upload-icon">
            <Upload size={22} />
          </div>

          <div>
            <h3>Add Previous Medical Report</h3>

            <p>
              Upload a previous report and add the important
              information for future doctor visits.
            </p>
          </div>
        </div>

        <label className="medical-file-upload">
          {form.filePreview ? (
            <img
              src={form.filePreview}
              alt="Medical report preview"
              style={{
                width: "100%",
                maxWidth: "260px",
                maxHeight: "180px",
                objectFit: "contain",
                borderRadius: "10px"
              }}
            />
          ) : (
            <Upload size={28} />
          )}

          <strong>
            {form.fileName
              ? form.fileName
              : "Upload previous medical report"}
          </strong>

          <span>
            PDF, JPG, JPEG or PNG • Maximum 10 MB
          </span>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
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
        >
          <Upload size={17} />
          Add Medical Report
        </button>
      </div>

      <div className="medical-history-section">
        <div className="medical-history-section-header">
          <div>
            <span>MEDICAL RECORDS</span>

            <h3>Previous Reports</h3>

            <p>
              Previous medical information available for
              healthcare communication.
            </p>
          </div>

          <div className="medical-history-count">
            {reports.length}
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="medical-history-empty">
            <div>
              <FileText size={28} />
            </div>

            <h3>No previous reports yet</h3>

            <p>
              Upload your previous medical reports above to
              create a useful medical history for future
              hospital visits.
            </p>
          </div>
        ) : (
          <div className="medical-reports-grid">
            {reports.map((report) => (
              <div
                className="medical-report-card"
                key={report.id}
              >
                <div className="medical-report-card-top">
                  <div className="medical-report-file-icon">
                    {report.fileType?.startsWith(
                      "image/"
                    ) ? (
                      <ImageIcon size={22} />
                    ) : (
                      <FileText size={22} />
                    )}
                  </div>

                  <div className="medical-report-main">
                    <h3>{report.title}</h3>

                    <span className="medical-report-type">
                      Previous Medical Report
                    </span>
                  </div>

                  <button
                    className="medical-delete-button"
                    onClick={() =>
                      deleteReport(report.id)
                    }
                    title="Delete report"
                  >
                    <Trash2 size={17} />
                  </button>
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
                      setSelectedReport(report)
                    }
                  >
                    <Eye size={15} />
                    View Summary
                  </button>

                  <button
                    className="medical-japanese-button"
                    onClick={() => {
                      setSelectedReport(report);
                      setLanguage("ja");
                    }}
                  >
                    <Languages size={15} />
                    Japanese
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
                  {selectedReport.title}
                </h2>
              </div>

              <button
                className="medical-modal-close"
                onClick={() =>
                  setSelectedReport(null)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="medical-summary-language">
              <button
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
                      ? "Additional Notes"
                      : "追加情報"}
                  </span>

                  <strong>
                    {selectedReport.notes ||
                      (language === "en"
                        ? "No additional notes"
                        : "追加情報なし")}
                  </strong>
                </div>
              </div>

              {selectedReport.fileName && (
                <div className="history-highlight">
                  {selectedReport.fileType?.startsWith(
                    "image/"
                  ) ? (
                    <ImageIcon size={20} />
                  ) : (
                    <FileText size={20} />
                  )}

                  <div>
                    <span>
                      {language === "en"
                        ? "Attached Report"
                        : "添付された診療記録"}
                    </span>

                    <strong>
                      {selectedReport.fileName}
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