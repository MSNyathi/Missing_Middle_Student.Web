import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import tutLogo from '../../../assets/tut.png';
import backgroundImage from '../../../assets/background2.jpeg'; // Make sure this matches your actual file path

const TrackApplication = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const currentStep = 1; // Update based on actual logic
  const steps = ['Application Received', 'Under Review', 'Approved / Rejected'];

  const handleConfirmLogout = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div
      className="position-relative d-flex flex-column justify-content-start align-items-center vh-100 p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* TUT Logo Top-Left */}
      <img
        src={tutLogo}
        alt="TUT Logo"
        className="position-absolute top-0 start-0 m-3"
        style={{ height: '60px' }}
      />

      {/* Back Button Bottom-Left */}
      <div className="position-fixed bottom-0 start-0 p-3">
        <Link to="/student" className="btn btn-outline-secondary">
          <FaArrowLeft className="me-2" />
          Back to Dashboard
        </Link>
      </div>

      {/* Logout Button Bottom-Right */}
      <div className="position-fixed bottom-0 end-0 p-3">
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="container mt-5 pt-5 bg-light rounded shadow p-4" style={{ maxWidth: '700px', opacity: 0.95 }}>
        <h2 className="mb-3 text-center">Track Your Application</h2>
        <p className="text-center mb-4">Monitor the status of your laptop application below:</p>

        {/* Step Progress Visual */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          {steps.map((label, index) => (
            <div key={index} className="text-center flex-fill position-relative">
              <div
                className={`rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center
                ${index + 1 === currentStep
                    ? 'bg-primary text-white'
                    : index + 1 < currentStep
                    ? 'bg-success text-white'
                    : 'bg-light border'}`}
                style={{ width: '40px', height: '40px', zIndex: 1 }}
              >
                {index + 1}
              </div>
              <div className={`small ${index + 1 <= currentStep ? 'fw-bold' : 'text-muted'}`}>{label}</div>
              {index < steps.length - 1 && (
                <div
                  className="position-absolute top-50 start-100 translate-middle-y w-100"
                  style={{
                    height: '2px',
                    backgroundColor: index + 1 < currentStep ? '#198754' : '#dee2e6',
                    zIndex: 0,
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleConfirmLogout}>Yes, Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackApplication;
