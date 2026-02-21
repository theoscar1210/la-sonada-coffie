/**
 * Rutas de productos
 * GET  /products       — Catálogo con filtros y paginación
 * GET  /products/:slug — Detalle de producto
 * POST /products       — Crear producto (admin)
 * PUT  /products/:id   — Actualizar producto (admin)
 * DELETE /products/:id — Eliminar producto (admin)
 */

import type { FastifyPluginAsync } from 'fastify';
import {
  productQuerySchema,
  createProductSchema,
  updateProductSchema,
} from '../schemas/product.schema.js';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/product.service.js';
import { authenticateAdmin } from '../middleware/authenticate.js';

export const productRoutes: FastifyPluginAsync = async (app) => {
  // GET /products
  app.get('/', async (request, reply) => {
    const query = productQuerySchema.parse(request.query);
    const result = await getProducts(query);
    return reply.send({ success: true, data: result, error: null });
  });

  // GET /products/:slug
  app.get('/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const product = await getProductBySlug(slug);
    return reply.send({ success: true, data: product, error: null });
  });

  // POST /products (admin)
  app.post('/', { preHandler: [authenticateAdmin] }, async (request, reply) => {
    const input = createProductSchema.parse(request.body);
    const product = await createProduct(input);
    return reply.status(201).send({ success: true, data: product, error: null });
  });

  // PUT /products/:id (admin)
  app.put('/:id', { preHandler: [authenticateAdmin] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const input = updateProductSchema.parse(request.body);
    const product = await updateProduct(id, input);
    return reply.send({ success: true, data: product, error: null });
  });

  // DELETE /products/:id (admin)
  app.delete('/:id', { preHandler: [authenticateAdmin] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    await deleteProduct(id);
    return reply.send({ success: true, data: { message: 'Producto desactivado' }, error: null });
  });
};
