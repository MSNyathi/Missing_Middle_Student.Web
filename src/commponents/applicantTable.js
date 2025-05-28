import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ApplicantsTable = ({ applicants, onRowClick }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(applicants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApplicants = applicants.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle shadow-sm bg-white rounded table-3d">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Student #</th>
              <th>Initials</th>
              <th>Name</th>
              <th>Course</th>
              <th>Faculty</th>
              <th>Campus</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Nationality</th>
              <th>NSFAS</th>
              <th>Year</th>
              <th>Ethnicity</th>
              <th>Avg. Mark</th>
              <th>Eligibility</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentApplicants.map((applicant, index) => (
              <motion.tr
                key={applicant.id}
                onClick={() => onRowClick(applicant)}
                style={{ cursor: "pointer" }}
                whileHover={{
                  backgroundColor: "rgba(240, 240, 240, 0.9)",
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
              >
                <td>{startIndex + index + 1}</td>
                <td>{applicant.studentNum}</td>
                <td>{applicant.initials}</td>
                <td>{applicant.name}</td>
                <td>{applicant.courseName}</td>
                <td>{applicant.faculty}</td>
                <td>{applicant.campus}</td>
                <td>{applicant.email}</td>
                <td>{applicant.contact}</td>
                <td>{applicant.nationality}</td>
                <td>{applicant.nsfasStatus}</td>
                <td>{applicant.yearOfStudy}</td>
                <td>{applicant.ethnicity}</td>
                <td>{applicant.averageMark}%</td>
                <td>
                  <span className={`badge ${applicant.eligible ? "bg-success" : "bg-danger"} eligibility-badge`}>
                    {applicant.eligible ? "Eligible" : "Not Eligible"}
                  </span>
                </td>
                <td>
                  <span className={`badge ${
                    applicant.status === "approved"
                      ? "bg-success"
                      : applicant.status === "rejected"
                      ? "bg-danger"
                      : "bg-warning"
                  } status-badge`}>
                    {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          &laquo; Previous
        </button>
        <span className="text-muted">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </button>
      </div>
    </>
  );
};

export default ApplicantsTable;
