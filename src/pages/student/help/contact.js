import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <motion.div
        className="content-box"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="title"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          For any inquiries or assistance regarding the Laptop Distribution
          Programme, feel free to reach out to us:
        </motion.p>

        <motion.div
          className="contact-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p><strong>Email:</strong> helpdesk@tut.ac.za</p>
          <p><strong>Phone:</strong> +27 123 456 7890</p>
          <p><strong>Office Hours:</strong> Monday - Friday, 08:00 AM to 04:00 PM</p>
          <p><strong>Office Location:</strong> Building 10, ICT Faculty Office, Soshanguve South Campus</p>
        </motion.div>

        <motion.h4
          className="subtitle"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          Send Us a Message
        </motion.h4>

        <motion.form
          className="contact-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <label>Your Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>

          <div>
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div>
            <label>Message</label>
            <textarea rows="4" placeholder="Type your message here..."></textarea>
          </div>

          <button type="submit">Submit</button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/student/dashboard"
            className="back-btn"
          >
            <FaArrowLeft className="me-2" />
            Back to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
