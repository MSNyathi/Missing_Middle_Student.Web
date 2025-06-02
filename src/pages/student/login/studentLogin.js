import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./studentLogin.css";
import LoginNavbar from "../../../commponents/loginNavbar";
import axios from "axios";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const buttonDisabled = email.trim() === "" || password.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[0-9]{9}$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid TUT student email.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      const form_data = new FormData();
      form_data.append("Username", email);
      form_data.append("Password", password);

      const res = await axios.post("https://localhost:7102/login", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        navigate("/student/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.Message ||
          "An error occurred during login";
        setError(message);
      }
    }
  };

  return (
    <>
      <LoginNavbar />

      <div className="login-wrapper">
        <motion.div
          className="login-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Student Login
          </motion.h2>

          <AnimatePresence>
            {error && (
              <motion.div
                className="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <label>Student Number</label>
            <input
              type="text"
              value={email}
              placeholder="218493345"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className={`btn w-100 ${buttonDisabled ? "btn-secondary" : "btn-primary"}`}
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "Fill in all fields" : "Login"}
            </button>
          </form>

          <p>
            <Link to="/student/login/forgot-password">Forgot Password?</Link>
          </p>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}

export default StudentLogin;
