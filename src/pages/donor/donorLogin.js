import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DonorLogin.css";
import LoginNavbar from "../../commponents/loginNavbar";
import axios from "axios";


export default function DonorLogin() {
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
      const response = await axios.post(`${API_URL}api/Donors/loginDonor`, {
        email: user.email,
        password: user.password,
      });
      console.log("Login response:", response.data);
      console.log("User password:",user.password);

      toast.success("Login successful!", { position: "top-center" });
      localStorage.setItem("donorData", JSON.stringify(response.data));
      localStorage.setItem("donorPassword", user.password);

      setTimeout(() => {
        navigate(`/donor/dashboard`, { state: { mydata: response.data } });
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
    <div
      className="w-100 min-vh-100 d-flex flex-column"
      style={{ overflow: "hidden" }}
    >
      <ToastContainer />

      <div className="row flex-grow-1 w-100 m-0">
        {/* Left Side - Background Image/Video */}
        {/* Left Side - Blue background with LoginNavbar + floating objects */}
        <div
          className="col-md-6 d-none d-md-block p-0 position-relative slanted-left-panel"
          style={{
            backgroundColor: "#2BA9E3",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
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

          {/* Floating shapes (optional) */}
          <div className="floating-shape shape-blue" />
          <div className="floating-shape shape-yellow" />
          <div className="floating-shape shape-black" />

          {/* Centered welcome text */}
          <div
            className="text-white position-absolute top-50 start-50 translate-middle text-center px-4"
            style={{ zIndex: 2 }}
          >
            <h2 className="fw-bold" style={{ fontSize: "2rem" }}>
              EduConnect a multi-user platform,
              <br />
              to manage and streamline the donation, refurbishment, and
              allocation of laptops.
            </h2>
            <p className="mt-3" style={{ fontSize: "0.95rem" }}>
              To financially vulnerable students at Tshwane University of
              Technology.
            </p>
          </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center bg-white px-3 px-md-4">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4 fw-bold" style={{ color: "black" }}>
              Welcome to Donor Portal
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
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
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
                className={`btn w-100 rounded-pill py-2 ${
                  buttonDisabled || loading ? "btn-secondary" : "btn-dark"
                }`}
                disabled={buttonDisabled || loading}
              >
                {loading
                  ? "Logging in..."
                  : buttonDisabled
                  ? "Fill in all fields"
                  : "Login"}
              </button>
            </form>
            <p className="text-center mt-3" style={{ color: "black" }}>
              Don’t have an account?{" "}
              <Link to="/donor/register" className="text-decoration-none">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
