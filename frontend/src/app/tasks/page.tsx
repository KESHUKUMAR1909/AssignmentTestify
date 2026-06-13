"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v2/tasks', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !deadline) return alert("Title and Deadline are required");

    try {
      // Get the logged-in user's ID to assign the task to them for the demo
      const userStr = localStorage.getItem('user');
      const userId = userStr ? JSON.parse(userStr)._id : null;

      const res = await fetch('http://localhost:5000/api/v2/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: newTaskTitle,
          deadline,
          assignee: userId
        })
      });
      const data = await res.json();
      if (res.ok) {
        setTasks([...tasks, data]);
        setNewTaskTitle('');
        setDeadline('');
        fetchTasks(); // Refresh to get populated assignee details
      } else {
        alert(data.message || "Failed to create task");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v2/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchTasks(); // Refresh tasks after update
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header title="Tasks & To-Do List" />
      <div className="glass-card animate-fade-in delay-1">
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Task Management Board</h3>

        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            placeholder="Enter new task title..."
            style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
          />
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff', colorScheme: 'dark' }}
          />
          <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-accent)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Task</button>
        </form>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--secondary-accent)' }}>
              <th style={{ padding: '0.8rem 0' }}>Task Name</th>
              <th>Assignee</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.8rem 0' }}>{task.title}</td>
                <td>{task.assignee?.name || 'Unassigned'}</td>
                <td>{new Date(task.deadline).toLocaleDateString()}</td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task._id, e.target.value)}
                    style={{
                      padding: '0.4rem',
                      borderRadius: '4px',
                      border: '1px solid var(--glass-border)',
                      background: task.status === 'Completed' ? 'rgba(0, 208, 132, 0.2)' : 'rgba(0,0,0,0.2)',
                      color: task.status === 'Completed' ? '#00d084' : '#ffb000',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Unseen" style={{ color: '#000' }}>Unseen</option>
                    <option value="In-Progress" style={{ color: '#000' }}>In-Progress</option>
                    <option value="Completed" style={{ color: '#000' }}>Completed</option>
                    <option value="Overdue" style={{ color: '#000' }}>Overdue</option>
                  </select>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>No tasks found.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
