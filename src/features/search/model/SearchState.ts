import { UserError } from '../../../core/errors/UserError.ts';
import { SEARCH_TYPES, type SearchType } from './types.ts';

/**
 * State of a search message: what was searched, the page shown and the selected result.
 * It travels inside the custom id of every button, so nothing is kept in memory between two clicks and
 * a search still works after a restart of the bot.
 */
export class SearchState {
  /** Longest query that still fits in a custom id (100 characters) next to the other values. */
  static readonly MAX_QUERY_LENGTH = 60;

  readonly type: SearchType;
  readonly query: string;
  readonly page: number;
  readonly selectedId: number;

  constructor(type: SearchType, query: string, page = 0, selectedId = 0) {
    this.type = type;
    this.query = query;
    this.page = page;
    this.selectedId = selectedId;
  }

  /** Rebuilds a state from the parts of a custom id that follow the action. */
  static parse([type, page, selectedId, ...query]: string[]): SearchState {
    if (!SEARCH_TYPES.includes(type as SearchType)) throw new UserError('search.expired');
    return new SearchState(type as SearchType, query.join(':'), Number(page) || 0, Number(selectedId) || 0);
  }

  /** Custom id of the component triggering `action` from this state. */
  customId(action: string): string {
    return ['search', action, this.type, this.page, this.selectedId, this.query].join(':');
  }

  /** Same search on another page, with nothing selected. */
  atPage(page: number): SearchState {
    return new SearchState(this.type, this.query, page);
  }

  /** Same search and page with a result selected. */
  select(selectedId: number): SearchState {
    return new SearchState(this.type, this.query, this.page, selectedId);
  }
}
