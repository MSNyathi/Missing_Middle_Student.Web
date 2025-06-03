import React from 'react';
import { motion } from 'framer-motion';
import './applicantModal.css'; 

const ApplicantModal = ({ applicant, onClose, onApprove, onReject }) => {
  return (
    <div className="modal show d-block modal-glass-overlay align-items-center justify-content-center" >
      <div className="modal-dialog modal-lg modal-dialog-centered">
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
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body px-4 py-3">
            <div className="row gy-3">
              <div className="col-md-6">
                {[["Name", applicant.name], ["Student #", applicant.studentNum], ["Course", applicant.courseName], ["Email", applicant.email], ["Contact", applicant.contact]].map(([label, value], idx) => (
                  <motion.p key={label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + idx * 0.1 }}>
                    <span className="text-muted">{label}:</span> <span className="fw-semibold text-black">{value}</span>
                  </motion.p>
                ))}
              </div>
              <div className="col-md-6">
                {[["Faculty", applicant.faculty], ["Campus", applicant.campus], ["NSFAS Status", applicant.nsfasStatus], ["Year", applicant.yearOfStudy], ["Ethnicity", applicant.ethnicity], ["Status", applicant.status]].map(([label, value], idx) => (
                  <motion.p key={label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + idx * 0.1 }}>
                    <span className="text-muted">{label}:</span> <span className="fw-semibold text-black">{value}</span>
                  </motion.p>
                ))}
              </div>
            </div>

            <motion.hr className="my-4" initial={{ opacity: 0, width: "0%" }} animate={{ opacity: 1, width: "100%" }} transition={{ delay: 0.6, duration: 0.5 }} />

            <motion.h5 className="text-primary fw-bold mb-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              Proof of Income
            </motion.h5>

            <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <a href={applicant.proofOfIncomeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={applicant.proofOfIncomeUrl || "/placeholder.svg"}
                  className="img-fluid rounded shadow proof-image border"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                  alt="Proof of Income"
                />
              </a>
            </motion.div>
          </div>

          <div className="modal-footer border-0 d-flex justify-content-between px-4 pb-4 pt-2">
            <motion.button className="btn btn-outline-danger px-4 rounded-pill" onClick={onReject} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Reject
            </motion.button>
            <motion.button className="btn btn-outline-success px-4 rounded-pill" onClick={onApprove} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Approve
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicantModal;
