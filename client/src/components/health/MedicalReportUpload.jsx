import { useState } from "react";
import {
  Upload,
  FileText,
  Calendar,
  Building2,
  Stethoscope,
  Plus
} from "lucide-react";

export default function MedicalReportUpload({ onAdd }) {
  const [file, setFile] = useState(null);
  const [reportDate, setReportDate] = useState("");
  const [hospital, setHospital] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [reportType, setReportType] = useState("Medical Report");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please choose a medical report first.");
      return;
    }

    const report = {
      fileName: file.name,
      fileType: file.type,
      reportDate,
      hospital,
      diagnosis,
      reportType
    };

    onAdd(report);

    setFile(null);
    setReportDate("");
    setHospital("");
    setDiagnosis("");
    setReportType("Medical Report");

    event.target.reset();
  };

  return (
    <div className="medical-upload-card">
      <div className="medical-upload-header">
        <div className="medical-upload-icon">
          <Upload size={25} />
        </div>

        <div>
          <h3>Upload Previous Medical Report</h3>
          <p>
            Keep your previous medical history available when
            visiting a hospital in Japan.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="medical-file-upload">
          <FileText size={24} />

          <strong>
            {file
              ? file.name
              : "Choose a medical report"}
          </strong>

          <span>
            PDF, JPG or PNG
          </span>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            hidden
            onChange={(event) => {
              setFile(event.target.files?.[0] || null);
            }}
          />
        </label>

        <div className="medical-form-grid">
          <div className="medical-form-group">
            <label>
              <Calendar size={16} />
              Report Date
            </label>

            <input
              type="date"
              value={reportDate}
              onChange={(event) =>
                setReportDate(event.target.value)
              }
            />
          </div>

          <div className="medical-form-group">
            <label>
              <Building2 size={16} />
              Hospital / Clinic
            </label>

            <input
              type="text"
              placeholder="Hospital name"
              value={hospital}
              onChange={(event) =>
                setHospital(event.target.value)
              }
            />
          </div>

          <div className="medical-form-group">
            <label>
              <Stethoscope size={16} />
              Report Type
            </label>

            <select
              value={reportType}
              onChange={(event) =>
                setReportType(event.target.value)
              }
            >
              <option>Medical Report</option>
              <option>Discharge Summary</option>
              <option>Prescription</option>
              <option>Blood Test</option>
              <option>Scan / Imaging</option>
              <option>Surgery Report</option>
              <option>Other</option>
            </select>
          </div>

          <div className="medical-form-group">
            <label>
              <Stethoscope size={16} />
              Previous Diagnosis
            </label>

            <input
              type="text"
              placeholder="Example: Asthma"
              value={diagnosis}
              onChange={(event) =>
                setDiagnosis(event.target.value)
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className="medical-add-report-button"
        >
          <Plus size={18} />
          Add Medical Report
        </button>
      </form>
    </div>
  );
}