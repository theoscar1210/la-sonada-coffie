/**
 * Rutas de autenticación
 * POST /auth/register — POST /auth/login — POST /auth/logout
 * POST /auth/refresh  — GET  /auth/me
 *
 * Los tokens JWT viajan en cookies httpOnly (no en el cuerpo de la respuesta).
 * El cliente nunca toca los tokens: el navegador los envía automáticamente.
 */

import type { FastifyPluginAsync } from 'fastify';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { registerUser, loginUser, refreshAccessToken, logoutUser } from '../services/auth.service.js';
import { authenticate } from '../middleware/authenticate.js';
import type { JwtPayload } from '../middleware/authenticate.js';

const ACCESS_TOKEN_MAX_AGE  = 15 * 60;           // 15 minutos en segundos
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;  // 7 días en segundos

function cookieOptions(isProd: boolean, maxAge: number) {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict' as const,
    path: '/',
    maxAge,
  };
}

export const authRoutes: FastifyPluginAsync = async (app) => {
  const isProd = process.env['NODE_ENV'] === 'production';

  // POST /auth/register
  app.post('/register', async (request, reply) => {
    const input = registerSchema.parse(request.body);
    const user = await registerUser(input);
    return reply.status(201).send({ success: true, data: user, error: null });
  });

  // POST /auth/login — setea accessToken y refreshToken como cookies httpOnly
  app.post('/login', async (request, reply) => {
    const input = loginSchema.parse(request.body);
    const result = await loginUser(input, app);

    reply.setCookie('accessToken', result.accessToken, cookieOptions(isProd, ACCESS_TOKEN_MAX_AGE));
    reply.setCookie('refreshToken', result.refreshToken, cookieOptions(isProd, REFRESH_TOKEN_MAX_AGE));

    // Solo devuelve datos del usuario — los tokens nunca salen al JS del cliente
    return reply.send({ success: true, data: { user: result.user }, error: null });
  });

  // POST /auth/refresh — lee refreshToken de cookie, rota el accessToken
  app.post('/refresh', async (request, reply) => {
    const refreshToken = request.cookies['refreshToken'];
    if (!refreshToken) {
      return reply.status(401).send({
        success: false,
        data: null,
        error: { code: 'MISSING_REFRESH_TOKEN', message: 'Sesión expirada' },
      });
    }

    const result = await refreshAccessToken(refreshToken, app);
    reply.setCookie('accessToken', result.accessToken, cookieOptions(isProd, ACCESS_TOKEN_MAX_AGE));

    return reply.send({ success: true, data: null, error: null });
  });

  // POST /auth/logout — invalida el refresh token en BD y limpia ambas cookies
  // No requiere authenticate: un accessToken expirado no debe bloquear el logout
  app.post('/logout', async (request, reply) => {
    const refreshToken = request.cookies['refreshToken'];
    if (refreshToken) {
      await logoutUser(refreshToken).catch(() => null);
    }
    reply.clearCookie('accessToken', { path: '/' });
    reply.clearCookie('refreshToken', { path: '/' });
    return reply.send({ success: true, data: { message: 'Sesión cerrada' }, error: null });
  });

  // GET /auth/me
  app.get('/me', { preHandler: [authenticate] }, async (request, reply) => {
    const user = request.user as JwtPayload;
    return reply.send({ success: true, data: { id: user.sub, email: user.email, role: user.role }, error: null });
  });
};
