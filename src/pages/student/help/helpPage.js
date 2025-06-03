import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const HelpPageLaptops = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">💡 Help Center</h1>
      <p className="mb-6">Click on a topic below to learn more:</p>

      <nav className="space-y-4">
        <Link to="/student/help/about" className="text-blue-600 underline block">📌 What is this project about?</Link>
        <Link to="/student/help/eligible" className="text-blue-600 underline block">📝 Who is eligible?</Link>
        <Link to="/student/help/distribution" className="text-blue-600 underline block">🧮 How are laptops distributed?</Link>
        <Link to="/student/help/warranty" className="text-blue-600 underline block">🛠️ Is there any warranty or support?</Link>
        <Link to="/student/help/contact" className="text-blue-600 underline block">📍 Who do I contact if I have questions?</Link>
        <Link to="/student/help/security" className="text-blue-600 underline block">🔐 Security & Distribution Support</Link>
      </nav>
    <Link
        to="/student/dashboard"
        className="btn btn-outline-secondary position-fixed bottom-0 start-0 m-4 d-flex align-items-center"
      >
        <FaArrowLeft className="me-2" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default HelpPageLaptops;
