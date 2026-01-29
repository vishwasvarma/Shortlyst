import { useResults } from "../context/ResultsContext";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const { results } = useResults();
  const navigate = useNavigate();

  if (!results || results.length === 0) {
    return (
      <div className="card p-4 shadow">
        <h3>No results available</h3>
        <p>Please upload resumes to see screening results.</p>
      </div>
    );
  }

  return (
    <div className="card p-4 shadow">
      <h2>Screening Results</h2>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Resume</th>
            <th>Final Score</th>
            <th>Decision</th>
            <th>Mandatory Skills</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, idx) => (
            <tr
              key={idx}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/candidate/${idx}`)}
            >
              <td>{r.filename}</td>
              <td>{r.final_score}%</td>
              <td>
                {r.decision === "Shortlisted" && "🟢 Shortlisted"}
                {r.decision === "Rejected" && "🔴 Rejected"}
                {r.decision === "Review Later" && "🟡 Review Later"}
              </td>
              <td>
                <small>{r.rules.mandatory_skills.evidence}</small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 text-muted">
        Click on a candidate row to view full details
      </p>
    </div>
  );
}
