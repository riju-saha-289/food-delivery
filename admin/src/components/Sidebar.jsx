import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [sidebar, setSidebar] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`d-flex flex-column bg-light p-3 shadow ${
          isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"
        }`}
        style={{ transition: "width 0.3s" }}
      >
        {/* Toggle Button */}
        <button
          className="btn btn-primary mb-3"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ width: "100%" }}
        >
          {isSidebarOpen ? "Collapse" : "Expand"}
        </button>

        {/* Sidebar Header */}
        {isSidebarOpen && (
          <div className="mb-4">
            <h5 className="text-center fw-bold text-primary">Admin Panel</h5>
            <hr className="border-primary" />
          </div>
        )}

        {/* Sidebar Links */}
        <Link
          to={"/add"}
          className={`cursor-auto d-flex align-items-center p-2 mb-3 text-decoration-none text-dark rounded hover-bg ${
            sidebar === "Add Items" ? "border border-secondary" : ""
          }`}
          onClick={() => setSidebar("Add Items")}
        >
          <img
            src={assets.add_icon}
            alt=""
            className="me-3"
            style={{ height: "24px" }}
          />
          {isSidebarOpen && <p className="mb-0">Add Items</p>}
        </Link>

        <Link
          to={"/list"}
          className={`cursor-auto d-flex align-items-center p-2 mb-3 text-decoration-none text-dark rounded hover-bg ${
            sidebar === "List Items" ? "border border-secondary" : ""
          }`}
          onClick={() => setSidebar("List Items")}
        >
          <img
            src={assets.order_icon}
            alt=""
            className="me-3"
            style={{ height: "24px" }}
          />
          {isSidebarOpen && <p className="mb-0">List Items</p>}
        </Link>

        <Link
          to={"/orders"}
          className={`cursor-auto d-flex align-items-center p-2 mb-3 text-decoration-none text-dark rounded hover-bg ${
            sidebar === "Order" ? "border border-secondary" : ""
          }`}
          onClick={() => setSidebar("Order")}
        >
          <img
            src={assets.order_icon}
            alt=""
            className="me-3"
            style={{ height: "24px" }}
          />
          {isSidebarOpen && <p className="mb-0">Order</p>}
        </Link>
      </div>

      {/* Main Content */}
      
  );
}
