/**
 * Rutas de usuarios
 * GET /users           — Listar usuarios (admin)
 * GET /users/:id       — Perfil de usuario
 * PUT /users/:id       — Actualizar perfil
 * GET /users/:id/orders — Órdenes del usuario (admin o propio)
 */

import type { FastifyPluginAsync } from 'fastify';
import { prisma } from '@la-sonada/database';
import { z } from 'zod';
import { authenticate, authenticateAdmin } from '../middleware/authenticate.js';
import type { JwtPayload } from '../middleware/authenticate.js';

const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
});

const createAddressSchema = z.object({
  alias: z.string().max(50).default('Casa'),
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().min(2),
  zip: z.string().min(3),
  isDefault: z.boolean().default(false),
});

export const userRoutes: FastifyPluginAsync = async (app) => {
  // GET /users (admin)
  app.get('/', { preHandler: [authenticateAdmin] }, async (request, reply) => {
    const { page = '1', limit = '20' } = request.query as { page?: string; limit?: string };
    const skip = (Number(page) - 1) * Number(limit);

    const [total, users] = await Promise.all([
      prisma.user.count(),
      prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: { select: { orders: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit),
      }),
    ]);

    return reply.send({
      success: true,
      data: { users, pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) } },
      error: null,
    });
  });

  // GET /users/:id
  app.get('/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const requester = request.user as JwtPayload;
    const { id } = request.params as { id: string };

    // Solo admin puede ver otros usuarios
    if (requester.role !== 'ADMIN' && requester.sub !== id) {
      return reply.status(403).send({ success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acceso denegado' } });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true, addresses: true },
    });

    if (!user) {
      return reply.status(404).send({ success: false, data: null, error: { code: 'NOT_FOUND', message: 'Usuario no encontrado' } });
    }

    return reply.send({ success: true, data: user, error: null });
  });

  // PUT /users/:id
  app.put('/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const requester = request.user as JwtPayload;
    const { id } = request.params as { id: string };

    if (requester.role !== 'ADMIN' && requester.sub !== id) {
      return reply.status(403).send({ success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acceso denegado' } });
    }

    const input = updateUserSchema.parse(request.body);
    const user = await prisma.user.update({
      where: { id },
      data: input,
      select: { id: true, email: true, name: true, role: true },
    });

    return reply.send({ success: true, data: user, error: null });
  });

  // GET /users/:id/orders
  app.get('/:id/orders', { preHandler: [authenticate] }, async (request, reply) => {
    const requester = request.user as JwtPayload;
    const { id } = request.params as { id: string };

    if (requester.role !== 'ADMIN' && requester.sub !== id) {
      return reply.status(403).send({ success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acceso denegado' } });
    }

    const orders = await prisma.order.findMany({
      where: { userId: id },
      include: { items: { include: { product: { select: { id: true, name: true, images: true } } } } },
      orderBy: { createdAt: 'desc' },
    });

    return reply.send({ success: true, data: orders, error: null });
  });

  // POST /users/:id/addresses
  app.post('/:id/addresses', { preHandler: [authenticate] }, async (request, reply) => {
    const requester = request.user as JwtPayload;
    const { id } = request.params as { id: string };

    if (requester.sub !== id) {
      return reply.status(403).send({ success: false, data: null, error: { code: 'FORBIDDEN', message: 'Acceso denegado' } });
    }

    const input = createAddressSchema.parse(request.body);

    // Si es default, quitar default de otras
    if (input.isDefault) {
      await prisma.address.updateMany({ where: { userId: id }, data: { isDefault: false } });
    }

    const address = await prisma.address.create({ data: { ...input, userId: id } });
    return reply.status(201).send({ success: true, data: address, error: null });
  });
};
