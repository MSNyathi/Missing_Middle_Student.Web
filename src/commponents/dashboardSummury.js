"use client";
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "./dashboardSummary.css";

// --- Reusable Card Component ---
const StatCard = ({ title, value, color, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`card text-white bg-${color} mb-3 shadow stat-card`}
  >
    <div className="card-body d-flex align-items-center justify-content-between">
      <div>
        <h6 className="card-title">{title}</h6>
        <h4 className="fw-bold">{value}</h4>
      </div>
      <i className={`bi ${icon} fs-1`}></i>
    </div>
  </motion.div>
);

// --- Reusable Progress Bar Component ---
const ProgressBar = ({ label, value, max, color }) => {
  const percent = max ? (value / max) * 100 : 0;
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between mb-1">
        <span className="text-primary">{label}</span>
        <span className="text-primary">
          {value} / {max}
        </span>
      </div>
      <div className="progress" style={{ height: "10px" }}>
        <div
          className={`progress-bar bg-${color}`}
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

// --- Circular Stat Display ---
const CircleStat = ({ label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="text-center text-white"
  >
    <div
      className="mx-auto mb-2"
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        background: `conic-gradient(${color} ${value}%, #ccc ${value}% 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: "bold",
      }}
    >
      {value}%
    </div>
    <span className="text-primary">{label}</span>
  </motion.div>
);

// --- Dashboard Summary Component ---
const DashboardSummary = ({
  totalDevices,
  totalApplicants,
  approvedApplicants,
  unapprovedApplicants,
  allocatedDevices,
  monthlyApplicants,
}) => {
  const approvedRate = totalApplicants
    ? Math.round((approvedApplicants / totalApplicants) * 100)
    : 0;
  const allocatedRate = totalDevices
    ? Math.round((allocatedDevices / totalDevices) * 100)
    : 0;

  const months = [
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
  ];
 

  const getTotalMonthly = () =>
    Array.isArray(monthlyApplicants)
      ? monthlyApplicants.reduce((sum, item) => {
          if (typeof item === "number") return sum + item;
          if (item && typeof item === "object" && "count" in item)
            return sum + item.count;
          return sum;
        }, 0)
      : 0;
       
       console.log("monthlyApplicants:", monthlyApplicants);
   const totalMonthly = getTotalMonthly();
  const progressColor = (value) => (value > 0 ? "primary" : "warning");
 

  return (
    <div className="container-fluid py-4">
      {/* Stat Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <StatCard
            title="Total Devices"
            value={totalDevices}
            color="primary"
            icon="bi-laptop"
          />
        </div>
        <div className="col-md-4">
          <StatCard
            title="Total Applicants"
            value={totalApplicants}
            color="warning"
            icon="bi-people"
          />
        </div>
        <div className="col-md-4">
          <StatCard
            title="Approved Applicants"
            value={approvedApplicants}
            color="danger"
            icon="bi-check-circle"
          />
        </div>
      </div>

      {/* Eligibility & Distribution Panels */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="p-4 rounded glass-panel">
            <h5 className="mb-4 text-black">
              <strong>Applicant Eligibility</strong>
            </h5>
            <ProgressBar
              label="Approved Applicants"
              value={approvedApplicants}
              max={totalApplicants}
              color={progressColor(approvedApplicants)}
            />
            <ProgressBar
              label="Unapproved Applicants"
              value={unapprovedApplicants}
              max={totalApplicants}
              color={progressColor(unapprovedApplicants)}
            />
            <CircleStat
              label="Approval Rate"
              value={approvedRate}
              color="yellow"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-4 rounded glass-panel text-blue">
            <h5 className="mb-4 text-black">
              <strong>Laptop Distribution</strong>
            </h5>
            <ProgressBar
              label="Allocated Devices"
              value={allocatedDevices}
              max={totalDevices}
              color="blue"
            />
            <ProgressBar
              label="Unallocated Devices"
              value={totalDevices - allocatedDevices}
              max={totalDevices}
              color="blue"
            />
            <CircleStat
              label="Allocation Rate"
              value={allocatedRate}
              color="yellow"
            />
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      {/* Monthly Trend */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="glass-panel p-3 mt-4"
  style={{ minHeight: "280px" }}
>
  <h5 className="text-center text-black mb-3">
    <strong>Monthly Applicant Trend</strong>
  </h5>
  <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
    {Array.isArray(monthlyApplicants) && monthlyApplicants.map((count, i) => (
      <motion.div
        key={i}
        className="text-center month-box"
        whileHover={{ scale: 1.1 }}
        style={{ cursor: "pointer" }}
      >
        <div
          className="bg-dark rounded py-1 px-2"
          style={{ width: "70px", userSelect: "none" }}
        >
          <div className="fw-bold small text-light">{months[i]}</div>
          <div className="fs-6 text-warning">{count}</div>
        </div>
      </motion.div>
    ))}
  </div>
  {/* *<div className="text-center mt-3">
    <h5 className="text-black">
      <strong>Total Applicants This Year:</strong> {totalMonthly}
    </h5>
  </div> */}
</motion.div>

    </div>
  );
};

// --- PropTypes for clarity ---
DashboardSummary.propTypes = {
  totalDevices: PropTypes.number.isRequired,
  totalApplicants: PropTypes.number.isRequired,
  approvedApplicants: PropTypes.number.isRequired,
  unapprovedApplicants: PropTypes.number.isRequired,
  allocatedDevices: PropTypes.number.isRequired,
  monthlyApplicants: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.shape({ count: PropTypes.number })])
  ).isRequired, // <-- changed to object
};

export default DashboardSummary;
