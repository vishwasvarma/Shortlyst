import { useResults } from "../context/ResultsContext";

export default function Results() {
  const { results } = useResults();

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
            <th>Skill Overlap</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, idx) => (
            <tr key={idx}>
              {/* Resume filename */}
              <td>{r.filename}</td>

              {/* Final score */}
              <td>{r.final_score}%</td>

              {/* Decision */}
              <td>
                {r.decision === "Shortlisted" && "🟢 Shortlisted"}
                {r.decision === "Rejected" && "🔴 Rejected"}
                {r.decision === "Review Later" && "🟡 Review Later"}
              </td>

              {/* Mandatory skills rule */}
              <td>
                <strong>Status:</strong> {r.rules.mandatory_skills.status}
                <br />
                <small>{r.rules.mandatory_skills.evidence}</small>
              </td>

              {/* Skill overlap rule */}
              <td>
                <strong>{r.rules.skill_overlap.score}%</strong>
                <br />
                <small>{r.rules.skill_overlap.evidence}</small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
