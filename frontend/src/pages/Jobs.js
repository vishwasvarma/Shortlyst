import { useState } from "react";

export default function Jobs() {
  const [jd, setJd] = useState("");
  const [message, setMessage] = useState("");

  const saveJD = async () => {
    const res = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jd }),
    });

    if (res.ok) {
      setMessage("Job Description saved successfully ✅");
    } else {
      setMessage("Failed to save Job Description ❌");
    }
  };

  return (
    <div className="card p-4 shadow">
      <h2>Job Description</h2>

      <textarea
        className="form-control mt-3"
        rows="8"
        placeholder="Paste job description here..."
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      <button className="btn btn-primary mt-3" onClick={saveJD}>
        Save Job Description
      </button>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
