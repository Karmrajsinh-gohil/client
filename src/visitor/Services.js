import React from "react";

const Services = () => {
  const services = [
    {
      title: "Online Complaint Registration",
      description:
        "Citizens can easily register complaints related to public services such as roads, water supply, electricity, sanitation, and more.",
      icon: "📝",
    },
    {
      title: "Real-Time Complaint Tracking",
      description:
        "Track the status of your complaint in real-time and get updates on progress and resolution.",
      icon: "📊",
    },
    {
      title: "Department Assignment",
      description:
        "Complaints are automatically assigned to the appropriate government department for quick action.",
      icon: "🏢",
    },
    {
      title: "User Dashboard",
      description:
        "A personalized dashboard where users can view, manage, and track all their complaints.",
      icon: "👤",
    },
    {
      title: "Feedback System",
      description:
        "Citizens can provide feedback on resolved complaints to improve service quality.",
      icon: "⭐",
    },
    {
      title: "Admin Monitoring",
      description:
        "Admins can monitor all complaints, manage users, and generate reports for better governance.",
      icon: "⚙️",
    },
    {
      title: "Authority Panel",
      description:
        "Authorities can update complaint status, respond to citizens, and close complaints efficiently.",
      icon: "📁",
    },
    {
      title: "Public Notices & Updates",
      description:
        "Stay informed with latest government notices, announcements, and updates.",
      icon: "📢",
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">
        Services Offered by BPGSTS
      </h2>

      <p className="text-center mb-5">
        The Bharat Public Grievance & Service Tracking System (BPGSTS) provides
        a transparent and efficient platform for citizens to raise and track
        complaints related to public services.
      </p>

      <div className="row">
        {services.map((service, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <h1>{service.icon}</h1>
                <h5 className="card-title mt-3">{service.title}</h5>
                <p className="card-text text-muted">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;