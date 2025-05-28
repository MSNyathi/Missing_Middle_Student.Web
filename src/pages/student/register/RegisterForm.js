import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './student.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import tut25 from './tut25.png';
import SuccessPage from '../register/SuccessPage';

function RegisterForm() {
  const [formData, setFormData] = useState({
    studentNumber: '',
    surname: '',
    initials: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newError = {};

    if (!/^\d{9}$/.test(formData.studentNumber)) {
      newError.studentNumber = 'Student Number should be 9 digits long';
    }
    if (!formData.surname.trim()) newError.surname = 'Surname is required';
    if (!formData.initials.trim()) newError.initials = 'Initials are required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newError.email = 'Enter a valid email address';
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newError.phone = 'Phone number must be 10 digits long';
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!formData.password) {
      newError.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newError.password =
        'Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character.';
    }

    if (!formData.confirmPassword) {
      newError.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = 'Passwords do not match';
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/success');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="App">
        <nav id="mynav">
          <img id="myimg" src={tut25} alt="TUT Logo" className="bcolor" />
        </nav>
      </div>

      <div className="register-container glass-card">
        <h2>Register</h2>
        <p>Please enter the details below</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="studentNumber">Student Number:</label>
            <input
              type="text"
              name="studentNumber"
              value={formData.studentNumber}
              onChange={handleChange}
            />
            {errors.studentNumber && <span>{errors.studentNumber}</span>}
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          </div>

          <div className="buttons">
            <button type="button" className="cancel-btn" onClick={() => navigate('/student/login')}>
              Cancel
            </button>
            <button type="submit" className="next-btn" onClick={() => navigate('/success')}>
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
