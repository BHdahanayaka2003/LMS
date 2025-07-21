import React, { useState, useEffect, useRef } from 'react';

// Enhanced SVG Icons with better visual design
const UserIcon = ({ isFocused, hasError }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={hasError ? '#ef4444' : isFocused ? '#3b82f6' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke={hasError ? '#ef4444' : isFocused ? '#3b82f6' : '#9ca3af'} strokeWidth="2"/>
  </svg>
);

const LockIcon = ({ isFocused, hasError }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={hasError ? '#ef4444' : isFocused ? '#3b82f6' : '#9ca3af'} strokeWidth="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={hasError ? '#ef4444' : isFocused ? '#3b82f6' : '#9ca3af'} strokeWidth="2"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2"/>
    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3b82f6" strokeWidth="2" fill="rgba(59, 130, 246, 0.1)"/>
  </svg>
);

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#10b981" strokeWidth="2"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#10b981" strokeWidth="2"/>
  </svg>
);

const GraduationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="#8b5cf6" strokeWidth="2"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="#8b5cf6" strokeWidth="2"/>
  </svg>
);

// Loading Animation Component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

// Floating Particles Background
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${8 + Math.random() * 4}s`
      }}
    />
  ));
  
  return <div className="particles-container">{particles}</div>;
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay }) => (
  <div className="feature-card" style={{ animationDelay: `${delay}s` }}>
    <div className="feature-icon">{icon}</div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

// Main Login Component
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'userType') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Demo credentials
      const validCredentials = {
        student: { email: 'student@university.edu', password: 'student123' },
        lecturer: { email: 'lecturer@university.edu', password: 'lecturer123' }
      };

      const valid = validCredentials[formData.userType];
      
      if (formData.email === valid.email && formData.password === valid.password) {
        setIsSuccess(true);
        setTimeout(() => {
          alert(`Welcome ${formData.userType}! Redirecting to dashboard...`);
        }, 1000);
      } else {
        setErrors({ 
          general: 'Invalid credentials. Please check your email and password.' 
        });
      }
    } catch (error) {
      setErrors({ 
        general: 'Login failed. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <style jsx>{`
        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: float linear infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20px) rotate(360deg);
            opacity: 0;
          }
        }

        .main-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.2);
          display: flex;
          max-width: 1200px;
          width: 100%;
          min-height: 700px;
          overflow: hidden;
          opacity: ${isMounted ? 1 : 0};
          transform: ${isMounted ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .left-panel {
          flex: 1;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          opacity: ${isMounted ? 1 : 0};
          transform: ${isMounted ? 'translateX(0)' : 'translateX(-30px)'};
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .brand-logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
          color: white;
          font-size: 32px;
          font-weight: bold;
        }

        .welcome-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .welcome-content p {
          font-size: 1.1rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 400px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          width: 100%;
          max-width: 400px;
        }

        .feature-card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 16px;
          opacity: 0;
          animation: slideInUp 0.8s ease-out forwards;
        }

        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(20px);
          }
        }

        .feature-icon {
          flex-shrink: 0;
        }

        .feature-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .feature-description {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }

        .right-panel {
          flex: 1;
          padding: 60px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: white;
        }

        .login-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .form-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .form-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .form-subtitle {
          color: #64748b;
          font-size: 1rem;
        }

        .user-type-selector {
          display: flex;
          background: #f8fafc;
          border-radius: 12px;
          padding: 6px;
          margin-bottom: 32px;
          position: relative;
        }

        .user-type-option {
          flex: 1;
          padding: 12px 20px;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .user-type-option.active {
          color: white;
          background: #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .user-type-option:not(.active) {
          color: #64748b;
        }

        .form-group {
          margin-bottom: 24px;
          position: relative;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .form-input {
          width: 100%;
          padding: 16px 16px 16px 52px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          background: #fafafa;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus {
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .form-input.error {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .toggle-password {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.3s ease;
        }

        .toggle-password:hover {
          color: #3b82f6;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0;
          transform: translateY(-4px);
          animation: errorSlideIn 0.3s ease forwards;
        }

        @keyframes errorSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .general-error {
          background: #fef2f2;
          color: #dc2626;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          border-left: 4px solid #dc2626;
          font-size: 0.9rem;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          font-size: 0.9rem;
        }

        .forgot-password {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .forgot-password:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        .submit-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(37, 99, 235, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .loading-spinner {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-state {
          background: linear-gradient(135deg, #10b981, #059669) !important;
        }

        .form-footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .main-card {
            flex-direction: column;
            max-width: 100%;
            margin: 0 20px;
          }

          .left-panel, .right-panel {
            padding: 40px 30px;
          }

          .welcome-content h1 {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <FloatingParticles />
      
      <div className="main-card">
        <div className="left-panel">
          <div className="brand-logo">
            🎓
          </div>
          
          <div className="welcome-content">
            <h1>Welcome to EduHub</h1>
            <p>Your comprehensive learning management system designed for modern education</p>
          </div>

          <div className="features-grid">
            <FeatureCard
              icon={<ShieldIcon />}
              title="Secure Access"
              description="Enterprise-grade security for your data"
              delay={0.3}
            />
            <FeatureCard
              icon={<BookIcon />}
              title="Rich Learning"
              description="Interactive courses and materials"
              delay={0.4}
            />
            <FeatureCard
              icon={<GraduationIcon />}
              title="Track Progress"
              description="Comprehensive analytics and insights"
              delay={0.5}
            />
          </div>
        </div>

        <div className="right-panel">
          <form className="login-form" onSubmit={handleSubmit} ref={formRef}>
            <div className="form-header">
              <h2 className="form-title">Sign In</h2>
              <p className="form-subtitle">Access your learning dashboard</p>
            </div>

            <div className="user-type-selector">
              <button
                type="button"
                className={`user-type-option ${formData.userType === 'student' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, userType: 'student' }))}
              >
                Student
              </button>
              <button
                type="button"
                className={`user-type-option ${formData.userType === 'lecturer' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, userType: 'lecturer' }))}
              >
                Lecturer
              </button>
            </div>

            {errors.general && (
              <div className="general-error">
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <UserIcon isFocused={focusedField === 'email'} hasError={!!errors.email} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder={`${formData.userType}@university.edu`}
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <div className="error-message">
                  ⚠️ {errors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <LockIcon isFocused={focusedField === 'password'} hasError={!!errors.password} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={`${formData.userType}123`}
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <div className="error-message">
                  ⚠️ {errors.password}
                </div>
              )}
            </div>

            <div className="form-options">
              <div></div>
              <a 
                href="#" 
                className="forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Password reset functionality would be implemented here');
                }}
              >
                Forgot Password?
              </a>
            </div>

            <button 
              type="submit" 
              className={`submit-button ${isSuccess ? 'success-state' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : isSuccess ? (
                '✓ Success! Redirecting...'
              ) : (
                'Sign In'
              )}
            </button>

            <div className="form-footer">
              <p>Demo Credentials:</p>
              <p><strong>Student:</strong> student@university.edu / student123</p>
              <p><strong>Lecturer:</strong> lecturer@university.edu / lecturer123</p>
              <br />
              <p>© 2024 EduHub LMS. All rights reserved.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;