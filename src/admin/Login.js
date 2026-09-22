import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login
    navigate('/admin/dashboard');
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="glass-container" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="page-title" style={{ fontSize: '2rem', marginBottom: '10px' }}>Admin Portal</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px', color: '#555' }}>Login to manage the system</p>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            className="glass-input" 
            placeholder="Admin Username" 
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            required
          />
          <input 
            type="password" 
            className="glass-input" 
            placeholder="Password" 
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
          <button type="submit" className="glass-btn" style={{ width: '100%', marginTop: '10px' }}>Login as Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
