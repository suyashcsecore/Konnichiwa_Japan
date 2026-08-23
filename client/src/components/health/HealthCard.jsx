export default function HealthCard({ title, icon, children }) {
  return (
    <div className="health-card">
      <div className="health-card-header">
        {icon}
        <h3>{title}</h3>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}