import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 ">
      <div className="container">
        <div className="row">
          {/* Logo and About Section */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Tomato</h5>
            <p>
              Delivering delicious food at your doorstep. Experience the taste
              of happiness with Tomato.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/menu" className="text-light text-decoration-none">
                  Menu
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-light text-decoration-none">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe and Social Media */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Stay Connected</h5>
            <form className="mb-3">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-label="Email"
                />
                <button className="btn btn-danger" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
            <div>
              <a
                href="#"
                className="text-light me-3"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="text-light me-3"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="#"
                className="text-light me-3"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="border-light" />
        <div className="text-center">
          <p className="mb-0">&copy; 2025 Tomato. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

