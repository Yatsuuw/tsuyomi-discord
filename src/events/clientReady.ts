import { Events } from 'discord.js';
import { defineEvent } from '../core/builders/defineEvent.ts';
import { purgeUnusedRecords } from '../services/database/purgeUnusedRecords.ts';
import { logger } from '../utils/logging/logger.ts';

/** Confirms in the logs that the bot is connected, then deletes the records it has no use for any more. */
export default defineEvent({
  name: Events.ClientReady,
  once: true,

  async execute(client) {
    logger.info(`Connected as ${client.user.tag} on ${client.guilds.cache.size} server(s)`);
    // Discord lists every server of the bot on connection, the unreachable ones included.
    await purgeUnusedRecords([...client.guilds.cache.keys()]);
  },
});
