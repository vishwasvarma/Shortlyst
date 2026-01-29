import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadResumes() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const analyzeResumes = async () => {
    if (files.length === 0) {
      setError("Please select resumes");
      return;
    }

    const formData = new FormData();
    for (let file of files) {
      formData.append("resumes", file);
    }

    const res = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      setError("Analysis failed");
      return;
    }

    navigate("/results");
  };

  return (
    <div className="card p-4 shadow">
      <h2>Upload Resumes</h2>

      <input
        type="file"
        multiple
        className="form-control mt-3"
        onChange={(e) => setFiles(e.target.files)}
      />

      <button className="btn btn-success mt-3" onClick={analyzeResumes}>
        Analyze Resumes
      </button>

      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
}
