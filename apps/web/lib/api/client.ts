/**
 * Cliente HTTP para la API de LA SOÑADA COFFIE
 * Maneja tokens JWT, refresh automático y formato estándar de respuesta
 */

import type { ApiResponse } from '@/types';

const API_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  private setTokens(accessToken: string, refreshToken?: string) {
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const res = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) return false;

      const data = (await res.json()) as ApiResponse<{ accessToken: string }>;
      if (data.success && data.data) {
        this.setTokens(data.data.accessToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers = {}, cache, next } = options;
    const accessToken = this.getAccessToken();

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      ...(cache ? { cache } : {}),
      ...(next ? { next } : {}),
    };

    let res = await fetch(`${this.baseUrl}${endpoint}`, fetchOptions);

    // Intentar refresh si 401
    if (res.status === 401 && accessToken) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        const newToken = this.getAccessToken();
        if (newToken) {
          fetchOptions.headers = {
            ...(fetchOptions.headers as Record<string, string>),
            Authorization: `Bearer ${newToken}`,
          };
        }
        res = await fetch(`${this.baseUrl}${endpoint}`, fetchOptions);
      }
    }

    const data = (await res.json()) as ApiResponse<T>;
    return data;
  }

  // Métodos de conveniencia
  get<T>(endpoint: string, opts?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...opts, method: 'GET' });
  }

  post<T>(endpoint: string, body: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...opts, method: 'POST', body });
  }

  put<T>(endpoint: string, body: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...opts, method: 'PUT', body });
  }

  patch<T>(endpoint: string, body: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...opts, method: 'PATCH', body });
  }

  delete<T>(endpoint: string, opts?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...opts, method: 'DELETE' });
  }

  saveTokens(accessToken: string, refreshToken: string) {
    this.setTokens(accessToken, refreshToken);
  }
}

export const api = new ApiClient(API_URL);
