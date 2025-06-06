import React, { useState } from "react";
import AdminNavbar from "../../../commponents/adminNavbar";

const DeviceCollectionPage = () => {
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
      idNumber: "1122324", // Added idNumber for validation
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
      idNumber: "219982623", // Added idNumber for validation
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

  return (
    
    
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: "rgb(228, 235, 255)" }}>

<AdminNavbar />
    <div className="flex-grow-1 p-4">
    
      <h2 className="text-center mb-4 fw-bold text-dark">Device Collection Page</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle" style={{ borderRadius: "15px", overflow: "hidden" }}>
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
            {students.map((student, index) => (
              <tr key={index}>
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
                          id={`present-${index}`}
                          onChange={(e) =>
                            handlePresenceChange(index, e.target.checked)
                          }
                          checked={student.present}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`present-${index}`}
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
                              handleIdInputChange(index, e.target.value)
                            }
                          />
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => markAsCollected(index)}
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
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default DeviceCollectionPage;
