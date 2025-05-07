import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import tutLogo from '../../../assets/tut.png'; // Adjust the path as necessary

const ApplyLaptop = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentNumber: '',
    surname: '',
    initials: '',
    email: '',
    currentProgramme: '',
    campus: '',
    hasRecommendation: '',
    citizenship: '',
    phone: '',
    recommendationFile: null,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCancel = () => {
    navigate('/student');
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Application submitted!');
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="position-relative d-flex flex-column justify-content-center align-items-center vh-100 bg-dark bg-opacity-75 p-3">
      {/* Top Left Logo */}
      <img
        src={tutLogo}
        alt="TUT Logo"
        className="position-absolute top-0 start-0 m-3"
        style={{ height: '60px', width: 'auto' }}
      />

      {/* Back Button Bottom-Left */}
      <Link to="/student" className="position-fixed bottom-0 start-0 m-3 btn btn-outline-secondary">
        <FaArrowLeft className="me-2" />
        Back to Dashboard
      </Link>

      {/* Logout Button Bottom-Right */}
      <div className="position-fixed bottom-0 end-0 p-3">
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

      {/* Modal for Logout Confirmation */}
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

      {/* Main Form Card */}
      <div className="bg-light p-5 rounded shadow" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4">APPLY FOR LAPTOP</h2>
        <p className="text-center mb-4">Please enter the details below</p>
        <form onSubmit={handleNext}>
          {[
            { label: 'Student Number', name: 'studentNumber' },
            { label: 'Surname', name: 'surname' },
            { label: 'Initials', name: 'initials' },
            { label: 'Student Email', name: 'email', type: 'email' },
            { label: 'Current Programme', name: 'currentProgramme' },
            { label: 'Phone', name: 'phone', type: 'tel' },
          ].map(({ label, name, type = 'text' }) => (
            <div className="mb-3" key={name}>
              <label className="form-label">{label}:</label>
              <input
                type={type}
                className="form-control"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">Campus:</label>
            <select
              className="form-select"
              name="campus"
              value={formData.campus}
              onChange={handleChange}
              required
            >
              <option value="">Select your campus</option>
              <option value="Arcadia Campus">Arcadia Campus</option>
              <option value="Arts Campus">Arts Campus</option>
              <option value="Pretoria Campus">Pretoria Campus</option>
              <option value="Ga-Rankuwa Campus">Ga-Rankuwa Campus</option>
              <option value="Soshanguve North Campus">Soshanguve North Campus</option>
              <option value="Soshanguve South Campus">Soshanguve South Campus</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Citizenship:</label>
            <select
              className="form-select"
              name="citizenship"
              value={formData.citizenship}
              onChange={handleChange}
              required
            >
              <option value="">Select your citizenship</option>
              <option value="South African">South African</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Do you have a Recommendation Letter?</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="hasRecommendation"
                  value="yes"
                  checked={formData.hasRecommendation === 'yes'}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="hasRecommendation"
                  value="no"
                  checked={formData.hasRecommendation === 'no'}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>

          {formData.hasRecommendation === 'yes' && (
            <div className="mb-3">
              <label className="form-label">Upload Recommendation Letter:</label>
              <input
                type="file"
                className="form-control"
                name="recommendationFile"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleChange}
              />
            </div>
          )}

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              CANCEL
            </button>
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLaptop;
