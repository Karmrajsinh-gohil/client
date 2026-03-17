import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Offcanvas } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

const CitizenNavbar = () => {
  const [user, setUser] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    navigate("/citizen-login");
  };

  const navItems = [
    {
      title: "Dashboard",
      path: "/citizen-dashboard",
      icon: "bi-house-door-fill"
    },
    {
      title: "File Complaint",
      path: "/create-complaint",
      icon: "bi-plus-circle-fill"
    },
    {
      title: "My Complaints",
      path: "/my-complaints",
      icon: "bi-list-check"
    },
    {
      title: "Complaint History",
      path: "/complaint-history",
      icon: "bi-clock-history"
    },
    {
      title: "Feedback",
      path: "/feedback",
      icon: "bi-star-fill"
    }
  ];

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        className="citizen-navbar shadow-sm"
        sticky="top"
      >
        <Container fluid>
          {/* Brand */}
          <Navbar.Brand as={Link} to="/citizen-dashboard" className="d-flex align-items-center">
            <div className="brand-logo me-2">
              <span className="flag-icon">🇮🇳</span>
            </div>
            <div className="brand-text">
              <span className="brand-title">BPGSTS</span>
              <small className="brand-subtitle d-block d-lg-none">Citizen Portal</small>
            </div>
          </Navbar.Brand>

          {/* Mobile Toggle */}
          <Navbar.Toggle
            aria-controls="citizen-navbar-nav"
            onClick={() => setShowMobileMenu(true)}
          />

          {/* Desktop Navigation */}
          <Navbar.Collapse id="citizen-navbar-nav">
            <Nav className="me-auto">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.path}
                  as={Link}
                  to={item.path}
                  className="nav-item-custom"
                >
                  <i className={`bi ${item.icon} me-1`}></i>
                  {item.title}
                </Nav.Link>
              ))}
            </Nav>

            {/* User Menu */}
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person-circle me-2"></i>
                    <span className="d-none d-lg-inline">{user?.name || "Citizen"}</span>
                  </div>
                }
                id="user-dropdown"
                align="end"
                className="user-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person-gear me-2"></i>
                  Profile Settings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/change-password">
                  <i className="bi bi-key me-2"></i>
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        placement="end"
        className="mobile-offcanvas"
      >
        <Offcanvas.Header closeButton className="bg-primary text-white">
          <Offcanvas.Title>
            <div className="d-flex align-items-center">
              <span className="flag-icon me-2">🇮🇳</span>
              <div>
                <div className="fw-bold">BPGSTS</div>
                <small>Citizen Portal</small>
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          {/* User Info */}
          <div className="mobile-user-info p-3 border-bottom">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-circle display-6 me-3 text-primary"></i>
              <div>
                <h6 className="mb-0 fw-bold">{user?.name || "Citizen"}</h6>
                <small className="text-muted">Citizen Account</small>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <Nav className="flex-column p-2">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className="mobile-nav-item"
                onClick={() => setShowMobileMenu(false)}
              >
                <i className={`bi ${item.icon} me-3`}></i>
                {item.title}
              </Nav.Link>
            ))}

            <hr className="my-3" />

            <Nav.Link
              as={Link}
              to="/profile"
              className="mobile-nav-item"
              onClick={() => setShowMobileMenu(false)}
            >
              <i className="bi bi-person-gear me-3"></i>
              Profile Settings
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/change-password"
              className="mobile-nav-item"
              onClick={() => setShowMobileMenu(false)}
            >
              <i className="bi bi-key me-3"></i>
              Change Password
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                handleLogout();
                setShowMobileMenu(false);
              }}
              className="mobile-nav-item text-danger"
            >
              <i className="bi bi-box-arrow-right me-3"></i>
              Logout
            </Nav.Link>
          </Nav>

          {/* Footer */}
          <div className="mobile-footer p-3 border-top bg-light">
            <div className="text-center">
              <small className="text-muted">
                © 2026 BPGSTS - Government of Bharat
              </small>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CitizenNavbar;
