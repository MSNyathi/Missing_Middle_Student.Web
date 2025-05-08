import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import tutLogo from '../assets/tut-logo.png';

const BackgroundLayout = ({ children, onLogoutClick }) => {
  const backgroundStyle = {
    backgroundImage: "url('/background.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundStyle} className="position-relative d-flex flex-column justify-content-start p-4">
      {/* Logo Top-Left */}
      <img src={tutLogo} alt="TUT Logo" className="position-absolute top-0 start-0 m-3" style={{ height: '60px' }} />

      {/* Back Button Bottom-Left */}
      <div className="position-fixed bottom-0 start-0 p-3">
        <Link to="/student" className="btn btn-outline-secondary">
          <FaArrowLeft className="me-2" />
          Back to Dashboard
        </Link>
      </div>

      {/* Logout Button Bottom-Right */}
      <div className="position-fixed bottom-0 end-0 p-3">
        <button className="btn btn-danger" onClick={onLogoutClick}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

      {/* Page Content */}
      <div className="container pt-5">{children}</div>
    </div>
  );
};

export default BackgroundLayout;
