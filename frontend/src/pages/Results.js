import { useResults } from "../context/ResultsContext";

export default function Results() {
  const { results } = useResults();

  const exportCSV = () => {
    window.open("http://localhost:5000/api/export", "_blank");
  };

  if (!results || results.length === 0) {
    return (
      <div className="card p-4 shadow">
        <h3>No results available</h3>
      </div>
    );
  }

  return (
    <div className="card p-4 shadow">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Screening Results</h2>
        <button className="btn btn-success" onClick={exportCSV}>
          Export CSV
        </button>
      </div>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Resume</th>
            <th>Score</th>
            <th>Decision</th>
            <th>Mandatory Skills</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.filename}</td>
              <td>{r.final_score}%</td>
              <td>{r.decision}</td>
              <td>{r.mandatory_evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
