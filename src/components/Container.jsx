import React from 'react';

function Container({ children, style }) {
  const defaultStyle = {
    backgroundColor: '#ffffff',
    margin: '20px auto',
    padding: '20px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    // Other default styles...
  };

  const combinedStyle = { ...defaultStyle, ...style };

  return <div style={combinedStyle}>{children}</div>;
}

export default Container;
