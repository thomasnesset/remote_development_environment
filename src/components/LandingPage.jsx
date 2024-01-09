import React from 'react';
import Logo from './Logo';
import LoginForm from './LoginForm';
import Container from './Container';

function LandingPage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#f0f2f5' // Light background color for the whole page
    }}>
      <Container>
        <Logo />
        <div style={{ marginBottom: '20px' }} />
        <LoginForm />
      </Container>
    </div>
  );
}

export default LandingPage;
