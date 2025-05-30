import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
                className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
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

          {errors.api && <div className="error-message">{errors.api}</div>}
        </form>
      </div>


     </div>
    </>
  );
}

export default RegisterForm;