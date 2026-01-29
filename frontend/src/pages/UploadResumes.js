import { useState } from "react";
import { useResults } from "../context/ResultsContext";

export default function UploadResumes() {
  const { setResults } = useResults();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let file of files) {
      formData.append("resumes", file);
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid px-5">
        <h2 className="page-title">Upload Resumes</h2>
        <p className="page-subtitle">
          Upload candidate resumes to analyze against the job description.
        </p>

        {/* ✅ SAME CARD AS JD PAGE */}
        <div className="theme-card">
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              multiple
              accept=".pdf,.docx"
              className="theme-input mb-4"
              onChange={(e) => setFiles(e.target.files)}
            />

            <button className="theme-btn" type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Resumes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
