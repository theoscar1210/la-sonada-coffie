/**
 * LA SOÑADA COFFIE — Fastify App Factory
 * Configura todos los plugins, rutas y hooks del servidor
 */

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import { authRoutes } from './routes/auth.js';
import { productRoutes } from './routes/products.js';
import { orderRoutes } from './routes/orders.js';
import { paymentRoutes } from './routes/payments.js';
import { userRoutes } from './routes/users.js';
import { errorHandler } from './middleware/errorHandler.js';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env['NODE_ENV'] === 'production' ? 'info' : 'debug',
      transport:
        process.env['NODE_ENV'] !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
    },
  });

  // ── Seguridad ────────────────────────────────────────────────
  await app.register(helmet, { contentSecurityPolicy: false });

  await app.register(cors, {
    origin: [
      process.env['FRONTEND_URL'] ?? 'http://localhost:3000',
      process.env['ADMIN_URL'] ?? 'http://localhost:3002',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // ── JWT ─────────────────────────────────────────────────────
  await app.register(jwt, {
    secret: process.env['JWT_SECRET'] ?? 'dev-secret-change-in-production',
    sign: { expiresIn: process.env['JWT_EXPIRES_IN'] ?? '15m' },
  });

  // ── Swagger Docs ─────────────────────────────────────────────
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'LA SOÑADA COFFIE API',
        description: 'REST API para e-commerce de café premium',
        version: '1.0.0',
      },
      servers: [{ url: `http://localhost:${process.env['PORT'] ?? 3001}` }],
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        },
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'tag', deepLinking: false },
  });

  // ── Health check ─────────────────────────────────────────────
  app.get('/health', { schema: { tags: ['system'] } }, async () => ({
    success: true,
    data: { status: 'ok', timestamp: new Date().toISOString() },
  }));

  // ── Rutas ────────────────────────────────────────────────────
  await app.register(authRoutes, { prefix: '/auth' });
  await app.register(productRoutes, { prefix: '/products' });
  await app.register(orderRoutes, { prefix: '/orders' });
  await app.register(paymentRoutes, { prefix: '/payments' });
  await app.register(userRoutes, { prefix: '/users' });

  // ── Error handler global ──────────────────────────────────────
  app.setErrorHandler(errorHandler);

  return app;
}
