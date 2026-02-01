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

        {/* ACTION CARD */}
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

        {/* INFO CARD */}
        <div className="theme-card mb-4">
          <p style={{ textAlign: "center", margin: 0 }}>
            Resumes are matched against the job description to help you identify
            the best candidates quickly.
          </p>
        </div>

        {/* SUMMARY CARD */}
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
            <button className="theme-btn" onClick={() => navigate("/results")}>
              View Full Results →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
