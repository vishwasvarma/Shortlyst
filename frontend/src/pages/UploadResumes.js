import { useState } from "react";
import { useResults } from "../context/ResultsContext";
import { useNavigate } from "react-router-dom";

export default function UploadResumes() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { setResults } = useResults();
  const navigate = useNavigate();

  const uploadResumes = async () => {
    if (files.length === 0) {
      setMessage("Please select at least one resume ❗");
      return;
    }

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

      if (res.ok) {
        setResults(data.results); // ✅ SAVE GLOBALLY
        navigate("/results"); // ✅ GO TO RESULTS PAGE
      } else {
        setMessage(data.error || "Analysis failed ❌");
      }
    } catch (err) {
      setMessage("Backend not reachable ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow">
      <h2>Upload Resumes</h2>

      <input
        type="file"
        multiple
        accept=".pdf,.docx"
        className="form-control mt-3"
        onChange={(e) => setFiles(e.target.files)}
      />

      <button
        className="btn btn-primary mt-3"
        onClick={uploadResumes}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resumes"}
      </button>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
