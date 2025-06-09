// src/pages/RegisterForm.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./student.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import tut25 from "./tut25.png";
import axios from "axios";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    studentNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        "Password must be 8+ chars, include uppercase, lowercase & a number.";
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
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const form_data = new FormData();
      form_data.append("StudentNo", formData.studentNumber);
      form_data.append("Password", formData.password);

      const response = await axios.post(
        "https://localhost:7102/api/Application/api/Register",
        form_data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        toast.success("Registration successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
        // wait for toast, then animate out
        setTimeout(() => {
          navigate("/student/login", { replace: true });
        }, 2200);
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      const message =
        error.response?.data?.message ||
        error.response?.data?.Message ||
        error.message ||
        "An error occurred during registration";
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <motion.div
        className="donor-container"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Panel */}
        <div className="donor-left">
          <div className="donor-navbar">
            <Link to="/" className="navbar-brand">
              <img src={tut25} alt="TUT Logo" className="tut-logo" />
            </Link>
            <h1 className="brand-title">EduConnect</h1>
          </div>
          <div className="left-text d-flex flex-column justify-content-center align-items-center text-center h-100 px-3">
            <h2>
              You must be a registered TUT student under any STEM course, with
              60%+ average, not NSFAS-funded, and either pursuing a Diploma or
              in your first year of an Advanced Diploma STEM program.
            </h2>
            <p>
              Submit your latest Statement of Income & Expenditure. South
              African citizens only.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="donor-right">
          <div className="login-box">
            <h2>Student Registration</h2>
            <form className="register-form" onSubmit={handleSubmit}>
              {/* Student Number */}
              <div className="mb-3">
                <input
                  type="text"
                  name="studentNumber"
                  placeholder="Student Number"
                  className={`form-control ${
                    errors.studentNumber ? "is-invalid" : ""
                  }`}
                  value={formData.studentNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, studentNumber: e.target.value })
                  }
                />
                {errors.studentNumber && (
                  <div className="invalid-feedback d-block">
                    {errors.studentNumber}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3 input-icon-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`form-control input-with-icon ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  } password-icon`}
                  onClick={() => setShowPassword(!showPassword)}
                />
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-3 input-icon-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={`form-control input-with-icon ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <i
                  className={`bi ${
                    showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                  } password-icon`}
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback d-block">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-45"
                  onClick={() => navigate("/student/login")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-dark w-45"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
}
