import type { EmbedBuilder } from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';

/** What can be searched: one `/search` subcommand each. */
export const SEARCH_TYPES = ['anime', 'manga', 'novel', 'character', 'staff'] as const;

export type SearchType = (typeof SEARCH_TYPES)[number];

/** A search result, whatever its type, ready to be listed and displayed. */
export interface SearchEntry {
  id: number;
  title: string;
  url: string;
  /** One-line description shown next to the title in the result list. */
  summary(t: Translator): string;
  /** Detailed sheet shown once the result is validated. */
  embed(t: Translator): EmbedBuilder;
}

/** What every searchable AniList object provides. */
export interface Searchable {
  id: number;
  siteUrl: string;
}

/** How one type of AniList object is searched and displayed. */
export interface SearchKind<T extends Searchable> {
  query: string;
  /** Variables the query takes on top of the search itself. */
  variables?: Record<string, unknown>;
  title(item: T): string;
  summary(item: T, t: Translator): string;
  embed(item: T, t: Translator): EmbedBuilder;
}

export type Searcher = (search: string) => Promise<SearchEntry[]>;
