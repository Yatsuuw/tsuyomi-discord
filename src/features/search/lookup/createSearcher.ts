import { fetchSearch } from '../../../services/anilist/api/fetchSearch.ts';
import { MAX_RESULTS } from '../model/constants.ts';
import type { Searchable, Searcher, SearchKind } from '../model/types.ts';

/** Creates the function running the search of a kind and turning what AniList returns into results. */
export function createSearcher<T extends Searchable>(kind: SearchKind<T>): Searcher {
  return async (search) => {
    const items = await fetchSearch<T>(kind.query, { ...kind.variables, search, perPage: MAX_RESULTS });
    return items.map((item) => ({
      id: item.id,
      title: kind.title(item),
      url: item.siteUrl,
      summary: (t) => kind.summary(item, t),
      embed: (t) => kind.embed(item, t),
    }));
  };
}
