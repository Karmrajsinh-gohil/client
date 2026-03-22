import React from "react";

const About = () => {
  return (
    <div>

      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="fw-bold">About BPGSTS</h1>
          <p className="lead">
            Bharat Public Grievance & Service Tracking System
          </p>
        </div>
      </div>

      <div className="container my-5">

        {/* Introduction */}
        <div className="text-center mb-5">
          <h3 className="fw-bold">A Step Towards Transparent Governance</h3>
          <p className="text-muted">
            The Bharat Public Grievance & Service Tracking System (BPGSTS) is a
            digital platform designed to help citizens register complaints and
            track their status in a simple, transparent, and efficient manner.
            It aims to strengthen communication between citizens and government
            authorities.
          </p>
        </div>

        {/* Core Values / Features */}
        <div className="row g-4">

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm text-center p-3">
              <div className="fs-1 text-primary">📢</div>
              <h5 className="fw-bold mt-3">Easy Complaint Filing</h5>
              <p className="text-muted small">
                Citizens can register complaints anytime from anywhere.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm text-center p-3">
              <div className="fs-1 text-success">📊</div>
              <h5 className="fw-bold mt-3">Status Tracking</h5>
              <p className="text-muted small">
                Real-time tracking ensures full transparency of complaint progress.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm text-center p-3">
              <div className="fs-1 text-warning">⚡</div>
              <h5 className="fw-bold mt-3">Fast Resolution</h5>
              <p className="text-muted small">
                Complaints are forwarded to the correct departments quickly.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm text-center p-3">
              <div className="fs-1 text-danger">🤝</div>
              <h5 className="fw-bold mt-3">Citizen Satisfaction</h5>
              <p className="text-muted small">
                Feedback system improves service quality and trust.
              </p>
            </div>
          </div>

        </div>

        {/* Objective Section */}
        <div className="mt-5 p-4 bg-light rounded shadow-sm">
          <h4 className="fw-bold text-center mb-3">Our Objective</h4>
          <p className="text-center text-muted">
            The primary objective of BPGSTS is to create a centralized system
            for handling public grievances efficiently, reducing manual work,
            increasing accountability, and ensuring that every citizen's voice
            is heard and addressed.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mt-5 text-center">
          <h4 className="fw-bold">Our Vision</h4>
          <p className="text-muted">
            To build a transparent, accountable, and citizen-friendly governance
            system using digital technology for better public service delivery.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="bg-dark text-white text-center py-3">
        <small>© 2026 BPGSTS | Public Service Portal (Demo Project)</small>
      </div>

    </div>
  );
};

export default About;