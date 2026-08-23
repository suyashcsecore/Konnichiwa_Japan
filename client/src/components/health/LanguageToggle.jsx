export default function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="language-toggle">
      <button
        className={language === "en" ? "active" : ""}
        onClick={() => setLanguage("en")}
      >
        English
      </button>

      <button
        className={language === "ja" ? "active" : ""}
        onClick={() => setLanguage("ja")}
      >
        日本語
      </button>
    </div>
  );
}