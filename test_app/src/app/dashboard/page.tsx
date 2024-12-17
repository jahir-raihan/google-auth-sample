// src/app/dashboard/page.tsx
'use client';

import ProtectedRoute from '../utils/ProtectedRoute';

import { useAuth } from './../components/AuthProvider';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <button onClick={logout}>Logout</button>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
