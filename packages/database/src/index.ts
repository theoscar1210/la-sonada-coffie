/**
 * @la-sonada/database — Punto de entrada
 * Exporta el cliente Prisma singleton y todos los tipos
 */

import { PrismaClient } from '@prisma/client';

// Singleton para evitar múltiples instancias en desarrollo (hot reload)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env['NODE_ENV'] === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Re-exportar todos los tipos de Prisma
export * from '@prisma/client';
export type { Prisma } from '@prisma/client';
