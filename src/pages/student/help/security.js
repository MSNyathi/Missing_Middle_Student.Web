import React from 'react';
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from 'framer-motion';
import './security.css'; // Make sure to create this file

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

const Security = () => {
  return (
    <div className="security-container">
      <motion.div
        className="content-box"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="title" variants={itemVariants}>
          Laptop Security Guidelines
        </motion.h1>

        <motion.p className="description" variants={itemVariants}>
          Students who receive laptops under the “Missing Middle” initiative are responsible for keeping their devices safe and secure. Below are recommended security practices:
        </motion.p>

        <motion.h4 className="subtitle" variants={itemVariants}>🔐 Physical Security</motion.h4>
        <motion.ul className="list" variants={itemVariants}>
          <li>Always store your laptop in a safe place when not in use.</li>
          <li>Do not leave the device unattended in public spaces or classrooms.</li>
          <li>Use a laptop lock if working in shared spaces like the library or labs.</li>
          <li>Keep the laptop away from water, heat, and rough handling.</li>
        </motion.ul>

        <motion.h4 className="subtitle" variants={itemVariants}>💻 Digital Security</motion.h4>
        <motion.ul className="list" variants={itemVariants}>
          <li>Set up a strong password to protect your user account.</li>
          <li>Do not share your password with others, even classmates or friends.</li>
          <li>Enable automatic screen lock when your device is idle.</li>
          <li>Keep your operating system and antivirus software updated.</li>
          <li>Use official university platforms (e.g. myTUTor, MS Teams) only.</li>
        </motion.ul>

        <motion.h4 className="subtitle" variants={itemVariants}>📢 Reporting Theft or Loss</motion.h4>
        <motion.p className="description" variants={itemVariants}>
          If your device is lost or stolen:
        </motion.p>
        <motion.ul className="list" variants={itemVariants}>
          <li>Report it immediately to <strong>Campus Security</strong>.</li>
          <li>Contact the <strong>ICT Faculty Office</strong> and <strong>Financial Aid Office</strong>.</li>
          <li>Provide a case number if reported to the police.</li>
        </motion.ul>

        <motion.p className="italic" variants={itemVariants}>
          Note: The university is not responsible for replacing lost, stolen, or damaged laptops. Handle the device with care.
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

export default Security;
