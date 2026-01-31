import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkStyle = ({ isActive }) => ({
    color: "white",
    fontWeight: isActive ? "bold" : "normal",
    borderBottom: isActive ? "2px solid #0d6efd" : "none",
    marginRight: "20px",
    textDecoration: "none",
    paddingBottom: "4px",
  });

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">Resume Screener</span>

      <div>
        <NavLink to="/" end style={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/jobs" style={linkStyle}>
          Jobs
        </NavLink>

        <NavLink to="/resumes" style={linkStyle}>
          Upload Resumes
        </NavLink>

        <NavLink to="/results" style={linkStyle}>
          Results
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
