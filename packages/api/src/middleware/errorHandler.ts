/**
 * Error handler global para Fastify
 * Formato estándar: { success, data, error }
 * En producción nunca expone stack traces ni detalles de validación internos.
 */

import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  const isProd = process.env['NODE_ENV'] === 'production';
  const statusCode = error.statusCode ?? 500;

  // Errores de validación de schema (Fastify/Zod)
  if (error.validation) {
    return reply.status(400).send({
      success: false,
      data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Datos inválidos',
        // En prod no exponer detalles del schema interno
        ...(isProd ? {} : { details: error.validation }),
      },
    });
  }

  // Errores de negocio conocidos (4xx)
  if (statusCode < 500) {
    return reply.status(statusCode).send({
      success: false,
      data: null,
      error: {
        code: error.code ?? 'API_ERROR',
        message: error.message,
      },
    });
  }

  // Error interno inesperado (5xx) — loguear con contexto, nunca exponer al cliente
  request.log.error({
    err: {
      message: error.message,
      code: error.code,
      // Stack solo en desarrollo — en prod puede revelar paths del servidor
      ...(isProd ? {} : { stack: error.stack }),
    },
    req: { method: request.method, url: request.url },
  });

  return reply.status(500).send({
    success: false,
    data: null,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Error interno del servidor',
    },
  });
}
