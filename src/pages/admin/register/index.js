"use client";

import React, { useState, useEffect, useRef } from "react";
import { Image } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import AdminNavbar from "../../../commponents/adminNavbar";
import axios from "axios";
import Swal from "sweetalert2";
import ProfileModal from "../../../commponents/profileModal";
import useNotification from "../../../commponents/hooks/notificationHook";
import NotificationPanel from "../../../commponents/notificationPanel";

const RegisterTechnician = () => {
  const initialForm = {
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
  };

  const [formData, setFormData] = useState(initialForm);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [settingsMode, setSettingsMode] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [chatFlow, setChatFlow] = useState([
    { from: "system", text: "👷 Welcome! Let's register a technician." },
  ]);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const chatBoxRef = useRef(null);

  const steps = [
    { label: "Technician's surname?", name: "surname", type: "text", placeholder: "e.g., Mokoena" },
    { label: "Initials?", name: "initails", type: "text", placeholder: "e.g., TM" },
    { label: "Email address?", name: "email", type: "email", placeholder: "e.g., tech@example.com" },
    { label: "Contact number?", name: "contact", type: "text", placeholder: "e.g., 0712345678" },
    { label: "Create a password", name: "password", type: "password", placeholder: "Password" },
  ];

  const {
    notifications,
    markAsSeen: hookMarkAsSeen,
    clearNotifications,
  } = useNotification();

  const unseen = notifications.filter((n) => !n.seen);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatFlow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const current = steps[step];
    const value = formData[current.name];

    if (!value) {
      Swal.fire("Missing Field", "Please fill out this field before continuing.", "warning");
      return;
    }

    setChatFlow((prev) => [
      ...prev,
      { from: "user", text: value },
      steps[step + 1]
        ? { from: "system", text: steps[step + 1].label }
        : { from: "system", text: "✅ All set! Ready to submit?" },
    ]);

    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    const payload = { ...formData, role: "technician" };
    const API_URL = process.env.REACT_APP_API_URL;

    try {
      setIsSubmitting(true);
      await axios.post(`${API_URL}addTechnician`, payload);

      setChatFlow((prev) => [...prev, { from: "system", text: "🎉 Technician registered successfully!" }]);
      Swal.fire("Success", "Technician added successfully!", "success");

      setFormData(initialForm);
      setStep(0);
      setIsSubmitting(false);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong.", "error");
      setChatFlow((prev) => [...prev, { from: "system", text: "❌ Failed to register. Try again." }]);
      setIsSubmitting(false);
    }
  };

  const backgroundStyle = {
    background: "linear-gradient(to bottom right, #dae8ff, #e2ecff)",
    backdropFilter: "blur(10px)",
    minHeight: "100vh",
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <AdminNavbar />

      <div className="flex-grow-1 d-flex flex-column p-4" style={backgroundStyle}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-uppercase text-black fw-bold mb-0">Add Technician</h2>
          <div className="d-flex align-items-center gap-3">
            <span className="text-black fw-semibold pt-2">{currentTime}</span>

            <div className="position-relative">
              <i
                className="bi bi-bell fs-5 text-black"
                role="button"
                onClick={() => setShowNotifications((prev) => !prev)}
              />
              {unseen.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
                  {unseen.length}
                </span>
              )}
              <AnimatePresence>
                {showNotifications && (
                  <NotificationPanel
                    notifications={notifications}
                    onClose={() => setShowNotifications(false)}
                    markAsSeen={(i) => {
                      const idx = notifications.findIndex((n) => n === unseen[i]);
                      if (idx >= 0) hookMarkAsSeen(idx);
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            <Image
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              roundedCircle
              width={32}
              height={32}
              role="button"
              onClick={() => setShowProfileModal(true)}
            />
          </div>
        </div>

        {/* Chat container */}
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <motion.div
            className="card w-100 p-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: "#fff", border: "none", borderRadius: "1rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
          >
            <h5 className="text-center text-primary mb-4">💬 Chat-Based Technician Registration</h5>

            <div
              ref={chatBoxRef}
              className="chat-box mb-3 p-3"
              style={{
                maxHeight: 400,
                overflowY: "auto",
                backgroundColor: "#f8f9fa",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            >
              {chatFlow.map((msg, idx) => (
                <motion.div
                  key={idx}
                  className={`d-flex mb-2 ${msg.from === "user" ? "justify-content-end" : "justify-content-start"}`}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`p-2 rounded-3 ${msg.from === "user" ? "bg-primary text-white" : "bg-light text-dark"}`}
                    style={{ maxWidth: "80%" }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input or Submit */}
            {step < steps.length ? (
              <>
                <label className="form-label">{steps[step].label}</label>
                <div className="input-group mb-2">
                  <input
                    type={steps[step].type}
                    name={steps[step].name}
                    className="form-control"
                    placeholder={steps[step].placeholder}
                    value={formData[steps[step].name]}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleNext}
                    disabled={isSubmitting}
                  >
                    <i className="bi bi-send"></i>
                  </button>
                </div>
              </>
            ) : (
              <button
                className="btn btn-success w-100"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "✅ Submit Registration"}
              </button>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showProfileModal && (
          <ProfileModal
            adminInfo={{
              surname: "Doe",
              initails: "J",
              email: "admin@example.com",
              contact: "123-456-7890",
            }}
            formData={formData}
            setFormData={setFormData}
            showProfileModal={showProfileModal}
            setShowProfileModal={setShowProfileModal}
            settingsMode={settingsMode}
            setSettingsMode={setSettingsMode}
            handleEmailChange={() => {}}
            handlePasswordChange={() => {}}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterTechnician;
