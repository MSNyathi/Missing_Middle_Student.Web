import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./student.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import tut25 from "./tut25.png";
import axios from "axios";

function RegisterForm() {
  const [formData, setFormData] = useState({
    studentNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newError = {};

    if (!/^\d{9}$/.test(formData.studentNumber)) {
      newError.studentNumber = "Student number must be a 9-digit number.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!formData.password) {
      newError.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newError.password =
        "Password must be at least 8 characters, include uppercase, lowercase, and a number.";
    }

    if (!formData.confirmPassword) {
      newError.confirmPassword = "Please confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      console.log( formData)
      const form_data = new FormData();
      form_data.append("StudentNo",formData.studentNumber);
      form_data.append("Password",formData.password);
      const response = await axios.post(
        "https://localhost:7102/api/Application/api/Register",
       form_data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data sent to backend");

      if (response.status === 201) {
        navigate("/success");
      } else {
        setErrors({ api: "Registration failed. Please try again." });
      }
    } catch (error) {
      console.error("API Error:", error.response?.data);

      const message =
        error.response?.data?.message ||
        error.response?.data?.Message || 
        "An error occurred during registration";

      setErrors({ api: message });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
  <div className="donor-container">
    {/* Left Panel */}
    <div className="donor-left">
      <div className="donor-navbar">
        <Link to="/" className="navbar-brand">
          <img src={tut25} alt="TUT Logo" className="tut-logo" />
        </Link>
        <h1 className="brand-title">EduConnect</h1>
      </div>
      <div className="left-text d-flex flex-column justify-content-center align-items-center text-center h-100">
        <h2>
          You must be a registered TUT student,. You must be under any TUT STEM course.You must not be funded by NSFAS.You must have an academic average of 60%.You must be either doing your Diploma or be a first year as an Advanced Diploma STEM student.
        </h2>
        <p>You must submit the latest Statement of income and expenditure.You must be a South African Citizen</p>
      </div>
    </div>

    {/* Right Panel */}
    <div className="donor-right">
      <div className="login-box">
        <h2>Student Registration</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="studentNumber"
              placeholder="Student Number"
              className={`form-control ${errors.studentNumber ? 'is-invalid' : ''}`}
              value={formData.studentNumber}
              onChange={handleChange}
            />
            {errors.studentNumber && (
              <div className="invalid-feedback d-block">{errors.studentNumber}</div>
            )}
          </div>

          <div className="mb-3 input-icon-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={`form-control input-with-icon ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
            />
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} password-icon`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
          </div>

          <div className="mb-3 input-icon-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`form-control input-with-icon ${errors.confirmPassword ? 'is-invalid' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <i
              className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} password-icon`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></i>
            {errors.confirmPassword && (
              <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary w-45"
              onClick={() => navigate("/student/login")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-dark w-45">
              Register
            </button>
          </div>

          {errors.api && (
            <div className="alert alert-danger mt-3" role="alert">
              {errors.api}
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
);

}

export default RegisterForm;