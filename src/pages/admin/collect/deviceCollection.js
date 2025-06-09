import React, { useState } from "react";
import AdminNavbar from "../../../commponents/adminNavbar";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./collectionSummary.css"; // Import custom CSS for sidenav summary

const DeviceCollectionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [contractFilter, setContractFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const [auditLogs, setAuditLogs] = useState([]);

  const [students, setStudents] = useState([
    {
      surname: "Smith",
      studentNumber: "1122324",
      device: "Apple MacBook",
      serialNumber: "MAC-SN-001",
      collectionDate: null,
      contractSigned: false,
      present: false,
      enteredId: "",
      idNumber: "1122324",
    },
    {
      surname: "Madigoe",
      studentNumber: "219982623",
      device: "Dell XPS 13",
      serialNumber: "DELL-SN-002",
      collectionDate: null,
      contractSigned: true,
      present: false,
      enteredId: "",
      idNumber: "219982623",
    },
  ]);

  const handlePresenceChange = (index, isChecked) => {
    const updated = [...students];
    updated[index].present = isChecked;
    updated[index].enteredId = "";
    setStudents(updated);
  };

  const handleIdInputChange = (index, value) => {
    const updated = [...students];
    updated[index].enteredId = value;
    setStudents(updated);
  };

  const markAsCollected = (index) => {
    const updated = [...students];
    const student = updated[index];

    if (student.enteredId !== student.idNumber) {
      toast.error("ID number does not match our records.");
      return;
    }

    if (!student.contractSigned) {
      toast.error("Contract not signed. Cannot collect device.");
      return;
    }

    if (
      window.confirm(
        `Confirm device collection for ${student.surname} (${student.studentNumber})?`
      )
    ) {
      const timestamp = new Date().toLocaleString();
      updated[index].collectionDate = timestamp;
      setStudents(updated);

      const newLog = {
        action: "Marked as collected",
        student: student.studentNumber,
        device: student.device,
        serial: student.serialNumber,
        timestamp,
      };

      setAuditLogs((prev) => [...prev, newLog]);
      console.log("Audit Log:", newLog);

      toast.success("Device marked as collected.");
    }
  };

const filteredStudents = students
  .filter(
    (s) =>
      s.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentNumber.includes(searchTerm)
  )
  .filter((s) => {
    if (collectionFilter === "collected") return s.collectionDate;
    if (collectionFilter === "not_collected") return !s.collectionDate;
    return true;
  })
  .filter((s) => {
    if (contractFilter === "signed") return s.contractSigned;
    if (contractFilter === "not_signed") return !s.contractSigned;
    return true;
  });


  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const exportToCSV = (data, filename) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Surname,Student Number,Email,Device,Serial Number,Collection Date"]
        .concat(
          data.map((s) =>
            [
              s.surname,
              s.studentNumber,
              s.email,
              s.device,
              s.serialNumber || "N/A",
              s.collectionDate || "Not Collected",
            ].join(",")
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = (data, filename) => {
    const doc = new jsPDF();
    const tableData = data.map((s) => [
      s.surname,
      s.studentNumber,
      s.email,
      s.device,
      s.serialNumber || "N/A",
      s.collectionDate || "Not Collected",
    ]);

    autoTable(doc, {
      head: [
        [
          "Surname",
          "Student Number",
          "Email",
          "Device",
          "Serial Number",
          "Collection Date",
        ],
      ],
      body: tableData,
    });

    doc.save(`${filename}.pdf`);
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "rgb(228, 235, 255)" }}
    >
      <AdminNavbar />
      {/* Hoverable Sidenav Summary */}
<div id="summarySidenav">
  <a id="collected">
    ✅ Collected:{" "}
    <strong>{students.filter((s) => s.collectionDate).length}</strong>
  </a>
  <a id="notCollected">
    ⏳ Not Collected:{" "}
    <strong>{students.filter((s) => !s.collectionDate).length}</strong>
  </a>
  <a id="collectedToday">
    📅 Today:{" "}
    <strong>
      {
        students.filter((s) => {
          if (!s.collectionDate) return false;
          const today = new Date().toLocaleDateString();
          return s.collectionDate.includes(today);
        }).length
      }
    </strong>
  </a>
</div>
      <div className="flex-grow-1 p-4">
        <h2 className="text-center mb-4 fw-bold text-dark">
          Device Collection 
        </h2>

        {/* Search & Filter */}
        <div className="d-flex flex-wrap gap-3 mb-3">
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: "300px" }}
            placeholder="Search by Surname or Student Number"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="form-select"
            style={{ maxWidth: "200px" }}
            value={collectionFilter}
            onChange={(e) => setCollectionFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="collected">Collected</option>
            <option value="not_collected">Not Collected</option>
          </select>
          <select
  className="form-select"
  style={{ maxWidth: "200px" }}
  value={contractFilter}
  onChange={(e) => setContractFilter(e.target.value)}
>
  <option value="all">All Contracts</option>
  <option value="signed">Signed Only</option>
  <option value="not_signed">Not Signed</option>
</select>

        </div>

        {/* Export Buttons */}
        <div className="d-flex flex-wrap gap-2 mb-3">        
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => exportToCSV(filteredStudents, "filtered_results")}
          >
            Export Filtered (CSV)
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => exportToPDF(filteredStudents, "filtered_results")}
          >
            Export Filtered (PDF)
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle"
          style={{ borderRadius: "15px", overflow: "hidden" }}>
            <thead className="table-light">
              <tr>
                <th>Surname</th>
                <th>Student Number</th>
               
                <th>Device</th>
                <th>Serial Number</th>
                <th>Collection Status</th>
                <th>Contract Signed</th>
                <th style={{ minWidth: "220px" }}>Confirm Collection</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student, index) => (
                  <tr key={startIndex + index}>
                    <td>{student.surname}</td>
                    <td>{student.studentNumber}</td>
                    <td>{student.device}</td>
                    <td>{student.serialNumber || "N/A"}</td>
                    <td>
                      {student.collectionDate ? (
                        <span className="badge bg-success">
                          ✓ Collected @ {student.collectionDate}
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      )}
                    </td>
                    <td>{student.contractSigned ? "Yes" : "No"}</td>
                    <td>
                      {!student.collectionDate ? (
                        student.contractSigned ? (
                          <>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`present-${startIndex + index}`}
                                onChange={(e) =>
                                  handlePresenceChange(
                                    startIndex + index,
                                    e.target.checked
                                  )
                                }
                                checked={student.present}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`present-${startIndex + index}`}
                              >
                                Student is present
                              </label>
                            </div>

                            {student.present && (
                              <div className="d-flex gap-2">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter student ID number"
                                  value={student.enteredId || ""}
                                  onChange={(e) =>
                                    handleIdInputChange(
                                      startIndex + index,
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() =>
                                    markAsCollected(startIndex + index)
                                  }
                                  disabled={
                                    student.enteredId !== student.idNumber
                                  }
                                >
                                  Mark as Collected
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-danger fw-bold">
                            Contract Not Signed
                          </span>
                        )
                      ) : (
                        <span className="text-success fw-bold">✓ Collected</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-secondary btn-sm me-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm me-1 ${
                  currentPage === i + 1
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-secondary btn-sm ms-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
        <ToastContainer position="top-center" autoClose={4000} />
      </div>
    </div>
  );
};

export default DeviceCollectionPage;
