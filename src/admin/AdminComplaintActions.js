import React from 'react';

export const ViewAllComplaints = () => (
  <div className="page-wrapper">
    <h2 className="page-title">All Complaints Overview</h2>
    <div className="glass-container">
      <p style={{ marginBottom: '20px' }}>Here an admin can review all system complaints, filter by status, priority, and date.</p>
      <div className="glass-card">
         <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <select className="glass-input" style={{ width: 'auto', margin: 0 }}><option>All Departments</option></select>
            <select className="glass-input" style={{ width: 'auto', margin: 0 }}><option>All Statuses</option></select>
            <button className="glass-btn">Filter</button>
         </div>
         <p style={{ textAlign: 'center', color: '#777', padding: '40px' }}>[Complaints Data Grid Goes Here]</p>
      </div>
    </div>
  </div>
);

export const AssignComplaint = () => (
    <div className="page-wrapper">
      <h2 className="page-title">Assign Complaints to Authority</h2>
      <div className="glass-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form>
            <label style={{ display: 'block', marginBottom: '8px' }}>Select Complaint ID</label>
            <select className="glass-input"><option>CPL-001 - Water Leakage</option></select>
            
            <label style={{ display: 'block', marginBottom: '8px', marginTop: '15px' }}>Assign To Department/Authority</label>
            <select className="glass-input"><option>Dept: Water Supply - Officer: Mahesh</option></select>

            <button type="button" className="glass-btn" style={{ width: '100%', marginTop: '20px' }}>Assign Task</button>
        </form>
      </div>
    </div>
);

export const UpdateComplaintStatus = () => (
    <div className="page-wrapper">
      <h2 className="page-title">Update Complaint Status (Admin Bypass)</h2>
      <div className="glass-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
         <p style={{ color: '#666', marginBottom: '20px' }}>* Usually handled by authority, but admin has override privileges.</p>
         <form>
            <label style={{ display: 'block', marginBottom: '8px' }}>Complaint ID</label>
            <input type="text" className="glass-input" placeholder="Scan or Enter ID" />
            
            <label style={{ display: 'block', marginBottom: '8px', marginTop: '15px' }}>New Status</label>
            <select className="glass-input">
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Dismissed</option>
            </select>
            <button type="button" className="glass-btn" style={{ width: '100%', marginTop: '20px' }}>Update Status</button>
         </form>
      </div>
    </div>
);
