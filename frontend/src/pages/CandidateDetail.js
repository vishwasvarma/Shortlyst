import { useParams } from "react-router-dom";
import { useResults } from "../context/ResultsContext";
import { updateDecision } from "../api";

export default function CandidateDetail() {
  const { id } = useParams();
  const { results, setResults } = useResults();
  const c = results[id];

  const changeDecision = async (d) => {
    await updateDecision(id, d);
    const r = [...results];
    r[id].decision = d;
    setResults(r);
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid px-5">
        <h2>{c.filename}</h2>
        <p>
          {c.decision} • {c.final_score}%
        </p>

        {c.decision === "Review Later" && (
          <>
            <button
              className="theme-btn"
              onClick={() => changeDecision("Shortlisted")}
            >
              Approve
            </button>
            <button
              className="theme-btn danger ms-2"
              onClick={() => changeDecision("Rejected")}
            >
              Reject
            </button>
          </>
        )}

        <div className="theme-card mt-3">
          <h4>Strengths</h4>
          <ul>
            {c.ai?.strengths?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <h4>Red Flags</h4>
          <ul>
            {c.ai?.red_flags?.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
