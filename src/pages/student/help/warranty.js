import React from 'react';

const Warranty = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Warranty and Repairs</h1>

      <p className="mb-4">
        The refurbished laptops provided under the “Missing Middle” initiative come with <strong>no formal warranty</strong>. Students are expected to take full responsibility for the care and maintenance of the device once it is issued.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🧾 Important Warranty Information</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-800 mb-6">
        <li>The university does <strong>not offer repairs, replacements, or upgrades</strong> after distribution.</li>
        <li>Each student signs an agreement acknowledging that the device is issued <strong>“as-is”</strong>.</li>
        <li>If the laptop is lost, stolen, or damaged, it <strong>will not be replaced</strong> by the university.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🛠️ Maintenance Tips</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-800 mb-6">
        <li>Keep the device clean and away from food or liquids.</li>
        <li>Ensure software updates are performed regularly to maintain performance.</li>
        <li>Back up your important work using cloud storage (e.g., OneDrive provided by TUT).</li>
        <li>If technical issues arise, consult with the ICT support team for general troubleshooting advice.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">📍 Where to Get Help</h2>
      <p className="mb-4">
        While there is no official warranty, students may visit their campus ICT Faculty Office for guidance on basic troubleshooting or referrals to external service providers.
      </p>

      <p className="italic text-sm text-gray-600">
        Reminder: All devices are donated to assist students and must be used responsibly for academic purposes only.
      </p>
    </div>
  );
};

export default Warranty
