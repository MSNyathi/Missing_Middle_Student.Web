import React from 'react';

const Distribution = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Laptop Distribution Process</h1>

      <p className="mb-4">
        The refurbished laptops are distributed to qualifying students as part of the “Missing Middle” initiative. The distribution is coordinated by several departments and follows a structured model to ensure fairness and efficiency.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">📦 Distribution Location</h2>
      <p className="mb-4">
        All laptops are stored and distributed from the <strong>ICT Faculty</strong> on your respective campus.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">👥 Responsible Departments</h2>
      <ul className="list-disc list-inside mb-4">
        <li>ICT Faculty</li>
        <li>Financial Aid Office (campus-specific)</li>
        <li>SAED (Student Affairs & External Development)</li>
        <li>Campus Security (for access control support)</li>
        <li>Assets Division (for device tracking and contracts)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🛠 Distribution Committee</h2>
      <p className="mb-4">
        A special committee is formed for each distribution round, including representatives from ICT and Financial Aid. They are responsible for:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Verifying eligible students</li>
        <li>Contacting successful applicants</li>
        <li>Maintaining distribution registers</li>
        <li>Reporting progress and issues</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">📋 Collection Procedure</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>You’ll receive communication (via SMS or email) if selected.</li>
        <li>Report to your campus ICT office at the allocated time.</li>
        <li>Present student ID and sign the device agreement form.</li>
        <li>Receive the refurbished laptop.</li>
      </ol>

      <p className="italic text-sm text-gray-600">
        Note: Laptops are issued as-is with no guarantee for replacement if lost or damaged.
      </p>
    </div>
  );
};

export default Distribution;
