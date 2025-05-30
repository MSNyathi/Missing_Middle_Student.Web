"use client";

import React, { useState, useEffect, use } from "react";
import AdminNavbar from "../../../commponents/adminNavbar";
import { Bar, Pie, Line } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import backgroundImage from "../../../assets/backgroundAdmin.jpeg";
import { useLocation } from "react-router-dom";
import ProfileModal from "../../../commponents/profileModal";
import useNotification from "../../../commponents/hooks/notificationHook";
import NotificationPanel from "../../../commponents/notificationPanel";
import DashboardSummary from "../../../commponents/dashboardSummury";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const Dashboard = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [totalDevices, setTotalDevices] = useState(0);
  const [allocatedDevices, setAllocatedDevices] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [approvedApplicants, setApprovedApplicants] = useState(0);
  const [unapprovedApplicants, setUnapprovedApplicants] = useState(0);
  const [monthlyApplicants, setMonthlyApplicants] = useState(Array(12).fill(0));
  const [settingsMode, setSettingsMode] = useState("");
  const [connected, setConnected] = useState(false);
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

  // SignalR connection status
  useEffect(() => {
    if (connection?.state === "Connected") {
      setConnected(true);
    }
  }, [connection?.state]);

  // Setup notification listener only once
  useEffect(() => {
    if (!connection) return;

    const handleNewNotification = (incomingNotifications) => {
      console.log("Incoming notifications:", incomingNotifications);
      setNotifications(incomingNotifications);
    };

    if (connection.state === "Connected") {
      connection.send("getNotifications").catch(console.error);
    }

    connection.off("newNotificaion"); // Clear existing listener
    connection.on("newNotificaion", handleNewNotification);

    return () => {
      connection.off("newNotificaion", handleNewNotification); // Clean up on unmount
    };
  }, [connection]);

  // Admin profile modal
  const [formData, setFormData] = useState({
    currentEmail: "",
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [adminInfo, setAdminInfo] = useState({
    surname: "",
    initails: "",
    email: "",
    contact: "",
  });

  const location = useLocation();
  const fallbackData = {
    device_Info: {},
    applicants_Data: {},
    applicants_Montly_Data: Array(12).fill(0),
  };

  const rawData =
    location.state?.mydata || JSON.parse(localStorage.getItem("adminData"));
  const data =
    typeof rawData === "object" && rawData?.data
      ? rawData
      : { data: fallbackData };

  useEffect(() => {
    const safeData = data.data || {};
    const approved = safeData.applicants_Data?.Approved_Applicants || 0;
    const total = safeData.applicants_Data?.Total_Applicants || 0;

    const unapproved = Math.max(total - approved, 0);

    setTotalDevices(safeData.device_Info?.Total_devices || 0);
    setAllocatedDevices(safeData.device_Info?.Allocated_devices || 0);
    setApprovedApplicants(approved || 0);
    setUnapprovedApplicants(unapproved || 0);
    setTotalApplicants( total || 0);
    const monthlyData = safeData.applicants_Montly_Data;
    if (Array.isArray(monthlyData)) {
      setMonthlyApplicants(monthlyData);
    } else {
      setMonthlyApplicants(Array(12).fill(0));
    }

    if (safeData.profile?.profile) {
      setAdminInfo({
        surname: safeData.profile.profile.surname || "",
        initails: safeData.profile.profile.initails || "",
        email: safeData.profile.profile.email || "",
        contact: safeData.profile.profile.contact || "",
      });
    }
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
    setFormData({
      currentPassword: "",
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
    });
    setSettingsMode("");
  };
  const backgroundStyle = {
    backgroundColor: "rgb(255, 255, 255)",
    backdropFilter: "blur(8px)",
    //backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    color: "white",
  };

  return (
    <div className="d-flex vh-100% overflow-hidden" style={{ height: "100%" }}>
      <AdminNavbar />
      <div style={backgroundStyle} className="flex-grow-1 p-4">
        {/* Header: Search + Time + Notifications + Profile */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by Student Number, Surname or initials"
            style={{ borderRadius: "20px" }}
          />
          <div className="d-flex align-items-center gap-3">
            <span style={{ color: "black" }}>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
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
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Profile"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => setShowProfileModal(true)}
            />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-blue" style={{ color: "black" }}>
          <strong>Admin Dashboard</strong>
        </h1>
        <p className="text-light" style={{ color: "black" }}>
          <i style={{ color: "black" }}>Welcome,</i>{" "}
          <strong style={{ color: "black" }}>
            {adminInfo.initails}. {adminInfo.surname}.
          </strong>
        </p>

        {/* Dashboard Summary Section */}
        <DashboardSummary
          totalDevices={totalDevices}
          allocatedDevices={allocatedDevices}
          totalApplicants={totalApplicants}
          approvedApplicants={approvedApplicants}
          unapprovedApplicants={unapprovedApplicants}
          monthlyApplicants={monthlyApplicants}
        />
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <ProfileModal
            adminInfo={adminInfo}
            setAdminInfo={setAdminInfo}
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

export default Dashboard;
