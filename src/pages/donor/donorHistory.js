import React, { useState, useEffect } from "react";
import DonorNavbar from "./donorNavbar";
import "./DonorHistory.css";

export default function DonorHistory() {
  const [donorData, setDonorData] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  
  useEffect(() => {
    const storedData = localStorage.getItem("donorData");
    if (storedData) {
      setDonorData(JSON.parse(storedData));
    }
  }, []);

  if (!donorData) {
    return <p>Loading dashboard...</p>;
  }

  const { donations = [] } = donorData;

  const handleRowClick = (donations) => {
    setSelectedDonation(donations);
  };

  const closeModal = () => {
    setSelectedDonation(null);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const handleSort = () => {
    setSortAsc(!sortAsc);
  };

  const filteredData = donations
    .filter((item) => !filterStatus || item.status === filterStatus)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

  const statusColors = {
    Pending: "status-pending",
    Received: "status-received",
    "Not Accepted": "status-notaccepted",
  };

  return (
    <div className="container">
      <DonorNavbar />
      <main className="main-content">
        <h2 style={{paddingLeft:"0"}}>
          <b>DONATION HISTORY</b>
        </h2>
        <div className="header-controls" style={{marginLeft: "83%"}}>
          <div className="controls">
            <select onChange={(e) => handleFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Accepted">Accepted</option>
              <option value="Pending">Pending</option>
              <option value="Not Accepted">Not Accepted</option>
            </select>
            <button onClick={handleSort}>
              Sort by Date {sortAsc ? "▲" : "▼"}
            </button>
          </div>
        </div>

        <table className="donation-table">
          <thead>
            <tr>
              <th>Donation ID</th>
              <th>Pick-up</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(item)}
                className="clickable-row"
              >
                <td>{item.donationId}</td>
                <td>{item.pickupDate}</td>
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
              </tr>
            ))}
          </tbody>
        </table>

        {selectedDonation && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>
                ×
              </button>
              <h3>Donation Details</h3>
              <p>
                <strong>Donation ID:</strong> {selectedDonation.donationId}
              </p>
              <p>
                <strong>Creation Date:</strong> {selectedDonation.createdAt}
              </p>
              <p>
                <strong>Pick-up Date:</strong> {selectedDonation.pickupDate}
              </p>
              <p>
                <strong>Number of Devices:</strong>{" "}
                {selectedDonation.numberOfDevices}
              </p>
              <p>
                <strong>Status:</strong> {selectedDonation.status}
              </p>
              <p>
                <strong>Notes:</strong> {selectedDonation.notes}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
