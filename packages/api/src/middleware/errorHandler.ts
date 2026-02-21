/**
 * Error handler global para Fastify
 * Formato estándar: { success, data, error }
 */

import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  // Errores de validación (Fastify/Zod)
  if (error.validation) {
    return reply.status(400).send({
      success: false,
      data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Datos inválidos',
        details: error.validation,
      },
    });
  }

  // Errores conocidos de negocio
  if (error.statusCode) {
    return reply.status(error.statusCode).send({
      success: false,
      data: null,
      error: {
        code: error.code ?? 'API_ERROR',
        message: error.message,
      },
    });
  }

  // Error interno no esperado
  reply.log.error(error);
  return reply.status(500).send({
    success: false,
    data: null,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Error interno del servidor',
    },
  });
}
