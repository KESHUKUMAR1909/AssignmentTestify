"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function SOPsPage() {
  const [sops, setSops] = useState<any[]>([]);
  const [newSOP, setNewSOP] = useState({ code: '', title: '', department: '', effectiveDate: '', revisionDate: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/v2/sops', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setSops(data); })
      .catch(console.error);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSOP.title) return;
    try {
      const res = await fetch('http://localhost:5000/api/v2/sops', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newSOP)
      });
      const data = await res.json();
      if (res.ok) setSops([...sops, data]);
      setNewSOP({ code: '', title: '', department: '', effectiveDate: '', revisionDate: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header title="Standard Operating Procedures (SOP)" />
      <div className="glass-card animate-fade-in delay-1">
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>SOP Library</h3>
        
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" value={newSOP.code} onChange={e => setNewSOP({...newSOP, code: e.target.value})} placeholder="SOP Code" style={{ width: '100px', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="text" value={newSOP.title} onChange={e => setNewSOP({...newSOP, title: e.target.value})} placeholder="SOP Title" style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="text" value={newSOP.department} onChange={e => setNewSOP({...newSOP, department: e.target.value})} placeholder="Department" style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="date" value={newSOP.effectiveDate} onChange={e => setNewSOP({...newSOP, effectiveDate: e.target.value, revisionDate: e.target.value})} style={{ width: '150px', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff', colorScheme: 'dark' }} />
          <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-accent)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create SOP</button>
        </form>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--secondary-accent)' }}>
              <th style={{ padding: '0.8rem 0' }}>Code</th>
              <th>Title</th>
              <th>Department</th>
              <th>Effective Date</th>
            </tr>
          </thead>
          <tbody>
            {sops.map(sop => (
              <tr key={sop._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.8rem 0' }}>{sop.code}</td>
                <td>{sop.title}</td>
                <td>{sop.department}</td>
                <td>{new Date(sop.effectiveDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
