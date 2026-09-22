import React from 'react';

const ComplaintHistory = () => {
  const dummyComplaints = [
    { id: 'CPL-001', category: 'Road & Transport', status: 'Resolved', date: '2026-01-10', priority: 'High' },
    { id: 'CPL-002', category: 'Electricity', status: 'In Progress', date: '2026-02-15', priority: 'Medium' },
    { id: 'CPL-003', category: 'Water Supply', status: 'Pending', date: '2026-03-20', priority: 'High' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return '#27ae60';
      case 'In Progress': return '#f39c12';
      default: return '#e74c3c';
    }
  };

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Complaint History</h2>
      <div className="glass-container">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                <th style={{ padding: '15px' }}>Complaint ID</th>
                <th style={{ padding: '15px' }}>Category</th>
                <th style={{ padding: '15px' }}>Date</th>
                <th style={{ padding: '15px' }}>Priority</th>
                <th style={{ padding: '15px' }}>Status</th>
                <th style={{ padding: '15px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyComplaints.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}>
                  <td style={{ padding: '15px', fontWeight: '500' }}>{c.id}</td>
                  <td style={{ padding: '15px' }}>{c.category}</td>
                  <td style={{ padding: '15px' }}>{c.date}</td>
                  <td style={{ padding: '15px' }}>{c.priority}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '5px 10px', 
                      borderRadius: '20px', 
                      background: `rgba(${c.status === 'Resolved' ? '39, 174, 96' : c.status === 'In Progress' ? '243, 156, 18' : '231, 76, 60'}, 0.2)`,
                      color: getStatusColor(c.status),
                      fontWeight: 'bold',
                      fontSize: '0.85rem'
                    }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <button className="glass-btn" style={{ padding: '5px 10px', fontSize: '0.9rem' }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplaintHistory;
