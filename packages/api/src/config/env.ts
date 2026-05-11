/**
 * Validación de variables de entorno críticas.
 * Llamar ANTES de buildApp() — falla rápido si el deploy está mal configurado.
 */

const REQUIRED_IN_PROD: string[] = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'DATABASE_URL',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'CLOUDINARY_API_SECRET',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_CLOUD_NAME',
];

export function validateEnv(): void {
  const isProd = process.env['NODE_ENV'] === 'production';

  if (isProd) {
    const missing = REQUIRED_IN_PROD.filter((key) => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(
        `[STARTUP] Variables de entorno faltantes en producción: ${missing.join(', ')}`,
      );
    }
  }

  // JWT_SECRET debe ser suficientemente largo sin importar el entorno
  const jwtSecret = process.env['JWT_SECRET'] ?? '';
  if (jwtSecret && jwtSecret.length < 32) {
    throw new Error('[STARTUP] JWT_SECRET debe tener al menos 32 caracteres. Usa 64 bytes hex.');
  }

  const jwtRefresh = process.env['JWT_REFRESH_SECRET'] ?? '';
  if (jwtRefresh && jwtRefresh.length < 32) {
    throw new Error('[STARTUP] JWT_REFRESH_SECRET debe tener al menos 32 caracteres.');
  }
}
