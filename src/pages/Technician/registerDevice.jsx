import React, { useState } from 'react';
import Sidebar from '../../commponents/Sidebar'; // Ensure correct path
//import { QrReader } from 'react-qr-reader';

function RegisterDevice() {
  const [scannedCode, setScannedCode] = useState('');
  const [status, setStatus] = useState('Please click "Scan Device" to begin.');
  const [showScanner, setShowScanner] = useState(false);
  const [externalData, setExternalData] = useState(null);

  async function handleScan(data) {
    if (data && data !== scannedCode) {
      setScannedCode(data);
      setStatus('📡 Fetching data from external source...');
      setShowScanner(false); // Hide scanner after scan

      try {
        // Simulated delay and dummy data
        await new Promise((r) => setTimeout(r, 1000));

        const dummyData = {
          id: data,
          brand: 'DummyBrand',
          model: 'DummyModel',
          donor: 'DummyDonor',
        };

        setExternalData(dummyData);

        setStatus('💾 Saving data to system database...');
        await new Promise((r) => setTimeout(r, 1000));

        setStatus('✅ Device registered successfully!');
      } catch (error) {
        setStatus(`❌ Error: ${error.message}`);
      }
    }
  }

  function handleError(err) {
    console.error(err);
    setStatus('❌ Scanner error');
  }

  return (
    <div style={{ display: 'flex', background: '#f2f0f1' }}>
      {/* Sidebar */}
      <div style={{ width: 250, backgroundColor: '#003366', minHeight: '100vh' }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 20 }}>
        <h2>Device Registration Scanner</h2>

        {/* Scan Button */}
        <button
          onClick={() => {
            setScannedCode('');
            setExternalData(null);
            setStatus('Scanner active. Please scan a code...');
            setShowScanner(true);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#003366',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          Scan Device
        </button>

        {/* QR Scanner */}
       {/* {showScanner && (
          <div style={{ display: 'flex',marginBottom: 20 }}>
            <QrReader
              onResult={(result, error) => {
                if (result?.text) handleScan(result.text);
                if (error) handleError(error);
              }}
              constraints={{ facingMode: 'environment' }}
              style={{ width: '100%' }}
            />
          </div>
        )}*/}

        {/* Status and Data Display */}
        <p><strong>Status:</strong> {status}</p>

        {scannedCode && (
          <p><strong>Scanned Code:</strong> {scannedCode}</p>
        )}

        {externalData && (
          <div style={{ background: '#fff', padding: 15, borderRadius: 8, marginTop: 20 }}>
            <h4>📦 Device Details</h4>
            <p><strong>ID:</strong> {externalData.id}</p>
            <p><strong>Brand:</strong> {externalData.brand}</p>
            <p><strong>Model:</strong> {externalData.model}</p>
            <p><strong>Donor:</strong> {externalData.donor}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterDevice;
