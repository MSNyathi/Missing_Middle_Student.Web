import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './profile.css';

const Profile = ({
  formData,
  setFormData,
  showProfileModal,
  setShowProfileModal,
  settingsMode,
  setSettingsMode,
}) => {
  const [techInfo, setTechInfo] = useState({
    techId: "",
    initails: "",
    surname: "",
    email: "",
    contact: "",
    role: "",
    bio: "",
    availability: "",
    skills: "",
  });

  const updateLocalStorage = (field, value) => {
    const stored = localStorage.getItem("techData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.data?.profile) {
          parsed.data.profile[field] = value;
          localStorage.setItem("techData", JSON.stringify(parsed));
        }
      } catch (e) {
        console.error("Failed to update localStorage", e);
      }
    }
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem("techData");
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        const profile = parsed?.data?.profile || {};
        const techId = parsed?.data?.techId || "";

        setTechInfo({
          techId: techId,
          initails: profile.initails || "",
          surname: profile.surname || "",
          email: profile.email || "",
          contact: profile.contact || "",
          role: profile.role || "",
          bio: profile.bio || "",
          availability: profile.availability || "",
          skills: profile.skills || "",
        });

        setFormData({
          ...formData,
          newBio: profile.bio || "",
          newAvailability: profile.availability || "",
          skills: profile.skills || "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (fieldName, fieldValue, endpoint) => {
    try {
      if (!techInfo.techId) throw new Error("Tech ID not found");
      const response = await fetch(`https://localhost:7102/update/${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TechId: techInfo.techId, Field: fieldValue }),
      });
      if (!response.ok) throw new Error(`Failed to update ${fieldName}`);
      alert(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} updated successfully!`);
      setTechInfo(prev => ({ ...prev, [fieldName]: fieldValue }));
      updateLocalStorage(fieldName, fieldValue);
      setSettingsMode("");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!showProfileModal) return null;

  return (
    <motion.div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1050 }}
      onClick={() => {
        setShowProfileModal(false);
        setSettingsMode("");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          newEmail: "",
          newBio: "",
          newAvailability: "",
          skills: "",
        });
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="p-4"
        style={{
          width: "380px",
          background: "#000000",
          borderRadius: "20px",
          color: "#fff",
        }}
      >
        <div className="text-center mb-3">
          <img
            src=""
            alt="Profile"
            className="rounded-circle"
            style={{ width: "80px", height: "80px", backgroundColor: "#ccc" }}
          />
          <h5 className="mt-2" style={{ color: '#0357ff' }}>Technician Profile</h5>
          {Object.entries(techInfo).map(([key, value]) => (
            key !== "techId" && (
              <p key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </p>
            )
          ))}
        </div>

        <hr className="text-white" />

        {settingsMode === "" && (
          <div className="d-grid gap-2">
            <button className="btn btn-outline-light" onClick={() => setSettingsMode("options")}>Profile Settings</button>
            <button className="btn btn-outline-secondary" onClick={() => setShowProfileModal(false)}>Close</button>
          </div>
        )}

        {settingsMode === "options" && (
          <div className="d-grid gap-2">
            <button className="btn btn-outline-info" onClick={() => setSettingsMode("bio")}>Bio</button>
            <button className="btn btn-outline-info" onClick={() => setSettingsMode("availability")}>Availability</button>
            <button className="btn btn-outline-info" onClick={() => setSettingsMode("skills")}>Skills</button>
            <button className="btn btn-outline-secondary" onClick={() => setSettingsMode("")}>Back</button>
          </div>
        )}

        {settingsMode === "bio" && (
          <>
            <h6 className="text-center mb-3">Update Bio</h6>
            <textarea
              className="form-control mb-3"
              value={formData.newBio}
              onChange={(e) => setFormData({ ...formData, newBio: e.target.value })}
            ></textarea>
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={() => handleUpdate("bio", formData.newBio, "bio")}>Save Bio</button>
              <button className="btn btn-outline-light" onClick={() => setSettingsMode("options")}>Back</button>
            </div>
          </>
        )}

        {settingsMode === "availability" && (
          <>
            <h6 className="text-center mb-3">Update Availability</h6>
            <input
              type="text"
              className="form-control mb-3"
              value={formData.newAvailability}
              onChange={(e) => setFormData({ ...formData, newAvailability: e.target.value })}
            />
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={() => handleUpdate("availability", formData.newAvailability, "availability")}>Save Availability</button>
              <button className="btn btn-outline-light" onClick={() => setSettingsMode("options")}>Back</button>
            </div>
          </>
        )}

        {settingsMode === "skills" && (
          <>
            <h6 className="text-center mb-3">Update Skills</h6>
            <input
              type="text"
              className="form-control mb-3"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={() => handleUpdate("skills", formData.skills, "skills")}>Save Skills</button>
              <button className="btn btn-outline-light" onClick={() => setSettingsMode("options")}>Back</button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Profile;
