import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Hero = () => {
  return (
    <section
      className="hero-section py-5"
      style={{
        background: 'linear-gradient(120deg, #e3f9e5, #ffffff)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="col-12 col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#2c7a7b' }}>
              Fresh, Healthy, <br />
              <span style={{ color: '#48bb78' }}>Delivered to You</span>
            </h1>
            <p className="lead text-muted mb-4">
              Discover the freshest meals and ingredients from top restaurants near you. Experience healthy and delightful dining in just a few clicks!
            </p>
            <div>
              <a
                href="#explore-menu"
                className="btn btn-success btn-lg px-4 py-3 me-3 shadow-sm w-100 w-sm-auto mb-2"
                style={{
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Order Now
              </a>
              <a
                href="#explore-menu"
                className="btn btn-outline-success btn-lg px-4 py-3 shadow-sm w-100 w-sm-auto"
                style={{
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Explore Menu
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="col-12 col-lg-6 text-center mt-5 mt-lg-0">
            <img
              src={assets.header_img}
              alt="Fresh Meals"
              className="img-fluid rounded shadow-lg"
              style={{
                border: '5px solid rgb(218, 196, 26)',
                borderRadius: '15px',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
