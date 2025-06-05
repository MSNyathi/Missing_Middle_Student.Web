import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoginNavbar from "../../../commponents/loginNavbar";
import axios from "axios";
import Tut from "../../../assets/tut25.png";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[0-9]{9}$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid TUT student number.");
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
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        navigate("/student/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const message =
          error.response.data?.message ||
          error.response.data?.Message ||
          "Login error";
        setError(message);
      } else {
        setError("Network error. Try again later.");
      }
    }
  };

  return (
    <>
      {/* Navbar stays at top */}

      <div className="container-fluid d-flex vh-100 p-0">
        {/* Left Info Panel */}
        <div
          className="col-md-6 d-none d-md-block p-0 position-relative slanted-left-panel"
          style={{
            backgroundColor: "#2BA9E3",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center", // center the group vertically
            alignItems: "center", // center the group horizontally
            position: "relative",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          {/* Wrap navbar + content */}
          <div style={{ width: "85%", textAlign: "center" }}>
            <div
              className="py-2 px-3"
              style={{
                backgroundColor: "#ffc107",
                marginBottom: "2rem", // space below navbar
                borderRadius: "4px",
              }}
            >
              <LoginNavbar />
            </div>
            <div className="floating-shape shape-blue" />
          <div className="floating-shape shape-yellow" />
          <div className="floating-shape shape-black" />

            <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ paddingTop: "300px" }}>
              <img
                src={Tut}
                alt="TUT Logo"
                style={{ width: "80px", marginBottom: "20px" }}
              />
              <h3 className="fw-bold">EduConnect Student Portal</h3>
              <p className="px-4">
                Login to apply for laptop donations, track application status,
                and manage your account.
              </p>
              <small className="d-block mt-4">
                Powered by Tshwane University of Technology
              </small>
            </div>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-white">
          <motion.div
            className="p-4 rounded shadow"
            style={{ width: "100%", maxWidth: "400px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-center mb-4 fw-bold" style={{ color: "black" }}>
              Student Login
            </h4>

            <AnimatePresence>
              {error && (
                <motion.div
                  className="text-danger mb-3 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" style={{ color: "black" }}>
                  Student Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="218493345"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: "black" }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 d-flex justify-content-end">
                <Link
                  to="/student/login/forgot-password"
                  className="text-decoration-none text-primary"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={!email || !password}
              >
                Login
              </button>
            </form>

            <p className="text-center mt-3" style={{ color: "black" }}>
              Don’t have an account?{" "}
              <Link to="/register" className="text-decoration-none">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default StudentLogin;
