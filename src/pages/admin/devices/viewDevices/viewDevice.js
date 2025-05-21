import React, { useEffect, useState } from "react";
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
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    if (adminData?.data?.allDevicesInfo) {
      setDevices(adminData.data.allDevicesInfo);
    }
  }, []);

  const filteredDevices = devices.filter((device) => {
    const searchTarget = `${device.brand} ${device.serialNumber} ${device.model}`.toLowerCase();
    const matchesSearch = searchTarget.includes(searchTerm.toLowerCase());
    const matchesCondition = conditionFilter ? device.condition === conditionFilter : true;
    const matchesStatus = statusFilter ? device.status === statusFilter : true;
    const matchesAllocation =
      allocationFilter === ""
        ? true
        : allocationFilter === "Allocated"
        ? device.status === "Distributed"
        : device.status !== "Distributed";

    return matchesSearch && matchesCondition && matchesStatus && matchesAllocation;
  });

  const statusBadge = (status) => {
    const base = "badge rounded-pill px-3 py-2 text-white text-sm";
    switch (status) {
      case "Repaired":
        return <span className={`${base} bg-success`}><FaCheckCircle className="me-1" /> Repaired</span>;
      case "In Progress":
        return <span className={`${base} bg-warning`}><FaHourglassHalf className="me-1" /> In Progress</span>;
      case "Pending":
        return <span className={`${base} bg-secondary`}><FaTools className="me-1" /> Pending</span>;
      case "Ready for Distribution":
        return <span className={`${base} bg-info`}><FaLaptop className="me-1" /> Ready</span>;
      case "Distributed":
        return <span className={`${base} bg-dark`}><FaLaptop className="me-1" /> Distributed</span>;
      default:
        return <span className={`${base} bg-light text-dark`}>{status}</span>;
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    color: 'white',
  };

  return (
    <div className="d-flex" style={backgroundStyle}>
      <AdminNavbar />

      <div className="flex-grow-1 p-4">
        <h2 className="mb-4 text-white">View Devices</h2>

        {/* Filters */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control mb-3 w-50"
            placeholder="Search by brand, model, or serial number..."
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

        {/* Table */}
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Condition</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedDevice(device)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>{device.brand}</td>
                  <td>{device.model}</td>
                  <td>{device.condition}</td>
                  <td>{device.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">No matching devices found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedDevice && (
        <>
          <div className="modal-backdrop-blur" onClick={() => setSelectedDevice(null)} />
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
                    {`${selectedDevice.brand} ${selectedDevice.model}`}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedDevice(null)}
                  />
                </div>

                <div className="modal-body">
                  <p><strong>Serial Number:</strong> {selectedDevice.serialNumber || "N/A"}</p>
                 
                  <div className="mb-3">
                    <strong>Allocation:</strong>{" "}
                    {selectedDevice.status === "Distributed" ? (
                      <span className="text-success d-block mt-1">
                        <FaUserCheck className="me-2" />
                        Allocated
                      </span>
                    ) : (
                      <span className="text-danger d-block mt-1">
                        <FaUserSlash className="me-2" /> Not allocated
                      </span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Condition:</label>
                    <input
                      className="form-control"
                      value={selectedDevice.condition}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="form-label fw-semibold">Status:</label>
                    <input
                      className="form-control"
                      value={selectedDevice.status}
                      readOnly
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedDevice(null)}>
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
