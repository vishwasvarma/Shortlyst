import { useResults } from "../context/ResultsContext";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const { results } = useResults();
  const navigate = useNavigate();

  const exportCSV = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/export");

      if (!res.ok) {
        alert("CSV export failed");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "resume_screening_results.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("CSV download error");
    }
  };

  if (!results || results.length === 0) {
    return <p>No results yet</p>;
  }

  return (
    <div className="card p-4 shadow">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Screening Results</h2>
        <button className="btn btn-success" onClick={exportCSV}>
          Export CSV
        </button>
      </div>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Resume</th>
            <th>Score</th>
            <th>Decision</th>
            <th>AI Strengths</th>
            <th>AI Red Flags</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, i) => (
            <tr
              key={i}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/candidate/${i}`)}
            >
              <td>{r.filename}</td>
              <td>{r.final_score}%</td>
              <td>{r.decision}</td>
              <td>
                <ul>
                  {r.ai.strengths.map((s, j) => (
                    <li key={j}>{s}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {r.ai.red_flags.map((rf, j) => (
                    <li key={j}>{rf}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-muted mt-2">
        Click a row to view detailed candidate analysis
      </p>
    </div>
  );
}
