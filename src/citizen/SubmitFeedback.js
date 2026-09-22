import React, { useState } from 'react';

const SubmitFeedback = () => {
  const [formData, setFormData] = useState({ complaintId: '', rating: 5, comments: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Feedback submitted successfully!');
    setFormData({ complaintId: '', rating: 5, comments: '' });
  };

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Submit Feedback</h2>
      <div className="glass-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ marginBottom: '20px', color: '#555', textAlign: 'center' }}>We value your input. Let us know how we did in resolving your issue.</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Complaint ID (Optional)</label>
            <input 
              type="text" 
              className="glass-input" 
              placeholder="e.g., CPL-001" 
              value={formData.complaintId}
              onChange={(e) => setFormData({...formData, complaintId: e.target.value})}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Rating (1-5)</label>
            <input 
              type="number" 
              min="1" max="5" 
              className="glass-input" 
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: e.target.value})}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Comments / Suggestions</label>
            <textarea 
              className="glass-input" 
              rows="5"
              placeholder="Your feedback..."
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
              required
            ></textarea>
          </div>
          <button type="submit" className="glass-btn" style={{ width: '100%' }}>Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitFeedback;
