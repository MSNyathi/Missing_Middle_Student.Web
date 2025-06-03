import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaLaptopCode,
  FaMapMarkedAlt,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import tut25 from "../../../assets/tut25.png";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      const studentNumber = localStorage.getItem("studentNumber");
      if (!studentNumber) {
        navigate("/student/dashboard");
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7102/api/Student/student/${studentNumber}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Failed to fetch student info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentInfo();
  }, [navigate]);

  const handleConfirmLogout = () => {
    setShowModal(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("studentNumber");
    navigate("/student/login");
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "90px" }}>
      {/* Navbar */}
      <nav className="navbar bg-secondary shadow-sm px-3 py-2 fixed-top d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={tut25} alt="TUT Logo" style={{ height: "45px", objectFit: "contain" }} />
        </div>

        <button
          className="btn btn-outline-danger d-flex align-items-center"
          onClick={() => setShowModal(true)}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="container-fluid">
        <div className="text-center mb-4">
          <h2>WELCOME TO EduConnect</h2>
          <p className="text-success">
            Latest Application Status: <strong>Under Review</strong>
          </p>
        </div>

        <div className="alert alert-info text-center" role="alert">
          <FaInfoCircle className="me-2 text-primary" />
          Application submissions close on <strong>June 15, 2025!</strong>
        </div>

        <div className="row mb-4">
          {/* Student Profile */}
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm p-3">
              <h5>Student Profile</h5>
              {loading ? (
                <p>Loading...</p>
              ) : student ? (
                <>
                  <p><strong>Name:</strong> {student.name} {student.surname}</p>
                  <p><strong>Email:</strong> {student.email}</p>
                  <p><strong>Student ID:</strong> {student.studentNum}</p>
                </>
              ) : (
                <p className="text-danger">Unable to load student data.</p>
              )}
            </div>
          </div>

          {/* Center Buttons */}
          <div className="col-md-4 mb-3 d-flex flex-column align-items-center justify-content-center">
            <div className="row w-100">
              <div className="col-12 mb-3">
                <Link to="/student/apply" className="text-decoration-none">
                  <div className="card p-4 shadow-lg text-center card-hover-glow">
                    <FaLaptopCode size={100} className="mb-3 text-dark glow-icon" />
                    <h5 className="text-dark glow-icon">APPLY FOR LAPTOP</h5>
                  </div>
                </Link>

                <Link to="/student/track" className="text-decoration-none">
                  <div className="card p-4 shadow-lg text-center card-hover-glow mt-3">
                    <FaMapMarkedAlt size={100} className="mb-3 text-dark glow-icon" />
                    <h5 className="text-dark glow-icon">TRACK APPLICATION</h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm p-3">
              <h5>Recent Activity</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent text-dark">Applied for Laptop – May 5, 2025</li>
                <li className="list-group-item bg-transparent text-dark">Checked Application Status</li>
                <li className="list-group-item bg-transparent text-dark">Logged In</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Help Dropdown */}
        <div className="d-flex justify-content-between align-items-center mt-4 px-3">
          <div className="dropdown">
            <button
              className="btn btn-outline-info dropdown-toggle"
              type="button"
              id="helpDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaInfoCircle className="me-2" />
              Help Topics
            </button>
            <ul className="dropdown-menu" aria-labelledby="helpDropdown">
              <li><Link className="dropdown-item" to="/student/help/distribution">🧮 How are laptops distributed?</Link></li>
              <li><Link className="dropdown-item" to="/student/help/warranty">🛠️ Warranty or support?</Link></li>
              <li><Link className="dropdown-item" to="/student/help/contact">📍 Who do I contact?</Link></li>
              <li><Link className="dropdown-item" to="/student/help/security">🔐 Security & support</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleConfirmLogout}>Yes, Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;