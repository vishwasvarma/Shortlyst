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
            <th>Mandatory Skills (Rule)</th>
            <th>AI Strengths (JD‑Aligned)</th>
            <th>AI Red Flags (JD‑Based)</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, idx) => (
            <tr key={idx}>
              {/* Resume name */}
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

              {/* AI Strengths */}
              <td>
                <ul>
                  {r.ai?.strengths?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </td>

              {/* AI Red Flags */}
              <td>
                <ul>
                  {r.ai?.red_flags?.map((rf, i) => (
                    <li key={i}>{rf}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
