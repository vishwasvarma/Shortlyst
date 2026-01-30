import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/">
          Shortlyst
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
          <Link className="nav-link" to="/jobs">
            Add JD
          </Link>
          <Link className="nav-link" to="/resumes">
            Add Resumes
          </Link>
          <Link className="nav-link" to="/results">
            Results
          </Link>
        </div>
      </div>
    </nav>
  );
}
