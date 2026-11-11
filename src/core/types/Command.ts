import type {
  ChatInputCommandInteraction,
  MessageComponentInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';
import type { User } from '../../generated/prisma/client.ts';
import type { Translator } from '../../i18n/translator/createTranslator.ts';

export interface CommandContext {
  /** Translator already set to the language of the user. */
  t: Translator;
  /** Saved settings of the user, if any. */
  user: User | null;
}

export interface Command {
  /** Definition pushed to the Discord API. */
  data: RESTPostAPIChatInputApplicationCommandsJSONBody;
  /** Set on commands that must work on servers that are not initialised yet. */
  worksUninitialised?: boolean;
  execute(interaction: ChatInputCommandInteraction, context: CommandContext): Promise<void>;
  /**
   * Handles the buttons and menus whose custom id starts with the command name.
   * `args` holds the rest of the custom id, split on ":".
   */
  component?(
    interaction: MessageComponentInteraction,
    context: CommandContext,
    args: string[],
  ): Promise<void>;
}
