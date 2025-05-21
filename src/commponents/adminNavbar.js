import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./adminNavbar.css";
import eLogo from "../assets/e.png";
import tutLogo from "../assets/tut25.png";

const AdminNavbar = () => {
  const [showDeviceMenu, setShowDeviceMenu] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out and session data will be cleared.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/admin/login");
        Swal.fire(
          "Logged out!",
          "You have been successfully logged out.",
          "success"
        );
      }
    });
  };

  return (
    <div
      className="d-flex flex-column vh-100 p-3 bg-primary text-white"
      style={{ width: "220px" }}
    >
      <h2 className="mb-4 text-white">
        <img
          src={tutLogo}
          alt="TUT logo"
          style={{
            height: "50px",
            width: "auto",
            marginTop: "8px",
          }}
        />
        <span style={{ display: "inline-flex", alignItems: "baseline" }}>
          <img
            src={eLogo}
            alt="e logo"
            style={{
              height: "36px",
              width: "auto",
              marginRight: "-3px", // slight overlap to remove gap
              transform: "translateY(8px)", // align with text baseline
              // remove marginTop
            }}
          />
          <span style={{ color: "white", fontSize: "28px", fontWeight: "500" }}>
            duConnect
          </span>
        </span>
      </h2>

      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link text-white">
            🏠 Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/applicants" className="nav-link text-white">
            📄 Applications
          </Link>
        </li>
        <li className="nav-item">
          <div
            className="nav-link text-white dropdown-toggle"
            role="button"
            onClick={() => setShowDeviceMenu(!showDeviceMenu)}
          >
            💻 Devices
          </div>
          {showDeviceMenu && (
            <ul className="dropdown-menu-custom">
              <li>
                <Link to="/admin/assign-device" className="dropdown-item">
                  Assign Devices
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/devices/view-devices"
                  className="dropdown-item"
                >
                  View Devices
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <div
            className="nav-link text-white dropdown-toggle"
            role="button"
            onClick={() => setShowRegisterMenu(!showRegisterMenu)}
          >
            📝 Register
          </div>
          {showRegisterMenu && (
            <ul className="dropdown-menu-custom">
              <li>
                <Link to="/admin/register" className="dropdown-item">
                  Register Technician
                </Link>
              </li>
              <li>
                <Link to="/admin/technicians" className="dropdown-item">
                  View Technicians
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <Link to="/admin/students" className="nav-link text-white">
            👨‍🎓 Students
          </Link>
        </li>
        <li className="nav-item">
          <button
            onClick={handleLogout}
            className="nav-link text-white btn btn-danger w-100 mt-3"
          >
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
