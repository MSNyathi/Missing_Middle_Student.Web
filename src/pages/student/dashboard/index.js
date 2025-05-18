import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaLaptopCode,
  FaMapMarkedAlt,
  FaInfoCircle,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaUserCircle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import tutLogo from "../../../assets/tut.webp";

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
        {/* Navbar */}
        <nav className={`navbar navbar-expand-lg mb-4 ${glassClass}`}>
          <div className="container-fluid">
            <Link
              className="navbar-brand d-flex align-items-center text-white fw-bold"
              to="/student/dashboard"
            >
              <img
                src={tutLogo}
                alt="TUT Logo"
                style={{ height: "40px", marginRight: "10px" }}
              />
              EduConnect
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ borderColor: "#fff" }}
            >
              <span
                className="navbar-toggler-icon"
                style={{ filter: "invert(1)" }}
              ></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/student/help">
                    Help
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center">
                <FaSun className="me-2" color={darkMode ? "#bbb" : "#f39c12"} />
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    id="themeSwitchNav"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <FaMoon
                  className="ms-2 me-3"
                  color={darkMode ? "#f1c40f" : "#999"}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Welcome and Status */}
        <div className="text-center mb-4">
          <h2>WELCOME TO EduConnect</h2>
          <p className="text-success">
            Latest Application Status: <strong>Under Review</strong>
          </p>
        </div>

        {/* Notification */}
        <div className="alert alert-info text-center" role="alert">
          <FaInfoCircle className="me-2" />
          Application submissions close on <strong>June 15, 2025!</strong>
        </div>

        {/* Profile and Actions */}
        <div className="row mb-4">
          {/* Profile */}
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

          {/* Actions */}
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
              </div>
              <div className="col-12">
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

        {/* Fixed Bottom Buttons */}
        <div className="position-fixed bottom-0 start-0 m-3">
          <Link
            to="/student/help"
            className="btn btn-outline-info d-flex align-items-center"
          >
            <FaInfoCircle className="me-2" />
            Need Help?
          </Link>
        </div>

        <div className="position-fixed bottom-0 end-0 m-3">
          <button
            className="btn btn-outline-danger d-flex align-items-center"
            onClick={() => setShowModal(true)}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
