// src/features/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "../../Styles/Login.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      navigate("/");
    } catch (error) {
      toast.error("Error sending reset email: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container animated-fade">
        <div className="form-section">
          <h2 className="login-title">Reset Password 🔐</h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="login-btn" onClick={handleReset}>
            Send Reset Email
          </button>

          <p style={{ marginTop: "1rem", fontSize: "14px", color: "black" }}>
            Back to <Link to="/">Login</Link>
          </p>
        </div>

        <div className="lottie-section">
          {/* You can reuse same Lottie if desired */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
