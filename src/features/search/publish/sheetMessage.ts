import type { User } from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { linkButtons } from '../../../utils/discord/linkButtons.ts';
import type { ChannelPost } from '../../../utils/discord/postInChannel.ts';
import type { SearchEntry, SearchType } from '../model/types.ts';

/**
 * Builds the public message of a validated result: who searched for it, its sheet, and a button opening its
 * page on AniList ("View the anime", "View the character"...).
 */
export function sheetMessage(
  entry: SearchEntry,
  type: SearchType,
  searcher: User,
  t: Translator,
): ChannelPost {
  return {
    content: t('search.requestedBy', { user: searcher.toString() }),
    embeds: [entry.embed(t)],
    components: [linkButtons([{ label: t(`search.open.${type}`), url: entry.url }])],
  };
}
