import { useParams, useNavigate } from "react-router-dom";
import { useResults } from "../context/ResultsContext";

export default function CandidateDetail() {
  const { index } = useParams();
  const navigate = useNavigate();
  const { results } = useResults();

  const c = results[index];
  if (!c) return <p>Candidate not found</p>;

  return (
    <div className="card p-4 shadow">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>{c.filename}</h2>
      <p>
        <strong>Decision:</strong> {c.decision}
      </p>
      <p>
        <strong>Score:</strong> {c.final_score}%
      </p>

      <hr />

      <h4>Rule Evaluation</h4>
      <p>
        <strong>Mandatory Skills:</strong> {c.rules.mandatory_skills.status}
        <br />
        <small>{c.rules.mandatory_skills.evidence}</small>
      </p>

      <hr />

      <h4>AI Analysis</h4>

      <h6>Strengths</h6>
      <ul>
        {c.ai.strengths.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <h6>Red Flags</h6>
      <ul>
        {c.ai.red_flags.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      {c.github && (
        <>
          <hr />
          <p>
            <strong>GitHub / Portfolio:</strong>{" "}
            <a href={c.github} target="_blank" rel="noreferrer">
              {c.github}
            </a>
          </p>
        </>
      )}
    </div>
  );
}
