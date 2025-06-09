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

  // Update localStorage helper
  const updateLocalStorage = (field, value) => {
    const storedProfile = localStorage.getItem("techData");
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
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
        console.log('Parsed localStorage techData:', parsed); // For debugging, remove in prod
        const profile = parsed?.data?.profile || {};

        setTechInfo({
          techId: profile.techId || "",
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

  // Update Bio handler
  const handleBio = async () => {
    try {
      if (!techInfo.techId) throw new Error("Tech ID not found");
      const response = await fetch('https://localhost:7102/update/bio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TechId: techInfo.techId, Field: formData.newBio }),
      });
      if (!response.ok) throw new Error('Failed to update bio');
      alert('Bio updated successfully!');
      setTechInfo(prev => ({ ...prev, bio: formData.newBio }));
      updateLocalStorage("bio", formData.newBio);
      setSettingsMode("");
    } catch (error) {
      alert(error.message);
    }
  };

  // Update Availability handler
  const handleAvailability = async () => {
    try {
      if (!techInfo.techId) throw new Error("Tech ID not found");
      const response = await fetch('https://localhost:7102/update/availability', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TechId: techInfo.techId, Field: formData.newAvailability }),
      });
      if (!response.ok) throw new Error('Failed to update availability');
      alert('Availability updated successfully!');
      setTechInfo(prev => ({ ...prev, availability: formData.newAvailability }));
      updateLocalStorage("availability", formData.newAvailability);
      setSettingsMode("");
    } catch (error) {
      alert(error.message);
    }
  };

  // Update Skills handler
  const handleSkills = async () => {
    try {
      if (!techInfo.techId) throw new Error("Tech ID not found");
      const response = await fetch('https://localhost:7102/update/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TechId: techInfo.techId, Field: formData.skills }),
      });
      if (!response.ok) throw new Error('Failed to update skills');
      alert('Skills updated successfully!');
      setTechInfo(prev => ({ ...prev, skills: formData.skills }));
      updateLocalStorage("skills", formData.skills);
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
          backdropFilter: "blur(10px)",
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
              <button className="btn btn-success" onClick={handleBio}>Save Bio</button>
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
              <button className="btn btn-success" onClick={handleAvailability}>Save Availability</button>
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
