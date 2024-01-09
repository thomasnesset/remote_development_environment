import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderBottom: '2px solid #d1002c', // Main color for border
    outline: 'none',
    transition: 'border-bottom-color 0.3s',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#d1002c', // Main color for button
    color: '#ffffff', // White text for contrast
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  let navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Perform your login logic here

    // After login logic, navigate to the dashboard
    navigate('/dashboard');
  };

  // Darken the main color for hover effect
  const darkenMainColor = (color, amount) => {
    let usePound = false;

    if (color[0] === "#") {
        color = color.slice(1);
        usePound = true;
    }

    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amount;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000FF) + amount;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  };

  return (
    <form style={formStyle}>
      <input
        type="text"
        placeholder="Brukernavn"
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderBottomColor = darkenMainColor('#d1002c', -20))}
        onBlur={(e) => (e.target.style.borderBottomColor = '#d1002c')}
      />
      <input
        type="password"
        placeholder="Passord"
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderBottomColor = darkenMainColor('#d1002c', -20))}
        onBlur={(e) => (e.target.style.borderBottomColor = '#d1002c')}
      />
      <button
        type="submit"
        style={buttonStyle}
        onClick={handleLogin}
        onMouseEnter={(e) => (e.target.style.backgroundColor = darkenMainColor('#d1002c', -20))}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#d1002c')}
      >
        Logg Inn
      </button>
    </form>
  );
}

export default LoginForm;
