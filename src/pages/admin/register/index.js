"use client";

import React, { useState, useEffect } from "react";
import { Image, Modal, Button, Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import AdminNavbar from "../../../commponents/adminNavbar";
import backgroundImage from "../../../assets/backgroundAdmin.jpeg";
import axios from "axios";
import Swal from "sweetalert2";
import ProfileModal from "../../../commponents/profileModal";
import useNotification from "../../../commponents/hooks/notificationHook";
import NotificationPanel from "../../../commponents/notificationPanel";
const RegisterTechnician = () => {
  const [formData, setFormData] = useState({
    surname: "",
    initails: "", // <-- changed here
    email: "",
    contact: "",
    password: "",
    currentEmail: "",
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [settingsMode, setSettingsMode] = useState("");
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

  const [adminInfo, setAdminInfo] = useState({
    surname: "",
    initails: "", // <-- changed here
    email: "",
    contact: "",
  });

  const adminEmail = "admin@example.com";
  const adminRole = "Admin";
  const adminInitails = "J"; // <-- changed here
  const adminContact = "123-456-7890";
  const adminSurname = "Doe";

  useEffect(() => {
    setAdminInfo({
      email: adminEmail,
      role: adminRole,
      initails: adminInitails, // <-- changed here
      contact: adminContact,
      surname: adminSurname,
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEmailChange = () => {
    const { currentPassword, newEmail } = formData;

    if (!currentPassword || !newEmail) {
      alert("Please fill in both fields.");
      return;
    }

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

    alert("Password updated successfully.");
    resetModal();
  };

  const resetModal = () => {
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setSettingsMode("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      role: "technician",
    };

    const API_URL = process.env.REACT_APP_API_URL;

    try {
      const res = await axios.post(`${API_URL}addTechnician`, payload);
      Swal.fire({
        icon: "success",
        title: "Technician Registered",
        text: "The technician has been successfully added!",
      });

      setFormData({
        surname: "",
        initails: "", // <-- changed here
        email: "",
        contact: "",
        password: "",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
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
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-grow-1 p-4"
        style={backgroundStyle}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 text-black text-uppercase text-bold text-center" style={{ color: "black" }}>
            Add Technician
          </h2>
          <div className="d-flex align-items-center gap-3">
            <span className="text-black" style={{ color: "black", fontWeight: 500, paddingTop: "20px" }}>{currentTime}</span>
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
            <Image
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              roundedCircle
              alt="Profile"
              width={32}
              height={32}
              style={{ cursor: "pointer" }}
              onClick={() => setShowProfileModal(true)}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
          <motion.div
            className="container"
            style={{ maxWidth: "700px" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="card shadow-sm border-0 rounded-4" style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                color: "white",
              }}>
              <div className="card-body p-4">
                <h3 className="card-title text-center mb-4" style={{ color: "blue" }}>
                  🛠️ Register Technician
                </h3>
                <form onSubmit={handleSubmit} className="row g-3" style={{ color: "black" }}>
                  {[{ label: "Surname", name: "surname", placeholder: "Enter your Surname" },
                    { label: "Initails", name: "initails", placeholder: "Enter your Initails" },
                    { label: "Email", name: "email", type: "email", placeholder: "Enter your Email" },
                    { label: "Contact", name: "contact", placeholder: "Enter your Contact" },
                    { label: "Password", name: "password", type: "password", placeholder: "Enter your Password" },
                  ].map(({ label, name, type = "text", placeholder }, idx) => (
                    <div className="col-md-6" key={idx}>
                      <label className="form-label">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="form-control"
                        required
                        placeholder={placeholder}
                      />
                    </div>
                  ))}

                  <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary w-100">
                      Register Technician
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <p className="text-muted text-center mt-3">
              Only technician roles are currently supported.
            </p>
          </motion.div>
        </div>
      </motion.div>

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
  );
};

export default RegisterTechnician;
