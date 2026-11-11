import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { PAGE_SIZE } from '../model/constants.ts';
import type { SearchState } from '../model/SearchState.ts';
import type { SearchEntry } from '../model/types.ts';

/** A result as it appears on a page. */
export interface SearchRow {
  entry: SearchEntry;
  /** Rank of the result in the whole search, starting at 1. */
  position: number;
  summary: string;
  selected: boolean;
}

/** One page of a search: everything the result list and the controls display. */
export interface SearchPage {
  /** State of the search, on the page actually shown. */
  state: SearchState;
  rows: SearchRow[];
  pageCount: number;
  total: number;
}

/** Cuts the results of a search down to the page held by `state`. */
export function createSearchPage(state: SearchState, entries: SearchEntry[], t: Translator): SearchPage {
  const pageCount = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  // The requested page may be out of range ("last" asks for an infinite one): bring it back in.
  const page = Math.min(Math.max(state.page, 0), pageCount - 1);
  const offset = page * PAGE_SIZE;

  return {
    state: page === state.page ? state : state.atPage(page),
    rows: entries.slice(offset, offset + PAGE_SIZE).map((entry, index) => ({
      entry,
      position: offset + index + 1,
      summary: entry.summary(t),
      selected: entry.id === state.selectedId,
    })),
    pageCount,
    total: entries.length,
  };
}
