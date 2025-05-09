import React, { useState } from "react";
import AdminNavbar from '../../../../commponents/adminNavbar';
import {
  FaLaptop,
  FaCheckCircle,
  FaHourglassHalf,
  FaTools,
  FaUserCheck,
  FaUserSlash,
  FaCalendarAlt,
} from "react-icons/fa";
import backgroundImage from '../../../../assets/backgroundAdmin.jpeg';

export default function ViewDevices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [allocationFilter, setAllocationFilter] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices] = useState([
    {
      id: 1,
      name: "Dell Latitude 7490",
      model: "7490",
      serialNumber: "MS-U13kK",
      condition: "Good",
      status: "Distributed",
      dateAdded: "2024-12-05",
      allocated: true,
    },
    {
      id: 2,
      name: "HP EliteBook 840",
      model: "840 G5",
      serialNumber: "MK-UO3K",
      condition: "Good",
      status: "Ready for Distribution",
      dateAdded: "2025-01-10",
      allocated: false,
    },
  ]);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = `${device.name} ${device.serialNumber} ${device.model}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCondition = conditionFilter
      ? device.condition === conditionFilter
      : true;

    const matchesStatus = statusFilter
      ? (device.allocated ? "Distributed" : device.status) === statusFilter
      : true;

    const matchesAllocation =
      allocationFilter === ""
        ? true
        : allocationFilter === "Allocated"
        ? device.allocated
        : !device.allocated;

    return matchesSearch && matchesCondition && matchesStatus && matchesAllocation;
  });

  const statusBadge = (status) => {
    const base = "badge rounded-pill px-3 py-2 text-white text-sm";
    switch (status) {
      case "Repaired":
        return (
          <span className={`${base} bg-success`}>
            <FaCheckCircle className="me-1" /> Repaired
          </span>
        );
      case "In Progress":
        return (
          <span className={`${base} bg-warning`}>
            <FaHourglassHalf className="me-1" /> In Progress
          </span>
        );
      case "Pending":
        return (
          <span className={`${base} bg-secondary`}>
            <FaTools className="me-1" /> Pending
          </span>
        );
      case "Ready for Distribution":
        return (
          <span className={`${base} bg-info`}>
            <FaLaptop className="me-1" /> Ready
          </span>
        );
      case "Distributed":
        return (
          <span className={`${base} bg-dark`}>
            <FaLaptop className="me-1" /> Distributed
          </span>
        );
      default:
        return <span className={`${base} bg-light text-dark`}>{status}</span>;
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: 'white',
  }; 

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <AdminNavbar />

      <div style={backgroundStyle}  className="flex-grow-1 p-4">
        <h2 className="mb-4 text-white">View Devices</h2>

        {/* Search & Filters */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control mb-3 w-50"
            placeholder="Search by name, model, or serial number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="row g-3">
            <div className="col-md-4">
              <select
                className="form-select"
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
              >
                <option value="">All Conditions</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Needs Repair">Needs Repair</option>
                <option value="Broken">Broken</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Ready for Distribution">Ready for Distribution</option>
                <option value="Repaired">Repaired</option>
                <option value="Distributed">Distributed</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={allocationFilter}
                onChange={(e) => setAllocationFilter(e.target.value)}
              >
                <option value="">All Allocation Status</option>
                <option value="Allocated">Allocated</option>
                <option value="Unallocated">Unallocated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Device Table */}
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Condition</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <tr
                  key={device.id}
                  onClick={() => setSelectedDevice(device)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>{device.condition}</td>
                  <td>{device.allocated ? "Distributed" : device.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No matching devices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Device Modal */}
      {selectedDevice && (
        <>
          <div
            className="modal-backdrop-blur"
            onClick={() => setSelectedDevice(null)}
          />
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div
              className="modal-dialog animated-modal"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content shadow-lg">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <FaLaptop className="text-primary me-2" />
                    {selectedDevice.name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedDevice(null)}
                  />
                </div>

                <div className="modal-body">
                  <p>
                    <strong>Model:</strong> {selectedDevice.model}
                  </p>
                  <p>
                    <strong>Serial Number:</strong> {selectedDevice.serialNumber}
                  </p>
                  <p>
                    <strong>
                      <FaCalendarAlt className="me-2 text-muted" />
                      Date Added:
                    </strong>{" "}
                    {new Date(selectedDevice.dateAdded).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {statusBadge(
                      selectedDevice.allocated
                        ? "Distributed"
                        : selectedDevice.status
                    )}
                  </p>
                  <div className="mb-3">
                    <strong>Allocation:</strong>{" "}
                    {selectedDevice.allocated ? (
                      <span className="text-success d-block mt-1">
                        <FaUserCheck className="me-2" />
                        Allocated to <strong>Student John Doe</strong>
                        <br />
                        on <em>2024-12-15</em>
                      </span>
                    ) : (
                      <span className="text-danger d-block mt-1">
                        <FaUserSlash className="me-2" /> Not yet allocated
                      </span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Condition:</label>
                    <select
                      className="form-select"
                      value={selectedDevice.condition}
                      disabled={true}
                    >
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Needs Repair">Needs Repair</option>
                      <option value="Broken">Broken</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label fw-semibold">Status:</label>
                    <select
                      className="form-select"
                      value={
                        selectedDevice.allocated
                          ? "Distributed"
                          : selectedDevice.status
                      }
                      disabled={true}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Ready for Distribution">Ready for Distribution</option>
                      <option value="Repaired">Repaired</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedDevice(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
