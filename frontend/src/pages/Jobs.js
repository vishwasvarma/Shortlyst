import { useState } from "react";

export default function Jobs() {
  const [jdText, setJdText] = useState("");
  const [jdFile, setJdFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setMessage("Job Description uploaded successfully");
    } catch (err) {
      setMessage("Failed to upload Job Description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid px-5">
        <h2 className="page-title">Add Job Description</h2>
        <p className="page-subtitle">
          Paste or upload the job description to start screening candidates.
        </p>

        {/* NARROW CARD ONLY FOR JD */}
        <div className="theme-card jd-narrow">
          <form onSubmit={handleSubmit}>
            <textarea
              className="theme-textarea mb-4"
              placeholder="Paste job description text here (optional)"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />

            <div className="d-flex align-items-center gap-3">
              <input
                type="file"
                className="theme-input"
                accept=".pdf,.docx"
                onChange={(e) => setJdFile(e.target.files[0])}
              />

              <button className="theme-btn" type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Upload JD"}
              </button>
            </div>

            {message && (
              <p className="mt-3" style={{ color: "#bdbdbd" }}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
