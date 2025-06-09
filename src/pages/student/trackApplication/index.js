import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaSignOutAlt, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import ParticleBackground from "../floating/floatingBack";

import "bootstrap/dist/css/bootstrap.min.css";
import "../dashboard/index.css";
import tut25 from "../../../assets/tut25.png";



const applicationSteps = [
  { label: "Application Submitted", key: "applicationSubmitted" },
  { label: "Academic Review", key: "academicReviewPassed" },
  { label: "Funding Review", key: "fundingReviewPassed" },
  { label: "Documents Under Review", key: "documentsUnderReview" },
  { label: "Status", key: "finalStatus", value: "Approved" },
];

const TrackApplication = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(null);
  const studentNo = localStorage.getItem("studentNumber");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7102/api/Application/applicant/${studentNo}`
        );
        const data = res.data;

        const academicReviewPassed = data.academicAverage >= 60;
        const fundingReviewPassed = data.nsfasStatus === "Not Funded";
        const documentsUnderReview = data.documentsStatus === "Under Review";

        let finalStatus = "In Progress";
        if (!academicReviewPassed) {
          finalStatus = "Rejected";
        } else if (!fundingReviewPassed) {
          finalStatus = "Rejected";
        } else if (documentsUnderReview) {
          finalStatus = "Documents Under Review";
        }

        if (data.finalDecision === "Approved") {
          finalStatus = "Approved";
        }

        const mapped = {
          applicationSubmitted: true,
          academicReviewPassed,
          fundingReviewPassed,
          documentsUnderReview,
          finalStatus,
        };

        setProgress(mapped);
      } catch (err) {
        console.error("Fetch error:", err);
        setProgress({ error: "No application found" });
      }
    };

    fetchStatus();
  }, [studentNo]);

  const renderStep = (step, index) => {
    const statusValue = progress?.[step.key];
    let isComplete = false,
      isRejected = false;

    if (progress?.finalStatus === "Rejected") {
      const failIndex = !progress.academicReviewPassed
        ? 1
        : !progress.fundingReviewPassed
        ? 2
        : null;
      if (index === failIndex) isRejected = true;
      else if (index > failIndex) isRejected = true;
    }

    if (step.key === "finalStatus") {
      if (progress?.finalStatus === step.value) {
        isComplete = step.value === "Approved";
        isRejected = step.value === "Rejected";
      }
    } else {
      isComplete = statusValue === true;
    }

    let circleClass = "bg-light border";
    if (isRejected) circleClass = "bg-danger text-white";
    else if (isComplete) circleClass = "bg-success text-white";
    else if (statusValue === true) circleClass = "bg-primary text-white";

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="text-center d-flex flex-column align-items-center"
        style={{ minWidth: "120px", maxWidth: "160px" }}
      >
        <div
          className={`rounded-circle mb-2 d-flex align-items-center justify-content-center ${circleClass}`}
          style={{
            width: "45px",
            height: "45px",
            boxShadow: "0 0 8px rgba(0,0,0,0.2)",
          }}
        >
          {index + 1}
        </div>
        <div className="small fw-semibold step-label">{step.label}</div>
      </motion.div>
    );
  };

  const glassClass = darkMode
    ? "glass-card-dark text-white"
    : "glass-card-light text-dark";

  const handleLogout = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <ParticleBackground darkMode={darkMode} />

      <div
        className="position-relative d-flex flex-column justify-content-start align-items-center min-vh-100 p-4"
        style={{
          backgroundColor: darkMode ? "#212529" : "#ffffff",
          color: darkMode ? "#ffffff" : "#000000",
          width: "100%",
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

        {/* Back and Logout Buttons */}
        <div className="position-fixed bottom-0 start-0 p-3">
          <Link to="/student/dashboard" className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="position-fixed bottom-0 end-0 p-3">
          <button className="btn btn-danger" onClick={() => setShowModal(true)}>
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>

        {/* Application Progress */}
        <div
          className={`container-fluid rounded shadow p-4 ${glassClass}`}
          style={{
            maxWidth: "90vw",
            marginTop: "120px",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <h2 className="mb-3 text-center" style={{ color: "#d52235" }}>
            Track Your Application
          </h2>
          <p className="text-center mb-3">
            Monitor the status of your laptop application below:
          </p>

          {progress?.error ? (
            <div className="alert alert-warning text-center">
              {progress.error}
            </div>
          ) : (
            <>
              <div className="d-flex flex-wrap justify-content-center gap-4">
                {applicationSteps.map(renderStep)}
              </div>
              <div className="text-center mt-4">
                <strong>Current Status:</strong>{" "}
                {progress?.finalStatus || "In Progress"}
              </div>
            </>
          )}
        </div>

        {/* Logout Modal */}
        {showModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className={`modal-content ${glassClass}`}>
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
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Yes, Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TrackApplication;
