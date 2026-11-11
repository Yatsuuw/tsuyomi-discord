import { Events } from 'discord.js';
import { defineEvent } from '../core/builders/defineEvent.ts';
import { forgetGuild } from '../services/database/forgetGuild.ts';

/**
 * Forgets a server the bot has left (removed from it, or the server was deleted). A server that is only
 * unreachable during a Discord outage does not trigger this event.
 */
export default defineEvent({
  name: Events.GuildDelete,
  execute: (guild) => forgetGuild(guild.id),
});
