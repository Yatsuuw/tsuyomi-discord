import { registerProcessHandlers } from './core/client/registerProcessHandlers.ts';
import { TsuyomiClient } from './core/client/TsuyomiClient.ts';
import { getCredentials } from './core/env/getCredentials.ts';
import { logger } from './utils/logging/logger.ts';

const production = process.env.NODE_ENV === 'production';
const client = new TsuyomiClient();
registerProcessHandlers(client);

try {
  await client.start(getCredentials(production).token);
} catch (error) {
  // Without a connection the bot is useless: stop so that the supervisor (Docker) can restart it.
  logger.error('Startup failed', error);
  process.exit(1);
}
