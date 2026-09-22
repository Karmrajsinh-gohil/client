import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Citizen Demo',
    email: 'citizen@example.com',
    phone: '+91 9876543210',
    address: '123, Sample Street, Surat'
  });

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Profile Management</h2>
      <div className="glass-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', marginRight: '20px' }}>
            {profile.name.charAt(0)}
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{profile.name}</h3>
            <p style={{ color: '#555' }}>Citizen Account</p>
          </div>
        </div>

        <form>
          <div className="grid-2">
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Full Name</label>
              <input type="text" className="glass-input" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
              <input type="email" className="glass-input" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Phone Number</label>
              <input type="tel" className="glass-input" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Address</label>
              <input type="text" className="glass-input" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} />
            </div>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button type="button" className="glass-btn" onClick={() => alert('Profile Updated!')}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
