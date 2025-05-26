import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./adminLogin.css"; // Import your CSS file for styling
import backgroundImage from "../../../assets/backgroundAdmin.jpeg"; // Adjust the path as needed
import LoginNavbar from "../../../commponents/loginNavbar";
import axios from "axios"; // add this at the top


export default function AdminLogin() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "", role: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.role));
  }, [user]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRoleChange = (e) => {
    setUser({ ...user, role: e.target.value });
  };



const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateEmail(user.email)) {
    toast.error("Please enter a valid email.", { position: "top-center" });
    return;
  }

  if (user.role === "") {
    toast.error("Please select a role.", { position: "top-center" });
    return;
  }

  setLoading(true);
  
  const API_URL = process.env.REACT_APP_API_URL;
  
  const loginEndpoint =
    user.role === "admin"
      ? `${API_URL}loginAdmin`
      : `${API_URL}loginTechnician`;

  try {
    const response = await axios.post(loginEndpoint, {
      email: user.email,
      password: user.password,
    });

    toast.success("Login successful!", { position: "top-center" });
    localStorage.setItem("adminData", JSON.stringify(response.data));
    console.log("Login successful:", response.data);
    
    setTimeout(() => {
      if (user.role === "admin") {
        navigate("/admin/dashboard", { state: { mydata: response.data } });
      } else if (user.role === "technician") {
        navigate("/technician/dashboard", { state: { mydata: response.data } });
      }
    }, 1000);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Login failed. Please try again.";
    toast.error(errorMessage, { position: "top-center" });
  } finally {
    setLoading(false);
  }
};

  return (
    <div  className="glass-bg d-flex align-items-center justify-content-center min-vh-100"
      style={{ backgroundImage: `url(${backgroundImage})` }} >
        <LoginNavbar />
    

      <ToastContainer />
      <div className="glass-card text-white p-4">
      <div className="glass-card text-white p-4">
        <h3 className="text-center mb-4">Admin Login</h3>

        <form onSubmit={handle_admin_login}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
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
              className="form-control rounded-pill"
              id="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-3">
            <label className="form-label">Role</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  onChange={handleRoleChange}
                  checked={user.role === "admin"}
                />
                Admin
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="technician"
                  onChange={handleRoleChange}
                  checked={user.role === "technician"}
                />
                Technician
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/forgot-password")}
            >
              Forgot password?
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
        </form>
      </div>
    </div>
  );
}
