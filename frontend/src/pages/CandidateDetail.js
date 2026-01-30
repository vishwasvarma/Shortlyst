import { useParams } from "react-router-dom";
import { useResults } from "../context/ResultsContext";

export default function CandidateDetail() {
  const { id } = useParams();
  const { results } = useResults();

  const candidate = results[id];

  if (!candidate) {
    return (
      <div className="page-wrapper">
        <div className="container-fluid px-5">
          <p>Candidate not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container-fluid px-5">
        <h2 className="page-title">{candidate.filename}</h2>
        <p className="page-subtitle">
          {candidate.decision} • {candidate.final_score}%
        </p>

        <div className="theme-card">
          <h5>Strengths</h5>
          <ul>
            {candidate.ai?.strengths?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h5 className="mt-4">Red Flags</h5>
          <ul>
            {candidate.ai?.red_flags?.map((rf, i) => (
              <li key={i}>{rf}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
