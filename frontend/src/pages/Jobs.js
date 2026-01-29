import { useState } from "react";

export default function Jobs() {
  const [jdText, setJdText] = useState("");
  const [jdFile, setJdFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

      alert("Job Description uploaded successfully");
    } catch (err) {
      alert("Failed to upload Job Description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h2 className="page-title">Create Job Description</h2>
        <p className="page-subtitle">
          Paste or upload your job description to start screening candidates.
        </p>

        <div className="theme-card">
          <form onSubmit={handleSubmit}>
            <textarea
              className="theme-textarea mb-3"
              placeholder="Paste job description text (optional)"
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
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
