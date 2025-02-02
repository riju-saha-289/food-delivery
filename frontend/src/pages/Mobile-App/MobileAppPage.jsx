import React from 'react';
import { assets } from '../../assets/frontend_assets/assets';

const MobileAppPage = () => {
  return (
    <section className="mobile-app-page py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4" style={{ color: '#2c7a7b' }}>
          Download Tomato - Your Food Delivery App
        </h2>
        <div className="row align-items-center justify-content-center">
          {/* App Features Section */}
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img
              src={assets.logo} // replace with actual image source
              alt="Tomato Mobile App"
              className="img-fluid rounded shadow-lg"
              style={{
                maxWidth: '100%',
                border: '5px solid rgb(218, 196, 26)',
                borderRadius: '15px',
              }}
            />
          </div>

          {/* App Download Links */}
          <div className="col-md-6">
            <p className="lead text-muted mb-4">
              Download the Tomato app today! Get the freshest meals delivered to your doorsteps with just a tap.
            </p>
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
        </div>
      </div>
    </section>
  );
};

export default MobileAppPage;
