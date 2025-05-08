import React from 'react';
import backgroundImage from '../src/assets/backgroundAdmin.jpeg'; // Adjust path if needed

function App() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: 'white', // Optional: ensure text is readable
  };

  return (
    <div style={backgroundStyle} className="text-center p-5 d-flex flex-column justify-content-center align-items-center">
      <h1>Welcome to the Missing Middle Student System</h1>
      <p>This is the homepage. Navigate using the URL or menu.</p>
    </div>
  );
}

export default App;
