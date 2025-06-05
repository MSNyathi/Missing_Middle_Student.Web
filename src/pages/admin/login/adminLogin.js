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
  const [user, setUser] = useState({ email: "", password: "", role: "admin" });
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
    const loginEndpoint =
      user.role === "technician"
        ? `${API_URL}loginTechnician`
        : `${API_URL}loginAdmin`;

    try {
      const response = await axios.post(loginEndpoint, {
        email: user.email,
        password: user.password,
      });

      const roleFromServer =
        response.data?.data?.profile?.profile?.role?.toLowerCase();
      const selectedRole = user.role.toLowerCase();

      if (!roleFromServer || roleFromServer !== selectedRole) {
        toast.error("Incorrect role selected. Please choose the correct role.", {
          position: "top-center",
        });
        return;
      }

      toast.success("Login successful!", { position: "top-center" });
      localStorage.setItem("adminData", JSON.stringify(response.data));
      localStorage.setItem("adminPassword", user.password);

      setTimeout(() => {
        navigate(`/${selectedRole}/dashboard`, {
          state: { mydata: response.data },
        });
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
        {/* Left Side - Info */}
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
                marginBottom: "2rem",
                borderRadius: "4px",
              }}
            >
              <LoginNavbar />
            </div>

            <div className="floating-shape shape-blue" />
            <div className="floating-shape shape-yellow" />
            <div className="floating-shape shape-black" />

            <div
              className="text-white position-absolute top-50 start-50 translate-middle text-center px-4"
              style={{ zIndex: 2 }}
            >
              <h2 className="fw-bold" style={{ fontSize: "2rem" }}>
                EduConnect: a multi-user platform,
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
          </div>
        </div>
      </div>
    </div>
  );
}
