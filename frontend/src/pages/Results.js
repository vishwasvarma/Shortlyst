import { useState } from "react";
import { useResults } from "../context/ResultsContext";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const { results } = useResults();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");

  if (!results || results.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container-fluid px-5">
          <p style={{ color: "#bdbdbd" }}>No results yet</p>
        </div>
      </div>
    );
  }

  const filteredResults =
    activeTab === "All"
      ? results
      : results.filter((r) => r.decision === activeTab);

  const getBadgeClass = (decision) => {
    if (decision === "Shortlisted") return "badge badge-shortlisted";
    if (decision === "Rejected") return "badge badge-rejected";
    return "badge badge-review";
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid px-5">
        <h2 className="page-title">Screening Results</h2>

        {/* CSV DOWNLOAD */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="theme-btn"
            onClick={() =>
              (window.location.href = "http://localhost:5000/api/export")
            }
          >
            Download CSV
          </button>
        </div>

        {/* FILTER TABS */}
        <div className="result-tabs">
          {["All", "Shortlisted", "Rejected", "Review Later"].map((tab) => (
            <div
              key={tab}
              className={`result-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* CANDIDATE CARDS */}
        {filteredResults.map((r) => {
          const realIndex = results.findIndex(
            (item) => item.filename === r.filename,
          );

          return (
            <div
              key={realIndex}
              className="theme-card mb-4"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/candidate/${realIndex}`)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5>{r.filename}</h5>
                <span className={getBadgeClass(r.decision)}>{r.decision}</span>
              </div>

              <div style={{ color: "#bdbdbd", marginTop: "6px" }}>
                Match Score: {r.final_score}%
              </div>

              <div className="mt-3">
                <strong>Strengths</strong>
                <ul>
                  {r.ai?.strengths?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <strong>Red Flags</strong>
                <ul>
                  {r.ai?.red_flags?.map((rf, i) => (
                    <li key={i}>{rf}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-3">
                <strong>Rule Checks</strong>
                <ul>
                  <li>
                    Missing Mandatory Skills:{" "}
                    {r.rules?.missing_mandatory_skills?.length > 0
                      ? r.rules.missing_mandatory_skills.join(", ")
                      : "None"}
                  </li>
                  <li>
                    GitHub Profile:{" "}
                    {r.rules?.github_present ? "Present" : "Not Provided"}
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
