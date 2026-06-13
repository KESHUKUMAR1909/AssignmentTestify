"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [newOrder, setNewOrder] = useState({ orderId: '', clientName: '', amount: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/api/v2/orders', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setOrders(data); })
      .catch(console.error);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.orderId) return;
    try {
      const res = await fetch('http://localhost:5000/api/v2/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newOrder)
      });
      const data = await res.json();
      if (res.ok) setOrders([...orders, data]);
      setNewOrder({ orderId: '', clientName: '', amount: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header title="Order Intake Management" />
      <div className="glass-card animate-fade-in delay-1">
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Client Orders</h3>
        
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" value={newOrder.orderId} onChange={e => setNewOrder({...newOrder, orderId: e.target.value})} placeholder="Order ID" style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="text" value={newOrder.clientName} onChange={e => setNewOrder({...newOrder, clientName: e.target.value})} placeholder="Client Name" style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="number" value={newOrder.amount} onChange={e => setNewOrder({...newOrder, amount: Number(e.target.value)})} placeholder="Amount ($)" style={{ width: '120px', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-accent)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create Order</button>
        </form>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--secondary-accent)' }}>
              <th style={{ padding: '0.8rem 0' }}>Order ID</th>
              <th>Client Name</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.8rem 0' }}>{order.orderId}</td>
                <td>{order.clientName}</td>
                <td>${order.amount}</td>
                <td><span style={{ color: '#ffb000' }}>{order.status || 'Draft'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
