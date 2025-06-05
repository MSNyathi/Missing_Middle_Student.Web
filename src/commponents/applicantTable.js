import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TUT_LOGO_BASE64 from "../assets/tut.png";

const ApplicantsTable = ({ applicants, onRowClick }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(applicants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApplicants = applicants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Prepare columns for PDF export
  const pdfColumns = [
    "Student #",

    "Email",
    "Recommendation",
    "NSFAS",
    "Avg. Mark",
    "Status",
  ];

  // Helper: format applicant row for pdf
  const formatApplicantForPdf = (applicant) => [
    applicant.student_No,
    applicant.email,
    applicant.recommendation ? "Yes" : "No",
    applicant.nsfasStatus ? "Funded" : "Unfunded",
    `${applicant.avagerageMark}%`,
    applicant.applicationStatus
      ? applicant.applicationStatus.charAt(0).toUpperCase() +
        applicant.applicationStatus.slice(1)
      : "Pending",
  ];

  const exportPDF = (filteredApplicants, fileName) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "A4",
    });

    const rows = filteredApplicants.map(formatApplicantForPdf);

    const now = new Date();
    const dateStr = now.toLocaleString();

    autoTable(doc, {
      startY: 100,
      head: [pdfColumns],
      body: rows,
      styles: {
        fontSize: 8,
        cellPadding: 4,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [32, 74, 192],
        textColor: 255,
        halign: "center",
      },
      bodyStyles: {
        valign: "top",
      },
      margin: { top: 100, left: 40, right: 40, bottom: 60 },
      theme: "grid",

      didDrawPage: (data) => {
        // Logo
        if (TUT_LOGO_BASE64) {
          doc.addImage(TUT_LOGO_BASE64, "PNG", 40, 20, 60, 60); // x, y, width, height
        }

        // Title
        doc.setFontSize(16);
        doc.setTextColor(40);
        doc.text(
          "Tshwane University of Technology - Applicants Report",
          110,
          40
        );

        // Date
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on: ${dateStr}`, 110, 60);

        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text(
          `Page ${
            doc.internal.getCurrentPageInfo().pageNumber
          } of ${pageCount}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 20
        );
      },
    });

    doc.save(fileName);
  };
  const getStatusText = (status) => {
    if (status === true ) return "Approved";
    if (status === false ) return "Rejected";
    return "Pending";
  };

  const getStatusBadgeClass = (status) => {
    if (status === true || status === "approved") return "bg-success";
    if (status === false || status === "rejected") return "bg-danger";
    return "bg-warning";
  };

  return (
    <>
      {/* Export buttons */}
      <div className="mb-3 d-flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => exportPDF(applicants, "Applicants_All.pdf")}
        >
          Export All
        </button>
        <button
          className="btn btn-success"
          onClick={() =>
            exportPDF(
              applicants.filter((a) => a.eligible),
              "Applicants_Eligible.pdf"
            )
          }
        >
          Export Eligible Only
        </button>
        <button
          className="btn btn-danger"
          onClick={() =>
            exportPDF(
              applicants.filter((a) => !a.eligible),
              "Applicants_Not_Eligible.pdf"
            )
          }
        >
          Export Not Eligible Only
        </button>
      </div>

      <div className="w-100" style={{ overflowX: "auto" }}>
        <table
          className="table table-bordered table-hover text-center align-middle shadow-sm bg-white table-3d"
          style={{
            tableLayout: "fixed",
            width: "100%",
            wordWrap: "break-word",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Student #</th>
              <th>Email</th>
              <th>Recommendation</th>
              <th>Average Mark</th>
              <th>NSFAS</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentApplicants.map((applicant, index) => (
              <motion.tr
                key={applicant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td>{applicant.id}</td>
                <td>{applicant.student_No}</td>
                <td>{applicant.email}</td>
                <td>{applicant.recommendation ? "Yes" : "No"}</td>
                <td>{applicant.avagerageMark}%</td>
                <td>{applicant.nsfasStatus ? "Funded" : "Unfunded"}</td>
                <td>{new Date(applicant.applicationDate).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${getStatusBadgeClass(
                      applicant.applicationStatus
                    )}`}
                  >
                    {getStatusText(applicant.applicationStatus)}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm rounded-circle"
                    onClick={() => onRowClick(applicant)}
                  >
                    <FaEye />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
