import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import animationData from "../../assets/login-animation.json";
import "../../Styles/Login.scss";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Signup failed: " + err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed up with Google!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Google signup failed: " + err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container animated-fade">
        <div className="form-section">
          <h2 className="login-title">Create Account 🚀</h2>

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

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="input-box"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleSignup}>
            Signup
          </button>

          <button className="google-btn" onClick={handleGoogleSignup}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google icon"
            />
            Signup with Google
          </button>

          <p style={{ marginTop: "1rem", fontSize: "14px", color: 'black' }}>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>

        <div className="lottie-section">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
