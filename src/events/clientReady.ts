import { Events } from 'discord.js';
import { defineEvent } from '../core/builders/defineEvent.ts';
import { logger } from '../utils/logging/logger.ts';

/** Confirms in the logs that the bot is connected. */
export default defineEvent({
  name: Events.ClientReady,
  once: true,

  execute(client) {
    logger.info(`Connected as ${client.user.tag} on ${client.guilds.cache.size} server(s)`);
  },
});
