"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function HRPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [newEmployee, setNewEmployee] = useState({ employeeId: '', department: '', designation: '', joiningDate: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/v2/hr', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setEmployees(data); })
      .catch(console.error);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployee.employeeId) return;
    try {
      // Need a valid userId from DB to create an HR Employee, so we'll mock it locally if backend fails
      const userStr = localStorage.getItem('user');
      const userId = userStr ? JSON.parse(userStr)._id : '123';

      const res = await fetch('http://localhost:5000/api/v2/hr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...newEmployee, userId })
      });
      const data = await res.json();
      if (res.ok) setEmployees([...employees, data]);
      setNewEmployee({ employeeId: '', department: '', designation: '', joiningDate: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header title="HR Vault & Employee Onboarding" />
      <div className="glass-card animate-fade-in delay-1">
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Employee Directory</h3>

        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" value={newEmployee.employeeId} onChange={e => setNewEmployee({ ...newEmployee, employeeId: e.target.value })} placeholder="Emp ID" style={{ width: '100px', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="text" value={newEmployee.department} onChange={e => setNewEmployee({ ...newEmployee, department: e.target.value })} placeholder="Department" style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="text" value={newEmployee.designation} onChange={e => setNewEmployee({ ...newEmployee, designation: e.target.value })} placeholder="Designation" style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="date" value={newEmployee.joiningDate} onChange={e => setNewEmployee({ ...newEmployee, joiningDate: e.target.value })} style={{ width: '150px', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff', colorScheme: 'dark' }} />
          <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-accent)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Onboard</button>
        </form>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--secondary-accent)' }}>
              <th style={{ padding: '0.8rem 0' }}>Emp ID</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.8rem 0' }}>{emp.employeeId}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>{new Date(emp.joiningDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
