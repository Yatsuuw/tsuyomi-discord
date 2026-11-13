import { type BaseInteraction, InteractionContextType, PermissionFlagsBits } from 'discord.js';

/**
 * Tells whether the bot takes part in the conversation an interaction comes from, and may therefore write a
 * message of its own there:
 * - its private conversation with a user, where no permission exists;
 * - a server it is a member of, if it may see the channel, send messages and embed links in it.
 *
 * It does not in a private conversation between users or in a group, where the application is only used
 * through the account of someone who installed it.
 */
export function canPostInChannel(interaction: BaseInteraction): boolean {
  if (interaction.context === InteractionContextType.BotDM) return true;
  if (!interaction.inCachedGuild()) return false;

  const permissions = interaction.appPermissions;
  const maySend =
    permissions.has(PermissionFlagsBits.SendMessages) ||
    permissions.has(PermissionFlagsBits.SendMessagesInThreads);
  return maySend && permissions.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks]);
}
