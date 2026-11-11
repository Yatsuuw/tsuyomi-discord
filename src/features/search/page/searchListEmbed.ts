import { EmbedBuilder, escapeMarkdown } from 'discord.js';
import { createFooter } from '../../../core/builders/createFooter.ts';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { ANILIST_COLOR } from '../../../services/anilist/model/constants.ts';
import { truncate } from '../../../utils/text/truncate.ts';
import type { SearchPage } from './createSearchPage.ts';

/** Numbered list of the results of one page, the selected one being highlighted. */
export function searchListEmbed({ state, rows, pageCount, total }: SearchPage, t: Translator): EmbedBuilder {
  const lines = rows.map(({ entry, position, summary, selected }) => {
    const title = `[${escapeMarkdown(truncate(entry.title, 80))}](${entry.url})`;
    return `${selected ? '➤ ' : ''}\`${String(position).padStart(2, '0')}\` **${title}**${summary && ` — ${summary}`}`;
  });

  return new EmbedBuilder()
    .setColor(ANILIST_COLOR)
    .setTitle(truncate(t('search.title', { type: t(`type.${state.type}`), query: state.query }), 256))
    .setDescription(lines.join('\n'))
    .setFooter(
      createFooter(
        t,
        t('search.footer', { page: state.page + 1, pages: pageCount, count: total }),
        t('footer.anilist'),
      ),
    );
}
