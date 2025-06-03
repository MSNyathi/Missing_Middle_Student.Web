// StudentModal.js
import React from 'react';
import { motion } from 'framer-motion';

const StudentModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" onClick={onClose}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
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
            <h5 className="modal-title">Student Information</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body glass-body typing-text">
            <div className="row">
              <div className="col-md-6">
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <strong>Name:</strong> {student.surname}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <strong>Student #:</strong> {student.studentNumber}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <strong>Course:</strong> {student.course}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <strong>Email:</strong> {student.studentEmail}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <strong>Contact:</strong> {student.contact}
                </motion.p>
              </div>
              <div className="col-md-6">
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <strong>Faculty:</strong> {student.faculty}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <strong>Campus:</strong> {student.campus || 'Pretoria'}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <strong>NSFAS Status:</strong> {student.nsfasStatus ? 'Funded' : 'Unfunded'}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <strong>Year:</strong> {student.year}
                </motion.p>
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <strong>Ethnicity:</strong> {student.Ethnicity}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentModal;
