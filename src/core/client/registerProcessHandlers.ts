import type { Client } from 'discord.js';
import { prisma } from '../../services/database/prisma.ts';
import { logger } from '../../utils/logging/logger.ts';
import { handleError } from '../errors/handleError.ts';

/** Routes process-level failures to the central handler and shuts down cleanly on stop signals. */
export function registerProcessHandlers(client: Client): void {
  process.on('unhandledRejection', (reason) => void handleError(reason));
  process.on('uncaughtException', (error) => void handleError(error));

  const shutdown = async (signal: string): Promise<void> => {
    logger.info(`${signal} received, shutting down`);
    await client.destroy();
    await prisma.$disconnect();
    process.exit(0);
  };
  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
}
