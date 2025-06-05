import React from 'react';
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from 'framer-motion';
import './distribution.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const Distribution = () => {
  return (
    <div className="distribution-container">
      <motion.div
        className="content-box"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="title" variants={itemVariants}>
          Laptop Distribution Process
        </motion.h1>

        <motion.p className="description" variants={itemVariants}>
          The refurbished laptops are distributed to qualifying students as part of the “Missing Middle” initiative...
        </motion.p>

        <motion.h4 className="subtitle" variants={itemVariants}>📦 Distribution Location</motion.h4>
        <motion.p className="description" variants={itemVariants}>
          All laptops are stored and distributed from the <strong>ICT Faculty</strong> on your respective campus.
        </motion.p>

        <motion.h4 className="subtitle" variants={itemVariants}>👥 Responsible Departments</motion.h4>
        <motion.ul variants={itemVariants}>
          <li>ICT Faculty</li>
          <li>Financial Aid Office (campus-specific)</li>
          <li>SAED (Student Affairs & External Development)</li>
          <li>Campus Security (for access control support)</li>
          <li>Assets Division (for device tracking and contracts)</li>
        </motion.ul>

        <motion.h4 className="subtitle" variants={itemVariants}>🛠 Distribution Committee</motion.h4>
        <motion.p className="description" variants={itemVariants}>
          A special committee is formed for each distribution round:
        </motion.p>
        <motion.ul variants={itemVariants}>
          <li>Verifying eligible students</li>
          <li>Contacting successful applicants</li>
          <li>Maintaining distribution registers</li>
          <li>Reporting progress and issues</li>
        </motion.ul>

        <motion.h4 className="subtitle" variants={itemVariants}>📋 Collection Procedure</motion.h4>
        <motion.ol variants={itemVariants}>
          <li>You’ll receive communication (via SMS or email) if selected.</li>
          <li>Report to your campus ICT office at the allocated time.</li>
          <li>Present student ID and sign the device agreement form.</li>
          <li>Receive the refurbished laptop.</li>
        </motion.ol>

        <motion.p className="italic" variants={itemVariants}>
          Note: Laptops are issued as-is with no guarantee for replacement if lost or damaged.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link to="/student/dashboard" className="back-btn">
            <FaArrowLeft className="me-2" />
            Back to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Distribution;
