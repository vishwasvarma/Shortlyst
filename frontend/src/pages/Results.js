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
          <p>No results yet</p>
        </div>
      </div>
    );
  }

  const filtered =
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
        <button
          className="theme-btn mb-3"
          onClick={() =>
            (window.location.href = "http://localhost:5000/api/export")
          }
        >
          Download CSV
        </button>

        {/* TABS */}
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

        <div className="theme-card">
          {filtered.map((r) => {
            const realIndex = results.findIndex(
              (item) => item.filename === r.filename,
            );

            return (
              <div
                key={realIndex}
                className="result-item"
                onClick={() => navigate(`/candidate/${realIndex}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex justify-content-between">
                  <h5>{r.filename}</h5>
                  <span className={getBadgeClass(r.decision)}>
                    {r.decision}
                  </span>
                </div>

                <div className="text-muted mt-1">Score: {r.final_score}%</div>

                <strong className="mt-3 d-block">Strengths</strong>
                <ul>
                  {r.ai?.strengths?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <strong>Red Flags</strong>
                <ul>
                  {r.ai?.red_flags?.map((rf, i) => (
                    <li key={i}>{rf}</li>
                  ))}
                </ul>

                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
