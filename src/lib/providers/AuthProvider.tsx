'use client';

import { useEffect } from 'react';

import { fetchWithAuth } from '../api/fetchWithAuth';
import { useAuthStore } from '../stores/auth.store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    async function init() {
      try {
        const response = await fetchWithAuth('/api/auth/me');

        if (!response.ok) {
          logout();
          return;
        }

        const data = await response.json();
        login(data.user);
      } catch (error) {
        console.error('Auth initialization failed:', error);
        logout();
      }
    }

    init();
  }, [login, logout]);

  return children;
}
