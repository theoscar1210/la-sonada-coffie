/**
 * Rutas de autenticación
 * POST /auth/register — POST /auth/login — POST /auth/logout
 * POST /auth/refresh  — GET  /auth/me
 */

import type { FastifyPluginAsync } from 'fastify';
import { registerSchema, loginSchema, refreshSchema } from '../schemas/auth.schema.js';
import { registerUser, loginUser, refreshAccessToken, logoutUser } from '../services/auth.service.js';
import { authenticate } from '../middleware/authenticate.js';
import type { JwtPayload } from '../middleware/authenticate.js';

export const authRoutes: FastifyPluginAsync = async (app) => {
  // POST /auth/register
  app.post('/register', async (request, reply) => {
    const input = registerSchema.parse(request.body);
    const user = await registerUser(input);
    return reply.status(201).send({ success: true, data: user, error: null });
  });

  // POST /auth/login
  app.post('/login', async (request, reply) => {
    const input = loginSchema.parse(request.body);
    const result = await loginUser(input, app);
    return reply.send({ success: true, data: result, error: null });
  });

  // POST /auth/refresh
  app.post('/refresh', async (request, reply) => {
    const { refreshToken } = refreshSchema.parse(request.body);
    const result = await refreshAccessToken(refreshToken, app);
    return reply.send({ success: true, data: result, error: null });
  });

  // POST /auth/logout
  app.post('/logout', { preHandler: [authenticate] }, async (request, reply) => {
    const { refreshToken } = refreshSchema.parse(request.body);
    await logoutUser(refreshToken);
    return reply.send({ success: true, data: { message: 'Sesión cerrada' }, error: null });
  });

  // GET /auth/me
  app.get('/me', { preHandler: [authenticate] }, async (request, reply) => {
    const user = request.user as JwtPayload;
    return reply.send({ success: true, data: { id: user.sub, email: user.email, role: user.role }, error: null });
  });
};
