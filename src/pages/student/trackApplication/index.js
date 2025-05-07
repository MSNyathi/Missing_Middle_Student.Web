import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const TrackApplication = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can also clear session/localStorage here if needed
    navigate('/');
  };

  return (
    <div className="container mt-4 position-relative">
      {/* Back to Dashboard Button */}
      <Link to="/student" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft className="me-2" />
        Back to Dashboard
      </Link>

      {/* Main Content */}
      <h2>Track Your Application</h2>
      <p>This is where students can track their application status.</p>

      {/* Logout Button (bottom right corner) */}
      <div className="position-fixed bottom-0 end-0 p-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default TrackApplication;
