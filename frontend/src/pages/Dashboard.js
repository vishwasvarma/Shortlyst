export default function Dashboard() {
  return (
    <div className="page-wrapper">
      <div className="container-fluid px-5">
        <h2 className="page-title">Dashboard</h2>
        <p className="page-subtitle">
          Welcome to Shortlyst — JD‑aware resume screening system
        </p>

        <div className="theme-card">
          <p>Use the navigation bar to:</p>
          <ul>
            <li>Add a Job Description</li>
            <li>Upload candidate resumes</li>
            <li>Review screening results</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
