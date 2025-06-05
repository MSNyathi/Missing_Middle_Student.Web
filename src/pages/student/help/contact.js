import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./contact.css"; // Ensure this path is correct

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="max-w-3xl mx-auto p-6 text-content">
        <h1 className="text-3xl font-bold mb-3">Contact Us</h1>

        <p className="mb-2">
          For any inquiries or assistance regarding the Laptop Distribution
          Programme, feel free to reach out to us:
        </p>

        <div className="mb-6">
          <p>
            <strong>Email:</strong> helpdesk@tut.ac.za
          </p>
          <p>
            <strong>Phone:</strong> +27 123 456 7890
          </p>
          <p>
            <strong>Office Hours:</strong> Monday - Friday, 08:00 AM to 04:00 PM
          </p>
          <p>
            <strong>Office Location:</strong> Building 10, ICT Faculty Office,
            Soshanguve South Campus
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-3">Send Us a Message</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Your Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
        <Link
          to="/student/dashboard"
          className="btn btn-outline-secondary position-fixed bottom-0 start-0 m-4 d-flex align-items-center"
        >
          <FaArrowLeft className="me-2" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Contact;
