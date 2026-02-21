/**
 * Servicio de autenticación
 * Maneja registro, login y refresh tokens
 */

import bcrypt from 'bcryptjs';
import { prisma } from '@la-sonada/database';
import type { FastifyInstance } from 'fastify';
import type { RegisterInput, LoginInput } from '../schemas/auth.schema.js';

const REFRESH_EXPIRES_DAYS = 7;

export async function registerUser(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    const error = new Error('El email ya está registrado') as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: { email: input.email, name: input.name, passwordHash },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  return user;
}

export async function loginUser(input: LoginInput, app: FastifyInstance) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  if (!user || !user.isActive) {
    const error = new Error('Credenciales inválidas') as Error & { statusCode: number };
    error.statusCode = 401;
    throw error;
  }

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) {
    const error = new Error('Credenciales inválidas') as Error & { statusCode: number };
    error.statusCode = 401;
    throw error;
  }

  const accessToken = app.jwt.sign({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  // Crear refresh token en BD
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_EXPIRES_DAYS);

  const refreshTokenRecord = await prisma.refreshToken.create({
    data: {
      token: crypto.randomUUID(),
      userId: user.id,
      expiresAt,
    },
  });

  return {
    accessToken,
    refreshToken: refreshTokenRecord.token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}

export async function refreshAccessToken(token: string, app: FastifyInstance) {
  const record = await prisma.refreshToken.findUnique({ where: { token } });

  if (!record || record.expiresAt < new Date()) {
    // Limpiar token expirado si existe
    if (record) await prisma.refreshToken.delete({ where: { token } });
    const error = new Error('Refresh token inválido o expirado') as Error & { statusCode: number };
    error.statusCode = 401;
    throw error;
  }

  const user = await prisma.user.findUnique({ where: { id: record.userId } });
  if (!user || !user.isActive) {
    const error = new Error('Usuario no encontrado') as Error & { statusCode: number };
    error.statusCode = 401;
    throw error;
  }

  const accessToken = app.jwt.sign({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  return { accessToken };
}

export async function logoutUser(refreshToken: string) {
  await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
}
