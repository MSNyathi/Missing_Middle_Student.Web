import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./adminLogin.css"; // Import your CSS file for styling

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle forgot password submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      // Simulate an API call
      setTimeout(() => {
        toast.success("Password reset instructions sent to your email!", { position: "top-center" });
        navigate("/login"); // Navigate to login page after success
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="decor-circle blue"></div>
      <div className="decor-circle orange"></div>

      <ToastContainer />
      <div className="glass-card text-white p-4">
        <h3 className="text-center mb-4">Forgot Password</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`btn w-100 ${loading ? "btn-secondary" : "btn-primary"}`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Instructions"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/login")} // Navigate back to login
          >
            Back to Login
          </span>
        </div>
      </div>
    </div>
  );
}
