import React from 'react';
import { Link } from 'react-router-dom';

function Announcements() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Announcements</h1>
      <p className="text-lg text-gray-700">No announcements at this time.</p>
    </div>
  );
}export default Announcements;