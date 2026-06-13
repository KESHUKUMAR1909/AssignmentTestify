"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [role, setRole] = useState('Employee');
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setRole(user.role || 'Employee');
      } catch (e) { }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>SAAS MANAGER</h2>
      <div style={{ color: 'var(--primary-accent)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Role: {role}
      </div>
      <nav style={{ flex: 1 }}>
        <Link href="/" className="nav-link">Dashboard</Link>
        <Link href="/tasks" className="nav-link">Tasks & To-Do</Link>

        {/* RBAC: Only Admin or HR Manager can see HR Vault */}
        {(role === 'Admin' || role === 'Owner' || role === 'HR_Manager') && (
          <Link href="/hr" className="nav-link">HR Vault</Link>
        )}

        {/* RBAC: Only Admin or Dept Head can see Analytics and Inventory */}
        {(role === 'Admin' || role === 'Owner' || role === 'Department_Head') && (
          <>
            <Link href="/inventory" className="nav-link">Inventory</Link>
            <Link href="/analytics" className="nav-link">Analytics</Link>
          </>
        )}

        <Link href="/performance" className="nav-link">Performance</Link>
        <Link href="/sops" className="nav-link">SOPs</Link>

        {(role === 'Admin' || role === 'Owner') && (
          <Link href="/orders" className="nav-link">Orders</Link>
        )}
      </nav>

      <button onClick={handleLogout} style={{ marginTop: 'auto', background: 'rgba(255, 92, 92, 0.1)', color: '#ff5c5c', border: '1px solid rgba(255, 92, 92, 0.2)', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s' }}>
        Logout
      </button>
    </aside>
  );
}
