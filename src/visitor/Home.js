// src/visitor/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css"; // import custom CSS

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span
            className="navbar-brand fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            🇮🇳 BPGSTS
          </span>

          <span className="navbar-text text-light small ms-3">
            Bharat Public Grievance & Service Tracking System
          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">

              {/* Navigation Links */}
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-light"
                  onClick={() => navigate("/")}
                >
                  Home
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-light"
                  onClick={() => navigate("/about")}
                >
                  About
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-light"
                  onClick={() => navigate("/services-information")}
                >
                  Services
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-light"
                  onClick={() => navigate("/categories")}
                >
                  Categories
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-light"
                  onClick={() => navigate("/faqs")}
                >
                  FAQs
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-light"
                  onClick={() => navigate("/contact")}
                >
                  Contact
                </button>
              </li>

              {/* Auth Buttons */}
              <li className="nav-item ms-lg-3">
                <button
                  className="btn btn-light me-2"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
      {/* Hero Section */}
      <header className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div className="hero-content">
          <h1 className="display-3 fw-bold mb-3">
            Bharat Public Grievance & Service Tracking System
          </h1>
          <p className="lead mt-4 mb-4">
            A Digital Platform for Citizens to Register, Track, and Resolve Grievances
          </p>
          <p className="subtitle mb-5">
            Transparent • Efficient • Accountable • Citizen-Centric
          </p>
          <div className="mt-5">
            <button
              className="btn btn-warning btn-lg me-3"
              onClick={() => navigate("/register")}
            >
              Register Now
            </button>
            <button
              className="btn btn-light btn-lg"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container my-5">
        <h2 className="text-center mb-5 section-title">Key Features</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="feature-card p-4 shadow-sm rounded">
              <div className="feature-icon">📋</div>
              <h5 className="mt-3 fw-semibold">Register Complaints</h5>
              <p className="text-muted">
                Submit your grievances online with document attachments and track them in real-time.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card p-4 shadow-sm rounded">
              <div className="feature-icon">📊</div>
              <h5 className="mt-3 fw-semibold">Track Status</h5>
              <p className="text-muted">
                Monitor the progress of your complaints with real-time updates from government departments.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card p-4 shadow-sm rounded">
              <div className="feature-icon">🔒</div>
              <h5 className="mt-3 fw-semibold">Secure & Transparent</h5>
              <p className="text-muted">
                All information is protected and handled with complete transparency and accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 section-title">Why Use BPGSTS?</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <div className="benefit-content">
                  <h6 className="fw-semibold">24/7 Available</h6>
                  <p className="text-muted small">Access the system anytime, anywhere from your device.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <div className="benefit-content">
                  <h6 className="fw-semibold">Simple Process</h6>
                  <p className="text-muted small">Easy-to-use interface for registering and tracking complaints.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <div className="benefit-content">
                  <h6 className="fw-semibold">Government Accountability</h6>
                  <p className="text-muted small">Ensures government departments respond promptly to citizens.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <div className="benefit-content">
                  <h6 className="fw-semibold">Feedback Support</h6>
                  <p className="text-muted small">Provide feedback and help us improve our services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section bg-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="section-title mb-4">About BPGSTS</h2>
              <p className="text-muted mb-3">
                The Bharat Public Grievance & Service Tracking System (BPGSTS) is an innovative digital
                platform designed to bridge the gap between citizens and government departments.
              </p>
              <p className="text-muted mb-3">
                Our mission is to provide a transparent, efficient, and citizen-centric mechanism for
                registering grievances and tracking their resolution.
              </p>
              <p className="text-muted mb-3">
                By leveraging technology, BPGSTS ensures that no grievance goes unheard and every citizen
                has access to timely updates on their complaints.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>🎯 Goal:</strong> Ensure citizen grievances are resolved promptly
                </li>
                <li className="mb-2">
                  <strong>💪 Vision:</strong> A transparent and accountable government system
                </li>
                <li className="mb-2">
                  <strong>🤝 Mission:</strong> Empower citizens with voice and visibility
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <div className="about-highlight p-5 rounded">
                <h5 className="fw-semibold mb-4">Key Statistics</h5>
                <div className="stat-box mb-3">
                  <div className="stat-number">10,000+</div>
                  <div className="stat-label">Grievances Registered</div>
                </div>
                <div className="stat-box mb-3">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Resolution Rate</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Citizen Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 section-title">How It Works</h2>
          <div className="row">
            <div className="col-md-3 text-center mb-4">
              <div className="step-number">1</div>
              <h6 className="fw-semibold mt-3">Register</h6>
              <p className="small text-muted">Create your account and verify your details</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="step-number">2</div>
              <h6 className="fw-semibold mt-3">Submit</h6>
              <p className="small text-muted">File your grievance with complete details</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="step-number">3</div>
              <h6 className="fw-semibold mt-3">Track</h6>
              <p className="small text-muted">Monitor the progress in real-time</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="step-number">4</div>
              <h6 className="fw-semibold mt-3">Resolve</h6>
              <p className="small text-muted">Get updates and resolution from authorities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Make a Difference?</h2>
          <p className="lead mb-4">Join thousands of citizens using BPGSTS to resolve their grievances</p>
          <button className="btn btn-light btn-lg" onClick={() => navigate("/register")}>
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light py-4">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-4 mb-4 mb-md-0">
              <h6 className="fw-semibold mb-3">About Us</h6>
              <p className="small text-light-emphasis">
                BPGSTS is a citizen-centric digital platform for grievance resolution.
              </p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h6 className="fw-semibold mb-3">Quick Links</h6>
              <ul className="list-unstyled small">
                <li>
                  <a href="/" className="text-light-emphasis text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/" className="text-light-emphasis text-decoration-none">
                    Register
                  </a>
                </li>
                <li>
                  <a href="/" className="text-light-emphasis text-decoration-none">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="fw-semibold mb-3">Contact</h6>
              <p className="small text-light-emphasis">
                Email: support@bpgsts.gov.in
                <br />
                Phone: 1800-XXX-XXXX
                <br />
                Toll-free: 24/7 Available
              </p>
            </div>
          </div>
          <hr className="border-secondary" />
          <div className="text-center small text-light-emphasis">
            <p className="mb-0">
              © 2026 Bharat Public Grievance & Service Tracking System. All rights reserved.
            </p>
            <p className="mb-0">
              <a href="/" className="text-light-emphasis text-decoration-none">
                Privacy Policy
              </a>
              {" | "}
              <a href="/" className="text-light-emphasis text-decoration-none">
                Terms & Conditions
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;