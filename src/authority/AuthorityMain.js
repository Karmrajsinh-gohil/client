import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const AuthorityLogin = () => {
    const navigate = useNavigate();
    return (
        <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="glass-container" style={{ width: '100%', maxWidth: '400px', borderTop: '5px solid #27ae60' }}>
                <h2 className="page-title" style={{ fontSize: '1.8rem', background: 'none', color: '#27ae60' }}>Authority Login</h2>
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>Service Department Access</p>
                <form onSubmit={(e) => { e.preventDefault(); navigate('/authority/dashboard'); }}>
                    <input type="text" className="glass-input" placeholder="Department ID or Email" required />
                    <input type="password" className="glass-input" placeholder="Password" required />
                    <button type="submit" className="glass-btn" style={{ width: '100%', background: '#27ae60' }}>Secure Login</button>
                </form>
            </div>
        </div>
    );
};

export const AuthorityDashboard = () => (
    <div className="page-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 className="page-title" style={{ margin: 0, background: 'none', color: '#2c3e50' }}>Service Authority Workspace</h2>
            <Link to="/authority/login" className="glass-btn" style={{ textDecoration: 'none', background: '#e74c3c' }}>Logout</Link>
        </div>
        <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '40px' }}>
            {[
                { label: 'Assigned Complaints', count: '142', color: '#3498db' },
                { label: 'In Progress', count: '85', color: '#f39c12' },
                { label: 'Resolved (This Month)', count: '57', color: '#27ae60' }
            ].map((stat, i) => (
                <div key={i} className="glass-card" style={{ borderLeft: `5px solid ${stat.color}` }}>
                    <h4 style={{ color: '#555', marginBottom: '10px' }}>{stat.label}</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color, margin: 0 }}>{stat.count}</p>
                </div>
            ))}
        </div>
        <h3 style={{ marginBottom: '20px' }}>Task Controls</h3>
        <div className="grid-2">
            {[
                { title: 'View Assigned Complaints', path: '/authority/assigned' },
                { title: 'Update Complaint Progress', path: '/authority/update-progress' },
                { title: 'Close Complaint', path: '/authority/close' },
                { title: 'Respond to Citizen', path: '/authority/respond' },
                { title: 'Change Password', path: '/authority/change-password' }
            ].map((link, i) => (
                <Link key={i} to={link.path} style={{ textDecoration: 'none' }}>
                    <div className="glass-container" style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold', color: '#34495e', background: 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }}>
                        {link.title}
                    </div>
                </Link>
            ))}
        </div>
    </div>
);
