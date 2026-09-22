import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,245', color: '#3498db' },
    { title: 'Departments', value: '12', color: '#9b59b6' },
    { title: 'Total Complaints', value: '8,432', color: '#e67e22' },
    { title: 'Pending Complaints', value: '432', color: '#e74c3c' },
    { title: 'Resolved Complaints', value: '7,800', color: '#2ecc71' }
  ];

  const quickLinks = [
    { title: 'Manage Users', path: '/admin/manage-users' },
    { title: 'Manage Departments', path: '/admin/manage-departments' },
    { title: 'Complaint Categories', path: '/admin/manage-categories' },
    { title: 'View All Complaints', path: '/admin/view-complaints' },
    { title: 'Assign Complaints', path: '/admin/assign-complaints' },
    { title: 'Update Status', path: '/admin/update-status' },
    { title: 'Generate Reports', path: '/admin/generate-reports' },
    { title: 'View Feedback', path: '/admin/view-feedback' },
    { title: 'System Settings', path: '/admin/settings' }
  ];

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 className="page-title" style={{ margin: 0 }}>Administrator Dashboard</h2>
        <Link to="/admin/login" className="glass-btn" style={{ textDecoration: 'none', background: '#e74c3c' }}>Logout</Link>
      </div>
      
      <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '40px' }}>
        {stats.map((stat, index) => (
          <div key={index} className="glass-card" style={{ textAlign: 'center', borderTop: `4px solid ${stat.color}` }}>
            <h3 style={{ color: '#555', fontSize: '1rem', marginBottom: '10px' }}>{stat.title}</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: '20px', color: '#333' }}>Quick Management Links</h3>
      <div className="grid-2">
        {quickLinks.map((link, index) => (
          <Link key={index} to={link.path} style={{ textDecoration: 'none' }}>
            <div className="glass-container" style={{ padding: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', fontWeight: '600', color: '#2c3e50', background: 'rgba(255, 255, 255, 0.4)' }}>
              {link.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;