import { useState } from "react";

export default function Jobs() {
  const [jdText, setJdText] = useState("");
  const [jdFile, setJdFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitJD = async () => {
    setMessage("");

    if (!jdText && !jdFile) {
      setMessage("Please enter JD text or upload a JD file ❗");
      return;
    }

    const formData = new FormData();

    if (jdFile) {
      formData.append("jd_file", jdFile);
    } else {
      formData.append("jd_text", jdText);
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        body: formData, // ✅ NO headers here
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Job Description saved successfully ✅");
        setJdText("");
        setJdFile(null);
      } else {
        setMessage(data.error || "Failed to save Job Description ❌");
      }
    } catch (err) {
      setMessage("Backend not reachable ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow">
      <h2>Job Description</h2>

      {/* JD TEXT INPUT */}
      <textarea
        className="form-control mt-3"
        rows="6"
        placeholder="Paste Job Description text (optional)"
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
      />

      {/* JD FILE INPUT */}
      <input
        type="file"
        accept=".pdf,.docx"
        className="form-control mt-3"
        onChange={(e) => setJdFile(e.target.files[0])}
      />

      {/* SUBMIT BUTTON */}
      <button
        className="btn btn-primary mt-3"
        onClick={submitJD}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Job Description"}
      </button>

      {/* STATUS MESSAGE */}
      {message && <p className="mt-3 fw-bold">{message}</p>}
    </div>
  );
}
