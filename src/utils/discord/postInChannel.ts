import { type BaseInteraction, RESTJSONErrorCodes, Routes } from 'discord.js';
import type { PictureMessage } from './attachEmbedImages.ts';
import { canPostInChannel } from './canPostInChannel.ts';
import { hasErrorCode } from './hasErrorCode.ts';

export interface ChannelPost extends PictureMessage {
  content?: string;
}

/**
 * Errors meaning the bot may not write there after all, or not right now: a permission changed, slow mode
 * (which applies to bots too), or a user who does not take private messages from it. It then falls back on
 * another way.
 */
const REFUSALS = [
  RESTJSONErrorCodes.MissingAccess,
  RESTJSONErrorCodes.MissingPermissions,
  RESTJSONErrorCodes.ActionCannotBePerformedDueToSlowmodeRateLimit,
  RESTJSONErrorCodes.CannotSendMessagesToThisUser,
];

/**
 * Posts a message of the bot's own in the conversation an interaction comes from. Unlike a follow-up, such
 * a message is not shown as a reply to the interaction.
 *
 * Returns `false` without posting when the bot cannot write there (see `canPostInChannel`) or when Discord
 * refuses the message.
 */
export async function postInChannel(interaction: BaseInteraction, post: ChannelPost): Promise<boolean> {
  if (!interaction.channelId || !canPostInChannel(interaction)) return false;

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
