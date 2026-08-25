import { HeartPulse } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function HealthHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

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
        <button
          type="button"
          className={isActive("/health")}
          onClick={() => navigate("/health")}
        >
          Health Home
        </button>

        <button
          type="button"
          className={isActive("/health/passport")}
          onClick={() => navigate("/health/passport")}
        >
          Passport
        </button>

        <button
          type="button"
          className={isActive("/health/translator")}
          onClick={() => navigate("/health/translator")}
        >
          Translator
        </button>
      </nav>
    </header>
  );
}