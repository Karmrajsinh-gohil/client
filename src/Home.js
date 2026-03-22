import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>

      {/* HERO SECTION */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="fw-bold">
            Bharat Public Grievance & Service Tracking System
          </h1>
          <p className="lead">
            Transparent | Efficient | Citizen-Centric Governance
          </p>

          <div className="mt-4">
            <button
              className="btn btn-light me-3"
              onClick={() => navigate("/register")}
            >
              Citizen Registration
            </button>

            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/login")}
            >
                Citizen Login
            </button>
          </div>
        </div>
      </div>

      <div className="container my-5">

        {/* QUICK SERVICES */}
        <h3 className="text-center fw-bold mb-4">Citizen Services</h3>

        <div className="row g-4">

          {[
            { title: "About System", icon: "ℹ️", path: "/about" },
            { title: "Services", icon: "🛠️", path: "/services" },
            { title: "Complaint Categories", icon: "📂", path: "/categories" },
            { title: "FAQs", icon: "❓", path: "/faqs" },
            { title: "Public Notices", icon: "📢", path: "/notices" },
            { title: "Contact Us", icon: "📞", path: "/contact" },
          ].map((item, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="card h-100 border-0 shadow-sm text-center p-4"
                style={{ cursor: "pointer", transition: "0.3s" }}
                onClick={() => navigate(item.path)}
              >
                <div className="fs-1">{item.icon}</div>
                <h5 className="mt-3">{item.title}</h5>
              </div>
            </div>
          ))}

        </div>

        {/* STATISTICS SECTION */}
        <div className="mt-5 p-4 bg-light rounded shadow-sm">
          <h4 className="text-center fw-bold mb-4">System Statistics</h4>

          <div className="row text-center">
            <div className="col-md-3">
              <h3 className="text-primary">1200+</h3>
              <p>Total Complaints</p>
            </div>
            <div className="col-md-3">
              <h3 className="text-success">950+</h3>
              <p>Resolved</p>
            </div>
            <div className="col-md-3">
              <h3 className="text-warning">200+</h3>
              <p>In Progress</p>
            </div>
            <div className="col-md-3">
              <h3 className="text-danger">50+</h3>
              <p>Pending</p>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-5">
          <h3 className="text-center fw-bold mb-4">How It Works</h3>

          <div className="row text-center">
            <div className="col-md-4">
              <h5>1. Register Complaint</h5>
              <p className="text-muted small">
                Submit your issue through the online form.
              </p>
            </div>

            <div className="col-md-4">
              <h5>2. Department Action</h5>
              <p className="text-muted small">
                Complaint is assigned to the relevant authority.
              </p>
            </div>

            <div className="col-md-4">
              <h5>3. Track & Resolve</h5>
              <p className="text-muted small">
                Track progress until resolution is completed.
              </p>
            </div>
          </div>
        </div>

        {/* PUBLIC NOTICE PREVIEW */}
        <div className="mt-5">
          <h3 className="text-center fw-bold mb-4">Latest Public Notices</h3>

          <ul className="list-group">
            <li className="list-group-item">
              New grievance redressal policy implemented
            </li>
            <li className="list-group-item">
              Water supply maintenance scheduled this week
            </li>
            <li className="list-group-item">
              Road repair updates in urban areas
            </li>
          </ul>
        </div>

      </div>

      {/* FOOTER */}
      <div className="bg-dark text-white text-center py-3">
        <p className="mb-0">
          © 2026 BPGSTS | Government Public Service Portal
        </p>
      </div>

    </div>
  );
};

export default HomePage;