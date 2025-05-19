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
  const [notifications, setNotifications] = useState([]);
  const { connection, notify } = useNotification();
  const[connected,setConnected] = useState(false);
  setInterval(() => {
    if(connection.state === "Connected"){
      setConnected(true);
  }
}
  ,1000)
  connection.on("newNotification", (notifications) => {
    console.log("All notifications:", notifications);
    setNotifications(notifications);
  });
  useEffect(() => {
    const send_request = async () => {  
if(connection.state === "Connected"){
  console.log("sendinngS to SignalR");
 await connection.send("getNotifications")
  connection.on("newNotification", (notifications) => {
    console.log("All notifications:", notifications);
    setNotifications(notifications);
  });
}

}
send_request()
  },[connected]);

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
    setAdminInfo({
      surname: safeData.admin?.surname || "Admin",
      initials: safeData.admin?.initials || "",
      email: safeData.admin?.email || "",
      contact: safeData.admin?.contact || "",
    });

    setTotalDevices(safeData.device_Info?.Total_devices || 0);
    setAllocatedDevices(safeData.device_Info?.Allocated_devices || 0);
    setApprovedApplicants(safeData.applicants_Data?.Approved_Applicants || 0);
    setUnapprovedApplicants(
      safeData.applicants_Data?.Unapproved_Applicants || 0
    );
    setTotalApplicants(safeData.applicants_Data?.Total_Applicants || 0);
    setMonthlyApplicants(safeData.applicants_Montly_Data || Array(12).fill(0));
  }, []);

  const handleEmailChange = () => {
    const { currentPassword, newEmail } = formData;

    if (!currentPassword || !newEmail) {
      alert("Please fill in both fields.");
      return;
    }

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

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    color: "white",
  };

  const glassCardStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  };

  const hoverEffect = {
    whileHover: { scale: 1.03, boxShadow: "0 0 15px red" },
    transition: { type: "spring", stiffness: 300 },
  };

  const pulseLine = {
    animate: {
      opacity: [1, 0.5, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const applicantTrendData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Applicants per Month",
        data: monthlyApplicants,
        fill: false,
        borderColor: "#00ffff",
        backgroundColor: "#00ffff",
        tension: 0.4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#00ffff",
        pointHoverBackgroundColor: "#00ffff",
        pointHoverBorderColor: "#fff",
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3,
      },
    ],
  };

  const applicantTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#fff" }, position: "top" },
      title: {
        display: true,
        text: "Monthly Applicant Trend",
        color: "#fff",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#fff" },
        title: { display: true, text: "Applicants", color: "#fff" },
      },
      x: {
        ticks: { color: "#fff" },
        title: { display: true, text: "Month", color: "#fff" },
      },
    },
  };

  const eligibilityData = {
    labels: ["Approved", "Unapproved"],
    datasets: [
      {
        label: "Applicants",
        data: [approvedApplicants, unapprovedApplicants],
        backgroundColor: ["#28a745", "#dc3545"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const eligibilityOptions = {
    cutout: "60%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { color: "#fff" } },
      title: {
        display: true,
        text: "Eligibility Distribution",
        color: "#ffffff",
        font: { size: 16 },
      },
    },
  };

  const deviceChartData = {
    labels: ["Allocated", "Unallocated"],
    datasets: [
      {
        label: "Devices",
        data: [allocatedDevices, totalDevices - allocatedDevices],
        backgroundColor: ["#00d8ff", "#ffcd56"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const deviceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { color: "#fff" } },
      title: {
        display: true,
        text: "Laptop Allocation",
        color: "#fff",
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#fff" },
        title: { display: true, text: "Devices", color: "#fff" },
      },
      x: {
        ticks: { color: "#fff" },
        title: { display: true, text: "Category", color: "#fff" },
      },
    },
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <AdminNavbar />
      <div style={backgroundStyle} className="flex-grow-1 p-4 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by Student Number, Surname or initials"
            style={{ borderRadius: "20px" }}
          />
          <div className="d-flex align-items-center gap-3 text-white">
            <span>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <div className="position-relative d-inline-block">
              <i className="bi bi-bell fs-5"></i>
              {notifications.length > 0 && (
                <span className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              )}
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

        <h1 className="text-white">Admin Dashboard</h1>
        <p className="text-light">Welcome, {adminInfo.surname}!</p>

        <div className="row text-center mt-4">
          {[
            {
              title: "Total Devices",
              value: totalDevices,
              color: "primary",
            },
            {
              title: "Total Applicants",
              value: totalApplicants,
              color: "info",
            },
            {
              title: "Eligible Applicants",
              value: approvedApplicants,
              color: "success",
            },
          ].map((stat, idx) => (
            <div className="col-md-4 mb-3" key={idx}>
              <motion.div
                {...hoverEffect}
                className={`card bg-${stat.color} text-white`}
                style={glassCardStyle}
              >
                <div className="card-body">
                  <h5 className="card-title">{stat.title}</h5>
                  <p className="card-text fs-4">{stat.value}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 mb-4">
            <motion.div
              {...pulseLine}
              className="card p-3"
              style={{ height: "300px", ...glassCardStyle }}
            >
              <Line data={applicantTrendData} options={applicantTrendOptions} />
            </motion.div>
          </div>

          <div className="col-md-6 mb-3">
            <motion.div
              {...hoverEffect}
              className="card p-3"
              style={{ height: "300px", ...glassCardStyle }}
            >
              <h6 className="text-black">Eligibility Overview</h6>
              <div className="h-100">
                <Pie data={eligibilityData} options={eligibilityOptions} />
              </div>
            </motion.div>
          </div>

          <div className="col-md-6 mb-3">
            <motion.div
              {...hoverEffect}
              className="card p-3"
              style={{ height: "300px", ...glassCardStyle }}
            >
              <h6 className="text-black">Device Distribution</h6>
              <div className="h-100">
                <Bar data={deviceChartData} options={deviceOptions} />
              </div>
            </motion.div>
          </div>
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

export default Dashboard;
