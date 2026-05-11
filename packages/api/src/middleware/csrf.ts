/**
 * Protección CSRF via validación de Origin header.
 * Complementa SameSite=strict en cookies para mayor defensa en profundidad.
 * Excluye el webhook de Stripe (viene de servidores Stripe, no del browser).
 */

import type { FastifyReply, FastifyRequest } from 'fastify';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
// Rutas que reciben tráfico de terceros (no del browser del usuario)
const CSRF_EXEMPT = ['/payments/webhook'];

export async function csrfProtection(request: FastifyRequest, reply: FastifyReply) {
  if (SAFE_METHODS.has(request.method)) return;
  if (CSRF_EXEMPT.some((path) => request.url.endsWith(path))) return;

  const origin = request.headers['origin'];
  const allowed = [
    process.env['FRONTEND_URL'] ?? 'http://localhost:3000',
    process.env['ADMIN_URL'] ?? 'http://localhost:3002',
  ];

  if (!origin || !allowed.includes(origin)) {
    return reply.status(403).send({
      success: false,
      data: null,
      error: { code: 'CSRF_REJECTED', message: 'Origen no permitido' },
    });
  }
}
