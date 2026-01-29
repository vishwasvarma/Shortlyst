import { useResults } from "../context/ResultsContext";

export default function Results() {
  const { results } = useResults();

  if (results.length === 0) {
    return <p>No results available. Please upload resumes.</p>;
  }

  return (
    <div className="card p-4 shadow">
      <h2>Screening Results</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Resume</th>
            <th>Score</th>
            <th>Decision</th>
            <th>Matched Skills</th>
            <th>Missing Skills</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, idx) => (
            <tr key={idx}>
              <td>{r.filename}</td>
              <td>{r.score}%</td>
              <td>
                {r.decision === "Shortlisted" && "🟢 Shortlisted"}
                {r.decision === "Rejected" && "🔴 Rejected"}
                {r.decision === "Review Later" && "🟡 Review Later"}
              </td>
              <td>{r.matched.join(", ")}</td>
              <td>{r.missing.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
