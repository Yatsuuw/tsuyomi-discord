import { type EmbedBuilder, type MessageComponentInteraction, PermissionFlagsBits } from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { attachEmbedImages } from '../../../utils/discord/attachEmbedImages.ts';
import { postInChannel } from '../../../utils/discord/postInChannel.ts';
import { sendWithLinksIfRefused } from '../../../utils/discord/sendWithLinksIfRefused.ts';

/**
 * Makes the sheet of a validated result public, saying who searched for it. Its pictures are sent as files
 * whenever possible, and stay links otherwise.
 *
 * Wherever the bot may write (a server it belongs to, or its private conversation with the user), the sheet
 * is a message of its own. Elsewhere it is a follow-up of the private selection, which Discord shows as a
 * reply to a message nobody else can see.
 */
export async function publishSheet(
  interaction: MessageComponentInteraction,
  sheet: EmbedBuilder,
  t: Translator,
): Promise<void> {
  const withLinks = {
    content: t('search.requestedBy', { user: interaction.user.toString() }),
    embeds: [sheet],
  };
  const withFiles = await attachEmbedImages(withLinks);

  // On a server, a message of the bot's own only carries files with the "Attach Files" permission.
  const mayAttach = interaction.appPermissions.has(PermissionFlagsBits.AttachFiles);
  if (await postInChannel(interaction, mayAttach ? withFiles : withLinks)) return;

  await sendWithLinksIfRefused(withFiles, withLinks, (message) => interaction.followUp(message));
}
