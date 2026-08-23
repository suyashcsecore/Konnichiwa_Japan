import { HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HealthHeader() {
  const navigate = useNavigate();

  return (
    <header
      className="health-header"
      style={{
        position: "relative",
        zIndex: 9999,
        width: "100%",
        minHeight: "64px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        visibility: "visible",
        opacity: 1
      }}
    >
      <div
        className="health-brand"
        onClick={() => navigate("/health")}
        style={{
          display: "flex",
          alignItems: "center",
          visibility: "visible",
          opacity: 1,
          cursor: "pointer"
        }}
      >
        <div className="health-brand-icon">
          <HeartPulse size={21} />
        </div>

        <span>Japan Health Bridge</span>
      </div>

      <nav
        className="health-nav"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "20px",
          visibility: "visible",
          opacity: 1,
          position: "relative",
          zIndex: 10000
        }}
      >
        <button
          type="button"
          style={{
            display: "inline-block",
            visibility: "visible",
            opacity: 1,
            cursor: "pointer"
          }}
          onClick={() => navigate("/health")}
        >
          Health Home
        </button>

        <button
          type="button"
          style={{
            display: "inline-block",
            visibility: "visible",
            opacity: 1,
            cursor: "pointer"
          }}
          onClick={() => navigate("/health/passport")}
        >
          Passport
        </button>

        <button
          type="button"
          style={{
            display: "inline-block",
            visibility: "visible",
            opacity: 1,
            cursor: "pointer"
          }}
          onClick={() => navigate("/health/translator")}
        >
          Translator
        </button>
      </nav>
    </header>
  );
}