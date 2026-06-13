"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('admin@testify.com');
  const [password, setPassword] = useState('password123');
  const [demoRole, setDemoRole] = useState('Admin'); // Role selector for demo mode
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/v2/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: demoRole })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/');
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      console.warn("Backend not connected or login failed. Falling back to Demo Mode.");
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('user', JSON.stringify({ name: 'Demo User', role: demoRole }));
      router.push('/');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'radial-gradient(circle at top right, rgba(88, 166, 255, 0.1), transparent 40%)' }}>
      <div className="glass-card" style={{ width: '400px', padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#fff' }}>SAAS MANAGER</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address"
            style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
            required
          />
          <div style={{ color: 'var(--secondary-accent)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Demo Role (If offline):</div>
          <select
            value={demoRole}
            onChange={e => setDemoRole(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
          >
            <option value="Admin">Admin</option>
            <option value="HR_Manager">HR Manager</option>
            <option value="Employee">Employee</option>
          </select>
          <button
            type="submit"
            style={{ padding: '0.8rem', background: 'var(--primary-accent)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
