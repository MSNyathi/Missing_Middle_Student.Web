import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaSignOutAlt, FaSun, FaMoon } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import tut25 from "../../../assets/tut25.png";
import "./index.css";

const ApplyLaptop = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentNumber: localStorage.getItem("studentNumber") || "",
    surname: "",
    initials: "",
    email: "",
    hasRecommendation: "",
    recommendationFile: null,
    proofOfIncome: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  // Fetch student details and set initials on mount or when studentNumber changes
  useEffect(() => {
    const fetchStudentData = async () => {
      const { studentNumber } = formData;
      if (!studentNumber) return;

      try {
        const response = await axios.get(`https://localhost:7102/api/Student/student/${studentNumber}`);
        const student = response.data;

        const initial = student.name ? student.name[0].toUpperCase() : "";

        setFormData((prev) => ({
          ...prev,
          surname: student.surname || "",
          initials: initial,
          email: student.email || "",
        }));
      } catch (error) {
        console.error("Failed to fetch student data:", error);
        alert("Failed to load student details.");
      }
    };

    fetchStudentData();
  }, [formData.studentNumber]);

  // Update theme attribute and localStorage on darkMode change
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  // Handle form input changes (including files)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleCancel = () => navigate("/student/dashboard");

  // Handle form submission with file upload
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("Student_No", formData.studentNumber);
      data.append("Email", formData.email);

      if (formData.proofOfIncome) {
        data.append("Income", formData.proofOfIncome);
      }

      if (formData.hasRecommendation === "yes" && formData.recommendationFile) {
        data.append("SupportingDoc", formData.recommendationFile);
      } else {
        data.append("SupportingDoc", new Blob());
      }

      const response = await axios.post("https://localhost:7102/api/Application/api/apply", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Application submitted successfully!");
      console.log(response.data);
      navigate("/student/dashboard");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Application already exists");
    }
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div
      className="position-relative d-flex flex-column justify-content-center align-items-center min-vh-100 p-3"
      style={{
        backgroundColor: darkMode ? "#1e1e1e" : "#f2f4f8",
        color: darkMode ? "#f1f1f1" : "#333",
        transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
      }}
    >
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"} shadow-sm px-4 py-2`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1050,
          borderBottom: darkMode ? "1px solid #444" : "1px solid #ddd",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="navbar-brand d-flex align-items-center">
            <img
              src={tut25}
              alt="TUT Logo"
              style={{
                height: "40px",
                marginRight: "10px",
                filter: darkMode ? "invert(0)" : "none",
              }}
            />
                <span
              className={`fw-semibold ${darkMode ? "text-light" : "text-dark"}`}
              style={{ fontSize: "1.25rem", whiteSpace: "nowrap" }}
            >
              TUT Student Portal
            </span>
          </div>

          {/* Theme toggle */}
          <div className="d-flex align-items-center">
            <FaSun color={darkMode ? "#ccc" : "#f39c12"} className="me-2" />
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                id="themeSwitch"
                style={{ cursor: "pointer" }}
              />
            </div>
            <FaMoon color={darkMode ? "#f1c40f" : "#888"} className="ms-2" />
          </div>
        </div>
      </nav>

      {/* Back & Logout Buttons */}
      <Link to="/student/dashboard" className="position-fixed bottom-0 start-0 m-3 btn btn-outline-secondary">
        <FaArrowLeft className="me-2" />
        Back to Dashboard
      </Link>

      <div className="position-fixed bottom-0 end-0 p-3">
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className={`modal-content ${darkMode ? "glass-card-dark" : "glass-card-light"}`}>
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
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

      {/* Application Form */}
      <div
        className={`glass-card p-5 rounded shadow mt-4 ${darkMode ? "glass-card-dark" : "glass-card-light"}`}
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h2 className="text-center mb-4">APPLY FOR LAPTOP</h2>
        <p className="text-center mb-4">Please enter the details below</p>

        <form onSubmit={handleNext}>
          {[
            { label: "Student Number", name: "studentNumber", readOnly: true },
            { label: "Surname", name: "surname" },
            { label: "Initials", name: "initials", readOnly: true },
            { label: "Student Email", name: "email", type: "email", readOnly: true },
          ].map(({ label, name, type = "text", readOnly = false }) => (
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
            <label className="form-label">Do you have a Recommendation Letter?</label>
            <div>
              {["yes", "no"].map((value) => (
                <div className="form-check form-check-inline" key={value}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="hasRecommendation"
                    value={value}
                    checked={formData.hasRecommendation === value}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">{value.charAt(0).toUpperCase() + value.slice(1)}</label>
                </div>
              ))}
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
                required={formData.hasRecommendation === "yes"}
              />
            </div>
          )}

          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLaptop;
