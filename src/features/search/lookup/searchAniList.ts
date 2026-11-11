import { TtlCache } from '../../../utils/cache/TtlCache.ts';
import { stripDiacritics } from '../../../utils/text/stripDiacritics.ts';
import { characterKind } from '../kinds/characterKind.ts';
import { mediaKind } from '../kinds/mediaKind.ts';
import { staffKind } from '../kinds/staffKind.ts';
import { MAX_RESULTS } from '../model/constants.ts';
import type { SearchEntry, Searcher, SearchType } from '../model/types.ts';
import { createSearcher } from './createSearcher.ts';

const searchers: Record<SearchType, Searcher> = {
  anime: createSearcher(mediaKind({ type: 'ANIME' })),
  manga: createSearcher(mediaKind({ type: 'MANGA', formatNot: 'NOVEL' })),
  novel: createSearcher(mediaKind({ type: 'MANGA', format: 'NOVEL' })),
  character: createSearcher(characterKind),
  staff: createSearcher(staffKind),
};

// Browsing the pages of a search re-reads its results from here instead of querying AniList again.
const cache = new TtlCache<SearchEntry[]>(15 * 60_000, 200);

/** Returns every result of a search. All of them are fetched at once, then served from memory. */
export async function searchAniList(type: SearchType, query: string): Promise<SearchEntry[]> {
  return cache.getOrLoad(`${type}:${query.toLowerCase()}`, async () => {
    // AniList matches accented letters poorly: "à genoux" finds nothing where "a genoux" finds the title,
    // and "Pokémon" finds 2 results where "Pokemon" finds dozens. An accented query is therefore searched
    // under both spellings, the results of the exact one coming first.
    const spellings = [...new Set([query, stripDiacritics(query)])];
    const results = await Promise.all(spellings.map(searchers[type]));
    const unique = new Map(results.flat().map((entry) => [entry.id, entry]));
    return [...unique.values()].slice(0, MAX_RESULTS);
  });
}
