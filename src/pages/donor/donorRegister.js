import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./donorRegister.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import tut25 from "./tut25.png";
import axios from "axios";

function DonorRegister() {
  const [formData, setFormData] = useState({
    surname: "",
    initials: "",
    phoneNumber: "",
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

    if (!formData.surname.trim()) {
      newError.surname = "Surname is required";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.surname)) {
      newError.surname =
        "Surname must contain only letters and valid characters";
    }

    if (!formData.initials.trim()) {
      newError.initials = "Initials are required";
    } else if (!/^[A-Z]{1,5}$/.test(formData.initials)) {
      newError.initials =
        "Initials should be 1–5 uppercase letters (e.g. J, MJ)";
    }

    if (!formData.phoneNumber.trim()) {
      newError.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newError.phoneNumber = "Phone number must be 10 digits";
    }

    if (!formData.email.trim()) {
      newError.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newError.email = "Invalid email address";
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

  const API_URL = process.env.REACT_APP_API_URL;

  try {
    const response = await axios.post(`${API_URL}api/Donors`, {
      surname: formData.surname,
      initials: formData.initials,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password
    });

    console.log("Data sent to backend");

    if (response.status === 201) {
      navigate("/donor/login");
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

      <div className="StudentRegister-wrapper">
        <div className="register-container glass-card">
          <h2>Register</h2>
          <p>Please enter the details below</p>
          <form className="register-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="surname">Surname:</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
              {errors.surname && <span>{errors.surname}</span>}
            </div>
            <div>
              <label htmlFor="initials">Initials:</label>
              <input
                type="text"
                name="initials"
                value={formData.initials}
                onChange={handleChange}
              />
              {errors.initials && <span>{errors.initials}</span>}
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phone && <span>{errors.phone}</span>}
            </div>
            <div>
              <label htmlFor="email">Email :</label>
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
                onClick={() => navigate("/donor/login")}
              >
                Cancel
              </button>
              <button type="submit" className="next-btn">
                Register
              </button>
            </div>

            {errors.api && <div className="error-message">{errors.api}</div>}
          </form>
        </div>
      </div>
    </>
  );
}

export default DonorRegister;
