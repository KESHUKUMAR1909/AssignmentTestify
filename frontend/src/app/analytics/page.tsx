import React from 'react';
import Header from '@/components/Header';

export default function AnalyticsPage() {
  return (
    <>
      <Header title="Department-Wise Analytics" />
      <div className="glass-card animate-fade-in delay-1">
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Performance Charts</h3>
        <p>Visualize task completion rates, inventory costs, and HR metrics.</p>
        <div style={{ marginTop: '2rem', height: '200px', background: 'linear-gradient(180deg, rgba(88, 166, 255, 0.2) 0%, transparent 100%)', borderRadius: '8px', display: 'flex', alignItems: 'flex-end', padding: '1rem', gap: '10px' }}>
          {/* Mock Chart Bars */}
          <div style={{ width: '40px', height: '40%', background: 'var(--primary-accent)', borderRadius: '4px' }}></div>
          <div style={{ width: '40px', height: '70%', background: 'var(--primary-accent)', borderRadius: '4px' }}></div>
          <div style={{ width: '40px', height: '50%', background: 'var(--primary-accent)', borderRadius: '4px' }}></div>
          <div style={{ width: '40px', height: '90%', background: 'var(--primary-accent)', borderRadius: '4px' }}></div>
        </div>
      </div>
    </>
  );
}
