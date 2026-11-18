import { type MessageComponentInteraction, PermissionFlagsBits } from 'discord.js';
import { attachEmbedImages } from '../../../utils/discord/attachEmbedImages.ts';
import { type ChannelPost, postInChannel } from '../../../utils/discord/postInChannel.ts';
import { sendWithLinksIfRefused } from '../../../utils/discord/sendWithLinksIfRefused.ts';

/**
 * Makes the message of a validated result public (see `sheetMessage`). Its pictures are sent as files
 * whenever possible, and stay links otherwise.
 *
 * Wherever the bot may write (a server it belongs to, or its private conversation with the user), the
 * message is one of its own. Elsewhere it is a follow-up of the private selection, which Discord shows as a
 * reply to a message nobody else can see.
 */
export async function publishSheet(
  interaction: MessageComponentInteraction,
  message: ChannelPost,
): Promise<void> {
  const withFiles = await attachEmbedImages(message);

  // On a server, a message of the bot's own only carries files with the "Attach Files" permission.
  const mayAttach = interaction.appPermissions.has(PermissionFlagsBits.AttachFiles);
  if (await postInChannel(interaction, mayAttach ? withFiles : message)) return;

  await sendWithLinksIfRefused(withFiles, message, (version) => interaction.followUp(version));
}
