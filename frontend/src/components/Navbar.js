import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          shortlysr
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link" to="/jobs">
            Jobs
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
