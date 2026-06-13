import React from 'react';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header title="Overview" />

      <section className="stats-grid">
        <div className="glass-card animate-fade-in delay-1">
          <div className="stat-label">Active Tasks</div>
          <div className="stat-value">24</div>
        </div>
        <div className="glass-card animate-fade-in delay-2">
          <div className="stat-label">Pending Orders</div>
          <div className="stat-value">12</div>
        </div>
        <div className="glass-card animate-fade-in delay-3">
          <div className="stat-label">SOP Updates</div>
          <div className="stat-value">3</div>
        </div>
        <div className="glass-card animate-fade-in delay-3">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">$12.5k</div>
        </div>
      </section>

      <section className="recent-activity glass-card animate-fade-in delay-3">
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Recent Tasks Activity</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--secondary-accent)' }}>
              <th style={{ padding: '0.8rem 0' }}>Task Name</th>
              <th>Assignee</th>
              <th>Status</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '0.8rem 0' }}>Update SOP for HR</td>
              <td>John Doe</td>
              <td><span style={{ color: '#ffb000' }}>In-Progress</span></td>
              <td>Tomorrow</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '0.8rem 0' }}>Client Onboarding Setup</td>
              <td>Jane Smith</td>
              <td><span style={{ color: '#00d084' }}>Completed</span></td>
              <td>Today</td>
            </tr>
            <tr>
              <td style={{ padding: '0.8rem 0' }}>Quarterly Performance Review</td>
              <td>Admin User</td>
              <td><span style={{ color: '#ff5c5c' }}>Overdue</span></td>
              <td>Yesterday</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
