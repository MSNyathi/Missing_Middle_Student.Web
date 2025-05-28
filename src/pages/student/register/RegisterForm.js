import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./student.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import tut25 from "./tut25.png";

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newError = {};

    if (!/^\d{9}@tut4life\.ac\.za$/.test(formData.email)) {
      newError.email = "Email must be in the format 218334945@tut4life.ac.za";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setErrors({});
      navigate("/success");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="App">
        <nav id="mynav">
          <img
            src={tut25}
            alt="TUT Logo"
            style={{ height: "45px", objectFit: "contain" }}
          />
        </nav>
      </div>

      <div className="register-container glass-card">
        <h2>Register</h2>
        <p>Please enter the details below</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <div className="input-icon-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-with-icon"
              />
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
            {errors.password && <span>{errors.password}</span>}
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="input-icon-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-with-icon"
              />
              <i
                className={`bi ${
                  showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></i>
            </div>
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          </div>

          <div className="buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/student/login")}
            >
              Cancel
            </button>
            <button type="submit" className="next-btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
