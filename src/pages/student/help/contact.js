import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      
      <p className="mb-2">For any inquiries or assistance regarding the Laptop Distribution Programme, feel free to reach out to us:</p>
      
      <div className="mb-6">
        <p><strong>Email:</strong> helpdesk@tut.ac.za</p>
        <p><strong>Phone:</strong> +27 123 456 7890</p>
        <p><strong>Office Hours:</strong> Monday - Friday, 08:00 AM to 04:00 PM</p>
        <p><strong>Office Location:</strong> Building 10, ICT Faculty Office, Soshanguve South Campus</p>
      </div>

      <h2 className="text-2xl font-semibold mb-3">Send Us a Message</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border rounded p-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            rows="4"
            placeholder="Type your message here..."
            className="w-full border rounded p-2"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
