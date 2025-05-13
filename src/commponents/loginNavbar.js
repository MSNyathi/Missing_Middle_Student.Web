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
    <nav id="mynav" onClick={closeDropdown}>
      <Link to="/">
        <img id="myimg" src={tut25} className="bcolor" alt="Logo" />
      </Link>
      <h1 id="myh1">EduConnect</h1>

      <div className="dropdown" onClick={(e) => e.stopPropagation()}>
        <button className="switch-user-btn" onClick={toggleDropdown}>
          <i className="bi bi-person-circle"></i>
          <span>Switch User</span>
          <i className="bi bi-caret-down-fill dropdown-icon"></i>
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            <Link to="/admin/login">Admin Login</Link>
            <Link to="/login">Student Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LoginNavbar;
