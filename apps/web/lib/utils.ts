import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { RoastLevel } from '@/types';

/** Combina clases Tailwind sin conflictos */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea precio en pesos colombianos */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Mapa de niveles de tostión a etiquetas en español */
export const roastLevelLabels: Record<RoastLevel, string> = {
  LIGHT: 'Tostión Clara',
  MEDIUM_LIGHT: 'Tostión Media-Clara',
  MEDIUM: 'Tostión Media',
  MEDIUM_DARK: 'Tostión Media-Oscura',
  DARK: 'Tostión Oscura',
};

/** Mapa de estados de orden */
export const orderStatusLabels = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmado',
  PROCESSING: 'En preparación',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
  REFUNDED: 'Reembolsado',
} as const;

/** Clases de color por estado de orden */
export const orderStatusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-purple-100 text-purple-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-gray-100 text-gray-800',
} as const;

/** Trunca texto a n caracteres */
export function truncate(text: string, n: number): string {
  return text.length > n ? `${text.slice(0, n)}…` : text;
}

/** Genera URL de imagen de Cloudinary con transformaciones */
export function cloudinaryUrl(
  url: string,
  opts: { width?: number; height?: number; quality?: number } = {},
): string {
  const { width = 800, height, quality = 80 } = opts;
  const transforms = [`w_${width}`, `q_${quality}`, 'f_auto'];
  if (height) transforms.push(`h_${height}`, 'c_fill');

  return url.replace('/upload/', `/upload/${transforms.join(',')}/`);
}
