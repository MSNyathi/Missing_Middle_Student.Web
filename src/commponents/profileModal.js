"use client";

import React from "react";
import { motion } from "framer-motion";

const ProfileModal = ({
  adminInfo,
  formData,
  setFormData,
  showProfileModal,
  setShowProfileModal,
  settingsMode,
  setSettingsMode,
  handleEmailChange,
  handlePasswordChange,
}) => {
  if (!showProfileModal) return null;

  return (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 1050,
      }}
      onClick={() => {
        setShowProfileModal(false);
        setSettingsMode("");
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newEmail: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }}
    >
      <motion.div
        key="modal"
        initial={{ y: "-100vh", opacity: 0, scale: 0.9 }}
        animate={{ y: "0", opacity: 1, scale: 1 }}
        exit={{ y: "100vh", opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 100, damping: 14 }}
        className="p-4"
        style={{
          width: "380px",
          color: "#fff",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="rounded-circle"
            style={{ width: "80px", height: "80px" }}
          />
          <h5 className="mt-3">Admin Profile</h5>
          <p>
            <strong>Initials:</strong> {adminInfo.initials}
          </p>
          <p>
            <strong>Surname:</strong> {adminInfo.surname}
          </p>
          <p>
            <strong>Email:</strong> {adminInfo.email}
          </p>
          <p>
            <strong>Contact:</strong> {adminInfo.contact}
          </p>
        </div>

        <hr className="text-white" />

        {settingsMode === "" && (
          <div className="d-grid gap-2">
            <button
              className="btn btn-outline-light"
              onClick={() => setSettingsMode("options")}
            >
              Profile Settings
            </button>
            <button className="btn btn-outline-danger">Logout</button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowProfileModal(false)}
            >
              Close
            </button>
          </div>
        )}

        {settingsMode === "options" && (
          <div className="d-grid gap-2">
            <button
              className="btn btn-outline-warning"
              onClick={() => setSettingsMode("email")}
            >
              Change Email
            </button>
            <button
              className="btn btn-outline-info"
              onClick={() => setSettingsMode("password")}
            >
              Change Password
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setSettingsMode("")}
            >
              Back
            </button>
          </div>
        )}

        {settingsMode === "email" && (
          <>
            <h6 className="text-center mb-3">Change Email</h6>
            <label className="form-label text-white">Current Password</label>
            <input
              type="password"
              className="form-control mb-2"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              placeholder="Enter current password"
            />
            <label className="form-label text-white">New Email</label>
            <input
              type="email"
              className="form-control mb-3"
              value={formData.newEmail}
              onChange={(e) =>
                setFormData({ ...formData, newEmail: e.target.value })
              }
              placeholder="Enter new email"
            />
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={handleEmailChange}>
                Save Email
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => setSettingsMode("options")}
              >
                Back
              </button>
            </div>
          </>
        )}

        {settingsMode === "password" && (
          <>
            <h6 className="text-center mb-3">Change Password</h6>
            <label className="form-label text-white">Current Password</label>
            <input
              type="password"
              className="form-control mb-2"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              placeholder="Enter current password"
            />
            <label className="form-label text-white">New Password</label>
            <input
              type="password"
              className="form-control mb-2"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              placeholder="Enter new password"
            />
            <label className="form-label text-white">Confirm Password</label>
            <input
              type="password"
              className="form-control mb-3"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm new password"
            />
            <div className="d-grid gap-2">
              <button
                className="btn btn-success"
                onClick={handlePasswordChange}
              >
                Save Password
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => setSettingsMode("options")}
              >
                Back
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProfileModal;
