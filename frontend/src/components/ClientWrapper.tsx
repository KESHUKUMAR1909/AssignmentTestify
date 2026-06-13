"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && pathname !== '/login') {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading...</div>;

  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <main className="main-content" style={{ padding: 0, background: 'var(--bg-color)' }}>{children}</main>;
  }

  // Prevent flash of protected content
  if (!isAuthenticated) return null;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
