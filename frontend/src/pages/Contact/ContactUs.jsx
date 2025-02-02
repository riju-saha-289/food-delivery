import React from 'react';
export default function ContactUs() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Contact Us</h2>

      <div className="row">
        {/* Contact Form */}
        <div className="col-lg-6 col-md-8 mx-auto">
          <form className="contact-form">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" className="form-control" placeholder="Enter your name" required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-control" placeholder="Enter your email" required />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" className="form-control" placeholder="Enter your message" rows="4" required></textarea>
            </div>

            <button type="submit" className="btn btn-danger w-100">Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="col-lg-5 col-md-6 mx-auto mt-5 mt-md-0">
          <div className="contact-info">
            <h3>Our Address</h3>
            <p>123 Food Street, Tomato City, TX 75000</p>

            <h3>Email</h3>
            <p>support@tomato.com</p>

            <h3>Phone</h3>
            <p>+1 (234) 567-890</p>

            {/* Google Map Embed */}
            <iframe
              title="Google Map"
              className="w-100"
              src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              height="250"
              style={{ border: '0', borderRadius: '10px' }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
