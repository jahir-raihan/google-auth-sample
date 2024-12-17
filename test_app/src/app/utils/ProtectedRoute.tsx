// src/utils/ProtectedRoute.tsx
'use client';

import React from 'react';
import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
