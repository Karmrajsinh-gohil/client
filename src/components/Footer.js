import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const CitizenFooter = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribeMessage('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setSubscribeMessage(''), 3000);
    }
  };

  const footerLinks = {
    services: [
      { name: "File Complaint", path: "/create-complaint" },
      { name: "Track Complaints", path: "/my-complaints" },
      { name: "Complaint History", path: "/complaint-history" },
      { name: "Feedback", path: "/feedback" }
    ],
    account: [
      { name: "Profile Settings", path: "/profile" },
      { name: "Change Password", path: "/change-password" },
      { name: "Dashboard", path: "/citizen-dashboard" },
      { name: "Help & Support", path: "/help" }
    ],
    government: [
      { name: "About BPGSTS", path: "/about" },
      { name: "Government Services", path: "/services" },
      { name: "Public Notices", path: "/notices" },
      { name: "Contact Us", path: "/contact" }
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Accessibility", path: "/accessibility" },
      { name: "Disclaimer", path: "/disclaimer" }
    ]
  };

  return (
    <footer className="citizen-footer bg-dark text-light mt-5">
      <Container fluid>
        {/* Main Footer Content */}
        <Row className="py-5">
          {/* Brand Section */}
          <Col lg={4} md={6} className="mb-4">
            <div className="footer-brand mb-3">
              <div className="d-flex align-items-center mb-3">
                <span className="flag-icon me-2">🇮🇳</span>
                <div>
                  <h5 className="mb-0 fw-bold text-white">BPGSTS</h5>
                  <small className="text-muted">Bharat Public Grievance & Service Tracking System</small>
                </div>
              </div>
              <p className="text-muted mb-4">
                Empowering citizens through transparent and efficient grievance redressal.
                Your voice matters in building a better Bharat.
              </p>

              {/* Social Media Section */}
              <div className="social-section mb-4">
                <h6 className="footer-heading mb-3">
                  <i className="bi bi-share-fill me-2"></i>
                  Follow Us
                </h6>
                <div className="social-links d-flex gap-3">
                  <a
                    href="https://www.facebook.com/DARPGIndia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link facebook"
                    aria-label="Facebook - DARPG India"
                    title="Follow us on Facebook - Department of Administrative Reforms & Public Grievances"
                  >
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/DARPG_GoI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link twitter"
                    aria-label="X (Twitter) - DARPG GoI"
                    title="Follow us on X - Department of Administrative Reforms & Public Grievances"
                  >
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.675l-5.344-6.983-6.112 6.983H2.42l7.728-8.835L1.254 2.25h6.554l4.915 6.298L17.464 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/@darpg5380"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link youtube"
                    aria-label="YouTube - DARPG"
                    title="Subscribe to our YouTube channel - DARPG Official"
                  >
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/darpgindia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link instagram"
                    aria-label="Instagram - DARPG India"
                    title="Follow us on Instagram - Department of Administrative Reforms & Public Grievances"
                  >
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.63c-.794.297-1.473.702-2.082 1.31-.609.609-1.013 1.288-1.31 2.082-.297.788-.5 1.657-.56 2.935C.015 8.334 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.263 2.148.56 2.935.297.795.702 1.474 1.31 2.082.609.609 1.288 1.013 2.082 1.31.788.297 1.657.5 2.935.56 1.271.057 1.677.072 4.947.072s3.667-.015 4.947-.072c1.277-.06 2.148-.263 2.935-.56.795-.297 1.474-.702 2.082-1.31.609-.609 1.013-1.288 1.31-2.082.297-.788.5-1.657.56-2.935.057-1.271.072-1.677.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.263-2.148-.56-2.935-.297-.795-.702-1.474-1.31-2.082-.609-.609-1.288-1.013-2.082-1.31-.788-.297-1.657-.5-2.935-.56C15.667.015 15.261 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.070 1.171.054 1.805.244 2.227.408.56.217.96.477 1.382.896.419.42.679.822.896 1.381.164.422.354 1.057.408 2.227.061 1.264.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.054 1.171-.244 1.805-.408 2.227-.217.56-.477.96-.896 1.382-.42.419-.822.679-1.381.896-.422.164-1.057.354-2.227.408-1.264.061-1.646.07-4.849.07s-3.585-.009-4.849-.07c-1.171-.054-1.805-.244-2.227-.408-.56-.217-.96-.477-1.382-.896-.419-.42-.679-.822-.896-1.381-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.054-1.171.244-1.805.408-2.227.217-.56.477-.96.896-1.382.42-.419.822-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.264-.061 1.646-.07 4.849-.07zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4.965-10.322a1.44 1.44 0 1 1 0 2.881 1.44 1.44 0 0 1 0-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="newsletter-section">
                <h6 className="footer-heading mb-3">
                  <i className="bi bi-envelope-fill me-2"></i>
                  Stay Updated
                </h6>
                <p className="newsletter-text mb-3">Get latest updates on grievance resolutions and government services</p>
                <Form onSubmit={handleNewsletterSubscribe} className="newsletter-form">
                  <Form.Group className="position-relative">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="footer-input"
                      required
                    />
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="subscribe-btn"
                      text="Subscribe"
                    >
                      <i className="bi bi-arrow-right"></i>
                    </Button>
                  </Form.Group>
                  {subscribeMessage && (
                    <div className="success-message mt-2">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      {subscribeMessage}
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </Col>

          {/* Services Links */}
          <Col lg={2} md={6} sm={6} className="mb-4">
            <h6 className="footer-heading mb-3">Services</h6>
            <ul className="footer-links list-unstyled">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Account Links */}
          <Col lg={2} md={6} sm={6} className="mb-4">
            <h6 className="footer-heading mb-3">Account</h6>
            <ul className="footer-links list-unstyled">
              {footerLinks.account.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Government Links */}
          <Col lg={2} md={6} sm={6} className="mb-4">
            <h6 className="footer-heading mb-3">Government</h6>
            <ul className="footer-links list-unstyled">
              {footerLinks.government.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} sm={6} className="mb-4">
            <h6 className="footer-heading mb-3">Quick Links</h6>
            <ul className="footer-links list-unstyled">
              <li><a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="footer-link">India.gov.in</a></li>
              <li><a href="https://www.digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="footer-link">Digital India</a></li>
              <li><a href="https://www.mygov.in" target="_blank" rel="noopener noreferrer" className="footer-link">MyGov</a></li>
              <li><a href="https://www.makeinindia.com" target="_blank" rel="noopener noreferrer" className="footer-link">Make in India</a></li>
            </ul>
          </Col>
        </Row>

        {/* Government Info Bar */}
        <Row className="government-info py-3 border-top border-secondary">
          <Col md={8}>
            <div className="d-flex align-items-center">
              <span className="flag-icon me-2">🇮🇳</span>
              <div>
                <small className="text-muted">
                  <strong>Government of Bharat</strong> |
                  Ministry of Digital Services |
                  Department of Citizen Services
                </small>
              </div>
            </div>
          </Col>
          <Col md={4} className="text-end">
            <small className="text-muted">
              Last updated: {new Date().toLocaleDateString('en-IN')}
            </small>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row className="py-3 border-top border-secondary">
          <Col md={12}>
            <small className="text-muted">
              © {currentYear} BPGSTS - Bharat Public Grievance & Service Tracking System.
              All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default CitizenFooter;
