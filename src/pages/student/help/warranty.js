import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import "./warranty.css"; // Ensure this path is correct
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Warranty = () => {
  return (
    <div className="warranty-container">
      <motion.div
        className="content-box"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="title" variants={itemVariants}>
          Warranty and Repairs
        </motion.h1>
        <motion.p className="description" variants={itemVariants}>
          The refurbished laptops provided under the “Missing Middle” initiative
          come with <strong>no formal warranty</strong>. Students are expected
          to take full responsibility for the care and maintenance of the device
          once it is issued.
        </motion.p>
        <motion.h4 className="subtitle" variants={itemVariants}>
          🧾 Important Warranty Information
        </motion.h4>
        <motion.ul className="list" variants={itemVariants}>
          <li>
            The university does{" "}
            <strong>not offer repairs, replacements, or upgrades</strong> after
            distribution.
          </li>
          <li>
            Each student signs an agreement acknowledging that the device is
            issued <strong>“as-is”</strong>.
          </li>
          <li>
            If the laptop is lost, stolen, or damaged, it{" "}
            <strong>will not be replaced</strong> by the university.
          </li>
        </motion.ul>

        <motion.h4 className="subtitle" variants={itemVariants}>
          🛠️ Maintenance Tips
        </motion.h4>

        <motion.ul className="list" variants={itemVariants}>
          <li>Keep the device clean and away from food or liquids.</li>
          <li>Ensure software updates are performed regularly to maintain performance.</li>
          <li>Back up your important work using cloud storage (e.g., OneDrive provided by TUT).</li>
          <li>If technical issues arise, consult with the ICT support team for general troubleshooting advice.</li>
        </motion.ul>

        <motion.h4 className="subtitle" variants={itemVariants}>
          📍 Where to Get Help
        </motion.h4>

        <motion.p className="paragraph" variants={itemVariants}>
          While there is no official warranty, students may visit their campus
          ICT Faculty Office for guidance on basic troubleshooting or referrals
          to external service providers.
        </motion.p>

        <p className="italic text-sm text-gray-600">
          Reminder: All devices are donated to assist students and must be used
          responsibly for academic purposes only.
        </p>
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

export default Warranty;
