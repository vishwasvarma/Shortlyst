import { useState } from "react";
import { useResults } from "../context/ResultsContext";
import { useNavigate } from "react-router-dom";

export default function UploadResumes() {
  const [files, setFiles] = useState([]);
  const [githubLinks, setGithubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setResults } = useResults();
  const navigate = useNavigate();

  const submit = async () => {
    if (files.length === 0) {
      alert("Please upload at least one resume");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    files.forEach((f) => formData.append("resumes", f));

    // IMPORTANT: always send same count as resumes
    files.forEach((_, i) =>
      formData.append("github_links", githubLinks[i] || ""),
    );

    try {
      const res = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Analysis failed");
        setLoading(false);
        return;
      }

      setResults(data.results);
      navigate("/results");
    } catch (err) {
      alert("Server error");
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
        onChange={(e) => {
          const selected = [...e.target.files];
          setFiles(selected);
          setGithubLinks(new Array(selected.length).fill(""));
        }}
      />

      {files.map((file, i) => (
        <input
          key={i}
          type="text"
          placeholder={`GitHub / Portfolio link for ${file.name} (optional)`}
          className="form-control mt-2"
          value={githubLinks[i] || ""}
          onChange={(e) => {
            const copy = [...githubLinks];
            copy[i] = e.target.value;
            setGithubLinks(copy);
          }}
        />
      ))}

      <button
        className="btn btn-primary mt-3"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resumes"}
      </button>
    </div>
  );
}
