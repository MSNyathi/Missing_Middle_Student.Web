"use client";

import React, { useState, useEffect } from "react";
import { Image, Modal, Button, Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import AdminNavbar from "../../../commponents/adminNavbar";
import backgroundImage from "../../../assets/backgroundAdmin.jpeg";
import axios from "axios";
import Swal from "sweetalert2";
import ProfileModal from "../../../commponents/profileModal";

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
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-grow-1 p-4"
        style={backgroundStyle}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 text-white text-uppercase" style={{
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              padding: "6px 12px",
              borderRadius: "8px",
            }}>
            Add Technician
          </h2>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white">{currentTime}</span>
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
                <h3 className="card-title text-center mb-4">
                  🛠️ Register Technician
                </h3>
                <form onSubmit={handleSubmit} className="row g-3">
                  {[{ label: "Surname", name: "surname" },
                    { label: "Initails", name: "initails" }, // <-- changed here
                    { label: "Email", name: "email", type: "email" },
                    { label: "Contact", name: "contact" },
                    { label: "Password", name: "password", type: "password" },
                  ].map(({ label, name, type = "text" }, idx) => (
                    <div className="col-md-6" key={idx}>
                      <label className="form-label">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="form-control"
                        required
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
