/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AuthProvider.tsx
'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const { data } = await axiosInstance.get('/api/user/');
          setUser(data); // Set user data
        } catch (error) {
            console.log(error)
            logout(); // Logout if token is invalid
        }
      }
    };
    checkAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem('access_token', token);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
