import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import LoginPopup from "./LoginPopup";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";
const Navbar = () => {
  const [activeTab, setActiveTab] = useState("home"); // Set default active tab

  const [showPopup, setShowPopup] = useState(false);

  const { cartTotal, token, setToken } = useContext(Context);
  const navigate=useNavigate();
  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Correctly set the active tab based on the tabName parameter
  };

  const logout=()=>{
    localStorage.removeItem("token");
    setToken("")
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Left Side: Logo */}
        <Link className="navbar-brand" to="/">
          <img src={assets.logo} alt="Logo" style={{ height: "40px" }} />
        </Link>

        {/* Toggle Button for Mobile */}
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

        {/* Middle Section */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {["home", "menu", "mobile-app", "contact-us"].map((tab) => (
              <li className="nav-item" key={tab}>
                <Link
                  className={`nav-link ${
                    activeTab === tab ? "active-tab" : ""
                  }`}
                  to={`/${tab}`}
                  onClick={() => handleTabClick(tab)} // Pass the correct tab name
                  style={{
                    paddingBottom: activeTab === tab ? "2px" : "0px",
                    borderBottom:
                      activeTab === tab ? "3px solid #49557e" : "none",
                  }}
                >
                  {tab.replace("-", " ").toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3">
          <img src={assets.search_icon} alt="Search Icon" />
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="Basket Icon" />
            </Link>

            <div className={cartTotal() > 0 ? "red-dot" : ""}></div>
          </div>
          {!token ? (
            <button
              className="btn btn-primary ms-2"
              onClick={() => setShowPopup(true)}
            >
              Sign in
            </button>
          ) : (
            <div className="navbar-profile dropdown">
              <img
                src={assets.profile_icon}
                alt=""
                className="img-fluid rounded-circle dropdown-toggle"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              />
              <ul
                className="dropdown-menu dropdown-menu-end navbar-profile-dropdown"
                aria-labelledby="profileDropdown"
                style={{ minWidth: "150px" }}
              >
                <li className="dropdown-item d-flex align-items-center"
                onClick={()=>navigate('/myorders')}
                >
                  <img
                    src={assets.bag_icon}
                    alt=""
                    className="me-2"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p className="mb-0">Order</p>
                </li>
                <hr className="dropdown-divider" />
                <li className="dropdown-item d-flex align-items-center"
                onClick={logout}>
                  <img
                    src={assets.logout_icon}
                    alt=""
                    className="me-2"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p className="mb-0">Logout</p>
                </li>
              </ul>
            </div>
          )}

          {showPopup ? (
            <LoginPopup showPopup={showPopup} setShowPopup={setShowPopup} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
