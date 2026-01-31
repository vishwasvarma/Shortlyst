import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const baseStyle = {
    color: "#ffffff",
    fontWeight: 600,
    padding: "8px 16px",
    borderRadius: "999px",
    marginRight: "12px",
    textDecoration: "none",
    background: "transparent",
    border: "1px solid transparent",
    transition: "all 0.2s ease",
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    display: "inline-block",
  };

  const activeStyle = {
    background: "#000000",
    border: "1px solid #333",
  };

  const hoverStyle = {
    background: "#111111",
    border: "1px solid #333",
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      {/* BRAND */}
      <Link
        to="/"
        className="navbar-brand"
        style={{
          fontWeight: "800",
          fontSize: "20px",
          cursor: "pointer",
          textDecoration: "none",
          outline: "none",
        }}
      >
        Shortlyst
      </Link>

      {/* NAV LINKS */}
      <div>
        {[
          { to: "/", label: "Dashboard", end: true },
          { to: "/jobs", label: "Jobs" },
          { to: "/resumes", label: "Upload Resumes" },
          { to: "/results", label: "Results" },
        ].map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            {({ isActive }) => (
              <span
                style={{
                  ...baseStyle,
                  ...(isActive ? activeStyle : {}),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    Object.assign(e.target.style, hoverStyle);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    Object.assign(e.target.style, {
                      background: "transparent",
                      border: "1px solid transparent",
                    });
                  }
                }}
              >
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
