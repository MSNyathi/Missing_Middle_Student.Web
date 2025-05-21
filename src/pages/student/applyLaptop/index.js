import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaSignOutAlt, FaSun, FaMoon } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import tutLogo from "../../../assets/tut.png";
import backgroundImage from "../../../assets/background2.jpeg";
import "./index.css";

const ApplyLaptop = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentNumber: "219876543",
    surname: "",
    initials: "TK",
    email: "student@example.tut.ac.za",
    hasRecommendation: "",
    recommendationFile: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCancel = () => navigate("/student");

  const handleNext = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Application submitted!");
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div
      className="position-relative d-flex flex-column justify-content-center align-items-center vh-100 p-3"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background 0.3s ease-in-out",
      }}
    >
      {/* TUT Logo */}
      <img
        src={tutLogo}
        alt="TUT Logo"
        className="position-absolute top-0 start-0 m-3"
        style={{ height: "60px", width: "auto" }}
      />

      {/* Theme Toggle */}
      <div className="position-fixed top-0 end-0 m-3 d-flex align-items-center text-white">
        <FaSun className="me-2" color={darkMode ? "#bbb" : "#f39c12"} />
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            id="themeSwitch"
            style={{ cursor: "pointer" }}
          />
        </div>
        <FaMoon className="ms-2" color={darkMode ? "#f1c40f" : "#999"} />
      </div>

      {/* Back to Dashboard */}
      <Link
        to="/student"
        className="position-fixed bottom-0 start-0 m-3 btn btn-outline-secondary"
      >
        <FaArrowLeft className="me-2" />
        Back to Dashboard
      </Link>

      {/* Logout Button */}
      <div className="position-fixed bottom-0 end-0 p-3">
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className={`modal-content ${darkMode ? "glass-card-dark" : "glass-card-light"}`}>
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleConfirmLogout}>
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div
        className={`glass-card p-5 rounded shadow ${darkMode ? "glass-card-dark" : "glass-card-light"}`}
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h2 className="text-center mb-4">APPLY FOR LAPTOP</h2>
        <p className="text-center mb-4">Please enter the details below</p>

        <form onSubmit={handleNext}>
          {[
            {
              label: "Student Number",
              name: "studentNumber",
              placeholder: "219876543",
              readOnly: true,
            },
            {
              label: "Surname",
              name: "surname",
            },
            {
              label: "Initials",
              name: "initials",
              placeholder: "TK",
              readOnly: true,
            },
            {
              label: "Student Email",
              name: "email",
              type: "email",
              placeholder: "student@example.tut.ac.za",
              readOnly: true,
            },
          ].map(({ label, name, type = "text", readOnly = false, placeholder = "" }) => (
            <div className="mb-3" key={name}>
              <label className="form-label">{label}:</label>
              <input
                type={type}
                className="form-control"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={!readOnly}
                readOnly={readOnly}
                placeholder={placeholder}
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">Upload Proof of Income:</label>
            <input
              type="file"
              className="form-control"
              name="proofOfIncome"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Do you have a Recommendation Letter?
            </label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="hasRecommendation"
                  value="yes"
                  checked={formData.hasRecommendation === "yes"}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="hasRecommendation"
                  value="no"
                  checked={formData.hasRecommendation === "no"}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>

          {formData.hasRecommendation === "yes" && (
            <div className="mb-3">
              <label className="form-label">Upload Recommendation Letter:</label>
              <input
                type="file"
                className="form-control"
                name="recommendationFile"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleChange}
              />
            </div>
          )}

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              CANCEL
            </button>
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLaptop;
