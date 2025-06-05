import React from 'react';
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


const Security = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-3">Laptop Security Guidelines</h1>

      <p className="mb-3">
        Students who receive laptops under the “Missing Middle” initiative are responsible for keeping their devices safe and secure. Below are recommended security practices:
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🔐 Physical Security</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-800 mb-6">
        <li>Always store your laptop in a safe place when not in use.</li>
        <li>Do not leave the device unattended in public spaces or classrooms.</li>
        <li>Use a laptop lock if working in shared spaces like the library or labs.</li>
        <li>Keep the laptop away from water, heat, and rough handling.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">💻 Digital Security</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-800 mb-6">
        <li>Set up a strong password to protect your user account.</li>
        <li>Do not share your password with others, even classmates or friends.</li>
        <li>Enable automatic screen lock when your device is idle.</li>
        <li>Keep your operating system and antivirus software updated.</li>
        <li>Use official university platforms (e.g. myTUTor, MS Teams) only.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">📢 Reporting Theft or Loss</h2>
      <p className="mb-2">
        If your device is lost or stolen:
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-800 mb-3">
        <li>Report it immediately to <strong>Campus Security</strong>.</li>
        <li>Contact the <strong>ICT Faculty Office</strong> and <strong>Financial Aid Office</strong>.</li>
        <li>Provide a case number if reported to the police.</li>
      </ul>

      <p className="italic text-sm text-gray-600">
        Note: The university is not responsible for replacing lost, stolen, or damaged laptops. Handle the device with care.
      </p>
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

export default Security;
