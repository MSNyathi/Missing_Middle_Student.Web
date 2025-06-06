import React, { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import "./studentContract.css";

export default function StudentLaptopForm() {
  const [studentNumber, setStudentNumber] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sigPad = useRef();

  const clearSignature = () => sigPad.current.clear();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentNumber || !confirmed || sigPad.current.isEmpty()) {
      alert("Please fill all fields and sign.");
      return;
    }

    const signatureData = sigPad.current.getTrimmedCanvas().toDataURL("image/png");

    // Simulate form submission
    console.log("Student Number: ",  studentNumber);
    console.log("Confirmed:", confirmed);
    console.log("Signature (base64):", signatureData);

    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Laptop Receipt Form</h2>
      {submitted ? (
        <div className="text-green-600 font-medium text-center">
          ✅ Thank you! Your form has been submitted.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Student Number: </label>
            <input
              type="text"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your student number"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={() => setConfirmed(!confirmed)}
              className="mr-2"
              required
            />
            <label>I confirm that I have received a working laptop</label>
          </div>

          <div>
            <label className="block mb-1 font-medium">Digital Signature</label>
            <div className="border rounded w-full h-32">
              <SignaturePad
                ref={sigPad}
                canvasProps={{ width: 400, height: 120, className: "signatureCanvas" }}
              />
            </div>
            <button
              type="button"
              onClick={clearSignature}
              className="text-sm text-blue-600 mt-2 hover:underline"
            >
              Clear Signature
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
