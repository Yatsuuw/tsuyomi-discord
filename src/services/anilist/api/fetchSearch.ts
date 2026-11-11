import { request } from './request.ts';

export interface SearchVariables {
  search: string;
  perPage: number;
  [name: string]: unknown;
}

/** Runs a query built by `searchQuery` and returns its results, most relevant first. */
export async function fetchSearch<T>(query: string, variables: SearchVariables): Promise<T[]> {
  const data = await request<{ Page: { results: T[] } }>(query, variables);
  return data?.Page.results ?? [];
}
