"use client";

import React, { useState, useEffect, use } from "react";
import DonorNavbar from "./donorNavbar";
import "./donorDashboard.css";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function DonorDashboard() {

const [donorData, setDonorData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("donorData");
    if (storedData) {
      setDonorData(JSON.parse(storedData));
    }
  }, []);


  if (!donorData) {
    return <p>Loading dashboard...</p>;
  }

  const statusColors = {
    Pending: "status-pending",
    Received: "status-received",
    "Not Accepted": "status-notaccepted",
  };

   const { stats = {}, donations = [] } = donorData;

  return (
    <div className="dashboard-container">
      <DonorNavbar />

      <main className="main-content">
        <div className="main-header">
          <b>DONATOR DASHBOARD</b>
        </div>
        <div className="cards">
          <div className="custom-card">
            <div className="card-content">
              <p>Laptops Donated</p>
              <p className="count">{stats.laptopsDonated}</p>
            </div>
          </div>
          <div className="custom-card" style={{ backgroundColor: "#cfc52f" }}>
            <div className="card-content">
              <p>Pending Pickup</p>
              <p className="count">{stats.pendingPickup}</p>
            </div>
          </div>
          <div className="custom-card" style={{ backgroundColor: "#1dc78e" }}>
            <div className="card-content">
              <p>Received Laptops</p>
              <p className="count">{stats.receivedLaptop}</p>
            </div>
          </div>
        </div>

        <h2>DONATION HISTORY</h2>
        <table className="donation-table">
          <thead>
            <tr>
              <th>Donation ID</th>
              <th>Status</th>
              <th>Pick-up</th>
              <th>Number of devices</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((item, index) => (
              <tr key={index}>
                <td>{item.donationId}</td>
                <td>
                  <span
                    className={`status-badge ${
                      statusColors[item.status] || ""
                    }`}
                  >
                    {item.status === "Not Accepted"
                      ? "Not Accepted"
                      : item.status}
                  </span>
                </td>
                <td>{item.pickupDate}</td>
                <td>{item.numberOfDevices}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
