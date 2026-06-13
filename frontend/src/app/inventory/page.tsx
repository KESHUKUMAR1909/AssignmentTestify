"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({ itemName: '', category: '', quantity: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/api/v2/inventory', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setItems(data); })
      .catch(console.error);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.itemName) return;
    try {
      const res = await fetch('http://localhost:5000/api/v2/inventory', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newItem)
      });
      const data = await res.json();
      if (res.ok) setItems([...items, data]);
      setNewItem({ itemName: '', category: '', quantity: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header title="Inventory Management" />
      <div className="glass-card animate-fade-in delay-1">
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Hardware & Assets</h3>
        
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" value={newItem.itemName} onChange={e => setNewItem({...newItem, itemName: e.target.value})} placeholder="Item Name" style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="text" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} placeholder="Category" style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="number" value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: Number(e.target.value)})} placeholder="Qty" style={{ width: '80px', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-accent)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Item</button>
        </form>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--secondary-accent)' }}>
              <th style={{ padding: '0.8rem 0' }}>Item Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.8rem 0' }}>{item.itemName}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td><span style={{ color: item.quantity > 5 ? '#00d084' : '#ff5c5c' }}>{item.quantity > 5 ? 'In-Stock' : 'Low-Stock'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
