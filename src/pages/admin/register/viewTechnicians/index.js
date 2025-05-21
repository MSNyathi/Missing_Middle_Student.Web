"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminNavbar from "../../../../commponents/adminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import backgroundImage from "../../../../assets/backgroundAdmin.jpeg";
import eLogo  from '../../../../assets/e.png'
import useNotification from "../../../../commponents/hooks/notificationHook";
import NotificationPanel from "../../../../commponents/notificationPanel";

// Mock data for technicians
const mockTechnicians = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@educonnect.com",
    phone: "071 234 5678",
    specialization: "Hardware Repair",
    campus: "Pretoria",
    department: "ICT Support",
    employeeId: "TECH001",
    joinDate: "2023-01-15",
    rating: 4.8,
    casesResolved: 127,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Active",
    skills: [
      "Laptop Repair",
      "Network Troubleshooting",
      "Software Installation",
    ],
    availability: "Weekdays 8AM-5PM",
    bio: "Experienced hardware technician with over 5 years in educational IT support.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@educonnect.com",
    phone: "082 345 6789",
    specialization: "Network Administration",
    campus: "Soshanguve South",
    department: "Network Infrastructure",
    employeeId: "TECH002",
    joinDate: "2022-08-10",
    rating: 4.6,
    casesResolved: 98,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "Active",
    skills: ["Network Configuration", "Firewall Management", "VPN Setup"],
    availability: "Weekdays 9AM-6PM",
    bio: "Network specialist focused on maintaining secure campus-wide connectivity.",
  },
  {
    id: 3,
    name: "David Mokoena",
    email: "d.mokoena@educonnect.com",
    phone: "060 456 7890",
    specialization: "Software Support",
    campus: "Soshanguve North",
    department: "Software Solutions",
    employeeId: "TECH003",
    joinDate: "2023-03-22",
    rating: 4.9,
    casesResolved: 156,
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    status: "Active",
    skills: ["OS Troubleshooting", "Software Deployment", "Data Recovery"],
    availability: "Flexible Hours",
    bio: "Software expert specializing in academic applications and system optimization.",
  },
  {
    id: 4,
    name: "Thandi Nkosi",
    email: "t.nkosi@educonnect.com",
    phone: "073 567 8901",
    specialization: "User Support",
    campus: "Pretoria",
    department: "Help Desk",
    employeeId: "TECH004",
    joinDate: "2022-11-05",
    rating: 4.7,
    casesResolved: 203,
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    status: "On Leave",
    skills: ["Customer Service", "Troubleshooting", "Technical Documentation"],
    availability: "Weekdays 7AM-4PM",
    bio: "Dedicated support specialist with excellent communication skills and technical knowledge.",
  },
  {
    id: 5,
    name: "Michael van der Merwe",
    email: "m.vandermerwe@educonnect.com",
    phone: "084 678 9012",
    specialization: "Security Systems",
    campus: "Arcadia",
    department: "IT Security",
    employeeId: "TECH005",
    joinDate: "2023-02-18",
    rating: 4.5,
    casesResolved: 87,
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    status: "Active",
    skills: ["Security Auditing", "Penetration Testing", "Security Training"],
    availability: "Weekdays 8AM-5PM",
    bio: "Cybersecurity expert focused on protecting campus data and infrastructure.",
  },
];

const ViewTechnicians = () => {
  const [technicians, setTechnicians] = useState(mockTechnicians);
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

  // Get unique campuses and specializations for filters
  const campuses = [...new Set(mockTechnicians.map((tech) => tech.campus))];
  const specializations = [
    ...new Set(mockTechnicians.map((tech) => tech.specialization)),
  ];

  // Filter technicians
  const filteredTechnicians = technicians.filter((tech) => {
    const matchesSearch =
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCampus =
      filterCampus === "all" || tech.campus === filterCampus;
    const matchesSpecialization =
      filterSpecialization === "all" ||
      tech.specialization === filterSpecialization;

    return matchesSearch && matchesCampus && matchesSpecialization;
  });

  const handleViewProfile = (technician) => {
    setSelectedTechnician(technician);
    setShowProfileModal(true);
  };

  const handleDeleteTechnician = (id) => {
    // In a real app, you would call an API to delete the technician
    setTechnicians(technicians.filter((tech) => tech.id !== id));
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
    backgroundColor: "rgb(255, 255, 255)",
    backdropFilter: "blur(8px)",
    //backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    color: "white",
  };

  return (
    <div className="d-flex">
      <AdminNavbar />
      <div className="technician-container flex-grow-1" style={backgroundStyle}>
        <div className="d-flex justify-content-between align-items-center mb-3" style={{ paddingTop: "20px" }}>
          <div className="d-flex align-items-center">
            <img
              src={eLogo}
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
                        technicians.filter((tech) => tech.status === "Active")
                          .length
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
                    {campuses.map((campus, index) => (
                      <option key={index} value={campus}>
                        {campus}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="filter-item">
                  <select
                    value={filterSpecialization}
                    onChange={(e) => setFilterSpecialization(e.target.value)}
                    className="filter-select glass-input"
                  >
                    <option value="all">All Specializations</option>
                    {specializations.map((spec, index) => (
                      <option key={index} value={spec}>
                        {spec}
                      </option>
                    ))}
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
                    key={technician.id}
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
                          technician.status === "Active" ? "active" : "inactive"
                        }`}
                      ></span>
                      {technician.status}
                    </div>
                    <div className="technician-info">
                      <h3 className="technician-name">{technician.name}</h3>
                      <p className="technician-specialization">
                        {technician.specialization}
                      </p>
                      <p className="technician-campus">
                        {technician.campus} Campus
                      </p>

                      <div className="technician-stats">
                        <div className="tech-stat glass-stat">
                          <div className="tech-stat-value">
                            {technician.rating}
                          </div>
                          <div className="tech-stat-label">Rating</div>
                        </div>
                        <div className="tech-stat glass-stat">
                          <div className="tech-stat-value">
                            {technician.casesResolved}
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
                        src={selectedTechnician.avatar}
                        alt={selectedTechnician.name}
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
                          selectedTechnician.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      ></span>
                    </div>
                    <div className="profile-title">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {selectedTechnician.name}
                      </motion.h2>
                      <motion.p
                        className="employee-id"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        ID: {selectedTechnician.employeeId}
                      </motion.p>
                      <motion.div
                        className="specialization-badge"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {selectedTechnician.specialization}
                      </motion.div>
                    </div>
                  </div>

                  <div className="profile-stats">
                    <div className="stat-box glass-stat">
                      <span className="stat-value text-black">
                        {selectedTechnician.rating}
                      </span>
                      <span className="stat-label text-black">Rating</span>
                    </div>
                    <div className="stat-box glass-stat">
                      <span className="stat-value text-black">
                        {selectedTechnician.casesResolved}
                      </span>
                      <span className="stat-label text-black">
                        Cases Resolved
                      </span>
                    </div>
                    <div className="stat-box glass-stat">
                      <span className="stat-value text-black">
                        {new Date(
                          selectedTechnician.joinDate
                        ).toLocaleDateString()}
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
                          {selectedTechnician.phone}
                        </div>
                      </div>
                    </div>

                    <div className="detail-section glass-section">
                      <h4>Work Information</h4>
                      <div className="detail-row">
                        <div className="detail-label">Department:</div>
                        <div className="detail-value">
                          {selectedTechnician.department}
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Campus:</div>
                        <div className="detail-value">
                          {selectedTechnician.campus}
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Availability:</div>
                        <div className="detail-value">
                          {selectedTechnician.availability}
                        </div>
                      </div>
                    </div>

                    <div className="detail-section glass-section">
                      <h4>Skills</h4>
                      <div className="skills-container">
                        {selectedTechnician.skills.map((skill, index) => (
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
                      <p className="bio-text">{selectedTechnician.bio}</p>
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
                      handleDeleteTechnician(selectedTechnician.id)
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
