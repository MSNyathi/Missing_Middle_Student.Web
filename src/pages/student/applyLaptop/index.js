import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaSignOutAlt, FaSun, FaMoon } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import tut25 from "../../../assets/tut25.png";
import "./index.css";
import { motion, AnimatePresence } from "framer-motion";

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
  const [successToast, setSuccessToast] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const { studentNumber } = formData;
        if (!studentNumber) return;

        const response = await axios.get(
          `https://localhost:7102/api/Student/student/${studentNumber}`
        );
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

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleCancel = () => navigate("/student/dashboard");

  const handleNext = async (e) => {
    e.preventDefault();

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

    try {
      const response = await axios.post(
        "https://localhost:7102/api/Application/api/apply",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessToast(true);
      setTimeout(() => {
        setSuccessToast(false);
        navigate("/student/dashboard");
      }, 3000);
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
        className="navbar bg-secondary shadow-sm px-3 py-2"
        style={{
          backgroundColor: "#343a40", // Dark grey background
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1050,
          borderBottom: "1px solid #222",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center position-relative">
          {/* Logo (left-aligned) */}
          <div className="d-flex align-items-center">
            <img
              src={tut25}
              alt="TUT Logo"
              style={{
                height: "45px",
                marginRight: "10px",
                objectFit: "contain",
                filter: "invert(1)", // Visible on dark bg
              }}
            />
          </div>

          {/* Centered Title */}
          <div
            className="position-absolute top-50 start-50 translate-middle-x"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <span
              className="fw-semibold text-white"
              style={{ fontSize: "1.25rem" }}
            >
              TUT Student Portal
            </span>
          </div>

          {/* Theme toggle (right-aligned) */}
          <div className="d-flex align-items-center">
            <FaSun color="#f39c12" className="me-2" />
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
            <FaMoon color="#f1c40f" className="ms-2" />
          </div>
        </div>
      </nav>

      {/* Centered success toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, y: "-40%" }}
            transition={{ duration: 0.3 }}
            className="position-fixed top-50 start-50 translate-middle bg-success text-white p-4 rounded shadow-lg"
            style={{ zIndex: 1060, minWidth: "300px", textAlign: "center" }}
          >
            🎉 Application submitted successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back & Logout */}
      <Link
        to="/student/dashboard"
        className="position-fixed bottom-0 start-0 m-3 btn btn-outline-secondary"
      >
        <FaArrowLeft className="me-2" />
        Back to Dashboard
      </Link>

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
            <div
              className={`modal-content ${
                darkMode ? "glass-card-dark" : "glass-card-light"
              }`}
            >
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
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmLogout}
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div
        className={`glass-card p-5 rounded shadow mt-4 ${
          darkMode ? "glass-card-dark" : "glass-card-light"
        }`}
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h2 className="text-center mb-3" style={{ color: "#d52235" }}>
          APPLY FOR LAPTOP
        </h2>
        <p className="text-center mb-3">Please enter the details below</p>

        <form onSubmit={handleNext}>
          {[
            { label: "Student Number", name: "studentNumber", readOnly: true },
            { label: "Surname", name: "surname" },
            { label: "Initials", name: "initials", readOnly: true },
            {
              label: "Student Email",
              name: "email",
              type: "email",
              readOnly: true,
            },
          ].map(({ label, name, type = "text", readOnly = false }) => (
            <div className="mb-3" key={name}>
              <label
                className={`form-label ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              >
                {label}:
              </label>
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
            <label
              className={`form-label ${darkMode ? "text-light" : "text-dark"}`}
            >
              Upload Proof of Income:
            </label>
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
            <label
              className={`form-label ${darkMode ? "text-light" : "text-dark"}`}
            >
              Do you have a Recommendation Letter?
            </label>
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
                  <label className="form-check-label">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {formData.hasRecommendation === "yes" && (
            <div className="mb-3">
              <label
                className={`form-label ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              >
                Upload Recommendation Letter:
              </label>
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
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
