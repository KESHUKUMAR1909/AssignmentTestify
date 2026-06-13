"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function PerformancePage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ reviewPeriod: '', rating: 5, feedback: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/v2/performance', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setReviews(data); })
      .catch(console.error);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.reviewPeriod) return;
    try {
      // Mocking the employee ID using the logged in user ID since we don't have a user selector
      const userStr = localStorage.getItem('user');
      const userId = userStr ? JSON.parse(userStr)._id : null;

      const res = await fetch('http://localhost:5000/api/v2/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...newReview, employeeId: userId })
      });
      const data = await res.json();
      if (res.ok) setReviews([...reviews, data]);
      setNewReview({ reviewPeriod: '', rating: 5, feedback: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header title="Performance Reviews" />
      <div className="glass-card animate-fade-in delay-1">
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Quarterly Reviews</h3>

        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" value={newReview.reviewPeriod} onChange={e => setNewReview({ ...newReview, reviewPeriod: e.target.value })} placeholder="Period (e.g., Q1 2024)" style={{ width: '180px', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="number" min="1" max="5" value={newReview.rating} onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })} placeholder="Rating (1-5)" style={{ width: '100px', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <input type="text" value={newReview.feedback} onChange={e => setNewReview({ ...newReview, feedback: e.target.value })} placeholder="Review Feedback" style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-accent)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit Review</button>
        </form>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--secondary-accent)' }}>
              <th style={{ padding: '0.8rem 0' }}>Period</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.8rem 0' }}>{review.reviewPeriod}</td>
                <td><span style={{ color: review.rating >= 4 ? '#00d084' : '#ffb000' }}>{review.rating} / 5</span></td>
                <td>{review.feedback}</td>
                <td><span style={{ color: '#8b949e' }}>{review.status || 'Draft'}</span></td>
              </tr>
            ))}
            {reviews.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>No reviews found.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
