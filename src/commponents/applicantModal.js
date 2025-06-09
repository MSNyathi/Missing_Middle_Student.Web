import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./applicantModal.css";

function b64toBlob(base64, mimeType) {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
}

const ApplicantModal = ({ applicant, onClose, onApprove, onReject }) => {
  const [status, setStatus] = useState(applicant.applicationStatus);

  const isPending =
    status === null ||
    status === "pending" ||
    status === undefined ||
    status === "";

  const getStatusLabel = () => {
    if (status === true || status === "approved") return "Approved";
    if (status === false || status === "rejected") return "Rejected";
    return "Pending";
  };

  const renderBlobView = (url, mime) => {
    if (mime === "application/pdf") {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary"
        >
          View Income Proof (PDF)
        </a>
      );
    }

    if (mime.startsWith("image/")) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={url}
            alt="Proof of Income"
            className="img-fluid rounded shadow border"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </a>
      );
    }

    return <p className="text-muted">Unsupported base64 file format.</p>;
  };

  const renderIncomeProof = () => {
    const incomeFile = applicant.income;

    if (!incomeFile) {
      return <p className="text-muted">No proof of income provided.</p>;
    }

    // Check if it's a full data URL
    const isFullDataUrl = /^data:.*;base64,/.test(incomeFile);

    if (isFullDataUrl) {
      const mime = incomeFile.substring(5, incomeFile.indexOf(";"));
      const blob = b64toBlob(incomeFile.split(",")[1], mime);
      const blobUrl = URL.createObjectURL(blob);

      return renderBlobView(blobUrl, mime);
    }

    // If it's a raw base64 string (no data URL prefix), treat it as a PDF
    const isRawBase64 =
      /^[A-Za-z0-9+/=]+\s*$/.test(incomeFile) && incomeFile.length > 100;

    if (isRawBase64) {
      const assumedMime = "application/pdf"; // or "image/png" if it could be images
      const blob = b64toBlob(incomeFile, assumedMime);
      const blobUrl = URL.createObjectURL(blob);

      return renderBlobView(blobUrl, assumedMime);
    }

    // Otherwise maybe it's a URL
    const lowerUrl = incomeFile.toLowerCase();
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(lowerUrl);
    const isPDF = /\.pdf$/i.test(lowerUrl);

    if (isImage) {
      return renderBlobView(incomeFile, "image/*");
    }

    if (isPDF) {
      return renderBlobView(incomeFile, "application/pdf");
    }

    return <p className="text-muted">Unsupported file format.</p>;
  };

  return (
    <div
      className="modal show d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1050,
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <motion.div
          className="modal-content modal-glass shadow-lg rounded-4 border-0"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.4,
          }}
        >
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold text-primary-emphasis">
              Applicant Information
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body px-4 py-3">
            <div className="row gy-3">
              <div className="col-md-6">
                {[
                  ["Student #", applicant.student_No],
                  ["Email", applicant.email],
                  ["Status", getStatusLabel()],
                  ["Recommendation", applicant.recommendation ? "Yes" : "No"],
                  [
                    "Application Date",
                    new Date(applicant.applicationDate).toLocaleString(),
                  ],
                ].map(([label, value], idx) => (
                  <motion.p
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <span className="text-muted">{label}:</span>{" "}
                    <span className="fw-semibold text-black">{value}</span>
                  </motion.p>
                ))}
              </div>

              <div className="col-md-6">
                {[
                  [
                    "NSFAS Status",
                    applicant.nsfasStatus ? "Funded" : "Unfunded",
                  ],
                  ["Average Mark (%)", applicant.avagerageMark],
                ].map(([label, value], idx) => (
                  <motion.p
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <span className="text-muted">{label}:</span>{" "}
                    <span className="fw-semibold text-black">{value}</span>
                  </motion.p>
                ))}
              </div>
            </div>

            <motion.hr
              className="my-4"
              initial={{ opacity: 0, width: "0%" }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />

            <motion.h5
              className="text-primary fw-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Proof of Income
            </motion.h5>

            <motion.div
              className="text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              {renderIncomeProof()}
            </motion.div>
          </div>

          <div className="modal-footer border-0 d-flex justify-content-between px-4 pb-4 pt-2">
            <motion.button
              className="btn btn-outline-danger px-4 rounded-pill"
              onClick={() => onReject(applicant)}
              disabled={!isPending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reject
            </motion.button>

            <motion.button
              className="btn btn-outline-success px-4 rounded-pill"
              onClick={() => onApprove(applicant)}
              disabled={!isPending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Approve
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicantModal;
