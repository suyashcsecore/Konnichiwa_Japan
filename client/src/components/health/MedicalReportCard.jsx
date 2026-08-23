import {
  FileText,
  Calendar,
  Building2,
  Stethoscope,
  Trash2,
  Languages,
  Eye
} from "lucide-react";

export default function MedicalReportCard({
  report,
  onDelete,
  onView
}) {
  return (
    <div className="medical-report-card">
      <div className="medical-report-card-top">
        <div className="medical-report-file-icon">
          <FileText size={23} />
        </div>

        <div className="medical-report-main">
          <h3>{report.fileName}</h3>

          <span className="medical-report-type">
            {report.reportType}
          </span>
        </div>

        <button
          className="medical-delete-button"
          onClick={() => onDelete(report.id)}
          title="Delete report"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="medical-report-details">

        <div>
          <Calendar size={16} />
          <span>
            {report.reportDate || "Date not provided"}
          </span>
        </div>

        <div>
          <Building2 size={16} />
          <span>
            {report.hospital || "Hospital not provided"}
          </span>
        </div>

        <div>
          <Stethoscope size={16} />
          <span>
            {report.diagnosis || "Diagnosis not provided"}
          </span>
        </div>

      </div>

      <div className="medical-report-actions">

        <button
          onClick={() => onView(report)}
          className="medical-view-button"
        >
          <Eye size={17} />
          View Summary
        </button>

        <button
          onClick={() => onView(report)}
          className="medical-japanese-button"
        >
          <Languages size={17} />
          Japanese View
        </button>

      </div>
    </div>
  );
}