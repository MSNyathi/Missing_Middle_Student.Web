import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import AdminNavbar from "../../../../commponents/adminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import backgroundImage from "../../../../assets/backgroundAdmin.jpeg";

import useNotification from "../../../../commponents/hooks/notificationHook";
import NotificationPanel from "../../../../commponents/notificationPanel";

const ViewTechnicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCampus, setFilterCampus] = useState("all");
  const [filterSpecialization, setFilterSpecialization] = useState("all");
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const {
    notifications,
    markAsSeen: hookMarkAsSeen,
    clearNotifications,
    connection,
    setNotifications,
  } = useNotification();

  const unseen = notifications.filter((note) => !note.seen);
  const unseenCount = unseen.length;

  const markAsSeen = (index) => {
    const globalIndex = notifications.findIndex((n) => n === unseen[index]);
    if (globalIndex >= 0) {
      hookMarkAsSeen(globalIndex);
    }
  };

  // Fetch technicians from the API
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('https://localhost:7102/staff/AllTechnicians');
        setTechnicians(response.data.technicians);
      } catch (err) {
        setError("Failed to fetch technicians");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  // Filter technicians based on search and filters
  const filteredTechnicians = technicians.filter((tech) => {
    const matchesSearch =
      tech.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCampus =
      filterCampus === "all" || tech.campus === filterCampus;
    const matchesSpecialization =
      filterSpecialization === "all" || tech.specialization === filterSpecialization;

    return matchesSearch && matchesCampus && matchesSpecialization;
  });

  const handleViewProfile = (technician) => {
    setSelectedTechnician(technician);
    setShowProfileModal(true);
  };

  const handleDeleteTechnician = (id) => {
    // In a real app, you would call an API to delete the technician
    setTechnicians(technicians.filter((tech) => tech.staffId !== id));
    setShowProfileModal(false);

    toast.success("Technician removed successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const backgroundStyle = {
    backgroundColor: "rgb(228, 235, 255)",
    backdropFilter: "blur(8px)",
    minHeight: "100vh",
    color: "white",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="d-flex">
      <AdminNavbar />
      <div className="technician-container flex-grow-1" style={backgroundStyle}>
        <div className="d-flex justify-content-between align-items-center mb-3" style={{ paddingTop: "20px" }}>
          <div className="d-flex align-items-center">
            <img
              alt="eLogo"
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
            />
          </div>
          <div className="d-flex align-items-center gap-3">
            <span style={{ color: "black", fontWeight: 500, paddingTop: "20px" }}>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            <div className="position-relative d-inline-block">
              <i
                className="bi bi-bell fs-5"
                style={{ cursor: "pointer", color: "black" }}
                onClick={() => setShowNotifications((prev) => !prev)}
              ></i>

              {unseenCount > 0 && (
                <span className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger">
                  {unseenCount}
                </span>
              )}

              <AnimatePresence>
                {showNotifications && (
                  <NotificationPanel
                    notifications={notifications}
                    onClose={() => setShowNotifications(false)}
                    markAsSeen={(idx) => {
                      const globalIndex = notifications.findIndex(
                        (n) => n === unseen[idx]
                      );
                      markAsSeen(globalIndex);
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Profile"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => setShowProfileModal(true)}
            />
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <div className="content-area p-4">
          <motion.div
            className="content-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="header-card glass-effect"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="header-content">
                <div className="header-title">
                  <h2 style={{ color: "black" }}>Technician Profiles</h2>
                </div>
                <div className="header-stats" style={{ color: "black" }}>
                  <div className="stat-item">
                    <div className="stat-value" style={{ color: "black" }}>
                      {technicians.length}
                    </div>
                    <div className="stat-label" style={{ color: "black" }}>
                      Total
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value" style={{ color: "green" }}>
                      {
                        technicians.filter((tech) => tech.active).length
                      }
                    </div>
                    <div className="stat-label" style={{ color: "green" }}>
                      Active
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value" style={{ color: "blue" }}>
                      {technicians.reduce(
                        (sum, tech) => sum + tech.casesResolved,
                        0
                      )}
                    </div>
                    <div className="stat-label" style={{ color: "blue" }}>
                      Cases
                    </div>
                  </div>
                </div>
              </div>

              <div className="filters-row">
                <div className="filter-item search-filter">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="filter-input glass-input"
                  />
                </div>
                <div className="filter-item">
                  <select
                    value={filterCampus}
                    onChange={(e) => setFilterCampus(e.target.value)}
                    className="filter-select glass-input"
                  >
                    <option value="all">All Campuses</option>
                    {/* Add campuses dynamically if needed */}
                  </select>
                </div>
                <div className="filter-item">
                  <select
                    value={filterSpecialization}
                    onChange={(e) => setFilterSpecialization(e.target.value)}
                    className="filter-select glass-input"
                  >
                    <option value="all">All Specializations</option>
                    {/* Add specializations dynamically if needed */}
                  </select>
                </div>
                <button
                  className="reset-button btn-glass"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterCampus("all");
                    setFilterSpecialization("all");
                  }}
                >
                  Reset
                </button>
              </div>
            </motion.div>

            <div className="technicians-grid">
              {filteredTechnicians.length > 0 ? (
                filteredTechnicians.map((technician, index) => (
                  <motion.div
                    key={technician.staffId}
                    className="technician-card glass-effect"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="technician-status">
                      <span
                        className={`status-dot ${
                          technician.active ? "active" : "inactive"
                        }`}
                      ></span>
                      {technician.active ? "Active" : "Inactive"}
                    </div>
                    <div className="technician-info">
                      <h3 className="technician-name">{technician.surname}</h3>
                      <p className="technician-specialization">
                        {technician.role}
                      </p>
                      <p className="technician-campus">
                        {technician.campus} Campus
                      </p>

                      <div className="technician-stats">
                        <div className="tech-stat glass-stat">
                          <div className="tech-stat-value">
                            {technician.rating || "N/A"}
                          </div>
                          <div className="tech-stat-label">Rating</div>
                        </div>
                        <div className="tech-stat glass-stat">
                          <div className="tech-stat-value">
                            {technician.casesResolved || "N/A"}
                          </div>
                          <div className="tech-stat-label">Cases</div>
                        </div>
                      </div>

                      <button
                        className="view-profile-btn btn-glass"
                        onClick={() => handleViewProfile(technician)}
                      >
                        View Profile
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="no-results glass-effect"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="no-results-content">
                    <i className="fas fa-search fa-3x mb-3"></i>
                    <h3>No technicians found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Technician Profile Modal */}
        <AnimatePresence>
          {showProfileModal && selectedTechnician && (
            <div
              className="modal-overlay"
              onClick={() => setShowProfileModal(false)}
            >
              <motion.div
                className="technician-profile-modal glass-effect"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header glass-header">
                  <h3>Technician Profile</h3>
                  <button
                    className="close-btn"
                    onClick={() => setShowProfileModal(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="modal-body glass-body">
                  <div className="profile-header">
                    <div className="profile-avatar">
                      <motion.img
                        src={selectedTechnician.avatar || "default-avatar.png"}
                        alt={selectedTechnician.surname}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                      />
                      <span
                        className={`status-dot ${
                          selectedTechnician.active ? "active" : "inactive"
                        }`}
                      ></span>
                    </div>
                    <div className="profile-title">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {selectedTechnician.surname}
                      </motion.h2>
                      <motion.p
                        className="employee-id"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        ID: {selectedTechnician.staffId}
                      </motion.p>
                      <motion.div
                        className="specialization-badge"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {selectedTechnician.role}
                      </motion.div>
                    </div>
                  </div>

                  <div className="profile-stats">
                    <div className="stat-box glass-stat">
                      <span className="stat-value text-black">
                        {selectedTechnician.rating || "N/A"}
                      </span>
                      <span className="stat-label text-black">Rating</span>
                    </div>
                    <div className="stat-box glass-stat">
                      <span className="stat-value text-black">
                        {selectedTechnician.casesResolved || "N/A"}
                      </span>
                      <span className="stat-label text-black">Cases Resolved</span>
                    </div>
                    <div className="stat-box glass-stat">
                      <span className="stat-value text-black">
                        {new Date(
                          selectedTechnician.joinDate
                        ).toLocaleDateString() || "N/A"}
                      </span>
                      <span className="stat-label text-black">Join Date</span>
                    </div>
                  </div>

                  <div className="profile-details">
                    <div className="detail-section glass-section">
                      <h4>Contact Information</h4>
                      <div className="detail-row">
                        <div className="detail-label">Email:</div>
                        <div className="detail-value">
                          {selectedTechnician.email}
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Phone:</div>
                        <div className="detail-value">
                          {selectedTechnician.contact}
                        </div>
                      </div>
                    </div>

                    <div className="detail-section glass-section">
                      <h4>Work Information</h4>
                      <div className="detail-row">
                        <div className="detail-label">Department:</div>
                        <div className="detail-value">
                          {selectedTechnician.department || "N/A"}
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Campus:</div>
                        <div className="detail-value">
                          {selectedTechnician.campus || "N/A"}
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Availability:</div>
                        <div className="detail-value">
                          {selectedTechnician.availabilty || "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="detail-section glass-section">
                      <h4>Skills</h4>
                      <div className="skills-container">
                        {selectedTechnician.skills.split(",").map((skill, index) => (
                          <motion.span
                            key={index}
                            className="skill-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="detail-section glass-section">
                      <h4>Bio</h4>
                      <p className="bio-text">{selectedTechnician.bio || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="modal-footer glass-footer">
                  <button
                    className="btn-secondary btn-glass"
                    onClick={() => setShowProfileModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="btn-danger btn-glass"
                    onClick={() =>
                      handleDeleteTechnician(selectedTechnician.staffId)
                    }
                  >
                    Remove Technician
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ViewTechnicians;
