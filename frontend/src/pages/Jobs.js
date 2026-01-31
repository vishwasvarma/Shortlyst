import { useNavigate } from "react-router-dom";
import { useResults } from "../context/ResultsContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { results } = useResults();

  const total = results.length;
  const shortlisted = results.filter(
    (r) => r.decision === "Shortlisted",
  ).length;
  const rejected = results.filter((r) => r.decision === "Rejected").length;
  const reviewLater = results.filter(
    (r) => r.decision === "Review Later",
  ).length;

  return (
    <div className="page-wrapper">
      <div className="container-fluid px-5">
        <h2 className="page-title">Dashboard</h2>

        {/* CARD 1 — ACTION */}
        <div className="theme-card jd-narrow mb-4">
          <p style={{ textAlign: "center" }}>
            Start by adding a Job Description, then upload resumes to analyze
            candidates.
          </p>

          <div className="mt-4 text-center">
            <button className="theme-btn" onClick={() => navigate("/jobs")}>
              Add Job Description →
            </button>
          </div>
        </div>

        {/* CARD 2 — OVERVIEW */}
        <div className="theme-card mb-4">
          <p
            style={{
              margin: 0,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Resumes are checked against the job description to find the best
            matching candidates.
          </p>
        </div>

        {/* CARD 3 — RESULTS SUMMARY (ALWAYS SHOWN) */}
        <div className="theme-card">
          <h4 className="mb-3">Latest Screening Results</h4>

          <div className="d-flex flex-wrap gap-4">
            <div>
              <strong>Total Resumes</strong>
              <div style={{ color: "#bdbdbd" }}>{total}</div>
            </div>

            <div>
              <strong>Shortlisted</strong>
              <div style={{ color: "#00c853" }}>{shortlisted}</div>
            </div>

            <div>
              <strong>Rejected</strong>
              <div style={{ color: "#f44336" }}>{rejected}</div>
            </div>

            <div>
              <strong>Review Later</strong>
              <div style={{ color: "#ffc107" }}>{reviewLater}</div>
            </div>
          </div>

          <div className="mt-4">
            <button
              className="theme-btn"
              onClick={() => navigate("/results")}
              disabled={total === 0}
            >
              View Full Results →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
