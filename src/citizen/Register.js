import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { registerUser } from "../api/auth";
import "./Register.css";

const CitizenRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const navigate = useNavigate();

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength validation
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
    };
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordValidation.isValid) {
      newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, and numbers";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms acceptance
    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    // Clear general error
    if (generalError) {
      setGeneralError("");
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser(formData.name.trim(), formData.email.trim(), formData.password);

      if (response.success || response.token) {
        setSuccessMessage("Registration successful! Redirecting to dashboard...");

        // Store token in localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("userRole", "citizen");

        // Redirect to citizen dashboard after 2 seconds
        setTimeout(() => {
          navigate("/citizen-dashboard");
        }, 2000);
      } else {
        setGeneralError(response.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setGeneralError("An error occurred. Please try again later.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="citizen-register-wrapper min-vh-100 d-flex align-items-center justify-content-center bg-gradient py-5">
      <Container fluid className="px-0 h-100">
        <Row className="gx-0 h-100 align-items-center">
          {/* Left Side - Branding */}
          <Col lg={6} className="d-none d-lg-flex align-items-center justify-content-center register-branding-section bg-primary bg-gradient p-5">
            <div className="branding-content text-white text-center">
              <div className="mb-4">
                <h1 className="display-4 fw-bold mb-2">🇮🇳 BPGSTS</h1>
                <p className="lead text-white-50">Bharat Public Grievance & Service Tracking System</p>
              </div>

              <div className="features-container bg-white bg-opacity-10 rounded-4 p-4 mb-4">
                <h4 className="mb-3 text-white">Join Our Digital Platform</h4>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="bi bi-person-plus me-2"></i>Easy Citizen Registration</li>
                  <li className="mb-2"><i className="bi bi-shield-check me-2"></i>Secure & Private</li>
                  <li className="mb-2"><i className="bi bi-clock me-2"></i>24/7 Access</li>
                  <li className="mb-2"><i className="bi bi-chat-dots me-2"></i>Direct Communication</li>
                </ul>
              </div>

              <div className="govt-info bg-white bg-opacity-15 rounded-4 p-4">
                <p className="mb-1 fw-bold text-white">🇮🇳 Government of Bharat</p>
                <p className="mb-1 text-white-50">Digital Citizen Services</p>
                <p className="mb-1 text-white-50">Empowering Citizens</p>
                <p className="text-white-50 mb-0">Your Voice, Our Priority</p>
              </div>
            </div>
          </Col>

          {/* Right Side - Registration Form */}
          <Col lg={6} className="bg-light d-flex align-items-center justify-content-center p-4 p-lg-5">
            <div className="register-form-container w-100" style={{ maxWidth: "500px" }}>
              {/* Form Header */}
              <div className="mb-4 text-center">
                <h2 className="h1 fw-bold text-primary mb-2">Create Account</h2>
                <p className="text-muted">Join the BPGSTS Citizen Portal</p>
              </div>

              {/* Success Message */}
              {successMessage && (
                <Alert variant="success" className="d-flex align-items-center mb-4" dismissible onClose={() => setSuccessMessage("")}>
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <span>{successMessage}</span>
                </Alert>
              )}

              {/* General Error Message */}
              {generalError && (
                <Alert variant="danger" className="d-flex align-items-center mb-4" dismissible onClose={() => setGeneralError("")}>
                  <i className="bi bi-exclamation-circle-fill me-2"></i>
                  <span>{generalError}</span>
                </Alert>
              )}

              {/* Registration Form */}
              <Form onSubmit={handleRegister}>
                {/* Full Name Field */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Full Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={loading}
                    isInvalid={!!errors.name}
                    className="py-2 border-2"
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email Field */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Email Address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                    isInvalid={!!errors.email}
                    className="py-2 border-2"
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.email}
                  </Form.Control.Feedback>
                  <small className="text-muted d-block mt-1">
                    We'll use this email for important notifications
                  </small>
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Password <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
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
                  <small className="text-muted d-block mt-1">
                    Minimum 8 characters with uppercase, lowercase, and numbers
                  </small>
                </Form.Group>

                {/* Confirm Password Field */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Confirm Password <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      disabled={loading}
                      isInvalid={!!errors.confirmPassword}
                      className="py-2 border-2"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={loading}
                      className="border-2"
                    >
                      {showConfirmPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                    </Button>
                  </div>
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Terms and Conditions */}
                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    id="acceptTerms"
                    label={
                      <span className="fw-500">
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary text-decoration-none fw-semibold">
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary text-decoration-none fw-semibold">
                          Privacy Policy
                        </Link>
                      </span>
                    }
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      if (errors.terms) {
                        setErrors(prev => ({ ...prev, terms: "" }));
                      }
                    }}
                    disabled={loading}
                    isInvalid={!!errors.terms}
                    className="fw-500"
                  />
                  {errors.terms && (
                    <div className="invalid-feedback d-block">
                      {errors.terms}
                    </div>
                  )}
                </Form.Group>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-100 py-2 fw-semibold btn-lg mb-3 bg-primary border-0"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                {/* Sign In Link */}
                <div className="text-center mb-3">
                  <p className="mb-0 text-muted">
                    Already have an account?{" "}
                    <Link to="/citizen-login" className="text-primary fw-semibold text-decoration-none">
                      Sign In Here
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
    </div>
  );
};

export default CitizenRegister;
