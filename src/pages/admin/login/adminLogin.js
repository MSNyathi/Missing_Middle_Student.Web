import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./adminLogin.css";
import backgroundImage from "../../../assets/backgroundAdmin.jpeg";
import LoginNavbar from "../../../commponents/loginNavbar";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateEmail(user.email)) {
    toast.error("Please enter a valid email.", { position: "top-center" });
    return;
  }

  setLoading(true);
  const API_URL = process.env.REACT_APP_API_URL;

  try {
    // Try logging in with technician endpoint first
   const techResponse = await axios.post(`${API_URL}loginTechnician`, {
  email: user.email,
  password: user.password,
});
console.log("Response", techResponse);

// ✅ Correct structure
const techProfile = techResponse.data?.data?.profile;
const techRole = techProfile?.role?.trim().toLowerCase();
console.log("Tech role:", techRole);

if (techRole === "technician") {
  toast.success("Technician login successful!", { position: "top-center" });

  localStorage.setItem("techData", JSON.stringify(techResponse.data));
  localStorage.setItem("techPassword", user.password);

  setTimeout(() => {
    navigate(`/technician/dashboard`, {
      state: { mydata: techResponse.data },
    });
  }, 1000);

  return;
}
  } catch (err) {
    
  console.error("Technician login error:", err.response?.data || err.message);
   if (err.response) {
    console.error("Server responded with:", err.response.data);
  } else if (err.request) {
    console.error("No response received. Request was:", err.request);
  } else {
    console.error("Error setting up request:", err.message);
  }

  }

  try {
    // Try logging in as admin
    const adminResponse = await axios.post(`${API_URL}loginAdmin`, {
      email: user.email,
      password: user.password,
    });
    console.log("Response", adminResponse);

    const adminRole =
      adminResponse.data?.data?.profile?.profile?.role?.toLowerCase();

    if (adminRole === "admin") {
      toast.success("Admin login successful!", { position: "top-center" });

      localStorage.setItem("adminData", JSON.stringify(adminResponse.data));
      localStorage.setItem("adminPassword", user.password);

      setTimeout(() => {
        navigate(`/admin/dashboard`, {
          state: { mydata: adminResponse.data },
        });
      }, 1000);

      return;
    }
  } catch (err) {
    console.error("Admin login error:", err.response?.data || err.message);
  }

  toast.error("Login failed. Please check your credentials.", {
    position: "top-center",
  });
  setLoading(false);
};

  

  return (
    <div className="w-100 min-vh-100 d-flex flex-column" style={{ overflow: "hidden" }}>
      <ToastContainer />
      <div className="row flex-grow-1 w-100 m-0">
        {/* Left Side - Info */}
        <div className="col-md-6 d-none d-md-block p-0 position-relative slanted-left-panel" style={{ backgroundColor: "#2BA9E3", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-start", position: "relative" }}>
          <div style={{ width: "85%", textAlign: "center" }}>
            <div className="py-2 px-3" style={{ backgroundColor: "#ffc107", marginBottom: "2rem", borderRadius: "4px" }}>
              <LoginNavbar />
            </div>

            <div className="floating-shape shape-blue" />
            <div className="floating-shape shape-yellow" />
            <div className="floating-shape shape-black" />

            <div className="text-white position-absolute top-50 start-50 translate-middle text-center px-4" style={{ zIndex: 2 }}>
              <h2 className="fw-bold" style={{ fontSize: "2rem" }}>
                EduConnect: a multi-user platform,
                <br />
                to manage and streamline the donation, refurbishment, and allocation of laptops.
              </h2>
              <p className="mt-3" style={{ fontSize: "0.95rem" }}>
                To financially vulnerable students at Tshwane University of Technology.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center bg-white px-3 px-md-4">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4 fw-bold" style={{ color: "black" }}>
              Welcome to Admin Portal
            </h3>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control rounded-pill py-2"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control rounded-pill py-2"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                />
              </div>

              <div className="text-end mb-3">
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
                className={`btn w-100 rounded-pill py-2 ${buttonDisabled || loading ? "btn-secondary" : "btn-dark"}`}
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
      </div>
    </div>
  );
}
