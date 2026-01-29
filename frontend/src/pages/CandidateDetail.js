import { useParams, useNavigate } from "react-router-dom";
import { useResults } from "../context/ResultsContext";

export default function CandidateDetail() {
  const { index } = useParams();
  const navigate = useNavigate();
  const { results } = useResults();

  const candidate = results[index];

  if (!candidate) {
    return <p>Candidate not found</p>;
  }

  return (
    <div className="card p-4 shadow">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back to Results
      </button>

      <h2>{candidate.filename}</h2>

      <p>
        <strong>Final Score:</strong> {candidate.final_score}%
      </p>

      <p>
        <strong>Decision:</strong>{" "}
        {candidate.decision === "Shortlisted" && "🟢 Shortlisted"}
        {candidate.decision === "Rejected" && "🔴 Rejected"}
        {candidate.decision === "Review Later" && "🟡 Review Later"}
      </p>

      <hr />

      <h4>Rule Evaluation</h4>

      <ul>
        <li>
          <strong>Mandatory Skills:</strong>{" "}
          {candidate.rules.mandatory_skills.status}
          <br />
          <small>{candidate.rules.mandatory_skills.evidence}</small>
        </li>

        <li>
          <strong>Skill Overlap:</strong> {candidate.rules.skill_overlap.score}%
          <br />
          <small>{candidate.rules.skill_overlap.evidence}</small>
        </li>
      </ul>

      <hr />

      <h4>AI Analysis (JD‑Conditioned)</h4>

      <h6>Strengths</h6>
      <ul>
        {candidate.ai.strengths.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <h6>Red Flags</h6>
      <ul>
        {candidate.ai.red_flags.map((rf, i) => (
          <li key={i}>{rf}</li>
        ))}
      </ul>
    </div>
  );
}
