import React from "react";
import { assets } from "../assets/assets";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img src={assets.logo} alt="logo" style={{ height: "40px" }} />
        </a>

        {/* Toggle Button for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/settings">
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Profile Image */}
        <div className="d-flex">
          <img
            src={assets.profile_image}
            alt="profile"
            className="rounded-circle"
            style={{ height: "40px", width: "40px", objectFit: "cover" }}
          />
        </div>
      </div>
    </nav>
    
  );
}
