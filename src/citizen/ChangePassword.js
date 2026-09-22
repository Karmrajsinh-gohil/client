import React, { useState } from 'react';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Change Password</h2>
      <div className="glass-container" style={{ maxWidth: '450px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Current Password</label>
            <input 
              type="password" 
              className="glass-input" 
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>New Password</label>
            <input 
              type="password" 
              className="glass-input" 
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Confirm New Password</label>
            <input 
              type="password" 
              className="glass-input" 
              value={passwords.confirm}
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="glass-btn" style={{ width: '100%' }}>Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
