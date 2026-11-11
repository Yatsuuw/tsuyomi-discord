import type { MediaTitle } from '../model/types.ts';

/** Main title of an anime or manga: romaji when available, otherwise english, then native. */
export function mediaTitle(title: MediaTitle): string {
  return title.romaji ?? title.english ?? title.native ?? '?';
}
