import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert, Badge, Spinner, Modal } from "react-bootstrap";
import CitizenNavbar from "../components/Navbar";
import CitizenFooter from "../components/Footer";
import "./CitizenDashboard.css";

const CitizenDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    inProgressComplaints: 0
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch user data and dashboard stats
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

        if (!token || !storedUser) {
          navigate("/citizen-login");
          return;
        }

        setUser(storedUser);

        // TODO: Replace with actual API calls when backend is ready
        // For now, using mock data
        setStats({
          totalComplaints: 12,
          pendingComplaints: 3,
          resolvedComplaints: 8,
          inProgressComplaints: 1
        });

        setRecentComplaints([
          {
            id: "CMP001",
            title: "Street Light Not Working",
            category: "Infrastructure",
            status: "In Progress",
            date: "2026-03-05",
            priority: "Medium"
          },
          {
            id: "CMP002",
            title: "Water Supply Issue",
            category: "Water Supply",
            status: "Resolved",
            date: "2026-03-03",
            priority: "High"
          },
          {
            id: "CMP003",
            title: "Road Maintenance Required",
            category: "Infrastructure",
            status: "Pending",
            date: "2026-03-01",
            priority: "Low"
          }
        ]);

      } catch (error) {
        console.error("Dashboard data fetch error:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    navigate("/citizen-login");
  };

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "resolved": return "success";
      case "in progress": return "warning";
      case "pending": return "secondary";
      case "rejected": return "danger";
      default: return "primary";
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high": return "#dc3545";
      case "medium": return "#ffc107";
      case "low": return "#28a745";
      default: return "#6c757d";
    }
  };

  if (loading) {
    return (
      <div className="citizen-dashboard-wrapper d-flex align-items-center justify-content-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" variant="primary" size="lg" className="mb-3" />
          <h5 className="text-muted">Loading your dashboard...</h5>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="citizen-dashboard-wrapper d-flex align-items-center justify-content-center min-vh-100">
        <Alert variant="danger" className="text-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <div className="citizen-dashboard-wrapper">
      {/* Navbar */}
      <CitizenNavbar />

      {/* Header Section */}
      <div className="dashboard-header bg-primary text-white py-4">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-person-circle display-4"></i>
                </div>
                <div>
                  <h1 className="h3 mb-1 fw-bold">Welcome back, {user?.name}!</h1>
                  <p className="mb-0 opacity-75">Citizen Dashboard - BPGSTS Portal</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-end d-none d-lg-block">
              <small className="d-block text-white-50 mt-1">
                Last login: {new Date().toLocaleDateString()}
              </small>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid className="py-4">
        {/* Quick Actions */}
        <Row className="mb-4">
          <Col>
            <h4 className="mb-3">
              <i className="bi bi-lightning-charge-fill text-warning me-2"></i>
              Quick Actions
            </h4>
            <Row>
              <Col md={3} sm={6} className="mb-3">
                <Card className="quick-action-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="action-icon mb-3">
                      <i className="bi bi-plus-circle-fill text-primary display-4"></i>
                    </div>
                    <h6 className="card-title fw-bold">File New Complaint</h6>
                    <p className="text-muted small mb-3">Report issues and get them resolved</p>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-100"
                      onClick={() => navigate("/create-complaint")}
                    >
                      Create Complaint
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} sm={6} className="mb-3">
                <Card className="quick-action-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="action-icon mb-3">
                      <i className="bi bi-eye-fill text-info display-4"></i>
                    </div>
                    <h6 className="card-title fw-bold">Track Complaints</h6>
                    <p className="text-muted small mb-3">Check status of your complaints</p>
                    <Button
                      variant="info"
                      size="sm"
                      className="w-100"
                      onClick={() => navigate("/my-complaints")}
                    >
                      View Status
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} sm={6} className="mb-3">
                <Card className="quick-action-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="action-icon mb-3">
                      <i className="bi bi-clock-history text-success display-4"></i>
                    </div>
                    <h6 className="card-title fw-bold">Complaint History</h6>
                    <p className="text-muted small mb-3">View all your past complaints</p>
                    <Button
                      variant="success"
                      size="sm"
                      className="w-100"
                      onClick={() => navigate("/complaint-history")}
                    >
                      View History
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} sm={6} className="mb-3">
                <Card className="quick-action-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="action-icon mb-3">
                      <i className="bi bi-person-gear text-secondary display-4"></i>
                    </div>
                    <h6 className="card-title fw-bold">Profile Settings</h6>
                    <p className="text-muted small mb-3">Manage your account details</p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-100"
                      onClick={() => navigate("/profile")}
                    >
                      Manage Profile
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col>
            <h4 className="mb-3">
              <i className="bi bi-bar-chart-line-fill text-primary me-2"></i>
              Your Statistics
            </h4>
            <Row>
              <Col md={3} sm={6} className="mb-3">
                <Card className="stats-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="stats-number text-primary mb-2">
                      <h2 className="mb-0 fw-bold">{stats.totalComplaints}</h2>
                    </div>
                    <h6 className="text-muted mb-0">Total Complaints</h6>
                    <small className="text-muted">All time</small>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} sm={6} className="mb-3">
                <Card className="stats-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="stats-number text-warning mb-2">
                      <h2 className="mb-0 fw-bold">{stats.inProgressComplaints}</h2>
                    </div>
                    <h6 className="text-muted mb-0">In Progress</h6>
                    <small className="text-muted">Being worked on</small>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} sm={6} className="mb-3">
                <Card className="stats-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="stats-number text-secondary mb-2">
                      <h2 className="mb-0 fw-bold">{stats.pendingComplaints}</h2>
                    </div>
                    <h6 className="text-muted mb-0">Pending</h6>
                    <small className="text-muted">Awaiting review</small>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} sm={6} className="mb-3">
                <Card className="stats-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="stats-number text-success mb-2">
                      <h2 className="mb-0 fw-bold">{stats.resolvedComplaints}</h2>
                    </div>
                    <h6 className="text-muted mb-0">Resolved</h6>
                    <small className="text-muted">Successfully completed</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Recent Complaints */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">
                <i className="bi bi-clock-fill text-info me-2"></i>
                Recent Complaints
              </h4>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => navigate("/my-complaints")}
              >
                View All
              </Button>
            </div>

            {recentComplaints.length > 0 ? (
              <Row>
                {recentComplaints.map((complaint) => (
                  <Col md={4} className="mb-3" key={complaint.id}>
                    <Card className="complaint-card h-100 border-0 shadow-sm">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <Badge
                            bg={getStatusVariant(complaint.status)}
                            className="mb-2"
                          >
                            {complaint.status}
                          </Badge>
                          <div
                            className="priority-indicator"
                            style={{ backgroundColor: getPriorityColor(complaint.priority) }}
                            title={`Priority: ${complaint.priority}`}
                          ></div>
                        </div>

                        <h6 className="card-title fw-bold mb-2">{complaint.title}</h6>
                        <p className="text-muted small mb-2">
                          <i className="bi bi-tag-fill me-1"></i>
                          {complaint.category}
                        </p>
                        <p className="text-muted small mb-2">
                          <i className="bi bi-calendar-event me-1"></i>
                          {new Date(complaint.date).toLocaleDateString()}
                        </p>

                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="flex-fill"
                            onClick={() => navigate(`/complaint-status/${complaint.id}`)}
                          >
                            <i className="bi bi-eye me-1"></i>
                            View
                          </Button>
                          <Button
                            variant="outline-success"
                            size="sm"
                            className="flex-fill"
                            onClick={() => navigate(`/feedback/${complaint.id}`)}
                          >
                            <i className="bi bi-star me-1"></i>
                            Rate
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center py-5">
                  <i className="bi bi-inbox-fill text-muted display-1 mb-3"></i>
                  <h5 className="text-muted">No complaints yet</h5>
                  <p className="text-muted mb-3">File your first complaint to get started</p>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/create-complaint")}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    File New Complaint
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>

        {/* Government Services Info */}
        <Row>
          <Col>
            <Card className="border-0 shadow-sm bg-light">
              <Card.Body className="text-center py-4">
                <h5 className="mb-3">
                  <i className="bi bi-info-circle-fill text-primary me-2"></i>
                  Government Services
                </h5>
                <p className="text-muted mb-3">
                  Access various government services and track your complaints through our unified portal
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Button variant="outline-primary" size="sm">
                    <i className="bi bi-building me-1"></i>
                    Municipal Services
                  </Button>
                  <Button variant="outline-primary" size="sm">
                    <i className="bi bi-shield-check me-1"></i>
                    Police Services
                  </Button>
                  <Button variant="outline-primary" size="sm">
                    <i className="bi bi-droplet me-1"></i>
                    Water Supply
                  </Button>
                  <Button variant="outline-primary" size="sm">
                    <i className="bi bi-lightning me-1"></i>
                    Electricity
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <CitizenFooter />

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">Are you sure you want to logout from your account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CitizenDashboard;
