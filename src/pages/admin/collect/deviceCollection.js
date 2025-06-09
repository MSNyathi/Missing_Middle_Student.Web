import React, { useState } from "react";
import AdminNavbar from "../../../commponents/adminNavbar";

const DeviceCollectionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const [students, setStudents] = useState([
    {
      surname: "Smith",
      studentNumber: "1122324",
      email: "example@ksff.com",
      device: "Apple MacBook",
      collectionDate: null,
      contractSigned: true,
      present: false,
      enteredId: "",
      idNumber: "1122324",
    },
    {
      surname: "Madigoe",
      studentNumber: "219982623",
      email: "madigoe@example.com",
      device: "Dell XPS 13",
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
      alert("ID number does not match our records.");
      return;
    }

    if (
      window.confirm(
        `Confirm device collection for ${student.surname} (${student.studentNumber})?`
      )
    ) {
      updated[index].collectionDate = new Date().toLocaleString();
      setStudents(updated);
    }
  };

  // Filter logic
  const filteredStudents = students.filter(
    (s) =>
      s.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentNumber.includes(searchTerm)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "rgb(228, 235, 255)" }}
    >
      <AdminNavbar />
      <div className="flex-grow-1 p-4">
        <h2 className="text-center mb-4 fw-bold text-dark">
          Device Collection Page
        </h2>

        {/* Search Bar */}
        <div className="flex-grow-1 mb-3" style={{ maxWidth: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Surname or Student Number"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 when searching
            }}
          />
        </div>

        <div className="table-responsive">
          <table
            className="table table-bordered table-hover align-middle"
            style={{ borderRadius: "15px", overflow: "hidden" }}
          >
            <thead className="table-light">
              <tr>
                <th>Surname</th>
                <th>Student Number</th>
                <th>Email</th>
                <th>Device</th>
                <th>Collection Date</th>
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
                    <td>{student.email}</td>
                    <td>{student.device}</td>
                    <td>{student.collectionDate || "Not Collected"}</td>
                    <td>{student.contractSigned ? "Yes" : "No"}</td>
                    <td>
                      {!student.collectionDate ? (
                        <>
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`present-${startIndex + index}`}
                              onChange={(e) =>
                                handlePresenceChange(startIndex + index, e.target.checked)
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
                                  handleIdInputChange(startIndex + index, e.target.value)
                                }
                              />
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => markAsCollected(startIndex + index)}
                                disabled={student.enteredId !== student.idNumber}
                              >
                                Mark as Collected
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-success fw-bold">✓ Collected</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
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
                  currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
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
      </div>
    </div>
  );
};

export default DeviceCollectionPage;
