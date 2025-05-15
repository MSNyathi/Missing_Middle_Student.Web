// src/App.js
import React from 'react';
import backgroundImage from '../src/assets/background2.jpeg'; // adjust the filename if needed

function App() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: '#fff', // optional: ensures text is visible over image
  };

  return (
    <div style={backgroundStyle} className="text-center p-5">
      <h1>Welcome to the Missing Middle Student System</h1>
      <p>This is the homepage. Navigate using the URL or menu.</p>
    </div>
  );
}

export default App;
