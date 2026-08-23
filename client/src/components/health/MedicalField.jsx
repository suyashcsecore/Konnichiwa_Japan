export default function MedicalField({ label, value }) {
  return (
    <div className="medical-field">
      <span>{label}</span>
      <strong>{value || "Not provided"}</strong>
    </div>
  );
}