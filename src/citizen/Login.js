import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Spinner, Modal } from "react-bootstrap";
import { loginUser } from "../api/auth";
import "./Login.css";

const CitizenLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Forgot Password State
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotPasswordErrors, setForgotPasswordErrors] = useState({});
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(email, password);

      if (response.success || response.token) {
        // Store token in localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("userRole", "citizen");

        // Redirect to citizen dashboard
        navigate("/citizen-dashboard");
      } else {
        setGeneralError(
          response.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      setGeneralError("An error occurred. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password navigation
  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
    setForgotPasswordStep(1);
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setForgotPasswordErrors({});
    setForgotPasswordSuccess("");
    setForgotPasswordMessage("");
  };

  // Close forgot password modal
  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordStep(1);
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setForgotPasswordErrors({});
    setForgotPasswordSuccess("");
    setForgotPasswordMessage("");
  };

  // Validate email for forgot password
  const validateForgotPasswordEmail = () => {
    const newErrors = {};

    if (!forgotEmail.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(forgotEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    setForgotPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!validateForgotPasswordEmail()) {
      return;
    }

    setForgotPasswordLoading(true);
    setForgotPasswordMessage("");

    try {
      // Simulate OTP sending - Replace with actual API call
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (data.success || data.message.includes("OTP")) {
        setForgotPasswordMessage("OTP sent successfully to your email!");
        setForgotPasswordStep(2);
        // Auto-clear message after 3 seconds
        setTimeout(() => setForgotPasswordMessage(""), 3000);
      } else {
        setForgotPasswordErrors({
          email: data.message || "Failed to send OTP. Please try again.",
        });
      }
    } catch (error) {
      setForgotPasswordErrors({
        email: "Error sending OTP. Please check your email and try again.",
      });
      console.error("OTP error:", error);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  // Validate OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (otp.trim().length !== 6 && !otp.match(/^\d+$/)) {
      newErrors.otp = "OTP must be 6 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setForgotPasswordErrors(newErrors);
      return;
    }

    setForgotPasswordLoading(true);
    setForgotPasswordMessage("");

    try {
      // Verify OTP - Replace with actual API call
      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail, otp }),
      });

      const data = await response.json();

      if (data.success || data.message.includes("verified")) {
        setForgotPasswordMessage("OTP verified successfully!");
        setForgotPasswordStep(3);
        setTimeout(() => setForgotPasswordMessage(""), 3000);
      } else {
        setForgotPasswordErrors({
          otp: data.message || "Invalid OTP. Please try again.",
        });
      }
    } catch (error) {
      setForgotPasswordErrors({
        otp: "Error verifying OTP. Please try again.",
      });
      console.error("Verify OTP error:", error);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  // Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, and numbers";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setForgotPasswordErrors(newErrors);
      return;
    }

    setForgotPasswordLoading(true);
    setForgotPasswordMessage("");

    try {
      // Reset password - Replace with actual API call
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail,
          otp,
          newPassword,
        }),
      });

      const data = await response.json();

      if (data.success || data.message.includes("successfully")) {
        setForgotPasswordSuccess("Password reset successfully! You can now login with your new password.");
        setForgotPasswordErrors({});
        // Close modal after 2 seconds
        setTimeout(() => {
          closeForgotPasswordModal();
        }, 2000);
      } else {
        setForgotPasswordErrors({
          general: data.message || "Failed to reset password. Please try again.",
        });
      }
    } catch (error) {
      setForgotPasswordErrors({
        general: "Error resetting password. Please try again.",
      });
      console.error("Reset password error:", error);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <div className="citizen-login-wrapper min-vh-100 d-flex align-items-center justify-content-center bg-gradient py-5">
      <Container fluid className="px-0 h-100">
        <Row className="gx-0 h-100 align-items-center">
          {/* Left Side - Branding */}
          <Col lg={6} className="d-none d-lg-flex align-items-center justify-content-center login-branding-section bg-primary bg-gradient p-5">
            <div className="branding-content text-white text-center">
              <div className="mb-4">
                <h1 className="display-4 fw-bold mb-2">🇮🇳 BPGSTS</h1>
                <p className="lead text-white-50">Bharat Public Grievance & Service Tracking System</p>
              </div>

              <div className="features-container bg-white bg-opacity-10 rounded-4 p-4 mb-4">
                <h4 className="mb-3 text-white">Citizen Portal Features</h4>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="bi bi-check-circle me-2"></i>Register Grievances</li>
                  <li className="mb-2"><i className="bi bi-check-circle me-2"></i>Track Complaint Status</li>
                  <li className="mb-2"><i className="bi bi-check-circle me-2"></i>View Complaint History</li>
                  <li className="mb-2"><i className="bi bi-check-circle me-2"></i>Submit Feedback</li>
                </ul>
              </div>

              <div className="govt-info bg-white bg-opacity-15 rounded-4 p-4">
                <p className="mb-1 fw-bold text-white">🇮🇳 Government of Bharat</p>
                <p className="mb-1 text-white-50">Digital Grievance Platform</p>
                <p className="mb-1 text-white-50">Secure & Transparent Services</p>
                <p className="text-white-50 mb-0">24/7 Available - Your Voice Matters</p>
              </div>
            </div>
          </Col>

          {/* Right Side - Login Form */}
          <Col lg={6} className="bg-light d-flex align-items-center justify-content-center p-4 p-lg-5">
            <div className="login-form-container w-100" style={{ maxWidth: "450px" }}>
              {/* Form Header */}
              <div className="mb-4 text-center">
                <h2 className="h1 fw-bold text-primary mb-2">Welcome Back</h2>
                <p className="text-muted">Citizen Login Portal</p>
              </div>

              {/* General Error Message */}
              {generalError && (
                <Alert variant="danger" className="d-flex align-items-center mb-4" dismissible onClose={() => setGeneralError("")}>
                  <i className="bi bi-exclamation-circle-fill me-2"></i>
                  <span>{generalError}</span>
                </Alert>
              )}

              {/* Login Form */}
              <Form onSubmit={handleLogin}>
                {/* Email Field */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Email Address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors({ ...errors, email: "" });
                      }
                    }}
                    disabled={loading}
                    isInvalid={!!errors.email}
                    className="py-2 border-2"
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Password <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) {
                          setErrors({ ...errors, password: "" });
                        }
                      }}
                      disabled={loading}
                      isInvalid={!!errors.password}
                      className="py-2 border-2"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      className="border-2"
                    >
                      {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                    </Button>
                  </div>
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    disabled={loading}
                    className="fw-500"
                  />
                  <Button
                    variant="link"
                    className="p-0 text-primary text-decoration-none fw-semibold"
                    onClick={handleForgotPassword}
                    disabled={loading}
                  >
                    Forgot Password?
                  </Button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-100 py-2 fw-semibold btn-lg mb-3 bg-primary border-0"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                {/* Sign Up Link */}
                <div className="text-center mb-3">
                  <p className="mb-0 text-muted">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                      Sign Up Here
                    </Link>
                  </p>
                </div>

                {/* Divider */}
                <hr className="my-4" />

                {/* Help Links */}
                <div className="text-center">
                  <p className="text-muted small mb-2">Need help?</p>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <Link to="/" className="text-primary small text-decoration-none">
                      Home
                    </Link>
                    <span className="text-muted">•</span>
                    <Link to="/contact" className="text-primary small text-decoration-none">
                      Contact Us
                    </Link>
                    <span className="text-muted">•</span>
                    <Link to="/about" className="text-primary small text-decoration-none">
                      About
                    </Link>
                  </div>
                </div>
              </Form>

              {/* Footer */}
              <div className="mt-5 pt-3 border-top">
                <p className="text-center text-muted small mb-0">
                  © 2026 BPGSTS - All Rights Reserved
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Forgot Password Modal */}
      <Modal
        show={showForgotPasswordModal}
        onHide={closeForgotPasswordModal}
        centered
        size="md"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="fw-bold">Reset Your Password</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          {/* Success Message */}
          {forgotPasswordSuccess && (
            <Alert variant="success" className="mb-3">
              <i className="bi bi-check-circle me-2"></i>
              {forgotPasswordSuccess}
            </Alert>
          )}

          {/* Error Message */}
          {forgotPasswordErrors.general && (
            <Alert variant="danger" className="mb-3">
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              {forgotPasswordErrors.general}
            </Alert>
          )}

          {/* Step 1: Email Verification */}
          {forgotPasswordStep === 1 && (
            <Form onSubmit={handleSendOTP}>
              <p className="text-muted mb-4">
                Enter your email address and we'll send you an OTP to reset your password.
              </p>

              {forgotPasswordMessage && (
                <Alert variant="info" className="mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  {forgotPasswordMessage}
                </Alert>
              )}

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Email Address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your registered email"
                  value={forgotEmail}
                  onChange={(e) => {
                    setForgotEmail(e.target.value);
                    if (forgotPasswordErrors.email) {
                      setForgotPasswordErrors({
                        ...forgotPasswordErrors,
                        email: "",
                      });
                    }
                  }}
                  disabled={forgotPasswordLoading}
                  isInvalid={!!forgotPasswordErrors.email}
                  className="py-2 border-2"
                />
                <Form.Control.Feedback type="invalid">
                  {forgotPasswordErrors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  className="flex-grow-1"
                  onClick={closeForgotPasswordModal}
                  disabled={forgotPasswordLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-grow-1"
                  disabled={forgotPasswordLoading}
                >
                  {forgotPasswordLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Sending...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </div>
            </Form>
          )}

          {/* Step 2: OTP Verification */}
          {forgotPasswordStep === 2 && (
            <Form onSubmit={handleVerifyOTP}>
              <p className="text-muted mb-4">
                Enter the 6-digit OTP sent to <strong>{forgotEmail}</strong>
              </p>

              {forgotPasswordMessage && (
                <Alert variant="info" className="mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  {forgotPasswordMessage}
                </Alert>
              )}

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  One-Time Password <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                    if (forgotPasswordErrors.otp) {
                      setForgotPasswordErrors({
                        ...forgotPasswordErrors,
                        otp: "",
                      });
                    }
                  }}
                  disabled={forgotPasswordLoading}
                  isInvalid={!!forgotPasswordErrors.otp}
                  maxLength="6"
                  className="py-2 border-2 text-center fs-5"
                  style={{ letterSpacing: "0.5rem" }}
                />
                <Form.Control.Feedback type="invalid" className="d-block">
                  {forgotPasswordErrors.otp}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center mb-3">
                <p className="text-muted small mb-2">Didn't receive the code?</p>
                <Button
                  variant="link"
                  className="p-0 text-primary text-decoration-none fw-semibold"
                  onClick={handleSendOTP}
                  disabled={forgotPasswordLoading}
                >
                  Resend OTP
                </Button>
              </div>

              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  className="flex-grow-1"
                  onClick={() => setForgotPasswordStep(1)}
                  disabled={forgotPasswordLoading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-grow-1"
                  disabled={forgotPasswordLoading}
                >
                  {forgotPasswordLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Verifying...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              </div>
            </Form>
          )}

          {/* Step 3: New Password */}
          {forgotPasswordStep === 3 && (
            <Form onSubmit={handleResetPassword}>
              <p className="text-muted mb-4">Create a new password for your account</p>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  New Password <span className="text-danger">*</span>
                </Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (forgotPasswordErrors.newPassword) {
                        setForgotPasswordErrors({
                          ...forgotPasswordErrors,
                          newPassword: "",
                        });
                      }
                    }}
                    disabled={forgotPasswordLoading}
                    isInvalid={!!forgotPasswordErrors.newPassword}
                    className="py-2 border-2"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    disabled={forgotPasswordLoading}
                    className="border-2"
                  >
                    {showNewPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid" className="d-block">
                  {forgotPasswordErrors.newPassword}
                </Form.Control.Feedback>
                <small className="text-muted d-block mt-2">
                  Minimum 8 characters with uppercase, lowercase, and numbers
                </small>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Confirm Password <span className="text-danger">*</span>
                </Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (forgotPasswordErrors.confirmPassword) {
                        setForgotPasswordErrors({
                          ...forgotPasswordErrors,
                          confirmPassword: "",
                        });
                      }
                    }}
                    disabled={forgotPasswordLoading}
                    isInvalid={!!forgotPasswordErrors.confirmPassword}
                    className="py-2 border-2"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={forgotPasswordLoading}
                    className="border-2"
                  >
                    {showConfirmPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid" className="d-block">
                  {forgotPasswordErrors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  className="flex-grow-1"
                  onClick={() => setForgotPasswordStep(2)}
                  disabled={forgotPasswordLoading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-grow-1"
                  disabled={forgotPasswordLoading}
                >
                  {forgotPasswordLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CitizenLogin;
