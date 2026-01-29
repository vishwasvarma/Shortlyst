import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Resume Screener
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
          <Link className="nav-link" to="/jobs">
            Job Description
          </Link>
          <Link className="nav-link" to="/upload">
            Upload Resumes
          </Link>
          <Link className="nav-link" to="/results">
            Results
          </Link>
        </div>
      </div>
    </nav>
  );
}
