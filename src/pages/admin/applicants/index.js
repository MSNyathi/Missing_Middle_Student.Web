"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminNavbar from "../../../commponents/adminNavbar";
import backgroundImage from "../../../assets/backgroundAdmin.jpeg";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileModal from "../../../commponents/profileModal";

// Mock data
const mockApplicants = [
  {
    id: 1,
    studentNum: "21900123",
    initials: "JD",
    name: "John Doe",
    courseName: "ND: IT",
    faculty: "ICT",
    campus: "Pretoria",
    email: "john@example.com",
    contact: "0821234567",
    nationality: "South African",
    nsfasStatus: "Unfunded",
    yearOfStudy: "1st Year",
    ethnicity: "Black",
    averageMark: 72,
    eligible: true,
    proofOfIncomeUrl:
      "https://via.placeholder.com/600x400?text=Proof+of+Income",
  },
  {
    id: 2,
    studentNum: "21900456",
    initials: "SS",
    name: "Sarah Smith",
    courseName: "ND: Accounting",
    faculty: "Business",
    campus: "Soshanguve South",
    email: "sarah@example.com",
    contact: "0831234567",
    nationality: "South African",
    nsfasStatus: "Funded",
    yearOfStudy: "2nd Year",
    ethnicity: "White",
    averageMark: 58,
    eligible: false,
    proofOfIncomeUrl:
      "https://via.placeholder.com/600x400?text=Proof+of+Income",
  },
];

// Admin data
const adminData = {
  name: "Xolane Shabalala",
  email: "admin@example.com",
  role: "Super Admin",
  initials: "XS",
  contact: "0761981783",
  password: "admin123",
};

const ApplicantsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [actionType, setActionType] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [settingsMode, setSettingsMode] = useState("");
  const [formData, setFormData] = useState({
    currentEmail: "",
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [adminInfo, setAdminInfo] = useState({
    surname: "",
    initials: "",
    email: "",
    contact: "",
  });
  const adminEmail = "admin@example.com";
  const adminRole = "Admin";
  const adminInitials = "J";
  const adminContact = "123-456-7890";
  const adminSurname = "Doe";
  useEffect(() => {
    setAdminInfo({
      email: adminEmail,
      role: adminRole,
      initials: adminInitials,
      contact: adminContact,
      surname: adminSurname,
    });
  }, []);
  const glassCardStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRowClick = (applicant) => {
    setSelectedApplicant(applicant);
    setShowApplicantModal(true);
  };
  const handleEmailChange = () => {
    const { currentPassword, newEmail } = formData;

    if (!currentPassword || !newEmail) {
      alert("Please fill in both fields.");
      return;
    }

    // Perform API request here
    console.log("Changing email:", { currentPassword, newEmail });

    alert("Email updated successfully.");
    resetModal();
  };

  const handlePasswordChange = () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Perform API request here
    console.log("Changing password:", { currentPassword, newPassword });

    alert("Password updated successfully.");
    resetModal();
  };

  const resetModal = () => {
    setFormData({
      currentPassword: "",
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
    });
    setSettingsMode("");
  };

  const handlePasswordPrompt = (type) => {
    setActionType(type);
    setShowApplicantModal(false);
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = () => {
    if (!adminPassword) {
      toast.error("Error: Password cannot be empty.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (adminPassword !== adminData.password) {
      toast.error("Incorrect Password: You entered an invalid password.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setAdminPassword("");
      return;
    }

    setShowPasswordPrompt(false);
    setAdminPassword("");

    const icon = actionType === "approve" ? "✅" : "❌";
    toast.success(
      `${actionType === "approve" ? "Approved" : "Rejected"}: ${
        selectedApplicant.name
      } has been ${actionType === "approve" ? "approved" : "rejected"}.`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: icon,
      }
    );
  };

  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.studentNum.includes(searchTerm);

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "eligible" && applicant.eligible) ||
      (filterStatus === "not_eligible" && !applicant.eligible);

    return matchesSearch && matchesFilter;
  });

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    color: "white",
  };

  return (
    <div className="d-flex">
      <AdminNavbar />
      <div style={backgroundStyle} className="flex-grow-1 p-4">
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

        <div className="bg-white bg-opacity-75 p-4 rounded shadow-lg">
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="text-dark mb-0">Applicants</h2>
              <div className="d-flex align-items-center gap-3">
                <span className="text-dark">{currentTime}</span>
                <motion.img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  className="rounded-circle"
                  alt="Profile"
                  width={32}
                  height={32}
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowProfileModal(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="row">
              <div className="col-md-6 mb-2">
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search by name or student number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <i className="fas fa-filter"></i>
                  </span>
                  <select
                    className="form-select filter-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="eligible">Eligible</option>
                    <option value="not_eligible">Not Eligible</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle shadow-sm bg-white rounded table-3d">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Student #</th>
                      <th>Initials</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Faculty</th>
                      <th>Campus</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Nationality</th>
                      <th>NSFAS</th>
                      <th>Year</th>
                      <th>Ethnicity</th>
                      <th>Avg. Mark</th>
                      <th>Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplicants.map((applicant, index) => (
                      <motion.tr
                        key={applicant.id}
                        onClick={() => handleRowClick(applicant)}
                        style={{ cursor: "pointer" }}
                        whileHover={{
                          backgroundColor: "rgba(240, 240, 240, 0.9)",
                          scale: 1.01,
                          transition: { duration: 0.2 },
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                          ease: "easeOut",
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{applicant.studentNum}</td>
                        <td>{applicant.initials}</td>
                        <td>{applicant.name}</td>
                        <td>{applicant.courseName}</td>
                        <td>{applicant.faculty}</td>
                        <td>{applicant.campus}</td>
                        <td>{applicant.email}</td>
                        <td>{applicant.contact}</td>
                        <td>{applicant.nationality}</td>
                        <td>{applicant.nsfasStatus}</td>
                        <td>{applicant.yearOfStudy}</td>
                        <td>{applicant.ethnicity}</td>
                        <td>{applicant.averageMark}%</td>
                        <td>
                          <span
                            className={`badge ${
                              applicant.eligible ? "bg-success" : "bg-danger"
                            } eligibility-badge`}
                          >
                            {applicant.eligible ? "Eligible" : "Not Eligible"}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {filteredApplicants.length === 0 && (
            <motion.div
              className="alert alert-warning text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              No applicants match your search or filter criteria.
            </motion.div>
          )}
        </div>

        {/* Applicant Modal */}
        <AnimatePresence>
          {showApplicantModal && selectedApplicant && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <motion.div
                  className="modal-content glass-effect"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    duration: 0.4,
                  }}
                >
                  <div className="modal-header glass-header">
                    <h5 className="modal-title">Applicant Information</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowApplicantModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body glass-body typing-text">
                    <div className="row">
                      <div className="col-md-6">
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <strong>Name:</strong> {selectedApplicant.name}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <strong>Student #:</strong>{" "}
                          {selectedApplicant.studentNum}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <strong>Course:</strong>{" "}
                          {selectedApplicant.courseName}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <strong>Email:</strong> {selectedApplicant.email}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <strong>Contact:</strong> {selectedApplicant.contact}
                        </motion.p>
                      </div>
                      <div className="col-md-6">
                        <motion.p
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <strong>Faculty:</strong> {selectedApplicant.faculty}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <strong>Campus:</strong> {selectedApplicant.campus}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <strong>NSFAS Status:</strong>{" "}
                          {selectedApplicant.nsfasStatus}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <strong>Year:</strong> {selectedApplicant.yearOfStudy}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <strong>Ethnicity:</strong>{" "}
                          {selectedApplicant.ethnicity}
                        </motion.p>
                      </div>
                    </div>
                    <motion.hr
                      initial={{ opacity: 0, width: "0%" }}
                      animate={{ opacity: 1, width: "100%" }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    />
                    <motion.h5
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      Proof of Income
                    </motion.h5>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <a
                        href={selectedApplicant.proofOfIncomeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={
                            selectedApplicant.proofOfIncomeUrl ||
                            "/placeholder.svg"
                          }
                          className="img-fluid rounded proof-image"
                          style={{ maxHeight: "300px" }}
                          alt="Proof of Income"
                        />
                      </a>
                    </motion.div>
                  </div>
                  <div className="modal-footer glass-footer">
                    <motion.button
                      className="btn btn-danger btn-glass"
                      onClick={() => handlePasswordPrompt("reject")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reject
                    </motion.button>
                    <motion.button
                      className="btn btn-success btn-glass"
                      onClick={() => handlePasswordPrompt("approve")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Approve
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Admin Profile Modal */}

         <AnimatePresence>
        {showProfileModal && (
          <ProfileModal
            adminInfo={adminInfo}
            formData={formData}
            setFormData={setFormData}
            showProfileModal={showProfileModal}
            setShowProfileModal={setShowProfileModal}
            settingsMode={settingsMode}
            setSettingsMode={setSettingsMode}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default ApplicantsPage;
