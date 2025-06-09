import React, { useEffect, useState } from "react";
import AdminNavbar from '../../../../commponents/adminNavbar';
import { FaLaptop, FaUserCheck, FaUserSlash } from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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
      if (allocationFilter) params.append("status", allocationFilter);
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

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["#", "Brand", "Model", "Serial Number", "Condition", "Status"];
    const tableRows = devices.map((device, index) => [
      (page - 1) * itemsPerPage + index + 1,
      device.brand,
      device.model,
      device.serialNumber || "N/A",
      device.condition,
      device.status,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("device_list.pdf");
  };

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: "rgb(228, 235, 255)" }}>
      <AdminNavbar />
      <div className="flex-grow-1 p-4">
        {/* Heading + Export */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0 text-dark fw-bold">📋 Devices</h2>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={exportToPDF}
            disabled={devices.length === 0}
          >
            Export to PDF
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded shadow-sm p-3 mb-3">
          <div className="row g-2 align-items-end">
            <div className="col-md-3">
              <label className="form-label fw-semibold mb-1">Search</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Brand, model, or serial number"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold mb-1">Allocation</label>
              <select
                className="form-select form-select-sm"
                value={allocationFilter}
                onChange={(e) => {
                  setAllocationFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All</option>
                <option value="allocated">Allocated</option>
                <option value="unallocated">Unallocated</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold mb-1">Condition</label>
              <select
                className="form-select form-select-sm"
                value={conditionFilter}
                onChange={(e) => {
                  setConditionFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All</option>
                <option value="Refurbished">Refurbished</option>
                <option value="New">New</option>
              </select>
            </div>

            <div className="col-md-3 d-grid">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleResetFilters}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Devices Table */}
        <div className="bg-white rounded shadow-sm p-3">
          {loading ? (
            <div className="text-center py-3">🔄 Loading devices...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : devices.length === 0 ? (
            <div className="text-center py-3">🚫 No devices found.</div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-bordered table-sm table-hover align-middle text-center mb-0"
                style={{ borderRadius: "15px", overflow: "hidden" }}>
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Brand</th>
                      <th>Model</th>
                      <th>Serial Number</th>
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
                        <td>{device.serialNumber || "N/A"}</td>
                        <td>{device.condition}</td>
                        <td >{device.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="text-muted small">
                  Page {page} of {totalPages}
                </span>
                <div>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                  >
                    ⬅️ Previous
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                  >
                    Next ➡️
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
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1040,
              }}
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
                  { /* <p>
                      <strong>Allocation:</strong>{" "}
                      {selectedDevice.status === "Distributed" ? (
                        <span className="text-success">
                          <FaUserCheck className="me-2" /> Allocated
                        </span>
                      ) : (
                        <span className="text-danger">
                          <FaUserSlash className="me-2" /> Not Allocated
                        </span>
                      )}
                    </p>*/}
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary btn-sm"
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
