// import React, { useState } from 'react';
// import Lottie from 'lottie-react';
// import animationData from '../../assets/login-animation.json'; // Replace with your Lottie file path
// import '../../Styles/Login.scss';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="login-page">
//       <div className="login-container animated-fade">
//         <div className="form-section">
//           <h2 className="login-title">Welcome Back 👋</h2>
//           <input type="email" placeholder="Email" className="input-box" />
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Password"
//               className="input-box"
//             />
//             <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? '🙈' : '👁️'}
//             </span>
//           </div>
//           <button className="login-btn">Login</button>
//         </div>
//         <div className="lottie-section">
//           <Lottie animationData={animationData} loop={true} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import animationData from "../../assets/login-animation.json";
import "../../Styles/Login.scss";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email/Password login
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container animated-fade">
        <div className="form-section">
          <h2 className="login-title">Welcome Back 👋</h2>

          <input
            type="email"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-box"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <p style={{ marginTop: "1rem", fontSize: "14px", color: "black" }}>
  <Link to="/forgot-password">Forgot Password?</Link>
</p>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <button className="google-btn" onClick={handleGoogleLogin}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google icon"
            />
            Login with Google
          </button>

          <p style={{ marginTop: "1rem", fontSize: "14px", color: 'black' }}>
            Don’t have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>

        <div className="lottie-section">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Login;
