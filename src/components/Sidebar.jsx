import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaPlusSquare, FaLaptop, FaSignOutAlt, FaTrash, FaSyncAlt } from 'react-icons/fa';

const Sidebar = () => (
  <div className="bg-dark text-white p-3" style={{ minHeight: '100vh' }}>
    <h4 className="mb-4 d-flex align-items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0d6efd" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="18" fontFamily="Verdana" fontSize="20" fontWeight="bold" fill="currentColor">E</text>
      </svg>
      eduConnect
    </h4>
    <Nav className="flex-column">
      <Nav.Link as={Link} to="/technician/dashboard" className="text-white d-flex align-items-center gap-2">
        <FaHome /> Home
      </Nav.Link>
      <Nav.Link as={Link} to="/RegisterDevice" className="text-white d-flex align-items-center gap-2">
        <FaPlusSquare /> Register Device
      </Nav.Link>
      <Nav.Link as={Link} to="/devices" className="text-white d-flex align-items-center gap-2">
        <FaLaptop /> Donated Laptops
      </Nav.Link>
      <Nav.Link as={Link} to="/writtenOffLaptops" className="text-white d-flex align-items-center gap-2">
        <FaTrash /> Written Off Laptops
      </Nav.Link>
      <Nav.Link as={Link} to="/refurbishmentProgress" className="text-white d-flex align-items-center gap-2">
        <FaSyncAlt /> Refurbishment Progress
      </Nav.Link>
      <Nav.Link as={Link} to="/adminlogin" className="text-white d-flex align-items-center gap-2">
        <FaSignOutAlt /> Logout
      </Nav.Link>
    </Nav>
  </div>
);

export default Sidebar;
