import React from 'react';

const GenericList = ({ title, columns, data }) => (
  <div className="page-wrapper">
    <h2 className="page-title">{title}</h2>
    <div className="glass-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <input type="text" className="glass-input" placeholder="Search..." style={{ maxWidth: '300px', margin: 0 }} />
        <button className="glass-btn">+ Add New</button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
              {columns.map((col, i) => <th key={i} style={{ padding: '15px' }}>{col}</th>)}
              <th style={{ padding: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}>
                {columns.map((col, i) => <td key={i} style={{ padding: '15px' }}>{row[col.toLowerCase().replace(/ /g, '')] || row[col]}</td>)}
                <td style={{ padding: '15px' }}>
                  <button className="glass-btn" style={{ padding: '5px 10px', fontSize: '0.8rem', marginRight: '5px', background: '#3498db' }}>Edit</button>
                  <button className="glass-btn" style={{ padding: '5px 10px', fontSize: '0.8rem', background: '#e74c3c' }}>Delete</button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={columns.length + 1} style={{ padding: '20px', textAlign: 'center', color: '#777' }}>No records found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export const ManageUsers = () => <GenericList title="Manage Users" columns={['ID', 'Name', 'Email', 'Role']} data={[{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Citizen' }, { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Authority' }]} />;

export const ManageDepartment = () => <GenericList title="Manage Departments" columns={['ID', 'Department Name', 'Head']} data={[{ id: 101, 'Department Name': 'Water Supply', head: 'Mr. Sharma' }, { id: 102, 'Department Name': 'Electricity', head: 'Mrs. Gupta' }]} />;

export const ManageComplaintCategory = () => <GenericList title="Manage Complaint Categories" columns={['ID', 'Category Name', 'Department']} data={[{ id: 1, 'categoryname': 'Street Light', department: 'Electricity' }, { id: 2, 'categoryname': 'Pipe Leakage', department: 'Water Supply' }]} />;
