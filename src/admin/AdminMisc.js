import React from 'react';

export const GenerateReport = () => (
    <div className="page-wrapper">
      <h2 className="page-title">Generate System Reports</h2>
      <div className="glass-container">
         <div className="grid-2">
            <div className="glass-card" style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '15px' }}>Monthly Resolution Report</h3>
                <p style={{ color: '#555', marginBottom: '20px' }}>Download statistics of complaints resolved vs registered.</p>
                <button className="glass-btn" style={{ background: '#27ae60' }}>Download PDF</button>
            </div>
            <div className="glass-card" style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '15px' }}>Department Performance</h3>
                <p style={{ color: '#555', marginBottom: '20px' }}>Average resolution time per department.</p>
                <button className="glass-btn" style={{ background: '#3498db' }}>Export Excel</button>
            </div>
         </div>
      </div>
    </div>
);

export const ViewFeedback = () => (
    <div className="page-wrapper">
      <h2 className="page-title">Citizen Feedback & Ratings</h2>
      <div className="glass-container">
        <div className="glass-card" style={{ borderLeft: '5px solid #f1c40f', marginBottom: '15px' }}>
            <h4 style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                <span>CPL-001 (Water Supply)</span>
                <span style={{ color: '#f39c12' }}>⭐⭐⭐⭐☆</span>
            </h4>
            <p style={{ margin: '10px 0 0 0', color: '#555' }}>"The issue was resolved quickly, but the staff was slightly rude."</p>
        </div>
        <div className="glass-card" style={{ borderLeft: '5px solid #27ae60', marginBottom: '15px' }}>
            <h4 style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                <span>CPL-032 (Electricity)</span>
                <span style={{ color: '#f39c12' }}>⭐⭐⭐⭐⭐</span>
            </h4>
            <p style={{ margin: '10px 0 0 0', color: '#555' }}>"Excellent service. Problem fixed within 2 hours."</p>
        </div>
      </div>
    </div>
);

export const SystemSettings = () => (
    <div className="page-wrapper">
      <h2 className="page-title">System Settings</h2>
      <div className="glass-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Portal Name</label>
                <input type="text" className="glass-input" defaultValue="BPGSTS" />
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="maint" style={{ width: '20px', height: '20px' }} />
                <label htmlFor="maint" style={{ fontWeight: '500' }}>Enable Maintenance Mode</label>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Admin Notification Email</label>
                <input type="email" className="glass-input" defaultValue="admin@bpgsts.gov.in" />
            </div>
            <button type="button" className="glass-btn" style={{ width: '100%' }}>Save Settings</button>
        </form>
      </div>
    </div>
);
