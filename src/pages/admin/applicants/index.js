"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminNavbar from "../../../commponents/adminNavbar";
import backgroundImage from "../../../assets/backgroundAdmin.jpeg";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileModal from "../../../commponents/profileModal";
import NotificationPanel from "../../../commponents/notificationPanel";
import useNotification from "../../../commponents/hooks/notificationHook";
import Swal from "sweetalert2";
import axios from "axios";
import ApplicantsTable from "../../../commponents/applicantTable";
import ApplicantModal from "../../../commponents/applicantModal";

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
    status: "pending",
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
    status: "pending",
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
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  //const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [actionType, setActionType] = useState("");
  //const [currentPwd, setCurrentPwd] = useState("");
 // const [newPwd, setNewPwd] = useState("");
 // const [confirmPwd, setConfirmPwd] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [settingsMode, setSettingsMode] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [applicants, setApplicants] = useState(mockApplicants);
  

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
//Get Applicants from API
  useEffect(() => {
  const fetchApplicants = async () => {
    try {
       const API_URL = process.env.REACT_APP_API_URL;
      const getApplicants = `${API_URL}api/Application`;
      const response = await axios.get(getApplicants);
      const data = response.data;
      setApplicants(data);
      setFilteredApplicants(data);
      // initialize filtered list
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  fetchApplicants();
}, []);
//Filterbase on serarch term and status
useEffect(() => {
  const filtered = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.studentNum?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.initials?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "eligible"
        ? applicant.eligible
        : !applicant.eligible;

    return matchesSearch && matchesStatus;
  });

  setFilteredApplicants(filtered);
}, [searchTerm, filterStatus, applicants]);


  useEffect(() => {
    setAdminInfo({
      email: adminEmail,
      role: adminRole,
      initials: adminInitials,
      contact: adminContact,
      surname: adminSurname,
    });
  }, []); //The arrays state that the use effect must run only once when the component mounts
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

  const handlePasswordPrompt = (action) => {
    Swal.fire({
      title: `Confirm ${action === "approve" ? "Approval" : "Rejection"}`,
      input: "password",
      inputLabel: "Enter your admin password",
      inputPlaceholder: "Password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: (inputPassword) => {
        return new Promise((resolve, reject) => {
          if (inputPassword === adminPassword) {
            resolve(true);
          } else {
            reject(new Error("Incorrect password"));
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
      .then((result) => {
        if (result.isConfirmed) {
          // Proceed to update the applicant status
          const updatedStatus = action === "approve" ? "approved" : "rejected";
          updateApplicantStatus(selectedApplicant.id, updatedStatus);

          Swal.fire({
            icon: "success",
            title: `Applicant ${updatedStatus}`,
            text: `You have successfully ${updatedStatus} this application.`,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Authentication Failed",
          text: error.message,
        });
      });
  };
  const updateApplicantStatus = (applicantId, status) => {
    setApplicants((prev) => {
      const updated = prev.map((app) =>
        app.id === applicantId ? { ...app, status } : app
      );

      // Update selectedApplicant if it matches
      const updatedSelected = updated.find((app) => app.id === applicantId);
      if (updatedSelected) {
        setSelectedApplicant(updatedSelected);
      }

      return updated;
    });

    // 👇 Also update filteredApplicants so the table reflects the change
    setFilteredApplicants((prev) =>
      prev.map((app) => (app.id === applicantId ? { ...app, status } : app))
    );
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

  useEffect(() => {
    const filtered = applicants.filter((applicant) => {
      const matchesSearch =
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.studentNum.includes(searchTerm);

      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "eligible" && applicant.eligible) ||
        (filterStatus === "not_eligible" && !applicant.eligible);

      return matchesSearch && matchesFilter;
    });

    setFilteredApplicants(filtered);
  }, [applicants, searchTerm, filterStatus]);

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
        <div className="d-flex align-items-center gap-3 justify-content-between">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by Student Number, Surname or initials"
            style={{ borderRadius: "20px" }}
          />

          {/* New container to align right */}
          <div
            className="d-flex align-items-center gap-3 ms-auto"
            style={{ paddingTop: "20px" }}
          >
            <span
              className="text-dark"
              style={{
                color: "black",
                fontWeight: 500,
                paddingTop: "20px",
              }}
            >
              {currentTime}
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

        <div
          className="bg-white bg-opacity-75 p-4 rounded shadow-lg"
          style={{ paddingTop: "20px" }}
        >
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="text-dark mb-0">Applicants</h2>
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
         <ApplicantsTable applicants={filteredApplicants} onRowClick={handleRowClick} />
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
          <ApplicantModal
            applicant={selectedApplicant}
            onClose={() => setShowApplicantModal(false)}
            onApprove={() => handlePasswordPrompt("approve")}
            onReject={() => handlePasswordPrompt("reject")}
          />
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
