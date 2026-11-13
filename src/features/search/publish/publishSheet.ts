import type { EmbedBuilder, MessageComponentInteraction } from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { postInChannel } from '../../../utils/discord/postInChannel.ts';

/**
 * Makes the sheet of a validated result public, saying who searched for it.
 *
 * Wherever the bot may write, the sheet is a message of its own. Elsewhere it is a follow-up of the private
 * selection, which Discord shows as a reply to a message nobody else can see.
 */
export async function publishSheet(
  interaction: MessageComponentInteraction,
  sheet: EmbedBuilder,
  t: Translator,
): Promise<void> {
  const message = {
    content: t('search.requestedBy', { user: interaction.user.toString() }),
    embeds: [sheet],
  };
  if (await postInChannel(interaction, message)) return;
  await interaction.followUp(message);
}
