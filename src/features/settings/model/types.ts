import type { ChatInputCommandInteraction } from 'discord.js';
import type { CommandContext } from '../../../core/types/Command.ts';

/**
 * What one /config subcommand does. The command has already deferred a reply only the user can see: the
 * action reads its options from the interaction and edits that reply.
 */
export type SettingAction = (
  interaction: ChatInputCommandInteraction,
  context: CommandContext,
) => Promise<void>;
