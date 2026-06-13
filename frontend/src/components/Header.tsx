import React from 'react';

export default function Header({ title }: { title: string }) {
  return (
    <header className="header animate-fade-in">
      <h1>{title}</h1>
      <div className="user-profile">
        <span>Welcome, Admin</span>
        <div className="avatar"></div>
      </div>
    </header>
  );
}
