import React from 'react';

export const ViewAssignedComplaints = () => (
    <div className="page-wrapper">
        <h2 className="page-title">Assigned Tasks</h2>
        <div className="glass-container">
            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '5px solid #e74c3c' }}>
                <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>CPL-1002 • Broken Water Pipe</h4>
                    <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>Loc: Main St. | Assigned: Today 10:00 AM </p>
                </div>
                <div>
                    <span style={{ background: '#e74c3c', color: '#fff', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>High Priority</span>
                    <button className="glass-btn" style={{ marginLeft: '10px' }}>View Details</button>
                </div>
            </div>
            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '5px solid #f39c12' }}>
                <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>CPL-1015 • Low Pressure</h4>
                    <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>Loc: Block B | Assigned: Yesterday </p>
                </div>
                <div>
                    <span style={{ background: '#f39c12', color: '#fff', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>Medium Priority</span>
                    <button className="glass-btn" style={{ marginLeft: '10px' }}>View Details</button>
                </div>
            </div>
        </div>
    </div>
);

export const UpdateComplaintProgress = () => (
    <div className="page-wrapper">
        <h2 className="page-title">Update Progress</h2>
        <div className="glass-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form>
                <label style={{ display: 'block', marginBottom: '8px' }}>Select Task ID</label>
                <select className="glass-input"><option>CPL-1002</option><option>CPL-1015</option></select>

                <label style={{ display: 'block', marginBottom: '8px' }}>Progress Description</label>
                <textarea className="glass-input" rows="4" placeholder="Briefly describe what has been done..."></textarea>

                <label style={{ display: 'block', marginBottom: '8px' }}>Update Status To</label>
                <select className="glass-input">
                    <option>In Progress</option>
                    <option>Pending Material</option>
                    <option>Delayed</option>
                </select>

                <button type="button" className="glass-btn" style={{ width: '100%', marginTop: '10px' }}>Save Progress update</button>
            </form>
        </div>
    </div>
);

export const CloseComplaint = () => (
    <div className="page-wrapper">
        <h2 className="page-title">Close Resolved Task</h2>
        <div className="glass-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form>
                <label style={{ display: 'block', marginBottom: '8px' }}>Task ID</label>
                <input type="text" className="glass-input" placeholder="e.g. CPL-1002" />

                <label style={{ display: 'block', marginBottom: '8px' }}>Resolution Remarks</label>
                <textarea className="glass-input" rows="4" placeholder="Final comments explaining the resolution..."></textarea>

                <label style={{ display: 'block', marginBottom: '8px' }}>Attach Proof (Photo/Doc)</label>
                <input type="file" className="glass-input" style={{ background: 'transparent' }} />

                <button type="button" className="glass-btn" style={{ width: '100%', background: '#27ae60', marginTop: '15px' }}>Mark as Resolved & Close</button>
            </form>
        </div>
    </div>
);

export const RespondToCitizen = () => (
    <div className="page-wrapper">
        <h2 className="page-title">Respond to Citizen Inquiry</h2>
        <div className="glass-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
             <p style={{ color: '#555', marginBottom: '20px' }}>Directly message the citizen to get clarification or inform them of specific delays.</p>
             <form>
                 <select className="glass-input"><option>-- Select Linked Complaint --</option><option>CPL-1015 (Pending Material)</option></select>
                 <textarea className="glass-input" rows="5" placeholder="Write your message here..."></textarea>
                 <button type="button" className="glass-btn" style={{ width: '100%' }}>Send Message</button>
             </form>
        </div>
    </div>
);
