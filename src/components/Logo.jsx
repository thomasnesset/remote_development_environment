import React from 'react';
import logoImage from '../../public/uia_logo.png'; // Update this path

function Logo() {
  return (
    <img 
      src={logoImage} 
      alt="Logo" 
      style={{ 
        width: '100%', // Logo takes the full width of the container
        maxWidth: '250px', // Maximum size of the logo
        height: 'auto' // Height adjusts automatically
      }} 
    />
  );
}

export default Logo;

