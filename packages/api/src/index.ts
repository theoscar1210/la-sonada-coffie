/**
 * LA SOÑADA COFFIE — API Entry Point
 * Inicia el servidor Fastify en el puerto configurado
 */

import { validateEnv } from './config/env.js';
import { buildApp } from './app.js';

// Fail-fast: abortar si faltan variables críticas
validateEnv();

const start = async () => {
  const app = await buildApp();

  const host = process.env['HOST'] ?? '0.0.0.0';
  const port = Number(process.env['PORT'] ?? 3001);

  try {
    await app.listen({ host, port });
    app.log.info(`API corriendo en http://${host}:${port}`);
    if (process.env['NODE_ENV'] !== 'production') {
      app.log.info(`Docs en http://${host}:${port}/docs`);
    }
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

void start();
