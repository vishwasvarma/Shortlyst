import { useParams } from "react-router-dom";
import { useResults } from "../context/ResultsContext";

export default function CandidateDetail() {
  const { id } = useParams();
  const { results, setResults } = useResults();
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

  const updateDecision = async (decision) => {
    await fetch(`http://localhost:5000/api/decision/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision }),
    });

    const updated = [...results];
    updated[id].decision = decision;
    setResults(updated);
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid px-5">
        <h2 className="page-title">{candidate.filename}</h2>
        <p className="page-subtitle">
          {candidate.decision} • {candidate.final_score}%
        </p>

        {/* HUMAN IN THE LOOP */}
        {candidate.decision === "Review Later" && (
          <div className="mb-4">
            <button
              className="btn btn-success me-2"
              onClick={() => updateDecision("Shortlisted")}
            >
              Approve
            </button>
            <button
              className="btn btn-danger"
              onClick={() => updateDecision("Rejected")}
            >
              Reject
            </button>
          </div>
        )}

        <div className="theme-card">
          {/* STRENGTHS */}
          <h5>Strengths</h5>
          <ul>
            {candidate.ai?.strengths?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          {/* RED FLAGS */}
          <h5 className="mt-4">Red Flags</h5>
          <ul>
            {candidate.ai?.red_flags?.map((rf, i) => (
              <li key={i}>{rf}</li>
            ))}
          </ul>

          {/* RULE CHECKS (RESTORED) */}
          <h5 className="mt-4">Rule Checks</h5>
          <ul>
            <li>
              Missing Mandatory Skills:{" "}
              {candidate.rules?.mandatory_skills?.missing?.length > 0
                ? candidate.rules.mandatory_skills.missing.join(", ")
                : "None"}
            </li>
            <li>
              GitHub Profile: {candidate.github ? "Provided" : "Not Provided"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
