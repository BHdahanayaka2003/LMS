// src/components/LoginPage.jsx

import React, { useState, useEffect } from 'react';
import eduIMG from './assets/eduIMG.jpg';
 // Adjust path as needed


// --- Enhanced SVG Icons ---
// Now accept props for dynamic styling based on input focus.
const UserIcon = ({ isFocused }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{...styles.inputIcon, color: isFocused ? theme.colors.primary : theme.colors.icon}}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const LockIcon = ({ isFocused }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{...styles.inputIcon, color: isFocused ? theme.colors.primary : theme.colors.icon}}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);

// --- Creative Sub-components ---
const LoadingDots = () => (
    <div style={styles.loadingDotsContainer}>
        <div style={{...styles.loadingDot, animationDelay: '0s'}}></div>
        <div style={{...styles.loadingDot, animationDelay: '0.2s'}}></div>
        <div style={{...styles.loadingDot, animationDelay: '0.4s'}}></div>
    </div>
);


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- State for advanced animations and interactions ---
  const [isMounted, setIsMounted] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Trigger mount animation once the component is ready
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setTimeout(() => {
        setError('Please provide both your email and password.');
        setIsLoading(false);
      }, 500);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      if (email === "student@example.com" && password === "password123") {
        alert('Login Successful! Welcome Student.');
        // On success, you might redirect: history.push('/dashboard');
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
      setIsLoading(false);
    }, 2000);
  };

  // --- Dynamic Style Functions for interactivity ---
  const getCardStyle = () => ({
    ...styles.loginCard,
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? 'translateY(0)' : 'translateY(30px)',
  });

  const getLeftPanelStyle = () => ({
    ...styles.leftPanel,
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? 'translateX(0)' : 'translateX(-30px)',
    transitionDelay: '0.2s',
  });

  const getInputStyle = (isFocused) => ({
    ...styles.input,
    borderColor: isFocused ? theme.colors.primary : theme.colors.border,
    boxShadow: isFocused ? `0 0 0 3px ${theme.colors.primary}40` : 'none',
  });
  
  const getButtonStyle = () => ({
      ...styles.loginButton,
      ...(isLoading && styles.buttonLoading),
      ...(isButtonHovered && !isLoading && styles.buttonHover),
  });
  
  const getErrorStyle = () => ({
      ...styles.errorText,
      opacity: error ? 1 : 0,
      transform: error ? 'translateY(0)' : 'translateY(-10px)',
      maxHeight: error ? '100px' : '0',
      padding: error ? '12px' : '0 12px',
      marginBottom: error ? '20px' : '0',
  });


  return (
    <div style={styles.container}>
      {/* This keyframe style needs to be injected globally, e.g., in your index.html or a <style> tag */}
      <style>{`
        @keyframes loading-dot-bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
      <div style={getCardStyle()}>
        {/* Left Panel - Illustration and Welcome Message */}
        <div style={getLeftPanelStyle()}>
         <img 
  src={eduIMG} 
  alt="LMS Illustration"
  style={styles.illustration}
/>

          <h1 style={styles.welcomeTitle}>Your Learning Journey Begins Here</h1>
          <p style={styles.welcomeText}>Unlock a world of knowledge. Sign in to continue your adventure.</p>
        </div>

        {/* Right Panel - Login Form */}
        <div style={styles.rightPanel}>
          <form onSubmit={handleSubmit} noValidate>
            <h2 style={styles.formTitle}>Secure Login</h2>
            
            <div style={getErrorStyle()}>{error}</div>
            
            <div style={styles.inputGroup}>
              <UserIcon isFocused={emailFocused} />
              <input
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={getInputStyle(emailFocused)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div style={styles.inputGroup}>
              <LockIcon isFocused={passwordFocused} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="password123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={getInputStyle(passwordFocused)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            <div style={styles.options}>
              <a 
                href="#!" 
                onClick={(e) => { e.preventDefault(); alert('Forgot Password flow initiated!'); }} 
                style={styles.forgotPassword}
              >
                Forgot Password?
              </a>
            </div>

            <button 
              type="submit" 
              style={getButtonStyle()} 
              disabled={isLoading}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              {isLoading ? <LoadingDots /> : 'Login'}
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

// --- STYLES & THEME ---
const theme = {
    colors: {
        primary: '#6a6ff2',
        primaryDark: '#5a5fdd',
        background: '#f0f4f8',
        card: '#ffffff',
        text: '#333',
        textSecondary: '#555',
        icon: '#888',
        border: '#ddd',
        error: '#d93025',
        errorBg: '#f8d7da',
    },
    font: "'Poppins', sans-serif"
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: `linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)`, // More elegant gradient
    fontFamily: theme.font,
    padding: '20px',
  },
  loginCard: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '950px',
    minHeight: '600px',
    background: theme.colors.card,
    borderRadius: '20px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
  },
  leftPanel: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    textAlign: 'center',
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
  },
  illustration: {
    width: '80%',
    maxWidth: '350px',
    marginBottom: '30px',
  },
  welcomeTitle: {
    fontSize: '1.75rem',
    fontWeight: 600,
    color: theme.colors.text,
    marginBottom: '15px',
  },
  welcomeText: {
    fontSize: '1rem',
    color: theme.colors.textSecondary,
    lineHeight: '1.6',
    maxWidth: '380px',
  },
  rightPanel: {
    flex: 1,
    padding: '40px 50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: theme.colors.card,
  },
  formTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    color: theme.colors.text,
    marginBottom: '10px',
    textAlign: 'center',
  },
  inputGroup: {
    position: 'relative',
    marginBottom: '25px',
  },
  inputIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'color 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '16px 16px 16px 50px',
    fontSize: '1rem',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    color: theme.colors.text,
    backgroundColor: '#fafafa',
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: theme.colors.icon,
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
  },
  options: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '30px',
    fontSize: '0.9rem',
  },
  forgotPassword: {
    color: theme.colors.primary,
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'text-decoration 0.3s',
  },
  loginButton: {
    width: '100%',
    padding: '16px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#fff',
    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'opacity 0.3s, box-shadow 0.3s, transform 0.2s',
    boxShadow: `0 4px 15px ${theme.colors.primary}50`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '54px', // Fixed height to prevent layout shift during loading
  },
  buttonHover: {
     boxShadow: `0 8px 25px ${theme.colors.primary}70`,
     transform: 'translateY(-2px)',
  },
  buttonLoading: {
    opacity: 0.8,
    cursor: 'not-allowed',
  },
  errorText: {
    color: theme.colors.error,
    backgroundColor: theme.colors.errorBg,
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: 500,
    overflow: 'hidden',
    transition: 'opacity 0.3s ease, transform 0.3s ease, max-height 0.3s ease, padding 0.3s ease, margin-bottom 0.3s ease',
  },
  footerText: {
    marginTop: 'auto',
    paddingTop: '20px',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#aaa',
  },
  // Styles for the loading dots animation
  loadingDotsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'loading-dot-bounce 1.4s infinite ease-in-out both',
    margin: '0 4px'
  },
};

export default LoginPage;