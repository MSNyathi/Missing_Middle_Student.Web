import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplyLaptop = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentNumber: '',
    surname: '',
    initials: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    navigate('/student');
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Application submitted!');
    // You can add API call or navigation to next step here
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark bg-opacity-75">
      <div className="bg-light p-4 rounded shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <Link to="/student" className="btn btn-outline-secondary mb-3">
          <FaArrowLeft className="me-2" />
          Back to Dashboard
        </Link>
        <h2 className="text-center">APPLY FOR LAPTOP</h2>
        <p className="text-center">Please enter the details below</p>
        <form onSubmit={handleNext}>
          <div className="mb-3">
            <label className="form-label">Student Number:</label>
            <input
              type="text"
              className="form-control"
              name="studentNumber"
              value={formData.studentNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Surname:</label>
            <input
              type="text"
              className="form-control"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Initials:</label>
            <input
              type="text"
              className="form-control"
              name="initials"
              value={formData.initials}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Student Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Current Programme:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.CurrentProgramme}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label className="form-label">Citizenship:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.citizenship}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="form-label">Phone:</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              CANCEL
            </button>
            <button type="submit" className="btn btn-primary">
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLaptop;
