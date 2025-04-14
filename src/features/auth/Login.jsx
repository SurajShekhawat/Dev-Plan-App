import React, { useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/login-animation.json'; // Replace with your Lottie file path
import '../../Styles/Login.scss';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="login-container animated-fade">
        <div className="form-section">
          <h2 className="login-title">Welcome Back 👋</h2>
          <input type="email" placeholder="Email" className="input-box" />
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="input-box"
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button className="login-btn">Login</button>
        </div>
        <div className="lottie-section">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Login;
