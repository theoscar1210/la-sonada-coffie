/**
 * Rutas de pagos con Stripe
 * POST /payments/create-intent — Crea PaymentIntent
 * POST /payments/webhook       — Webhook de Stripe
 */

import type { FastifyPluginAsync } from 'fastify';
import { createPaymentIntent, handleStripeWebhook } from '../services/payment.service.js';
import { authenticate } from '../middleware/authenticate.js';
import type { JwtPayload } from '../middleware/authenticate.js';

export const paymentRoutes: FastifyPluginAsync = async (app) => {
  // POST /payments/create-intent
  app.post('/create-intent', { preHandler: [authenticate] }, async (request, reply) => {
    const user = request.user as JwtPayload;
    const { orderId } = request.body as { orderId: string };

    if (!orderId) {
      return reply.status(400).send({
        success: false,
        data: null,
        error: { code: 'MISSING_ORDER', message: 'orderId es requerido' },
      });
    }

    const result = await createPaymentIntent(orderId, user.sub);
    return reply.send({ success: true, data: result, error: null });
  });

  // POST /payments/webhook — Stripe llama a este endpoint
  // Importante: el cuerpo debe ser el raw body (Buffer)
  app.post(
    '/webhook',
    {
      config: { rawBody: true },
    },
    async (request, reply) => {
      const signature = request.headers['stripe-signature'];
      if (!signature || typeof signature !== 'string') {
        return reply.status(400).send({ success: false, data: null, error: { code: 'MISSING_SIGNATURE', message: 'Firma Stripe faltante' } });
      }

      const result = await handleStripeWebhook(request.rawBody as Buffer, signature);
      return reply.send({ success: true, data: result, error: null });
    },
  );
};
