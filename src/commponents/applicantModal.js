// ApplicantModal.js


import React from 'react';
import { motion } from 'framer-motion';


const ApplicantModal = ({ applicant, onClose, onApprove, onReject }) => {
  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <motion.div
          className="modal-content glass-effect"
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
          <div className="modal-header glass-header">
            <h5 className="modal-title">Applicant Information</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body glass-body typing-text">
            <div className="row">
              <div className="col-md-6">
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <strong>Name:</strong> {applicant.name}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <strong>Student #:</strong> {applicant.studentNum}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <strong>Course:</strong> {applicant.courseName}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <strong>Email:</strong> {applicant.email}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <strong>Contact:</strong> {applicant.contact}
                </motion.p>
              </div>
              <div className="col-md-6">
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <strong>Faculty:</strong> {applicant.faculty}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <strong>Campus:</strong> {applicant.campus}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <strong>NSFAS Status:</strong> {applicant.nsfasStatus}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <strong>Year:</strong> {applicant.yearOfStudy}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <strong>Ethnicity:</strong> {applicant.ethnicity}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                  <strong>Status:</strong> {applicant.status}
                </motion.p>
              </div>
            </div>
            <motion.hr initial={{ opacity: 0, width: "0%" }} animate={{ opacity: 1, width: "100%" }} transition={{ delay: 0.6, duration: 0.5 }} />
            <motion.h5 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              Proof of Income
            </motion.h5>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <a href={applicant.proofOfIncomeUrl} target="_blank" rel="noopener noreferrer">
                <img src={applicant.proofOfIncomeUrl || "/placeholder.svg"} className="img-fluid rounded proof-image" style={{ maxHeight: "300px" }} alt="Proof of Income" />
              </a>
            </motion.div>
          </div>
          <div className="modal-footer glass-footer">
            <motion.button className="btn btn-danger btn-glass" onClick={onReject} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Reject
            </motion.button>
            <motion.button className="btn btn-success btn-glass" onClick={onApprove} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Approve
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


export default ApplicantModal;