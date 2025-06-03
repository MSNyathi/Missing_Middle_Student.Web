import React, { useRef, useState } from 'react';
import Sidebar from '../../commponents/Sidebar'; // Ensure correct path
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

function RegisterDevice() {
  const [scannedCode, setScannedCode] = useState('');
  const [scannedInput, setScannedInput] = useState('');
  const [status, setStatus] = useState('Please click "Scan Device" to begin.');
  const [showScanner, setShowScanner] = useState(false);
   const [serverResponse, setServerResponse] = useState(null);
  const [externalData, setExternalData] = useState(null);
  const input_ref = useRef(null)
  async function handleScan(data) {
    input_ref.current.click()
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
  
  const after_scan = async ()=>{
 try{
var res =   await axios.post(`https://localhost:7102/ScanDevice`,{serialNumber:scannedInput});
if(res.status === 201){
console.log("device scanned ")
setServerResponse(res.data.device)
}
 }catch(error){
console.log(error)
 }
  }
  function handleError(err) {
    console.error(err);
    setStatus('❌ Scanner error');
  }

  return (
    <div style={{ display: 'flex', background: '#f2f0f1', color: '#000' /* ensure black text */ }}>
      {/* Sidebar */}
      <div style={{ width: 250, backgroundColor: '#003366', minHeight: '100vh' }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 20 }}>
        <h2 style={{ color: '#000' }}>Device Registration Scanner</h2>

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
            cursor: 'pointer',
          }}
        >
          Scan Device
        </button>

        {/* QR Scanner */}
        {showScanner && (
          <div style={{ display: 'flex', marginBottom: 20 }}>
            <QrReader
              onResult={(result, error) => {
                if (result?.text) handleScan(result.text);
                if (error) handleError(error);
              }}
              constraints={{ facingMode: 'environment' }}
              style={{ width: '100%' }}
            />
            <input onChange={ async (event)=>{
                setScannedInput(event.target.value)
                console.log(event.target.value)
             
           
          
            }} ref={input_ref} value={scannedInput} style={{borderBottomColor:"black",borderWidth:2,borderRadius:5,background:'transparent'}}></input>
            {scannedInput.length > 3 && (<button onClick={async()=>{
 await after_scan()
            }}>register</button>)} 
          </div>
        )}

        {/* Status and Data Display */}
        <p style={{ fontWeight: 'bold', color: '#000' }}>
          <strong>Status:</strong> {status}
        </p>

        {scannedCode && (
          <p style={{ color: '#000' }}>
            <strong>Scanned Code:</strong> {scannedCode}
          </p>
        )}

        {serverResponse && (
          <div
            style={{
              background: '#fff',
              padding: 15,
              borderRadius: 8,
              marginTop: 20,
              color: '#000', // explicitly black text inside box
              boxShadow: '0 0 10px rgba(0,0,0,0.1)', // subtle shadow for clarity
            }}
          >
            <h4>📦 Device Details</h4>
           
            <p><strong>Brand:</strong> {serverResponse.brand}</p>
            <p><strong>Model:</strong> {serverResponse.model}</p>
            <p><strong>Condition:</strong> {serverResponse.condtion}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterDevice;
