// src/Components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="glass-navbar">
      <h2>Student Portal</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/ApplyLaptop">Apply for Laptop</Link></li>
        <li><Link to="/TrackApplication">Track Application</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
