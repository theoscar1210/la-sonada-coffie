/**
 * Rutas de uploads
 * POST /uploads/sign — Genera firma para upload directo a Cloudinary
 *
 * Patrón: el cliente obtiene una firma del backend y sube directamente
 * a Cloudinary. El API_SECRET nunca sale del servidor.
 */

import type { FastifyPluginAsync } from 'fastify';
import { v2 as cloudinary } from 'cloudinary';
import { authenticateAdmin } from '../middleware/authenticate.js';

cloudinary.config({
  cloud_name: process.env['CLOUDINARY_CLOUD_NAME'] ?? '',
  api_key: process.env['CLOUDINARY_API_KEY'] ?? '',
  api_secret: process.env['CLOUDINARY_API_SECRET'] ?? '',
});

const ALLOWED_FOLDERS = ['products', 'categories', 'banners'] as const;
type AllowedFolder = (typeof ALLOWED_FOLDERS)[number];

export const uploadRoutes: FastifyPluginAsync = async (app) => {
  // POST /uploads/sign — solo admins pueden subir imágenes
  app.post(
    '/sign',
    {
      preHandler: [authenticateAdmin],
      config: { rateLimit: { max: 30, timeWindow: '1 minute' } },
    },
    async (request, reply) => {
      const { folder = 'products' } = request.body as { folder?: string };

      if (!ALLOWED_FOLDERS.includes(folder as AllowedFolder)) {
        return reply.status(400).send({
          success: false,
          data: null,
          error: { code: 'INVALID_FOLDER', message: `Carpeta no permitida. Usa: ${ALLOWED_FOLDERS.join(', ')}` },
        });
      }

      const timestamp = Math.round(Date.now() / 1000);
      // Restricciones firmadas: el cliente DEBE enviarlas o Cloudinary rechaza la firma
      const paramsToSign = {
        timestamp,
        folder,
        allowed_formats: 'jpg,jpeg,png,webp,avif',
        max_bytes: 5_000_000,   // 5 MB máximo
      };

      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env['CLOUDINARY_API_SECRET'] ?? '',
      );

      return reply.send({
        success: true,
        data: {
          signature,
          timestamp,
          folder,
          allowedFormats: 'jpg,jpeg,png,webp,avif',
          maxBytes: 5_000_000,
          cloudName: process.env['CLOUDINARY_CLOUD_NAME'],
          apiKey: process.env['CLOUDINARY_API_KEY'],
          // apiSecret NUNCA se expone al cliente
        },
        error: null,
      });
    },
  );
};
