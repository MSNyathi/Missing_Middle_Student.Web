import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaHome, FaLaptop, FaUserPlus, FaUsers, FaSignOutAlt, FaClipboardList
} from "react-icons/fa";
import eLogo from "../assets/e.png";
import tutLogo from "../assets/tut25.png";
import "./adminNavbar.css"; // Make sure this file is updated too

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
        Swal.fire("Logged out!", "You have been successfully logged out.", "success");
      }
    });
  };

  return (
    <div className="sidebar bg-primary text-white p-3" style={{ minHeight: "100vh", width: "250px", padding: 0 }}>
      <div className="text-center mb-4 p-3">
      <img src={tutLogo} alt="TUT Logo" style={{ width: "100%", marginBottom: "10px" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
         {/*} <img src={eLogo} alt="eLogo" style={{ height: "28px", marginTop: "4px" }} />*/}
          <h5 className="m-0" style={{ fontSize: "1.4rem", fontWeight: "bold", color: "white" }}>
            EduConnect
          </h5>
        </div>
      </div>

      <nav className="d-flex flex-column px-3 gap-3">
        <Link to="/admin/dashboard" className="custom-link">
          <FaHome /> Home
        </Link>

        <Link to="/admin/applicants" className="custom-link">
          <FaClipboardList /> Applications
        </Link>

        <div
          className="custom-link dropdown-toggle"
          role="button"
          onClick={() => setShowDeviceMenu(!showDeviceMenu)}
        >
          <FaLaptop /> Devices
        </div>
        {showDeviceMenu && (
          <div className="ps-4 d-flex flex-column gap-2">
            <Link to="/admin/assign-device" className="custom-link">Assign Devices</Link>
            <Link to="/admin/devices/view-devices" className="custom-link">View Devices</Link>
          </div>
        )}

        <div
          className="custom-link dropdown-toggle"
          role="button"
          onClick={() => setShowRegisterMenu(!showRegisterMenu)}
        >
          <FaUserPlus /> Register
        </div>
        {showRegisterMenu && (
          <div className="ps-4 d-flex flex-column gap-2">
            <Link to="/admin/register" className="custom-link">Register Technician</Link>
            <Link to="/admin/technicians" className="custom-link">View Technicians</Link>
          </div>
        )}

        <Link to="/admin/students" className="custom-link">
          <FaUsers /> Students
        </Link>

        <button
          onClick={handleLogout}
          className="btn btn-danger d-flex align-items-center justify-content-center gap-2 mt-4"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminNavbar;
