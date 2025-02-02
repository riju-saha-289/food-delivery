import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const AppDownloadSection = () => {
  return (
    <div className="bg-dark text-light py-5 mb-4">
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "50vh" }}>
        <div className="row align-items-center text-center">
          {/* Text Content */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold">Download the Tomato App</h2>
            <p className="mt-3">
              Enjoy the ultimate food delivery experience! Get exclusive deals,
              faster orders, and real-time tracking with our app.
            </p>
            {/* App Store Buttons */}
            <div className="mt-4">
              <a
                href="#"
                className="btn btn-danger me-3"
                style={{ padding: "10px 20px", fontSize: "1rem" }}
              >
                <i className="bi bi-apple me-2"></i> App Store
              </a>
              <a
                href="#"
                className="btn btn-danger"
                style={{ padding: "10px 20px", fontSize: "1rem" }}
              >
                <i className="bi bi-google-play me-2"></i> Google Play
              </a>
            </div>
          </div>

          {/* App Mockup */}
          <div className="col-md-6">
            <img
              src={assets.logo}
              alt="Tomato App Mockup"
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;
