import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Profile = ({
  formData,
  setFormData,
  showProfileModal,
  setShowProfileModal,
  settingsMode,
  setSettingsMode,
  handleSkills,
  handlePasswordChange,
  handleAvailability,
  handleBio,
  handleEmailChange,
}) => {
  const [techInfo, setTechInfo] = useState({
    initails: "",
    surname: "",
    email: "",
    contact: "",
    role: "",
    bio: "",
    availability: "",
    skills: "",
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem("techData");
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        const profile = parsed?.data?.profile?.profile || {};
        setTechInfo({
          initails: profile.initails || "",
          surname: profile.surname || "",
          email: profile.email || "",
          contact: profile.contact || "",
          role: profile.role || "",
          bio: profile.bio || "",
          availability: profile.availability || "",
          skills: profile.skills || "",
        });
      } catch (error) {
        console.error("Failed to parse technicianData:", error);
      }
    }
  }, []);

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
          newBio: "",
          newAvailability: "",
          skills: "",
          newPassword: "",
          confirmPassword: "",
          newEmail: "",
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
          <h5 className="mt-3">Technician Profile</h5>
          {Object.entries(techInfo).map(([key, value]) => (
            <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
          ))}
        </div>

        <hr className="text-white" />

        {settingsMode === "" && (
          <div className="d-grid gap-2">
            <button className="btn btn-outline-light" onClick={() => setSettingsMode("options")}>Profile Settings</button>
            <button className="btn btn-outline-danger">Logout</button>
            <button className="btn btn-outline-secondary" onClick={() => setShowProfileModal(false)}>Close</button>
          </div>
        )}

        {settingsMode === "options" && (
          <div className="d-grid gap-2">
            <button className="btn btn-outline-warning" onClick={() => setSettingsMode("email")}>Change Email</button>
            <button className="btn btn-outline-info" onClick={() => setSettingsMode("password")}>Change Password</button>
            <button className="btn btn-outline-info" onClick={() => setSettingsMode("bio")}>Bio</button>
            <button className="btn btn-outline-info" onClick={() => setSettingsMode("Availability")}>Availability</button>
            <button className="btn btn-outline-info" onClick={() => setSettingsMode("skills")}>Skills</button>
            <button className="btn btn-outline-secondary" onClick={() => setSettingsMode("")}>Back</button>
          </div>
        )}

        {settingsMode === "email" && (
          <>
            <h6 className="text-center mb-3">Change Email</h6>
            <label className="form-label text-white">Current Password</label>
            <input type="password" className="form-control mb-2" value={formData.currentPassword} onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })} />
            <label className="form-label text-white">New Email</label>
            <input type="email" className="form-control mb-3" value={formData.newEmail} onChange={(e) => setFormData({ ...formData, newEmail: e.target.value })} />
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={handleEmailChange}>Save Email</button>
              <button className="btn btn-outline-light" onClick={() => setSettingsMode("options")}>Back</button>
            </div>
          </>
        )}

        {settingsMode === "password" && (
          <>
            <h6 className="text-center mb-3">Change Password</h6>
            <input type="password" className="form-control mb-2" placeholder="Current Password" value={formData.currentPassword} onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })} />
            <input type="password" className="form-control mb-2" placeholder="New Password" value={formData.newPassword} onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} />
            <input type="password" className="form-control mb-3" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={handlePasswordChange}>Save Password</button>
              <button className="btn btn-outline-light" onClick={() => setSettingsMode("options")}>Back</button>
            </div>
          </>
        )}

        {settingsMode === "bio" && (
          <>
            <h6 className="text-center mb-3">Update Bio</h6>
            <textarea className="form-control mb-3" value={formData.newBio} onChange={(e) => setFormData({ ...formData, newBio: e.target.value })}></textarea>
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={handleBio}>Save Bio</button>
              <button className="btn btn-outline-light" onClick={() => setSettingsMode("options")}>Back</button>
            </div>
          </>
        )}

        {settingsMode === "Availability" && (
          <>
            <h6 className="text-center mb-3">Update Availability</h6>
            <input type="text" className="form-control mb-3" value={formData.newAvailability} onChange={(e) => setFormData({ ...formData, newAvailability: e.target.value })} />
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={handleAvailability}>Save Availability</button>
              <button className="btn btn-outline-light" onClick={() => setSettingsMode("options")}>Back</button>
            </div>
          </>
        )}

        {settingsMode === "skills" && (
          <>
            <h6 className="text-center mb-3">Update Skills</h6>
            <input type="text" className="form-control mb-3" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={handleSkills}>Save Skills</button>
              <button className="btn btn-outline-light" onClick={() => setSettingsMode("options")}>Back</button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Profile;
