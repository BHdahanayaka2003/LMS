// src/components/LoginPage.jsx

import React, { useState } from 'react';

// --- SVG Icons (No changes needed, these are great) ---
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    console.log('Logging in with:', { email, password });
    
    setTimeout(() => {
      if (email === "student@example.com" && password === "password123") {
        alert('Login Successful! Welcome Student.');
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  // Combine base and loading styles for the button for cleaner JSX
  const buttonStyle = isLoading 
    ? { ...styles.loginButton, ...styles.buttonLoading } 
    : styles.loginButton;

  return (
    // This container will now correctly fill the screen because of the index.css changes.
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Left Panel - Illustration and Welcome Message */}
        <div style={styles.leftPanel}>
          <img 
            // Note: The image in your screenshot appeared broken. This is a valid URL.
            // If it still appears broken, check your network connection or ad-blockers.
            src="https://user-images.githubusercontent.com/19752538/117942171-03522700-b328-11eb-9844-3c58972e3a1f.png" 
            alt="LMS Illustration"
            style={styles.illustration}
          />
          <h1 style={styles.welcomeTitle}>Welcome to Your Learning Adventure!</h1>
          <p style={styles.welcomeText}>Sign in to access your courses, assignments, and connect with your peers.</p>
        </div>

        {/* Right Panel - Login Form */}
        <div style={styles.rightPanel}>
          <form onSubmit={handleSubmit} noValidate>
            <h2 style={styles.formTitle}>Login to Your Account</h2>
            {error && <p style={styles.errorText}>{error}</p>}
            
            <div style={styles.inputGroup}>
              <UserIcon />
              <input
                type="email"
                placeholder="Email Address (e.g., student@example.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div style={styles.inputGroup}>
              <LockIcon />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (e.g., password123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            <div style={styles.options}>
              <a 
                href="#!" 
                onClick={(e) => { e.preventDefault(); alert('Forgot Password clicked!'); }} 
                style={styles.forgotPassword}
              >
                Forgot Password?
              </a>
            </div>

            <button type="submit" style={buttonStyle} disabled={isLoading}>
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </form>
          <p style={styles.footerText}>
            © 2024 Your LMS Name. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f0f4f8', // Changed to a soft gray for better contrast with the card
    fontFamily: "'Poppins', sans-serif",
    padding: '20px',
  },
  loginCard: {
    display: 'flex',
    width: '100%',
    maxWidth: '950px',
    minHeight: '600px',
    background: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  leftPanel: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9ff', // Softer purple/blue tint
    textAlign: 'center',
  },
  illustration: {
    width: '80%',
    maxWidth: '350px',
    marginBottom: '30px',
  },
  welcomeTitle: {
    fontSize: '1.75rem', // 28px
    fontWeight: 600,
    color: '#333',
    marginBottom: '15px',
  },
  welcomeText: {
    fontSize: '1rem', // 16px
    color: '#555',
    lineHeight: '1.6',
    maxWidth: '380px',
  },
  rightPanel: {
    flex: 1,
    padding: '40px 50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#ffffff',
  },
  formTitle: {
    fontSize: '1.8rem', // 29px
    fontWeight: 600,
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  },
  inputGroup: {
    position: 'relative',
    marginBottom: '25px',
  },
  input: {
    width: '100%',
    padding: '15px 15px 15px 50px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    color: '#333',
    backgroundColor: '#fafafa'
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    padding: '5px',
    display: 'flex',
    alignItems: 'center'
  },
  options: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '25px',
    fontSize: '0.9rem',
  },
  forgotPassword: {
    color: '#6a6ff2', // A modern blue/purple
    textDecoration: 'none',
    transition: 'text-decoration 0.3s',
  },
  loginButton: {
    width: '100%',
    padding: '15px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#fff',
    background: 'linear-gradient(135deg, #6a6ff2, #8d70f0)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'opacity 0.3s, box-shadow 0.3s',
    boxShadow: '0 5px 15px rgba(106, 111, 242, 0.4)',
  },
  buttonLoading: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  errorText: {
    color: '#d93025',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  footerText: {
    marginTop: 'auto',
    paddingTop: '20px',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#aaa',
  },
};

export default LoginPage;