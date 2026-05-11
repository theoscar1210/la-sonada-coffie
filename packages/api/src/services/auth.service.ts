/**
 * Servicio de autenticación
 * Maneja registro, login y refresh tokens.
 *
 * SEGURIDAD — refresh tokens:
 * El token que viaja al cliente (en cookie httpOnly) es el valor raw (40 bytes hex).
 * Lo que se almacena en base de datos es el SHA-256 de ese valor.
 * Si la BD se compromete, los hashes son inútiles sin el raw original.
 */

import { randomBytes, createHash } from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@la-sonada/database';
import type { FastifyInstance } from 'fastify';
import type { RegisterInput, LoginInput } from '../schemas/auth.schema.js';

const REFRESH_EXPIRES_DAYS = 7;

function generateRefreshToken(): { raw: string; hash: string } {
  const raw = randomBytes(40).toString('hex');
  const hash = createHash('sha256').update(raw).digest('hex');
  return { raw, hash };
}

function hashToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex');
}

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

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_EXPIRES_DAYS);

  // Guardar HASH en BD — el cliente recibe solo el raw
  const { raw, hash } = generateRefreshToken();
  await prisma.refreshToken.create({
    data: { token: hash, userId: user.id, expiresAt },
  });

  return {
    accessToken,
    refreshToken: raw,   // raw viaja al cliente (en cookie httpOnly)
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  };
}

export async function refreshAccessToken(rawToken: string, app: FastifyInstance) {
  const hash = hashToken(rawToken);
  const record = await prisma.refreshToken.findUnique({ where: { token: hash } });

  if (!record || record.expiresAt < new Date()) {
    if (record) await prisma.refreshToken.delete({ where: { token: hash } });
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

export async function logoutUser(rawToken: string) {
  const hash = hashToken(rawToken);
  await prisma.refreshToken.deleteMany({ where: { token: hash } });
}
