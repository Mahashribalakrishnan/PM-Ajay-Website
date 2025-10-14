import { useState, useEffect, useRef } from 'react';

const CAPTCHA_LENGTH = 6;
const CAPTCHA_CHARACTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

const generateCaptcha = () => {
  let value = '';
  for (let index = 0; index < CAPTCHA_LENGTH; index += 1) {
    const randomIndex = Math.floor(Math.random() * CAPTCHA_CHARACTERS.length);
    value += CAPTCHA_CHARACTERS[randomIndex];
  }
  return value;
};

const isValidPassword = (password) => {
  if (password.length !== 8) {
    return false;
  }
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  return hasLetter && hasNumber && hasSpecial;
};

const PASSWORD_ERROR_MESSAGE = 'Password must be exactly 8 characters and include a letter, number, and special character.';
const CAPTCHA_ERROR_MESSAGE = 'Captcha does not match. Please try again.';

export default function Login({ onLoginSuccess = () => {} }) {
  const [formValues, setFormValues] = useState({ userId: '', password: '', captcha: '' });
  const [captchaValue, setCaptchaValue] = useState(() => generateCaptcha());
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ password: '', captcha: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const successTimeoutRef = useRef(null);
  const navigateTimeoutRef = useRef(null);

  const handleChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    if (name === 'password') {
      value = value.slice(0, 8);
      setErrors((prev) => ({ ...prev, password: '' }));
    }
    if (name === 'captcha') {
      setErrors((prev) => ({ ...prev, captcha: '' }));
    }
    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current);
      navigateTimeoutRef.current = null;
    }
    if (successMessage) {
      setSuccessMessage('');
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaptchaRefresh = (options = { resetError: true }) => {
    setCaptchaValue(generateCaptcha());
    setFormValues((prev) => ({ ...prev, captcha: '' }));
    if (options.resetError) {
      setErrors((prev) => ({ ...prev, captcha: '' }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;
    if (!isValidPassword(formValues.password)) {
      hasError = true;
      setErrors((prev) => ({ ...prev, password: PASSWORD_ERROR_MESSAGE }));
    }
    if (formValues.captcha.trim().toUpperCase() !== captchaValue.toUpperCase()) {
      hasError = true;
      handleCaptchaRefresh({ resetError: false });
      setErrors((prev) => ({ ...prev, captcha: CAPTCHA_ERROR_MESSAGE }));
    }
    if (hasError) {
      if (successMessage) {
        setSuccessMessage('');
      }
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
        navigateTimeoutRef.current = null;
      }
      return;
    }
    // Replace with real authentication logic
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
    }
    setSuccessMessage('Login successful');
    successTimeoutRef.current = setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current);
    }
    navigateTimeoutRef.current = setTimeout(() => {
      onLoginSuccess();
    }, 1000);
    setErrors({ password: '', captcha: '' });
  };

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="login-page">
      <section className="login-hero" aria-labelledby="hero-heading">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 id="hero-heading">Empowering Village Administration</h1>
          <p>Streamlining governance for a connected and efficient community.</p>
        </div>
      </section>
      <section className="login-form-section" aria-labelledby="login-heading">
        <div className="form-card">
          <header className="form-header">
            <h2 id="login-heading">Village Official Login</h2>
            <p className="form-subtitle">Welcome back! Please enter your details.</p>
          </header>
          <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="userId">User ID</label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12Zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8Z" />
                  </svg>
                </span>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  placeholder="Enter your User ID"
                  value={formValues.userId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <div className={`input-wrapper${errors.password ? ' input-error' : ''}`}>
                <span className="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M17.4 9.6h-.6V7.2a4.8 4.8 0 1 0-9.6 0v2.4h-.6A1.8 1.8 0 0 0 4.8 11.4v7.8c0 1 .8 1.8 1.8 1.8h10.8c1 0 1.8-.8 1.8-1.8v-7.8c0-1-.8-1.8-1.8-1.8Zm-3.6 0H10.2V7.2a1.8 1.8 0 1 1 3.6 0v2.4Z" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  minLength={8}
                  maxLength={8}
                  title="Password must be 8 characters including a letter, number, and special character"
                  value={formValues.password}
                  onChange={handleChange}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prevVisible) => !prevVisible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" role="img">
                      <path
                        d="M12 5.5c-5.2 0-9 6.5-9 6.5s3.8 6.5 9 6.5 9-6.5 9-6.5-3.8-6.5-9-6.5Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" role="img">
                      <path
                        d="M12 5.5c-5.2 0-9 6.5-9 6.5s3.8 6.5 9 6.5 9-6.5 9-6.5-3.8-6.5-9-6.5Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M4 4l16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="field-error" role="alert">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="captcha">Captcha</label>
              <div className="captcha-row">
                <div className="captcha-display" aria-hidden="true">
                  <span>{captchaValue}</span>
                </div>
                <button
                  type="button"
                  className="captcha-refresh"
                  aria-label="Refresh captcha"
                  onClick={handleCaptchaRefresh}
                >
                  <svg viewBox="0 0 24 24" role="img">
                    <path
                      d="M21 12a9 9 0 1 1-2.6-6.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 4v4h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className={`input-wrapper${errors.captcha ? ' input-error' : ''}`}>
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  placeholder="Enter Captcha"
                  value={formValues.captcha}
                  onChange={handleChange}
                  aria-invalid={errors.captcha ? 'true' : 'false'}
                  required
                />
              </div>
              {errors.captcha && (
                <p className="field-error" role="alert">
                  {errors.captcha}
                </p>
              )}
            </div>
            <div className="form-actions">
              <button type="submit">Log In</button>
              <a className="forgot-password" href="#forgot">Forgot Password?</a>
            </div>
          </form>
          <p className="signup-message">
            Don&apos;t have an account? <a href="#signup">Sign up</a>
          </p>
        </div>
      </section>
      <div className={`login-toast${successMessage ? ' show' : ''}`} role="status" aria-live="polite">
        {successMessage}
      </div>
    </div>
  );
}
