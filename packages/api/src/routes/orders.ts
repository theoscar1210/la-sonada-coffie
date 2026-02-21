/**
 * Rutas de órdenes
 * POST   /orders              — Crear orden
 * GET    /orders              — Listar (admin: todas | user: las propias)
 * GET    /orders/:id          — Detalle
 * PATCH  /orders/:id/status   — Cambiar estado (admin)
 */

import type { FastifyPluginAsync } from 'fastify';
import { createOrderSchema, updateOrderStatusSchema } from '../schemas/order.schema.js';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from '../services/order.service.js';
import { authenticate, authenticateAdmin } from '../middleware/authenticate.js';
import type { JwtPayload } from '../middleware/authenticate.js';

export const orderRoutes: FastifyPluginAsync = async (app) => {
  // POST /orders
  app.post('/', { preHandler: [authenticate] }, async (request, reply) => {
    const user = request.user as JwtPayload;
    const input = createOrderSchema.parse(request.body);
    const order = await createOrder(user.sub, input);
    return reply.status(201).send({ success: true, data: order, error: null });
  });

  // GET /orders
  app.get('/', { preHandler: [authenticate] }, async (request, reply) => {
    const user = request.user as JwtPayload;
    const { page = '1', limit = '10' } = request.query as { page?: string; limit?: string };
    const result = await getOrders(user.sub, user.role, Number(page), Number(limit));
    return reply.send({ success: true, data: result, error: null });
  });

  // GET /orders/:id
  app.get('/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const user = request.user as JwtPayload;
    const { id } = request.params as { id: string };
    const order = await getOrderById(id, user.sub, user.role);
    return reply.send({ success: true, data: order, error: null });
  });

  // PATCH /orders/:id/status (admin)
  app.patch('/:id/status', { preHandler: [authenticateAdmin] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const input = updateOrderStatusSchema.parse(request.body);
    const order = await updateOrderStatus(id, input);
    return reply.send({ success: true, data: order, error: null });
  });
};
