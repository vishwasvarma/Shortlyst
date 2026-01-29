import { useEffect, useState } from "react";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/data/results.json")
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, []);

  return (
    <div className="card p-4 shadow">
      <h2>Results</h2>

      {results.length === 0 && <p>No results yet</p>}

      {results.map((r, i) => (
        <div key={i} className="border p-3 mt-3">
          <h5>{r.filename}</h5>
          <p>
            <strong>Score:</strong> {r.score}%
          </p>
          <p>
            <strong>Decision:</strong> {r.decision}
          </p>

          <p>
            <strong>Matched Skills:</strong> {r.matched.join(", ")}
          </p>
          <p>
            <strong>Missing Skills:</strong> {r.missing.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}
