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
import { useLocation } from "react-router-dom";

// Admin data
const adminData = {
  name: "",
  email: "",
  role: "",
  initials: "",
  contact: "",
  password: "",
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
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [actionType, setActionType] = useState("");
  const location = useLocation();
  const [adminPassword, setAdminPassword] = useState(
    location.state?.adminPassword || localStorage.getItem("adminPassword")
  );

  const [settingsMode, setSettingsMode] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [applicants, setApplicants] = useState([]);

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
  const adminEmail = "";
  const adminRole = "";
  const adminInitials = "";
  const adminContact = "";
  const adminSurname = "";
  //Get Applicants from API
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL;
        const getApplicants = `${API_URL}api/Application/all`;
        const response = await axios.get(getApplicants);
        const data = response.data;
        console.log("Fetched applicants:", data);
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
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        applicant.studentNum?.toLowerCase().includes(searchLower) ||
        applicant.name?.toLowerCase().includes(searchLower) ||
        applicant.initials?.toLowerCase().includes(searchLower);

      let matchesStatus = true;
      if (filterStatus === "eligible")
        matchesStatus = applicant.eligible === true;
      else if (filterStatus === "not_eligible")
        matchesStatus = applicant.eligible === false;

      return matchesSearch && matchesStatus;
    });

    setFilteredApplicants(filtered);
  }, [applicants, searchTerm, filterStatus]);

  useEffect(() => {
    setAdminInfo({
      email: adminEmail,
      role: adminRole,
      initials: adminInitials,
      contact: adminContact,
      surname: adminSurname,
    });
  }, []); //The arrays state that the use effect must run only once when the component mounts

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

  const handlePasswordPrompt = (action, applicant) => {
    Swal.fire({
      title: `Confirm ${action === "approve" ? "Approval" : "Rejection"}`,
      input: "password",
      inputLabel: "Enter your admin password",
      inputPlaceholder: "Password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
        type: "password",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: (inputPassword) => {
        return new Promise((resolve, reject) => {
          const storedPassword =
            location.state?.adminPassword ||
            localStorage.getItem("adminPassword");

          if (inputPassword === storedPassword) {
            resolve(true);
          } else {
            reject(new Error("Incorrect password"));
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const updatedStatus = action === "approve" ? "approved" : "rejected";

          // 🔁 Make sure this sends API request and updates UI
          updateApplicantStatus(applicant.id, updatedStatus);

          Swal.fire({
            icon: "success",
            title: `Applicant ${updatedStatus}`,
            text: `You have successfully ${updatedStatus} this application.`,
          });

          toast.success(`${applicant.id} has been ${updatedStatus}.`, {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
          const handleApprove = async () => {
            try {
              await axios.put(
                `https://localhost:7102/approve?ApplicantId=${applicant.id}`
              );
            } catch (err) {
              console.error("Error approving applicant:", err);
              alert("Failed to approve applicant. Please try again.");
            }
          };
          await handleApprove();
        }
        const handleReject = async () => {
          try {
            await axios.put(
              `https://localhost:7102/reject?ApplicantId=${applicant.id}`
            );
          } catch (err) {
            console.error("Error rejecting applicant:", err);
            alert("Failed to reject applicant. Please try again.");
          }
        };
        await handleReject();
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
      adminPassword("");
      return;
    }

    setShowPasswordPrompt(false);
    adminPassword("");

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
      // Safely handle missing or undefined name
      const name = applicant.name || ""; // fallback to empty string
      const studentNum = applicant.studentNum || "";

      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        studentNum.includes(searchTerm);

      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "eligible" && applicant.eligible) ||
        (filterStatus === "not_eligible" && !applicant.eligible);

      return matchesSearch && matchesFilter;
    });

    setFilteredApplicants(filtered);
  }, [applicants, searchTerm, filterStatus]);

  const backgroundStyle = {
    backgroundColor: "rgb(228, 235, 255)",
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
          <h2 style={{ color: "black" }}>
            <strong>Applicants</strong>
          </h2>

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
          <div className="mb-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">
              <div className="col-md-6 mb-2">
                <div className="input-group">
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
              <ApplicantsTable
                applicants={filteredApplicants}
                onRowClick={handleRowClick}
              />
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
              onApprove={(applicant) =>
                handlePasswordPrompt("approve", applicant)
              }
              onReject={(applicant) =>
                handlePasswordPrompt("reject", applicant)
              }
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
