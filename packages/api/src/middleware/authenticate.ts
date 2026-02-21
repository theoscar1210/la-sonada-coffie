/**
 * Middleware de autenticación JWT
 * Uso: preHandler: [authenticate] en rutas protegidas
 *      preHandler: [authenticateAdmin] en rutas de admin
 */

import type { FastifyReply, FastifyRequest } from 'fastify';

export interface JwtPayload {
  sub: string; // user id
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify<JwtPayload>();
  } catch {
    return reply.status(401).send({
      success: false,
      data: null,
      error: { code: 'UNAUTHORIZED', message: 'Token inválido o expirado' },
    });
  }
}

export async function authenticateAdmin(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify<JwtPayload>();
    const user = request.user as JwtPayload;
    if (user.role !== 'ADMIN') {
      return reply.status(403).send({
        success: false,
        data: null,
        error: { code: 'FORBIDDEN', message: 'Acceso denegado' },
      });
    }
  } catch {
    return reply.status(401).send({
      success: false,
      data: null,
      error: { code: 'UNAUTHORIZED', message: 'Token inválido o expirado' },
    });
  }
}
