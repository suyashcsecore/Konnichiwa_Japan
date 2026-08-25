import { useState } from "react";
import {
  MapPin,
  Search,
  Navigation,
  ArrowLeft,
  Hospital,
  Languages,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HealthHeader from "../components/health/HealthHeader";

export default function HospitalFinder() {
  const navigate = useNavigate();

  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [filter, setFilter] = useState("all");

  const specialtyFilters = [
    {
      id: "all",
      en: "All",
      ja: "すべて"
    },
    {
      id: "eye",
      en: "Eye Care",
      ja: "眼科"
    },
    {
      id: "dental",
      en: "Dental",
      ja: "歯科"
    },
    {
      id: "xray",
      en: "X-Ray / Imaging",
      ja: "X線・画像診断"
    },
    {
      id: "pediatric",
      en: "Pediatric",
      ja: "小児科"
    },
    {
      id: "orthopedic",
      en: "Orthopedic",
      ja: "整形外科"
    },
    {
      id: "ent",
      en: "ENT",
      ja: "耳鼻咽喉科"
    },
    {
      id: "internal",
      en: "Internal Medicine",
      ja: "内科"
    }
  ];

  const getSpecialty = (tags) => {
    const specialty = (
      tags["healthcare:speciality"] ||
      tags["healthcare:specialty"] ||
      tags.department ||
      tags["medical:specialty"] ||
      ""
    ).toLowerCase();

    const name = (
      tags.name ||
      tags["name:en"] ||
      tags["name:ja"] ||
      ""
    ).toLowerCase();

    const combined = `${specialty} ${name}`;

    if (
      combined.includes("eye") ||
      combined.includes("ophthalm") ||
      combined.includes("眼科")
    ) {
      return {
        key: "eye",
        label: "Eye Care"
      };
    }

    if (
      combined.includes("dental") ||
      combined.includes("dentist") ||
      combined.includes("tooth") ||
      combined.includes("歯科")
    ) {
      return {
        key: "dental",
        label: "Dental"
      };
    }

    if (
      combined.includes("x-ray") ||
      combined.includes("xray") ||
      combined.includes("radiology") ||
      combined.includes("imaging") ||
      combined.includes("diagnostic imaging") ||
      combined.includes("放射線")
    ) {
      return {
        key: "xray",
        label: "X-Ray / Imaging"
      };
    }

    if (
      combined.includes("pediatric") ||
      combined.includes("paediatric") ||
      combined.includes("child") ||
      combined.includes("小児")
    ) {
      return {
        key: "pediatric",
        label: "Pediatric"
      };
    }

    if (
      combined.includes("orthopedic") ||
      combined.includes("orthopaedic") ||
      combined.includes("骨") ||
      combined.includes("整形")
    ) {
      return {
        key: "orthopedic",
        label: "Orthopedic"
      };
    }

    if (
      combined.includes("ent") ||
      combined.includes("otolaryng") ||
      combined.includes("ear") ||
      combined.includes("nose") ||
      combined.includes("throat") ||
      combined.includes("耳鼻")
    ) {
      return {
        key: "ent",
        label: "ENT"
      };
    }

    if (
      combined.includes("internal medicine") ||
      combined.includes("general medicine") ||
      combined.includes("内科")
    ) {
      return {
        key: "internal",
        label: "Internal Medicine"
      };
    }

    return {
      key: "general",
      label: "General"
    };
  };

  const searchHospitals = async () => {
    if (!search.trim()) {
      setError(
        language === "en"
          ? "Please enter a location."
          : "場所を入力してください。"
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setHospitals([]);
      setVisibleCount(10);
      setFilter("all");

      const locationQuery = encodeURIComponent(search.trim());

      const geocodeResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${locationQuery}&limit=1&countrycodes=jp`,
        {
          headers: {
            Accept: "application/json"
          }
        }
      );

      if (!geocodeResponse.ok) {
        throw new Error("Location search failed.");
      }

      const locations = await geocodeResponse.json();

      if (!locations || locations.length === 0) {
        setError(
          language === "en"
            ? "Location not found in Japan. Try a city such as Tokyo, Osaka, or Kyoto."
            : "日本で場所が見つかりません。東京、大阪、京都などを入力してください。"
        );
        return;
      }

      const latitude = parseFloat(locations[0].lat);
      const longitude = parseFloat(locations[0].lon);

      if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        throw new Error("Invalid location coordinates.");
      }

      const radius = 15000;

      const overpassQuery = `
        [out:json][timeout:25];

        (
          node["amenity"="hospital"](around:${radius},${latitude},${longitude});
          way["amenity"="hospital"](around:${radius},${latitude},${longitude});
          relation["amenity"="hospital"](around:${radius},${latitude},${longitude});

          node["amenity"="clinic"](around:${radius},${latitude},${longitude});
          way["amenity"="clinic"](around:${radius},${latitude},${longitude});
          relation["amenity"="clinic"](around:${radius},${latitude},${longitude});

          node["amenity"="doctors"](around:${radius},${latitude},${longitude});
          way["amenity"="doctors"](around:${radius},${latitude},${longitude});
          relation["amenity"="doctors"](around:${radius},${latitude},${longitude});
        );

        out center tags;
      `;

      const hospitalResponse = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=UTF-8"
          },
          body: overpassQuery
        }
      );

      if (!hospitalResponse.ok) {
        throw new Error("Hospital search failed.");
      }

      const hospitalData = await hospitalResponse.json();

      const results = hospitalData.elements
        .map((item) => {
          const tags = item.tags || {};

          const lat = item.lat ?? item.center?.lat ?? null;
          const lon = item.lon ?? item.center?.lon ?? null;

          const specialty = getSpecialty(tags);

          return {
            id: `${item.type}-${item.id}`,

            name:
              tags.name ||
              tags["name:en"] ||
              tags["name:ja"] ||
              "Unnamed Hospital / Clinic",

            type:
              tags.amenity === "hospital"
                ? "Hospital"
                : "Clinic",

            department: specialty.label,
            specialtyKey: specialty.key,

            area:
              tags["addr:city"] ||
              tags["addr:district"] ||
              tags["addr:suburb"] ||
              search.trim(),

            latitude: lat,
            longitude: lon
          };
        })
        .filter(
          (hospital) =>
            hospital.latitude !== null &&
            hospital.longitude !== null
        );

      const uniqueResults = Array.from(
        new Map(
          results.map((hospital) => [
            hospital.name.toLowerCase(),
            hospital
          ])
        ).values()
      );

      setHospitals(uniqueResults);
      setVisibleCount(10);

      if (uniqueResults.length === 0) {
        setError(
          language === "en"
            ? "No hospitals or clinics found within approximately 15 km of this location."
            : "この場所から約15km以内に病院やクリニックが見つかりませんでした。"
        );
      }
    } catch (err) {
      console.error("Hospital search error:", err);

      setError(
        language === "en"
          ? "Unable to search hospitals right now. Please try again."
          : "現在、病院を検索できません。もう一度お試しください。"
      );
    } finally {
      setLoading(false);
    }
  };

  const openMaps = (hospital) => {
    if (
      hospital.latitude === null ||
      hospital.longitude === null
    ) {
      return;
    }

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`,
      "_blank"
    );
  };

  const filteredHospitals = hospitals.filter((hospital) => {
    if (filter === "all") {
      return true;
    }

    return hospital.specialtyKey === filter;
  });

  const visibleHospitals = filteredHospitals.slice(
    0,
    visibleCount
  );

  const loadMore = () => {
    setVisibleCount((current) => current + 10);
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
    setVisibleCount(10);
  };

  return (
    <div className="health-page">
      <HealthHeader />

      <div className="health-page-title hospital-finder-title">
        <button
          className="health-back-button"
          onClick={() => navigate("/health")}
        >
          <ArrowLeft size={17} />

          {language === "en"
            ? "Back to Health Center"
            : "ヘルスセンターに戻る"}
        </button>

        <div className="hospital-title-row">
          <div className="hospital-title-icon">
            <Hospital size={28} />
          </div>

          <div>
            <h2>
              {language === "en"
                ? "Find Hospital / Clinic"
                : "病院・クリニックを探す"}
            </h2>

            <p>
              {language === "en"
                ? "Find nearby hospitals and clinics during your stay in Japan."
                : "日本滞在中に近くの病院やクリニックを探します。"}
            </p>
          </div>
        </div>
      </div>

      <div className="hospital-language-control">
        <Languages size={18} />

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

      <div className="hospital-search-card">
        <div className="hospital-search-box">
          <Search size={20} />

          <input
            type="text"
            placeholder={
              language === "en"
                ? "Enter city or location, e.g. Tokyo"
                : "都市または場所を入力してください"
            }
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchHospitals();
              }
            }}
          />

          <button
            type="button"
            onClick={searchHospitals}
            disabled={loading}
          >
            <Search size={17} />

            {loading
              ? language === "en"
                ? "Searching..."
                : "検索中..."
              : language === "en"
                ? "Search"
                : "検索"}
          </button>
        </div>

        <div className="hospital-search-info">
          <MapPin size={17} />

          <span>
            {language === "en"
              ? "Search for hospitals and clinics within approximately 15 km of the selected location."
              : "選択した場所から約15km以内の病院やクリニックを検索します。"}
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

      <div className="hospital-section">
        <div className="hospital-section-header">
          <div>
            <span>HEALTHCARE LOCATIONS</span>

            <h3>
              {language === "en"
                ? "Hospitals & Clinics"
                : "病院・クリニック"}
            </h3>

            <p>
              {language === "en"
                ? "Healthcare facilities found near your selected location."
                : "選択した場所の近くで見つかった医療機関。"}
            </p>
          </div>

          <div className="hospital-count">
            {filteredHospitals.length}
          </div>
        </div>

        {hospitals.length > 0 && !loading && (
          <div
            className="hospital-specialty-filter"
            style={{
              marginBottom: "25px"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
                fontWeight: "600"
              }}
            >
              <Filter size={18} />

              <span>
                {language === "en"
                  ? "Filter by Specialty"
                  : "診療科で絞り込む"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px"
              }}
            >
              {specialtyFilters.map((specialty) => (
                <button
                  key={specialty.id}
                  type="button"
                  onClick={() =>
                    changeFilter(specialty.id)
                  }
                  style={{
                    padding: "9px 15px",
                    borderRadius: "20px",
                    border:
                      filter === specialty.id
                        ? "1px solid #2563eb"
                        : "1px solid #d1d5db",
                    background:
                      filter === specialty.id
                        ? "#2563eb"
                        : "#ffffff",
                    color:
                      filter === specialty.id
                        ? "#ffffff"
                        : "#374151",
                    cursor: "pointer",
                    fontWeight: "500",
                    transition: "all 0.2s ease"
                  }}
                >
                  {language === "en"
                    ? specialty.en
                    : specialty.ja}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="hospital-empty">
            <Hospital size={35} />

            <h3>
              {language === "en"
                ? "Searching hospitals..."
                : "病院を検索しています..."}
            </h3>

            <p>
              {language === "en"
                ? "Please wait while we find healthcare facilities."
                : "医療機関を検索しています。しばらくお待ちください。"}
            </p>
          </div>
        ) : hospitals.length === 0 ? (
          <div className="hospital-empty">
            <Hospital size={35} />

            <h3>
              {language === "en"
                ? "Search for a hospital"
                : "病院を検索してください"}
            </h3>

            <p>
              {language === "en"
                ? "Enter a Japanese city or location above to find nearby hospitals and clinics."
                : "上の検索欄に日本の都市または場所を入力してください。"}
            </p>
          </div>
        ) : filteredHospitals.length === 0 ? (
          <div className="hospital-empty">
            <Search size={35} />

            <h3>
              {language === "en"
                ? "No hospitals in this category"
                : "このカテゴリーの病院がありません"}
            </h3>

            <p>
              {language === "en"
                ? "Try another specialty or select All."
                : "別の診療科を選択するか、「すべて」を選択してください。"}
            </p>
          </div>
        ) : (
          <>
            <div className="hospital-grid">
              {visibleHospitals.map((hospital) => (
                <div
                  className="hospital-card"
                  key={hospital.id}
                >
                  <div className="hospital-card-header">
                    <div className="hospital-card-icon">
                      <Hospital size={23} />
                    </div>

                    <div>
                      <h3>{hospital.name}</h3>

                      <span>
                        {language === "en"
                          ? hospital.type
                          : hospital.type === "Hospital"
                            ? "病院"
                            : "クリニック"}
                      </span>
                    </div>
                  </div>

                  <div className="hospital-card-details">
                    <div>
                      <Hospital size={16} />

                      <span>
                        {language === "en"
                          ? hospital.department
                          : specialtyFilters.find(
                              (item) =>
                                item.id ===
                                hospital.specialtyKey
                            )?.ja ||
                            "一般診療"}
                      </span>
                    </div>

                    <div>
                      <MapPin size={16} />

                      <span>
                        {hospital.area}
                      </span>
                    </div>
                  </div>

                  <div className="hospital-card-actions">
                    <button
                      className="hospital-map-button"
                      onClick={() =>
                        openMaps(hospital)
                      }
                    >
                      <Navigation size={16} />

                      {language === "en"
                        ? "Open in Maps"
                        : "地図を開く"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount <
              filteredHospitals.length && (
              <div
                className="hospital-load-more"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px"
                }}
              >
                <button
                  type="button"
                  onClick={loadMore}
                  style={{
                    padding: "12px 28px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  {language === "en"
                    ? `Load More (${Math.min(
                        10,
                        filteredHospitals.length -
                          visibleCount
                      )})`
                    : `もっと見る (${Math.min(
                        10,
                        filteredHospitals.length -
                          visibleCount
                      )})`}
                </button>
              </div>
            )}

            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
                color: "#6b7280",
                fontSize: "14px"
              }}
            >
              {language === "en"
                ? `Showing ${Math.min(
                    visibleCount,
                    filteredHospitals.length
                  )} of ${
                    filteredHospitals.length
                  } results`
                : `${Math.min(
                    visibleCount,
                    filteredHospitals.length
                  )} / ${
                    filteredHospitals.length
                  } 件を表示`}
            </div>
          </>
        )}
      </div>

      <div className="hospital-note">
        <strong>
          {language === "en"
            ? "Important"
            : "重要"}
        </strong>

        <span>
          {language === "en"
            ? "Hospital information is provided from OpenStreetMap data. Always verify opening hours, departments, services, and availability before visiting."
            : "病院情報はOpenStreetMapのデータを使用しています。訪問前に診療時間、診療科、サービス、受付状況をご確認ください。"}
        </span>
      </div>
    </div>
  );
}