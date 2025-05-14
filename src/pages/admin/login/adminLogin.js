import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./adminLogin.css"; // Import your CSS file for styling


export default function AdminLogin() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(user.email)) {
      toast.error("Please enter a valid email.", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      // Simulated login
      if (
        user.email.trim().toLowerCase() === "southadmin@tut.ac.za" &&
        user.password === "Sadmin123"
      ) {
        toast.success("Login successful!", { position: "top-center" });
        setTimeout(() => navigate("/admin/dashboard"), 1000);
      } else {
        toast.error("Invalid credentials. Please try again.", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div  className="glass-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="decor-circle blue"></div>
      <div className="decor-circle orange"></div>

      <ToastContainer />
      <div   className="glass-card text-white p-4">
        <h3 className="text-center mb-4">Admin Login</h3>

        <form id="myform1" onSubmit={handleLogin}>
          <table id="tbl">
          <div className="mb-3" id="td1">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-pill" // Add rounded-pill for curved edges
              id="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-pill" // Add rounded-pill for curved edges
              id="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/forgot-password")}
            >
              Forgot password?
            </span>
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")} // Link to the signup page
            >
              Don't have an account?
            </span>
          </div>

          <button
            type="submit"
            className={`btn w-100 ${buttonDisabled || loading ? "btn-secondary" : "btn-primary"}`}
            disabled={buttonDisabled || loading}
          >
            {loading
              ? "Logging in..."
              : buttonDisabled
              ? "Fill in all fields"
              : "Login"}
          </button>
          </table>
        </form>
      </div>
    </div>
  );
}
