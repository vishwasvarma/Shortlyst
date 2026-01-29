import { useResults } from "../context/ResultsContext";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const { results } = useResults();
  const navigate = useNavigate();

  if (!results || results.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container-fluid px-5">
          <p>No results yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container-fluid px-5">
        <h2 className="page-title">Screening Results</h2>
        <p className="page-subtitle">JD‑aware resume screening outcomes</p>

        {/* ✅ SAME CARD AS JD PAGE */}
        <div className="theme-card">
          <table className="table">
            <thead>
              <tr>
                <th>Resume</th>
                <th>Score</th>
                <th>Decision</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
