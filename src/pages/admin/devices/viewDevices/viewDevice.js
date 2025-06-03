import React, { useEffect, useState } from "react";
import AdminNavbar from '../../../../commponents/adminNavbar';
import { FaLaptop, FaUserCheck, FaUserSlash } from "react-icons/fa";

export default function ViewDevices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [allocationFilter, setAllocationFilter] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

 


  const fetchDevices = async () => {
    setLoading(true);
    setError("");
  
    try {
      const params = new URLSearchParams();
  
      if (searchTerm) params.append("search", searchTerm);
  
      if (allocationFilter) {
        params.append("status", allocationFilter);  // directly pass allocated/unallocated
      }
  
      if (conditionFilter) params.append("condition", conditionFilter);
  
      params.append("page", page);
      params.append("pageSize", itemsPerPage);
  
      const baseUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${baseUrl}AllDevices?${params.toString()}`);
  
      if (!response.ok) throw new Error("Failed to fetch devices");
  
      const data = await response.json();
  
      setDevices(data.devices || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Could not load devices. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchDevices();
  }, [searchTerm, conditionFilter, statusFilter, allocationFilter, page]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setConditionFilter("");
    setStatusFilter("");
    setAllocationFilter("");
    setPage(1);
  };

  return (
    <div className="d-flex  min-vh-100" style={{ backgroundColor: "rgb(228, 235, 255)" }}>
      <AdminNavbar />
      <div className="flex-grow-1 p-4">
        <h2 className="text-center mb-4 text-dark">View Devices</h2>

        {/* Filters */}
        <div className="bg-white rounded shadow-sm p-4 mb-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by brand, model, or serial number..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />

          <div className="row g-3">
            <div className="col-md-4">
              <select
                className="form-select"
                value={allocationFilter}
                onChange={(e) => {
                  setAllocationFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Allocation Status</option>
                <option value="allocated">Allocated</option>
                <option value="unallocated">Unallocated</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={conditionFilter}
                onChange={(e) => {
                  setConditionFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Conditions</option>
                <option value="Refurbished">Refurbished</option>
                <option value="New">New</option>
              </select>
            </div>
          </div>

          <button className="btn btn-outline-primary btn-sm mt-3" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>
       
        {/* Devices Table */}
        <div className="bg-white rounded shadow-sm p-3">
          {loading ? (
            <div>Loading devices...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : devices.length === 0 ? (
            <div>No devices found.</div>
          ) : (
            <>
              <table className="table table-striped shadow bg-white table-hover"
                    style={{ borderRadius: "15px", overflow: "hidden" }}>
                <thead className="table-primary text-center">
                  <tr>
                    <th>#</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Condition</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device, index) => (
                    <tr
                      key={index}
                      onClick={() => setSelectedDevice(device)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{(page - 1) * itemsPerPage + index + 1}</td>
                      <td>{device.brand}</td>
                      <td>{device.model}</td>
                      <td>{device.condition}</td>
                      <td>{device.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

               {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>Page {page} of {totalPages}</span>
              <div>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
            </>
          )}
        </div>

        {/* Modal */}
        {selectedDevice && (
            <>
            <div
              className="modal-backdrop fade show"
              onClick={() => setSelectedDevice(null)}
              style={{ backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1040 }}
            />
            <div className="modal show d-block" style={{ zIndex: 1050 }}>
              <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content shadow">
                  <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title">
                      <FaLaptop className="me-2" />
                      {`${selectedDevice.brand} ${selectedDevice.model}`}
                    </h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setSelectedDevice(null)}
                    />
                  </div>
                  <div className="modal-body">
                    <p><strong>Serial Number:</strong> {selectedDevice.serialNumber || "N/A"}</p>
                    <p><strong>Condition:</strong> {selectedDevice.condition}</p>
                    <p><strong>Status:</strong> {selectedDevice.status}</p>
                    <p><strong>Allocation:</strong>{" "}
                      {selectedDevice.status === "Distributed" ? (
                        <span className="text-success"><FaUserCheck className="me-2" /> Allocated</span>
                      ) : (
                        <span className="text-danger"><FaUserSlash className="me-2" /> Not Allocated</span>
                      )}
                    </p>
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
    </div>
  );
}
