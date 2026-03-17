import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  ProgressBar,
  Badge,
  Modal
} from "react-bootstrap";
import CitizenNavbar from "../components/Navbar";
import CitizenFooter from "../components/Footer";
import "./ComplaintRegister.css";

const ComplaintRegister = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    department: "",
    location: "",
    priority: "Medium",
    anonymous: false
  });

  // Priority options with colors
  const priorityOptions = [
    { value: "Low", label: "Low", variant: "success", icon: "bi-info-circle" },
    { value: "Medium", label: "Medium", variant: "warning", icon: "bi-exclamation-triangle" },
    { value: "High", label: "High", variant: "danger", icon: "bi-exclamation-circle" },
    { value: "Urgent", label: "Urgent", variant: "dark", icon: "bi-exclamation-diamond" }
  ];

  // Complaint categories for BPGSTS
  const complaintCategories = [
    { id: "infrastructure", name: "Infrastructure", department: "Public Works Department", icon: "bi-building" },
    { id: "water", name: "Water Supply", department: "Water Resources Department", icon: "bi-droplet" },
    { id: "electricity", name: "Electricity", department: "Power & Energy Department", icon: "bi-lightning" },
    { id: "sanitation", name: "Sanitation", department: "Health & Sanitation Department", icon: "bi-trash" },
    { id: "transport", name: "Road & Transport", department: "Transport Department", icon: "bi-car-front" },
    { id: "education", name: "Education", department: "Education Department", icon: "bi-mortarboard" },
    { id: "healthcare", name: "Healthcare", department: "Health Services Department", icon: "bi-hospital" },
    { id: "law", name: "Law & Order", department: "Police Department", icon: "bi-shield-check" },
    { id: "revenue", name: "Revenue", department: "Revenue Department", icon: "bi-cash-coin" },
    { id: "other", name: "Other Services", department: "General Administration", icon: "bi-gear" }
  ];

  // Fetch user data and initialize form
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

        if (!token || !storedUser) {
          navigate("/citizen-login");
          return;
        }

        setUser(storedUser);

        // Categories and departments are defined as constants below

      } catch (err) {
        setError("Failed to load form data. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear any previous errors
    if (error) setError("");
  };

  // Handle category change to auto-select department
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = complaintCategories.find(cat => cat.id === selectedCategoryId);

    setFormData(prev => ({
      ...prev,
      category: selectedCategoryId,
      department: selectedCategory ? selectedCategory.department : ""
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setError(`File ${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        setError(`File ${file.name} has invalid type. Only images and PDF files are allowed.`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
      setError("");
    }
  };

  // Remove selected file
  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setError("Please enter a complaint title.");
      return;
    }
    if (!formData.description.trim()) {
      setError("Please provide a detailed description.");
      return;
    }
    if (!formData.category) {
      setError("Please select a complaint category.");
      return;
    }
    if (!formData.location.trim()) {
      setError("Please specify the location.");
      return;
    }

    try {
      setSubmitLoading(true);
      setError("");
      setUploadProgress(0);

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/citizen-login");
        return;
      }

      // Prepare form data for submission
      const complaintData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        department: formData.department,
        location: formData.location.trim(),
        priority: formData.priority,
        anonymous: formData.anonymous,
        citizenId: user._id
      };

      // Simulate upload progress
      setUploadProgress(25);

      // TODO: Replace with actual API call when backend is ready
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUploadProgress(75);

      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(complaintData)
      });

      setUploadProgress(100);

      if (response.ok) {
        const result = await response.json();
        const generatedId = result.complaintId || `BPGSTS-${Date.now()}`;
        setComplaintId(generatedId);
        setShowSuccessModal(true);

        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          department: "",
          location: "",
          priority: "Medium",
          anonymous: false
        });
        setSelectedFiles([]);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to submit complaint. Please try again.");
      }

    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      console.error("Error submitting complaint:", err);
    } finally {
      setSubmitLoading(false);
      setUploadProgress(0);
    }
  };

  if (loading) {
    return (
      <>
        <CitizenNavbar />
        <Container className="py-5">
          <div className="text-center">
            <Spinner animation="border" variant="primary" size="lg" />
            <p className="mt-3 fs-5">Loading complaint registration form...</p>
          </div>
        </Container>
        <CitizenFooter />
      </>
    );
  }

  return (
    <>
      <CitizenNavbar />
      <div className="complaint-register-page">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              {/* Header Section */}
              <div className="text-center mb-5">
                <div className="flag-icon mb-3">🇮🇳</div>
                <h1 className="display-5 fw-bold text-primary mb-3">
                  <i className="bi bi-plus-circle-fill me-3"></i>
                  File a New Complaint
                </h1>
                <p className="lead text-muted mb-4">
                  Report issues affecting your community. Your voice matters in building a better Bharat.
                </p>
              </div>

              {/* Success/Error Messages */}
              {error && (
                <Alert variant="danger" className="mb-4 border-0 shadow-sm">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong>Error:</strong> {error}
                </Alert>
              )}

              {/* Complaint Registration Form */}
              <Card className="shadow-lg border-0 complaint-form-card">
                <Card.Header className="bg-primary text-white py-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-file-earmark-text-fill fs-3 me-3"></i>
                    <div>
                      <h4 className="mb-1">Complaint Registration Form</h4>
                      <small>Bharat Public Grievance & Service Tracking System (BPGSTS)</small>
                    </div>
                  </div>
                </Card.Header>

                <Card.Body className="p-4">
                  <Form onSubmit={handleSubmit}>
                    {/* Complaint Title */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold text-primary">
                        <i className="bi bi-tag-fill me-2"></i>
                        Complaint Title <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Brief title describing your complaint (e.g., Street Light Not Working)"
                        maxLength="100"
                        required
                        className="form-control-lg"
                      />
                      <Form.Text className="text-muted">
                        <i className="bi bi-info-circle me-1"></i>
                        {formData.title.length}/100 characters
                      </Form.Text>
                    </Form.Group>

                    {/* Category and Department */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold text-primary">
                            <i className="bi bi-grid-3x3-gap me-2"></i>
                            Category <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleCategoryChange}
                            required
                            className="form-select-lg"
                          >
                            <option value="">Select Complaint Category</option>
                            {complaintCategories.map(category => (
                              <option key={category.id} value={category.id}>
                                <i className={`bi ${category.icon} me-2`}></i>
                                {category.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold text-primary">
                            <i className="bi bi-building me-2"></i>
                            Concerned Department
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.department}
                            readOnly
                            placeholder="Auto-selected based on category"
                            className="form-control-lg bg-light"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Location and Priority */}
                    <Row className="mb-4">
                      <Col md={8}>
                        <Form.Group>
                          <Form.Label className="fw-bold text-primary">
                            <i className="bi bi-geo-alt-fill me-2"></i>
                            Location <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Specific location where the issue occurs (e.g., Main Road, Near Temple, Ward No. 5)"
                            required
                            className="form-control-lg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label className="fw-bold text-primary">
                            <i className="bi bi-flag-fill me-2"></i>
                            Priority Level
                          </Form.Label>
                          <Form.Select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            className="form-select-lg"
                          >
                            {priorityOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                <i className={`bi ${option.icon} me-2`}></i>
                                {option.label}
                              </option>
                            ))}
                          </Form.Select>
                          <div className="mt-2">
                            <Badge bg={priorityOptions.find(p => p.value === formData.priority)?.variant || "secondary"}>
                              <i className={`bi ${priorityOptions.find(p => p.value === formData.priority)?.icon} me-1`}></i>
                              {formData.priority}
                            </Badge>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Detailed Description */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold text-primary">
                        <i className="bi bi-textarea-resize me-2"></i>
                        Detailed Description <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Please provide detailed information about your complaint. Include:
• When did the issue start?
• How does it affect you and others?
• Any specific details about the problem
• What action do you expect?"
                        maxLength="1000"
                        required
                        className="form-control-lg"
                      />
                      <Form.Text className="text-muted">
                        <i className="bi bi-info-circle me-1"></i>
                        {formData.description.length}/1000 characters
                      </Form.Text>
                    </Form.Group>

                    {/* File Upload Section */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold text-primary">
                        <i className="bi bi-paperclip me-2"></i>
                        Attach Evidence (Optional)
                      </Form.Label>
                      <div className="file-upload-area border-2 border-dashed border-primary rounded p-4 text-center bg-light">
                        <i className="bi bi-cloud-upload-fill fs-1 text-primary mb-3"></i>
                        <div className="mb-3">
                          <Form.Control
                            type="file"
                            multiple
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="d-none"
                            id="file-upload"
                          />
                          <Button
                            variant="outline-primary"
                            size="lg"
                            onClick={() => document.getElementById('file-upload').click()}
                            disabled={selectedFiles.length >= 5}
                          >
                            <i className="bi bi-folder-plus me-2"></i>
                            Choose Files
                          </Button>
                        </div>
                        <small className="text-muted">
                          Upload images or PDF files (max 5MB each, up to 5 files)
                        </small>
                      </div>

                      {/* Selected Files Display */}
                      {selectedFiles.length > 0 && (
                        <div className="selected-files mt-3">
                          <h6 className="text-primary mb-2">
                            <i className="bi bi-files me-2"></i>
                            Selected Files ({selectedFiles.length}/5):
                          </h6>
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="file-item d-flex align-items-center justify-content-between bg-white border rounded p-2 mb-2">
                              <div className="d-flex align-items-center">
                                <i className="bi bi-file-earmark me-2 text-primary"></i>
                                <div>
                                  <small className="fw-bold">{file.name}</small>
                                  <br />
                                  <small className="text-muted">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </small>
                                </div>
                              </div>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="ms-2"
                              >
                                <i className="bi bi-x"></i>
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </Form.Group>

                    {/* Anonymous Submission Option */}
                    <Form.Group className="mb-4">
                      <div className="anonymous-option border rounded p-3 bg-light">
                        <Form.Check
                          type="checkbox"
                          name="anonymous"
                          checked={formData.anonymous}
                          onChange={handleInputChange}
                          label={
                            <div>
                              <strong className="text-primary">
                                <i className="bi bi-incognito me-2"></i>
                                Submit Anonymously
                              </strong>
                              <br />
                              <small className="text-muted">
                                Your identity will be protected, but you won't receive status updates or notifications about your complaint.
                              </small>
                            </div>
                          }
                        />
                      </div>
                    </Form.Group>

                    {/* Progress Bar */}
                    {submitLoading && (
                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-primary fw-bold">Submitting your complaint...</small>
                          <small className="text-muted">{uploadProgress}%</small>
                        </div>
                        <ProgressBar
                          now={uploadProgress}
                          className="progress-lg"
                          variant="primary"
                        />
                      </div>
                    )}

                    {/* Submit Buttons */}
                    <div className="d-flex gap-3 justify-content-end mt-4">
                      <Button
                        variant="outline-secondary"
                        size="lg"
                        onClick={() => navigate("/citizen-dashboard")}
                        disabled={submitLoading}
                        className="px-4"
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Dashboard
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={submitLoading}
                        className="px-5"
                      >
                        {submitLoading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send-fill me-2"></i>
                            Submit Complaint
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              {/* Help & Guidelines Section */}
              <Card className="mt-4 border-info bg-light">
                <Card.Body className="text-center">
                  <h5 className="text-info mb-3">
                    <i className="bi bi-info-circle-fill me-2"></i>
                    Complaint Filing Guidelines
                  </h5>
                  <Row className="text-start">
                    <Col md={6}>
                      <h6 className="text-primary">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        What to Include:
                      </h6>
                      <ul className="list-unstyled">
                        <li><i className="bi bi-dot me-2"></i>Clear problem description</li>
                        <li><i className="bi bi-dot me-2"></i>Specific location details</li>
                        <li><i className="bi bi-dot me-2"></i>When the issue started</li>
                        <li><i className="bi bi-dot me-2"></i>How it affects the community</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <h6 className="text-danger">
                        <i className="bi bi-x-circle-fill me-2"></i>
                        What NOT to Include:
                      </h6>
                      <ul className="list-unstyled">
                        <li><i className="bi bi-dot me-2"></i>Personal attacks or abusive language</li>
                        <li><i className="bi bi-dot me-2"></i>False or misleading information</li>
                        <li><i className="bi bi-dot me-2"></i>Requests for immediate cash payments</li>
                        <li><i className="bi bi-dot me-2"></i>Illegal or inappropriate content</li>
                      </ul>
                    </Col>
                  </Row>
                  <hr />
                  <div className="text-center">
                    <p className="mb-2 text-muted">
                      <strong>Emergency Services:</strong> For urgent matters requiring immediate attention,
                      please contact emergency services directly.
                    </p>
                    <Button 
                      variant="outline-info" 
                      size="sm"
                      onClick={() => setShowGuidelinesModal(true)}
                    >
                      <i className="bi bi-question-circle me-2"></i>
                      View Complete Guidelines
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
        className="success-modal"
      >
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>
            <i className="bi bi-check-circle-fill me-2"></i>
            Complaint Submitted Successfully!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-4">
          <div className="success-icon mb-3">
            <i className="bi bi-check-circle-fill text-success" style={{fontSize: '4rem'}}></i>
          </div>
          <h5 className="text-success mb-3">Your complaint has been registered!</h5>
          <div className="complaint-id-card bg-light p-3 rounded mb-3">
            <small className="text-muted d-block mb-1">Complaint ID</small>
            <h4 className="text-primary mb-0">{complaintId}</h4>
          </div>
          <p className="text-muted mb-3">
            Please save this Complaint ID for future reference.
            You can track the status of your complaint using this ID.
          </p>
          <Alert variant="info" className="text-start">
            <strong>What happens next?</strong>
            <ul className="mb-0 mt-2">
              <li>Your complaint will be reviewed by the concerned department</li>
              <li>You will receive updates on the progress</li>
              <li>Expected resolution time depends on the nature of the issue</li>
            </ul>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => navigate("/citizen-dashboard")}>
            <i className="bi bi-house me-2"></i>
            Go to Dashboard
          </Button>
          <Button variant="primary" onClick={() => navigate("/my-complaints")}>
            <i className="bi bi-list-check me-2"></i>
            View My Complaints
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Guidelines Modal */}
      <Modal
        show={showGuidelinesModal}
        onHide={() => setShowGuidelinesModal(false)}
        centered
        size="lg"
        scrollable
        className="guidelines-modal"
        backdrop="static"
        style={{ zIndex: 1060 }}
      >
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title>
            <i className="bi bi-book me-2"></i>
            Complete Complaint Filing Guidelines
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="mb-4">
            <h5 className="text-primary mb-3">
              <i className="bi bi-file-earmark-text me-2"></i>
              How to File an Effective Complaint
            </h5>
            <div className="alert alert-info">
              <strong>Remember:</strong> A well-written complaint helps us resolve your issue faster and more effectively.
            </div>
          </div>

          <Row>
            <Col md={6}>
              <Card className="border-success mb-3">
                <Card.Header className="bg-success text-white">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  What to Include
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-dot text-success me-2"></i>
                      <strong>Clear Title:</strong> Brief, specific description
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-dot text-success me-2"></i>
                      <strong>Detailed Description:</strong> Explain the problem thoroughly
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-dot text-success me-2"></i>
                      <strong>Exact Location:</strong> Street name, landmarks, ward number
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-dot text-success me-2"></i>
                      <strong>When it Started:</strong> Date/time the issue began
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-dot text-success me-2"></i>
                      <strong>Impact:</strong> How it affects you and the community
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-dot text-success me-2"></i>
                      <strong>Evidence:</strong> Photos, documents, or videos
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="border-danger mb-3">
                <Card.Header className="bg-danger text-white">
                  <i className="bi bi-x-circle-fill me-2"></i>
                  What NOT to Include
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-dot text-danger me-2"></i>
                      <strong>Abusive Language:</strong> Keep it respectful and professional
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-dot text-danger me-2"></i>
                      <strong>False Information:</strong> Only report facts you know to be true
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-dot text-danger me-2"></i>
                      <strong>Personal Attacks:</strong> Focus on the problem, not individuals
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-dot text-danger me-2"></i>
                      <strong>Cash Demands:</strong> Don't request immediate monetary compensation
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-dot text-danger me-2"></i>
                      <strong>Illegal Content:</strong> No threats, harassment, or illegal activities
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-dot text-danger me-2"></i>
                      <strong>Spam:</strong> Don't submit multiple complaints for the same issue
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="border-warning mb-3">
            <Card.Header className="bg-warning">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Important Guidelines
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="text-primary">Response Time</h6>
                  <ul>
                    <li><strong>High Priority:</strong> Within 24-48 hours</li>
                    <li><strong>Medium Priority:</strong> Within 3-5 working days</li>
                    <li><strong>Low Priority:</strong> Within 7-10 working days</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 className="text-primary">File Upload Guidelines</h6>
                  <ul>
                    <li>Maximum 5 files per complaint</li>
                    <li>Each file: Maximum 5MB</li>
                    <li>Allowed formats: Images (JPG, PNG, GIF) and PDF</li>
                    <li>Clear, relevant photos/videos preferred</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="border-info">
            <Card.Header className="bg-info text-white">
              <i className="bi bi-telephone-fill me-2"></i>
              Emergency Contacts
            </Card.Header>
            <Card.Body>
              <p className="mb-2">For urgent matters requiring immediate attention, contact:</p>
              <Row>
                <Col md={4}>
                  <div className="text-center p-2 bg-light rounded">
                    <i className="bi bi-shield-fill text-danger fs-3"></i>
                    <p className="mb-1"><strong>Police</strong></p>
                    <p className="mb-0 text-primary">100</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center p-2 bg-light rounded">
                    <i className="bi bi-plus-circle-fill text-danger fs-3"></i>
                    <p className="mb-1"><strong>Ambulance</strong></p>
                    <p className="mb-0 text-primary">108</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center p-2 bg-light rounded">
                    <i className="bi bi-fire text-warning fs-3"></i>
                    <p className="mb-1"><strong>Fire Brigade</strong></p>
                    <p className="mb-0 text-primary">101</p>
                  </div>
                </Col>
              </Row>
              <div className="alert alert-warning mt-3">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <strong>Note:</strong> Use the complaint system for non-emergency issues only. For life-threatening situations, call emergency services immediately.
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowGuidelinesModal(false)}>
            <i className="bi bi-x-circle me-2"></i>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowGuidelinesModal(false)}>
            <i className="bi bi-check-circle me-2"></i>
            I Understand
          </Button>
        </Modal.Footer>
      </Modal>

      <CitizenFooter />
    </>
  );
};

export default ComplaintRegister;
