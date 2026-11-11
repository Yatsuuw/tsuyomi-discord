import { MEDIA_LINK } from './fragments.ts';

export interface SearchQueryOptions {
  /** Field of `Page` listing the objects to search: `media`, `characters` or `staff`. */
  field: string;
  /** Fields requested for each result. The `mediaLink` fragment is available. */
  selection: string;
  /** Declaration of the variables the query takes on top of `$search` and `$perPage`. */
  variables?: string;
  /** Arguments restricting the results on top of the search itself. */
  filters?: string;
}

/**
 * Builds a search query. Every search has the same shape, which `fetchSearch` relies on: it takes `$search`
 * and `$perPage`, sorts by relevance and returns its list under the `results` alias.
 */
export function searchQuery({ field, selection, variables, filters }: SearchQueryOptions): string {
  const declarations = ['$search: String!', '$perPage: Int!', variables].filter(Boolean).join(', ');
  const args = ['search: $search', 'sort: SEARCH_MATCH', filters].filter(Boolean).join(', ');

  return /* GraphQL */ `
    query (${declarations}) {
      Page(perPage: $perPage) {
        results: ${field}(${args}) {
          ${selection}
        }
      }
    }
    ${MEDIA_LINK}
  `;
}
