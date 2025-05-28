import React from "react";
import { Link } from "react-router-dom";

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
    </div>
  );
};

export default HelpPageLaptops;
