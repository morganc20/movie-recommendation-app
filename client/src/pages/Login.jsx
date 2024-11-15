import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'; 
import '../Styles/Login.css';

const Login = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/'); // Redirect to home after login
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="What to Watch logo" className="login-logo" />
        
        <div className="login-inner-box">
          <h2 className="login-title">Sign In</h2>
          
          {}
          {error && <p className="error-message">{error}</p>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Username or Email
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            </label>
            
            <button type="submit" className="login-button">Sign In</button>
          </form>

          <p className="signup-prompt">
            Don’t have an account? <a href="/signup">Create One</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

