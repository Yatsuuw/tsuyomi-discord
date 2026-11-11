import { UserError } from '../../../core/errors/UserError.ts';
import { fetchJson } from '../../http/fetchJson.ts';
import { ANILIST_NAME } from '../model/constants.ts';

const ENDPOINT = 'https://graphql.anilist.co';

interface GraphQLResponse<T> {
  data: T | null;
  errors?: { message: string; status?: number }[];
}

/**
 * Sends a GraphQL query to AniList.
 * Resolves with `null` when AniList answers "not found"; throws a `UserError` when it is unreachable.
 */
export async function request<T>(query: string, variables: Record<string, unknown>): Promise<T | null> {
  const { status, ok, body } = await fetchJson<GraphQLResponse<T>>(ANILIST_NAME, ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (status === 404) return null;
  if (!ok || body.errors?.length || !body.data) {
    throw new UserError(
      'error.serviceUnavailable',
      { service: ANILIST_NAME },
      body.errors ?? `HTTP ${status}`,
    );
  }
  return body.data;
}
