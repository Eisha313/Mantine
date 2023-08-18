import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [showTokenScreen, setShowTokenScreen] = useState(false);
  const [token, setToken] = useState("");
  const [showPasswordResetScreen, setShowPasswordResetScreen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetSend = () => {
    console.log("here");
    fetch("https://usquare-test-apis.onrender.com/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.data.token) {
          setResetSent(true);
          setShowTokenScreen(true);
          const extractedToken = data.data.token;
          setToken(extractedToken);
          console.log("Extracted Token:", extractedToken);
        } else {
          alert("Token not received in the response. Please try again.");
        }
      })

      .catch((error) => {
        console.error("Error:", error);
        alert("User not found. Please check your email and try again.");
      });
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleVerifyToken = () => {
    fetch("https://usquare-test-apis.onrender.com/verify-forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowTokenScreen(false);
        setShowPasswordResetScreen(true);
      })
      .catch((error) => {
        alert("Invalid token. Please try again.");
      });
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordReset = () => {
    if (newPassword === confirmPassword) {
      fetch("https://usquare-test-apis.onrender.com/verify-forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }), // Send email and token for verification
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data) {
            // Token verification successful, proceed with resetting the password
            fetch(
              "https://usquare-test-apis.onrender.com/verify-forgot-password",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, token, newPassword }),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                setPasswordResetSuccessful(true);
                alert(
                  "Your password has been reset successfully. Now you can log in with your new password."
                );
              })
              .catch((error) => {
                alert("Failed to reset the password. Please try again.");
              });
          } else {
            alert("Invalid token. Please try again.");
          }
        })
        .catch((error) => {
          alert("Failed to verify the token. Please try again.");
        });
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };
  return (
    <>
      {passwordResetSuccessful ? (
        <div>
          <h2>Password Reset Successful!</h2>
          <p>You can now log in with your new password.</p>
          {/* navigate("/login"); */}
        </div>
      ) : showPasswordResetScreen ? (
        <>
          <h2>Reset Password</h2>
          <div className="form-container">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              onChange={handlePasswordChange}
              value={newPassword}
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
            />

            <button onClick={handlePasswordReset}>Reset Password</button>
          </div>
        </>
      ) : showTokenScreen ? (
        <>
          <h2>Verify Token</h2>
          <div className="form-container">
            <label htmlFor="token">Enter Token</label>
            <input
              type="text"
              id="token"
              name="token"
              placeholder="Enter token sent to your email"
              onChange={handleTokenChange}
              value={token}
            />

            <button onClick={handleVerifyToken}>Verify Token</button>
          </div>
        </>
      ) : resetSent ? (
        <p>
          Password reset email has been sent to <strong>{email}</strong>. Check
          your inbox for further instructions.
        </p>
      ) : (
        <>
          <p>
            Enter the email address associated with your account to receive a
            password reset link.
          </p>
          <div className="form-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleEmailChange}
              value={email}
            />

            <button onClick={handleResetSend}>Reset Password</button>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
