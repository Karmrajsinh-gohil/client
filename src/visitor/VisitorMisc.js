import React from 'react';

export const ComplaintCategories = () => (
    <div className="page-wrapper">
        <h2 className="page-title">Complaint Categories</h2>
        <div className="grid-2">
            {[
                { name: 'Water Supply', desc: 'No water, polluted water, pipe leaks.', icon: '💧' },
                { name: 'Electricity', desc: 'Power cuts, fluctuating voltage, sparks.', icon: '⚡' },
                { name: 'Roads & Transport', desc: 'Potholes, broken signals, transport issues.', icon: '🛣️' },
                { name: 'Sanitation', desc: 'Garbage collection, overflowing drains.', icon: '🗑️' }
            ].map((cat, i) => (
                <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: '3rem', marginRight: '20px' }}>{cat.icon}</div>
                    <div>
                        <h3 style={{ marginBottom: '5px' }}>{cat.name}</h3>
                        <p style={{ color: '#555', fontSize: '0.9rem' }}>{cat.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const FAQs = () => (
    <div className="page-wrapper">
        <h2 className="page-title">Frequently Asked Questions</h2>
        <div className="glass-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
                { q: 'How do I track my complaint?', a: 'Log in to your citizen dashboard and go to "Track Complaint". You can view the live status there.' },
                { q: 'Is there a fee for registering a complaint?', a: 'No, using the BPGSTS portal is completely free for all citizens.' },
                { q: 'How long does resolution take?', a: 'It depends on the severity and department, but usually, first response is within 48 hours.' }
            ].map((faq, i) => (
                <div key={i} style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <h4 style={{ color: '#2c3e50', marginBottom: '8px' }}>Q: {faq.q}</h4>
                    <p style={{ color: '#555', margin: 0 }}>A: {faq.a}</p>
                </div>
            ))}
        </div>
    </div>
);

export const PublicNotices = () => (
    <div className="page-wrapper">
        <h2 className="page-title">Public Notices</h2>
        <div className="glass-container">
            <div className="glass-card" style={{ borderLeft: '5px solid #e74c3c' }}>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>March 24, 2026</span>
                <h3 style={{ margin: '5px 0' }}>Scheduled Water Supply Interruption in Zone A</h3>
                <p style={{ color: '#555' }}>Due to main pipeline maintenance, water supply will be affected on March 25th from 10 AM to 4 PM.</p>
            </div>
            <div className="glass-card" style={{ borderLeft: '5px solid #3498db' }}>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>March 20, 2026</span>
                <h3 style={{ margin: '5px 0' }}>New Digital Payment Gateway Available</h3>
                <p style={{ color: '#555' }}>Citizens can now pay municipal taxes directly through the portal with 0% gateway fee.</p>
            </div>
        </div>
    </div>
);

export const ContactUs = () => (
    <div className="page-wrapper">
        <h2 className="page-title">Contact Us</h2>
        <div className="grid-2">
            <div className="glass-card">
                <h3>Get in Touch</h3>
                <p style={{ color: '#555', marginBottom: '15px' }}>Fill out the form below for general inquiries (not for complaints).</p>
                <form>
                    <input type="text" className="glass-input" placeholder="Your Name" />
                    <input type="email" className="glass-input" placeholder="Email Address" />
                    <textarea className="glass-input" rows="4" placeholder="Message"></textarea>
                    <button type="button" className="glass-btn">Send Message</button>
                </form>
            </div>
            <div className="glass-card">
                <h3>Our Office</h3>
                <p><strong>Address:</strong> BPGSTS Headquarters, Sector 12, Gandhinagar</p>
                <p><strong>Email:</strong> support@bpgsts.gov.in</p>
                <p><strong>Helpline:</strong> 1800-XXX-XXXX (Toll Free)</p>
                <div style={{ marginTop: '20px', height: '200px', background: '#ccc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                    [Map Placeholder]
                </div>
            </div>
        </div>
    </div>
);

export const HelpPage = () => (
    <div className="page-wrapper">
        <h2 className="page-title">Portal Help & Guide</h2>
        <div className="glass-container">
            <h3>How to Register a Complaint?</h3>
            <ol style={{ marginLeft: '20px', marginBottom: '20px', color: '#444' }}>
                <li style={{ marginBottom: '10px' }}>Click on Register to create an account or Login.</li>
                <li style={{ marginBottom: '10px' }}>Go to the Dashboard and click 'Lodge New Complaint'.</li>
                <li style={{ marginBottom: '10px' }}>Select the category, describe the issue, and attach photos if any.</li>
                <li style={{ marginBottom: '10px' }}>Click Submit and note down your Tracking ID.</li>
            </ol>
            
            <h3>Understanding Status Flags</h3>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <div style={{ flex: 1, padding: '15px', background: 'rgba(231, 76, 60, 0.1)', borderRadius: '8px', border: '1px solid #e74c3c' }}>
                    <strong>Pending:</strong> Awaiting authority assignment.
                </div>
                <div style={{ flex: 1, padding: '15px', background: 'rgba(243, 156, 18, 0.1)', borderRadius: '8px', border: '1px solid #f39c12' }}>
                    <strong>In Progress:</strong> Department is actively working on it.
                </div>
                <div style={{ flex: 1, padding: '15px', background: 'rgba(39, 174, 96, 0.1)', borderRadius: '8px', border: '1px solid #27ae60' }}>
                    <strong>Resolved:</strong> Issue has been completely fixed.
                </div>
            </div>
        </div>
    </div>
);
