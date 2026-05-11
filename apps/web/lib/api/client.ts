/**
 * Cliente HTTP para la API de LA SOÑADA COFFIE
 * Los tokens JWT viajan en cookies httpOnly gestionadas por el servidor.
 * credentials: 'include' hace que el navegador las envíe automáticamente.
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

  private async refreshToken(): Promise<boolean> {
    try {
      // El navegador envía la cookie refreshToken automáticamente
      const res = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers = {}, cache, next } = options;

    const fetchOptions: RequestInit = {
      method,
      credentials: 'include', // envía cookies httpOnly automáticamente
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      ...(cache ? { cache } : {}),
      ...(next ? { next } : {}),
    };

    let res = await fetch(`${this.baseUrl}${endpoint}`, fetchOptions);

    // Intentar refresh automático si el accessToken expiró
    if (res.status === 401) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        // El servidor ya seteó la nueva cookie — reintentar con la misma config
        res = await fetch(`${this.baseUrl}${endpoint}`, fetchOptions);
      }
    }

    const data = (await res.json()) as ApiResponse<T>;
    return data;
  }

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
}

export const api = new ApiClient(API_URL);
