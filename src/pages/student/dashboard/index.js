import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaLaptopCode,
  FaMapMarkedAlt,
  FaInfoCircle,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  const handleConfirmLogout = () => {
    setShowModal(false);
    navigate("/");
  };

  const backgroundStyle = {
    backgroundImage: "url('/background2.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "2rem",
    transition: "background 0.3s ease-in-out",
  };

  const glassClass = darkMode ? "glass-card-dark" : "glass-card-light";

  return (
    <div style={backgroundStyle}>
      <div className="container-fluid text-white">
        {/* Theme Toggle */}
        <div className="d-flex justify-content-end align-items-center mb-3">
          <FaSun className="me-2" color={darkMode ? "#bbb" : "#f39c12"} />
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              id="themeSwitch"
              style={{ cursor: "pointer" }}
            />
          </div>
          <FaMoon className="ms-2" color={darkMode ? "#f1c40f" : "#999"} />
        </div>

        {/* Top Header */}
        <div className="text-center mb-4">
          <h2>WELCOME TO EduConnect</h2>
          <p className="text-success">
            Latest Application Status: <strong>Under Review</strong>
          </p>
        </div>

        {/* Notifications */}
        <div className="alert alert-info text-center" role="alert">
          <FaInfoCircle className="me-2" />
          Application submissions close on <strong>June 15, 2025!</strong>
        </div>

        {/* Profile and Activity Row */}
        <div className="row mb-4">
          {/* Profile Card */}
          <div className="col-md-4 mb-3">
            <div className={`card shadow-sm p-3 ${glassClass}`}>
              <h5>Student Profile</h5>
              <p>
                <strong>Name:</strong> John Doe
              </p>
              <p>
                <strong>Email:</strong> john@example.com
              </p>
              <p>
                <strong>Student ID:</strong> 123456
              </p>
            </div>
          </div>

          {/* Main Actions */}
          <div className="col-md-4 mb-3 d-flex flex-column align-items-center justify-content-center">
            <div className="row w-100">
              <div className="col-12 mb-3">
                <Link to="/student/apply" className="text-decoration-none">
                  <div
                    className={`card p-4 shadow-lg text-center ${glassClass} card-hover-glow`}
                  >
                    <FaLaptopCode size={100} className="mb-3 glow-icon" />
                    <h5 className="text-white">APPLY FOR LAPTOP</h5>
                  </div>
                </Link>

                <Link to="/student/track" className="text-decoration-none">
                  <div
                    className={`card p-4 shadow-lg text-center ${glassClass} card-hover-glow`}
                  >
                    <FaMapMarkedAlt size={100} className="mb-3 glow-icon" />
                    <h5 className="text-white">TRACK APPLICATION</h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-md-4 mb-3">
            <div className={`card shadow-sm p-3 ${glassClass}`}>
              <h5>Recent Activity</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent">
                  Applied for Laptop – May 5, 2025
                </li>
                <li className="list-group-item bg-transparent">
                  Checked Application Status
                </li>
                <li className="list-group-item bg-transparent">Logged In</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Help and Logout */}
<div className="d-flex justify-content-between align-items-center mt-4 px-3">
  {/* Help Dropdown */}
  <div className="dropdown">
    <button
      className="btn btn-outline-info dropdown-toggle"
      type="button"
      id="helpDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <FaInfoCircle className="me-2" />
      Help Topics
    </button>
    <ul className="dropdown-menu" aria-labelledby="helpDropdown">
      <li>
        <Link className="dropdown-item" to="/student/help/about">
          📌 What is this project about?
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/student/help/eligible">
          📝 Who is eligible?
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/student/help/distribution">
          🧮 How are laptops distributed?
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/student/help/warranty">
          🛠️ Warranty or support?
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/student/help/contact">
          📍 Who do I contact?
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/student/help/security">
          🔐 Security & support
        </Link>
      </li>
    </ul>
  </div>


</div>

        {/* Logout Modal */}
        {showModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className={`modal-content ${glassClass}`}>
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Logout</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to logout?</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleConfirmLogout}
                  >
                    Yes, Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
