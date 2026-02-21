/**
 * Auth Provider para React Admin
 * Solo permite acceso a usuarios con rol ADMIN
 */

import type { AuthProvider } from 'react-admin';

const API_URL = import.meta.env['VITE_API_URL'] ?? 'http://localhost:3001';

interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: { id: string; email: string; name: string; role: string };
  };
}

export const authProvider: AuthProvider = {
  login: async ({ username, password }: { username: string; password: string }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    });

    const json = (await res.json()) as LoginResponse;

    if (!json.success || !json.data) {
      throw new Error('Credenciales inválidas');
    }

    if (json.data.user.role !== 'ADMIN') {
      throw new Error('No tienes permisos de administrador');
    }

    localStorage.setItem('accessToken', json.data.accessToken);
    localStorage.setItem('refreshToken', json.data.refreshToken);
    localStorage.setItem('adminUser', JSON.stringify(json.data.user));
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
        },
        body: JSON.stringify({ refreshToken }),
      }).catch(() => null);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('adminUser');
  },

  checkAuth: () => {
    const token = localStorage.getItem('accessToken');
    return token ? Promise.resolve() : Promise.reject(new Error('No autenticado'));
  },

  checkError: (error: { status: number }) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('accessToken');
      return Promise.reject(new Error('Sesión expirada'));
    }
    return Promise.resolve();
  },

  getIdentity: async () => {
    const userStr = localStorage.getItem('adminUser');
    if (!userStr) return { id: '', fullName: 'Admin' };
    const user = JSON.parse(userStr) as { id: string; name: string; email: string };
    return { id: user.id, fullName: user.name, email: user.email };
  },

  getPermissions: () => {
    const userStr = localStorage.getItem('adminUser');
    if (!userStr) return Promise.resolve(null);
    const user = JSON.parse(userStr) as { role: string };
    return Promise.resolve(user.role);
  },
};
