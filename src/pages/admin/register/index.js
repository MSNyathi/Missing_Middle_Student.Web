"use client";

import React, { useState, useEffect } from "react";
import { Image, Modal, Button, Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import AdminNavbar from "../../../commponents/adminNavbar";
import axios from "axios";
import Swal from "sweetalert2";
import ProfileModal from "../../../commponents/profileModal";
import useNotification from "../../../commponents/hooks/notificationHook";
import NotificationPanel from "../../../commponents/notificationPanel";

const RegisterTechnician = () => {
  const [formData, setFormData] = useState({
    surname: "",
    initails: "",
    email: "",
    contact: "",
    password: "",
    currentEmail: "",
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [settingsMode, setSettingsMode] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [chatFlow, setChatFlow] = useState([
    { from: "system", text: "Welcome! Let's register a technician 👷‍♂️" },
  ]);
  const [step, setStep] = useState(0);

  const steps = [
    {
      label: "What's the technician's surname?",
      name: "surname",
      type: "text",
      placeholder: "e.g., Mokoena",
    },
    {
      label: "Initials?",
      name: "initails",
      type: "text",
      placeholder: "e.g., TM",
    },
    {
      label: "Email address?",
      name: "email",
      type: "email",
      placeholder: "e.g., tech@example.com",
    },
    {
      label: "Contact number?",
      name: "contact",
      type: "text",
      placeholder: "e.g., 0712345678",
    },
    {
      label: "Create a password",
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ];
  const handleNext = () => {
    const current = steps[step];
    const value = formData[current.name];

    if (!value) {
      Swal.fire("Please fill out the field before continuing.");
      return;
    }

    setChatFlow((prev) => [
      ...prev,
      { from: "user", text: value },
      {
        from: "system",
        text: steps[step + 1]?.label || "All set! Ready to submit?",
      },
    ]);

    setStep((prev) => prev + 1);
  };

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
    initails: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    setAdminInfo({
      email: "admin@example.com",
      role: "Admin",
      initails: "J",
      contact: "123-456-7890",
      surname: "Doe",
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = { ...formData, role: "technician" };
    const API_URL = process.env.REACT_APP_API_URL;

    try {
      await axios.post(`${API_URL}addTechnician`, payload);
      setChatFlow((prev) => [
        ...prev,
        { from: "system", text: "✅ Technician registered successfully!" },
      ]);

      Swal.fire({
        icon: "success",
        title: "Technician Registered",
        text: "The technician has been successfully added!",
      });

      setFormData({
        surname: "",
        initails: "",
        email: "",
        contact: "",
        password: "",
      });
      setStep(0);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong.",
      });
      setChatFlow((prev) => [
        ...prev,
        { from: "system", text: "❌ Failed to register. Try again." },
      ]);
    }
  };

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

  const backgroundStyle = {
    backgroundColor: "rgb(228, 235, 255)",
    backdropFilter: "blur(8px)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    color: "white",
  };

  return (
    <div className="d-flex">
      <AdminNavbar />
      <div className="flex-grow-1 p-4" style={backgroundStyle}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2
            className="mb-0 text-black text-uppercase "
            style={{ fontWeight: "bold" }}
          >
            Add Technician
          </h2>
          <div className="d-flex align-items-center gap-3">
            <span
              className="text-black"
              style={{ fontWeight: 500, paddingTop: "20px" }}
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

        <div
          style={{ height: "100%" }}
          className="d-flex justify-content-center align-items-center"
        >
          <motion.div
            className="container d-flex justify-content-center align-items-center"
            style={{ maxWidth: "400px", minHeight: "25vh" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="card rounded-4 p-3 w-100"
              style={{
                background: "transparent",
                color: "black",
                border: "none",
              }}
            >
              <h5 className="text-center mb-4" style={{ color: "blue" }}>
                🧾 Chat-based Technician Registration
              </h5>

              <div className="chat-box mb-3" style={{ overflow: "visible" }}>
                {chatFlow.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`d-flex ${
                      msg.from === "user"
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-3 mb-2 ${
                        msg.from === "user"
                          ? "bg-primary text-white"
                          : "bg-light text-dark"
                      }`}
                      style={{ maxWidth: "80%" }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {step < steps.length && (
                <>
                  <label className="form-label">{steps[step].label}</label>
                  <input
                    type={steps[step].type}
                    name={steps[step].name}
                    value={formData[steps[step].name]}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder={steps[step].placeholder}
                  />
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </>
              )}

              {step === steps.length && (
                <button
                  className="btn btn-success w-100"
                  onClick={handleSubmit}
                >
                  Submit Registration ✅
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

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
