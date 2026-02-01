import { useState } from "react";
import { useResults } from "../context/ResultsContext";
import { useNavigate } from "react-router-dom";
import { analyzeResumes } from "../api";

export default function UploadResumes() {
  const { setResults } = useResults();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setLinks(selected.map(() => ""));
  };

  const handleLinkChange = (index, value) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => formData.append("resumes", file));
    links.forEach((link) => formData.append("github_links", link));

    try {
      setLoading(true);
      const data = await analyzeResumes(formData);
      setResults(data.results);
      navigate("/results");
    } catch {
      alert("Failed to analyze resumes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid px-5">
        <h2 className="page-title">Upload Resumes</h2>
        <p className="page-subtitle">
          Upload resumes with optional GitHub / portfolio links.
        </p>

        <div className="theme-card">
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              multiple
              accept=".pdf,.docx"
              className="theme-input mb-4"
              onChange={handleFileChange}
            />

            {files.map((file, i) => (
              <div key={i} className="mb-4">
                <label style={{ color: "#bdbdbd" }}>
                  {file.name} — GitHub / Portfolio (optional)
                </label>

                <input
                  type="url"
                  className="theme-input mt-2"
                  placeholder="https://github.com/username or portfolio link"
                  value={links[i]}
                  onChange={(e) => handleLinkChange(i, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "15px",
                    borderRadius: "12px",
                  }}
                />
              </div>
            ))}

            <button className="theme-btn" type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Resumes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
