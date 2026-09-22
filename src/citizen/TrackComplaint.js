import React, { useState } from 'react';

const TrackComplaint = () => {
  const [complaintId, setComplaintId] = useState('');
  const [status, setStatus] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if(complaintId) {
      // Mock tracking status
      setStatus({ id: complaintId, state: 'In Progress', department: 'Water Supply', date: new Date().toLocaleDateString() });
    }
  };

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Track Complaint Status</h2>
      <div className="glass-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleTrack}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Enter Complaint ID</label>
            <input 
              type="text" 
              className="glass-input" 
              placeholder="e.g., CPL-2026-X1Y2" 
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="glass-btn" style={{ width: '100%' }}>Track Status</button>
        </form>

        {status && (
          <div className="glass-card" style={{ marginTop: '30px', borderLeft: '5px solid #667eea' }}>
            <h3 style={{ marginBottom: '15px' }}>Complaint Details</h3>
            <p><strong>ID:</strong> {status.id}</p>
            <p><strong>Department:</strong> {status.department}</p>
            <p><strong>Date Registered:</strong> {status.date}</p>
            <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(102, 126, 234, 0.2)', borderRadius: '8px' }}>
              <strong style={{ color: '#2c3e50' }}>Current Status: {status.state}</strong>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
              <span style={{ color: '#27ae60', fontWeight: 'bold' }}>● Submitted</span>
              <span style={{ color: '#f39c12', fontWeight: 'bold' }}>● In Progress</span>
              <span style={{ color: '#bdc3c7' }}>○ Resolved</span>
            </div>
            <div style={{ height: '4px', background: 'linear-gradient(to right, #27ae60 33%, #f39c12 33% 66%, #bdc3c7 66%)', marginTop: '10px', borderRadius: '4px' }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackComplaint;
