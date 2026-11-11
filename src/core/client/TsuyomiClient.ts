import { Client, GatewayIntentBits, Options, type PresenceData } from 'discord.js';
import { handleError } from '../errors/handleError.ts';
import type { Command } from '../types/Command.ts';
import type { Event } from '../types/Event.ts';
import { loadModules } from './loadModules.ts';

/** Discord client holding the commands of the bot. */
export class TsuyomiClient extends Client {
  readonly commands = new Map<string, Command>();

  /**
   * @param presence Status and activity of the bot. Given here rather than set once connected, it is part
   * of the identification sent to Discord: Discord keeps it for as long as the session lives and receives
   * it again whenever a new session has to be opened. It never expires, so nothing refreshes it on a timer.
   */
  constructor(presence: PresenceData) {
    super({
      presence,
      // Slash commands need no privileged data: the server list is enough.
      intents: [GatewayIntentBits.Guilds],
      // Text typed by users is echoed in some replies: it must never ping anyone.
      allowedMentions: { parse: [] },
      // The bot never reads messages, members, emojis... so none of them is kept in memory.
      makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        GuildEmojiManager: 0,
        GuildMemberManager: { maxSize: 0, keepOverLimit: (member) => member.id === member.client.user.id },
        GuildStickerManager: 0,
        MessageManager: 0,
        ReactionManager: 0,
        ThreadManager: 0,
        UserManager: 0,
      }),
    });
  }

  /** Loads every command and event file, then connects to Discord. */
  async start(token: string): Promise<void> {
    for (const command of await loadModules<Command>('commands')) {
      this.commands.set(command.data.name, command);
    }

    for (const event of await loadModules<Event>('events')) {
      this[event.once ? 'once' : 'on'](event.name, async (...args) => {
        try {
          await event.execute(...args);
        } catch (error) {
          await handleError(error);
        }
      });
    }

    await this.login(token);
  }
}
