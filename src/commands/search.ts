import { escapeMarkdown, MessageFlags } from 'discord.js';
import { createCommand } from '../core/builders/createCommand.ts';
import { UserError } from '../core/errors/UserError.ts';
import type { Command } from '../core/types/Command.ts';
import { searchAniList } from '../features/search/lookup/searchAniList.ts';
import { SearchState } from '../features/search/model/SearchState.ts';
import { SEARCH_TYPES, type SearchType } from '../features/search/model/types.ts';
import { renderSearchPage } from '../features/search/page/renderSearchPage.ts';

/** English name of each search type, for the descriptions pushed to Discord. */
const NAMES: Record<SearchType, string> = {
  anime: 'an anime',
  manga: 'a manga',
  novel: 'a light novel',
  character: 'a character',
  staff: 'a staff member',
};

const data = createCommand(
  'search',
  'Search AniList for an anime, a manga, a light novel, a character or a staff member',
);
for (const type of SEARCH_TYPES) {
  data.addSubcommand((subcommand) =>
    subcommand
      .setName(type)
      .setDescription(`Search for ${NAMES[type]}`)
      .addStringOption((option) =>
        option
          .setName('query')
          .setDescription('Title or name to look for, in any language')
          .setMaxLength(SearchState.MAX_QUERY_LENGTH)
          .setRequired(true),
      ),
  );
}

/** Page reached by each navigation button from the current one (out-of-range pages are clamped). */
const NAVIGATION: Record<string, (page: number) => number> = {
  first: () => 0,
  previous: (page) => page - 1,
  next: (page) => page + 1,
  last: () => Number.POSITIVE_INFINITY,
};

/** /search — lists the results privately, ten at a time, then posts the sheet of the validated one. */
const search: Command = {
  data: data.toJSON(),

  async execute(interaction, { t }) {
    const type = interaction.options.getSubcommand() as SearchType;
    const query = interaction.options.getString('query', true).trim();
    // Browsing and choosing a result stays private: only the validated sheet is posted for everyone.
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const entries = await searchAniList(type, query);
    if (!entries.length) {
      throw new UserError('search.noResults', {
        type: t(`type.${type}`).toLowerCase(),
        query: escapeMarkdown(query),
      });
    }
    await interaction.editReply(renderSearchPage(new SearchState(type, query), entries, t));
  },

  async component(interaction, { t }, [action = '', ...args]) {
    await interaction.deferUpdate();
    if (action === 'delete') {
      await interaction.deleteReply();
      return;
    }

    const state = SearchState.parse(args);
    const entries = await searchAniList(state.type, state.query);

    if (action === 'validate') {
      const entry = entries.find(({ id }) => id === state.selectedId);
      if (!entry) throw new UserError('search.expired');
      // A follow-up is a new message, public unless flagged otherwise; the private selection then goes away.
      await interaction.followUp({ embeds: [entry.embed(t)] });
      await interaction.deleteReply();
      return;
    }

    const next = interaction.isStringSelectMenu()
      ? state.select(Number(interaction.values[0]))
      : state.atPage(NAVIGATION[action]?.(state.page) ?? state.page);
    await interaction.editReply(renderSearchPage(next, entries, t));
  },
};

export default search;
