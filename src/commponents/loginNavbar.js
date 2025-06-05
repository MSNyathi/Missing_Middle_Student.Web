// src/components/LoginNavbar.jsx
import React, { useState } from 'react';
import tut25 from '../assets/tut25.png';
import './loginNavbar.css';
import { Link } from 'react-router-dom';

const LoginNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav id="login-navbar" onClick={closeDropdown}>
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img
            src={tut25}
            alt="TUT Logo"
            className="navbar-logo"
          />
        </Link>
        <h1 className="navbar-title">EduConnect</h1>
      </div>

      <div className="dropdown" onClick={(e) => e.stopPropagation()}>
        <button className="switch-user-btn" onClick={toggleDropdown}>
          <i className="bi bi-person-circle me-1"></i>
          <span>Switch User</span>
          <i className="bi bi-caret-down-fill dropdown-icon ms-1"></i>
        </button>

        {dropdownOpen && (
          <div className="dropdown-content">
            <Link to="/admin/login">Admin Login</Link>
            <Link to="/student/login">Student Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LoginNavbar;
