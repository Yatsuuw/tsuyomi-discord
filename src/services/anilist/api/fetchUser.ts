import type { AniListUser } from '../model/types.ts';
import { USER_QUERY } from '../queries/user.ts';
import { request } from './request.ts';

/** Fetches the public profile of an AniList user, or `null` when no user has that name. */
export async function fetchUser(name: string): Promise<AniListUser | null> {
  const data = await request<{ User: AniListUser | null }>(USER_QUERY, { name });
  return data?.User ?? null;
}
