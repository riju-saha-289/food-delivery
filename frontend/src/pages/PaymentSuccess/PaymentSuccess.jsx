import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"; // Fixed the import from "react-router-dom"

export default function PaymentSuccess() {
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get("reference");

  return (
    <div className="container m-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10 text-center">
          <div className="card shadow-lg p-4">
            <h1 className="text-success mb-4">Payment Successful</h1>
            <p className="lead">
              Thank you for your payment! Your transaction was successful.
            </p>
            {reference && (
              <p className="text-muted">
                <strong>Reference ID:</strong> {reference}
              </p>
            )}
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Link to="/" className="btn btn-primary">
                Go Home
              </Link>
              <Link to="/myorders" className="btn btn-secondary">
                My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
