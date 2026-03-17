import { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError("");
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role || "user");

      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setGeneralError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Header */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">🇮🇳 BPGSTS</span>
          <span className="text-light small">Bharat Public Grievance & Service Tracking System</span>
        </div>
      </nav>

      {/* Main Login Content */}
      <div className="login-wrapper">
        <div className="container">
          <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
            <div className="col-md-5">
              <div className="login-card">
                {/* Logo & Title */}
                <div className="login-header text-center mb-4">
                  <h1 className="display-6 fw-bold mb-2">Citizen Login</h1>
                  <p className="text-muted">Access your grievance dashboard</p>
                </div>

                {/* General Error Alert */}
                {generalError && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {generalError}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setGeneralError("")}
                    ></button>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control form-control-lg ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                          setErrors({ ...errors, email: "" });
                        }
                      }}
                      disabled={loading}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">
                      Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-lg">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) {
                            setErrors({ ...errors, password: "" });
                          }
                        }}
                        disabled={loading}
                        autoComplete="current-password"
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                        disabled={loading}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/citizen-login"
                      className="text-decoration-none text-primary fw-semibold"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center mb-3">
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                      Sign Up Here
                    </Link>
                  </p>
                </div>

                {/* Divider */}
                <hr />

                {/* Help Section */}
                <div className="text-center">
                  <p className="text-muted small mb-2">Need help?</p>
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Link to="/" className="text-decoration-none text-secondary small">
                      Home
                    </Link>
                    <span className="text-muted">•</span>
                    <Link to="/about" className="text-decoration-none text-secondary small">
                      About
                    </Link>
                    <span className="text-muted">•</span>
                    <Link to="/contact" className="text-decoration-none text-secondary small">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Info Panel */}
            <div className="col-md-5 ps-md-5">
              <div className="info-panel">
                <h3 className="fw-bold mb-4">Welcome to BPGSTS</h3>
                <p className="lead mb-4">
                  A digital platform for citizens to register grievances and track their progress
                  with government departments.
                </p>

                <div className="features-list">
                  <h5 className="fw-semibold mb-3">Key Features:</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Register Grievances Online
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Real-time Status Tracking
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Transparent & Accountable
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Secure & Confidential
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      24/7 Support Available
                    </li>
                  </ul>
                </div>

                <div className="mt-5 p-4 bg-light rounded">
                  <p className="text-muted mb-0">
                    <strong>Secure Login:</strong> Your personal information is protected with
                    industry-standard encryption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light py-3">
        <div className="container text-center">
          <p className="mb-0 small">
            © 2026 Bharat Public Grievance & Service Tracking System. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
