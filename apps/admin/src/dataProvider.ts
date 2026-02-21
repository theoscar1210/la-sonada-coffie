/**
 * Data Provider personalizado para la API de LA SOÑADA COFFIE
 * Traduce las operaciones de React Admin al formato de nuestra API
 */

import type { DataProvider } from 'react-admin';

const API_URL = import.meta.env['VITE_API_URL'] ?? 'http://localhost:3001';

function getToken(): string {
  return localStorage.getItem('accessToken') ?? '';
}

function headers(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { ...options, headers: headers() });
  const json = (await res.json()) as { success: boolean; data: T; error?: { message: string } };

  if (!json.success) {
    throw new Error(json.error?.message ?? 'API error');
  }
  return json.data;
}

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = new URLSearchParams({
      page: String(page),
      limit: String(perPage),
      sortField: field,
      sortOrder: order,
      ...Object.fromEntries(
        Object.entries(params.filter as Record<string, string>).map(([k, v]) => [k, String(v)]),
      ),
    });

    const data = await apiFetch<{ [key: string]: unknown[]; pagination: { total: number } }>(
      `/${resource}?${query.toString()}`,
    );

    const key = Object.keys(data).find((k) => k !== 'pagination') ?? resource;
    const records = (data[key] as Record<string, unknown>[]) ?? [];

    return { data: records, total: data.pagination?.total ?? records.length };
  },

  getOne: async (resource, params) => {
    const data = await apiFetch<Record<string, unknown>>(`/${resource}/${params.id}`);
    return { data };
  },

  getMany: async (resource, params) => {
    const results = await Promise.all(
      params.ids.map((id) => apiFetch<Record<string, unknown>>(`/${resource}/${id}`)),
    );
    return { data: results };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const query = new URLSearchParams({
      page: String(page),
      limit: String(perPage),
      [params.target]: String(params.id),
    });

    const data = await apiFetch<{ [key: string]: unknown[]; pagination: { total: number } }>(
      `/${resource}?${query.toString()}`,
    );

    const key = Object.keys(data).find((k) => k !== 'pagination') ?? resource;
    const records = (data[key] as Record<string, unknown>[]) ?? [];
    return { data: records, total: data.pagination?.total ?? records.length };
  },

  create: async (resource, params) => {
    const data = await apiFetch<Record<string, unknown>>(`/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data };
  },

  update: async (resource, params) => {
    const data = await apiFetch<Record<string, unknown>>(`/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return { data };
  },

  updateMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        apiFetch(`/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        }),
      ),
    );
    return { data: params.ids };
  },

  delete: async (resource, params) => {
    const data = await apiFetch<Record<string, unknown>>(`/${resource}/${params.id}`, {
      method: 'DELETE',
    });
    return { data };
  },

  deleteMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) => apiFetch(`/${resource}/${id}`, { method: 'DELETE' })),
    );
    return { data: params.ids };
  },
};
