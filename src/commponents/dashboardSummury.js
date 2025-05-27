"use client";
import React from "react";
import { motion } from "framer-motion";
import "./dashboardSummary.css"; // Assuming you have a CSS file for styles

// Card Component
const StatCard = ({ title, value, color, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`card text-white bg-${color} mb-3 shadow`}
    style={{
      borderRadius: "15px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    }}
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

// Progress Bar
const ProgressBar = ({ label, value, max, color }) => {
  const percent = max ? (value / max) * 100 : 0;
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between">
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

// Circular Stat (Approval %, Allocation %)
const CircleStat = ({ label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="text-center text-white"
  >
    <div
      className="mx-auto mb-2 text-black"
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
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {value}%
    </div>
    <span className="text-primary">{label}</span>
  </motion.div>
);

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

  const totalMonthly = Array.isArray(monthlyApplicants)
    ? monthlyApplicants.reduce((a, b) => a + b, 0)
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

  return (
    <div className="container-fluid py-4">
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
              color="blue"
            />
            <ProgressBar
              label="Unapproved Applicants"
              value={unapprovedApplicants}
              max={totalApplicants}
              color="warning"
            />
            <CircleStat
              label="Approval Rate"
              value={approvedRate}
              color="red"
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
              color="warning"
            />
            <CircleStat
              label="Allocation Rate"
              value={allocatedRate}
              color="blue"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="glass-panel p-3"
    style={{ minHeight: "280px" }}
  >
    <h5 className="text-center text-black mb-3">
      <strong>Monthly Applicant Trend</strong>
    </h5>

    <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
      {monthlyApplicants.map((count, i) => (
        <motion.div
          key={i}
          className="text-center month-box"
          whileHover={{ scale: 1.1 }}
        >
          <span className="tooltip-text">
            {months[i]}: {count} applicants
          </span>
          <div className="bg-dark rounded py-1 px-2" style={{ width: "70px" }}>
            <div className="fw-bold small text-light">{months[i] || `M${i + 1}`}</div>
            <div className="fs-6 text-warning">{count}</div>
          </div>
        </motion.div>
      ))}
    </div>

    
  </motion.div>
</div>

    </div>
  );
};

export default DashboardSummary;
