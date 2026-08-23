import { HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HealthHeader() {
  const navigate = useNavigate();

  return (
    <header className="health-header">
      <div
        className="health-brand"
        onClick={() => navigate("/health")}
        style={{ cursor: "pointer" }}
      >
        <div className="health-brand-icon">
          <HeartPulse size={21} />
        </div>

        <span>Japan Health Bridge</span>
      </div>

      <nav className="health-nav">
        <button onClick={() => navigate("/health")}>
          Health Home
        </button>

        <button onClick={() => navigate("/health/passport")}>
          Passport
        </button>

        <button onClick={() => navigate("/health/translator")}>
          Translator
        </button>
      </nav>
    </header>
  );
}