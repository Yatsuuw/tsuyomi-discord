import { type BaseInteraction, PermissionFlagsBits, RESTJSONErrorCodes, Routes } from 'discord.js';
import type { PictureMessage } from './attachEmbedImages.ts';
import { hasErrorCode } from './hasErrorCode.ts';

export interface ChannelPost extends PictureMessage {
  content?: string;
}

/**
 * Errors meaning the bot may not write in the channel after all, or not right now (slow mode applies to bots
 * too): it then falls back on another way.
 */
const REFUSALS = [
  RESTJSONErrorCodes.MissingAccess,
  RESTJSONErrorCodes.MissingPermissions,
  RESTJSONErrorCodes.ActionCannotBePerformedDueToSlowmodeRateLimit,
];

/**
 * Posts a message of the bot's own in the channel an interaction comes from. Unlike a follow-up, such a
 * message is not shown as a reply to the interaction.
 *
 * Returns `false` without posting when the bot cannot write there: it is not a member of the server (private
 * conversation, or application installed on a user account only) or it lacks a permission.
 */
export async function postInChannel(interaction: BaseInteraction, post: ChannelPost): Promise<boolean> {
  if (!interaction.inCachedGuild() || !interaction.channelId) return false;

  const permissions = interaction.appPermissions;
  const maySend =
    permissions.has(PermissionFlagsBits.SendMessages) ||
    permissions.has(PermissionFlagsBits.SendMessagesInThreads);
  if (!maySend || !permissions.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks])) {
    return false;
  }

  const files = post.files ?? [];
  try {
    await interaction.client.rest.post(Routes.channelMessages(interaction.channelId), {
      body: {
        content: post.content,
        embeds: post.embeds.map((embed) => embed.toJSON()),
        attachments: files.map(({ name }, id) => ({ id, filename: name })),
        // A raw request does not get the defaults of the client: mentions must be silenced here too.
        allowed_mentions: { parse: [] },
      },
      files: files.map(({ name, attachment }) => ({ name, data: attachment })),
    });
    return true;
  } catch (error) {
    if (hasErrorCode(error, REFUSALS)) return false;
    throw error;
  }
}
