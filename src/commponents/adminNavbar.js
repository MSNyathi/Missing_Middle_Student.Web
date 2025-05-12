import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './adminNavbar.css';

const AdminNavbar = () => {
  const [showDeviceMenu, setShowDeviceMenu] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);

  return (
    <div className="d-flex flex-column vh-100 p-3 bg-dark text-white" style={{ width: '220px' }}>
      <h2 className="mb-4">💻 eduConnect</h2>
      <ul className="nav nav-pills flex-column">

        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link text-white">🏠 Home</Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/applicants" className="nav-link text-white">📄 Applications</Link>
        </li>

        {/* Devices Dropdown (Click to toggle) */}
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
              <li><Link to="/admin/assign-device" className="dropdown-item">Assign Devices</Link></li>
              <li><Link to="/admin/devices/view-devices" className="dropdown-item">View Devices</Link></li>
            </ul>
          )}
        </li>

        {/* Register Dropdown (Click to toggle) */}
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
              <li><Link to="/admin/register" className="dropdown-item">Register Technician</Link></li>
              <li><Link to="/admin/technicians" className="dropdown-item">View Technicians</Link></li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <Link to="/admin/students" className="nav-link text-white">👨‍🎓 Students</Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/login" className="nav-link text-white">🚪 Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
