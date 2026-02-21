/**
 * Store de autenticación con Zustand
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '@/lib/api/client';
import type { User } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, _get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        const res = await api.post<{ accessToken: string; refreshToken: string; user: User }>(
          '/auth/login',
          { email, password },
        );
        if (!res.success || !res.data) {
          set({ isLoading: false });
          throw new Error(res.error?.message ?? 'Error al iniciar sesión');
        }
        api.saveTokens(res.data.accessToken, res.data.refreshToken);
        set({ user: res.data.user, isAuthenticated: true, isLoading: false });
      },

      register: async (name, email, password) => {
        set({ isLoading: true });
        const res = await api.post<User>('/auth/register', { name, email, password });
        if (!res.success) {
          set({ isLoading: false });
          throw new Error(res.error?.message ?? 'Error al registrarse');
        }
        set({ isLoading: false });
      },

      logout: async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          await api.post('/auth/logout', { refreshToken }).catch(() => null);
        }
        api.clearTokens();
        set({ user: null, isAuthenticated: false });
      },

      fetchMe: async () => {
        const res = await api.get<User>('/auth/me');
        if (res.success && res.data) {
          set({ user: res.data, isAuthenticated: true });
        }
      },
    }),
    {
      name: 'la-sonada-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
);
