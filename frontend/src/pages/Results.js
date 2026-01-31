import { useState } from "react";
import { useResults } from "../context/ResultsContext";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const { results, setResults } = useResults();
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

  const updateDecision = async (index, decision) => {
    await fetch(`http://localhost:5000/api/decision/${index}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision }),
    });

    const updated = [...results];
    updated[index].decision = decision;
    setResults(updated);
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

        {/* RESULTS LIST */}
        <div className="theme-card">
          {filteredResults.map((r) => {
            const realIndex = results.findIndex(
              (item) => item.filename === r.filename,
            );

            return (
              <div key={realIndex} className="result-item">
                {/* HEADER */}
                <div
                  onClick={() => navigate(`/candidate/${realIndex}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>{r.filename}</h5>
                    <span className={getBadgeClass(r.decision)}>
                      {r.decision}
                    </span>
                  </div>

                  <div style={{ color: "#bdbdbd", marginTop: "6px" }}>
                    Match Score: {r.final_score}%
                  </div>
                </div>

                {/* AI STRENGTHS */}
                <div className="mt-3">
                  <strong>Strengths</strong>
                  <ul>
                    {r.ai?.strengths?.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* AI RED FLAGS */}
                <div className="mt-2">
                  <strong>Red Flags</strong>
                  <ul>
                    {r.ai?.red_flags?.map((rf, i) => (
                      <li key={i}>{rf}</li>
                    ))}
                  </ul>
                </div>

                {/* RULE CHECKS (RESTORED) */}
                <div className="mt-3">
                  <strong>Rule Checks</strong>
                  <ul>
                    <li>
                      Missing Mandatory Skills:{" "}
                      {r.rules?.mandatory_skills?.missing?.length > 0
                        ? r.rules.mandatory_skills.missing.join(", ")
                        : "None"}
                    </li>
                    <li>
                      GitHub Profile: {r.github ? "Provided" : "Not Provided"}
                    </li>
                  </ul>
                </div>

                {/* HUMAN-IN-THE-LOOP */}
                {r.decision === "Review Later" && (
                  <div className="mt-3">
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => updateDecision(realIndex, "Shortlisted")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateDecision(realIndex, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}

                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
