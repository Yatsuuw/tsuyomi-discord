import type { Platform } from '../model/types.ts';
import { anilist } from './anilist.ts';
import { mangacollec } from './mangacollec.ts';
import { myanimelist } from './myanimelist.ts';

const registry = { anilist, myanimelist, mangacollec };

/** Name of a platform: at once a /config and /profile subcommand and a column of the user settings. */
export type PlatformKey = keyof typeof registry;

/** Every platform a profile can be linked to. Adding one only requires a new entry in the registry. */
export const platforms: Record<PlatformKey, Platform> = registry;

/** Returns the platform behind a subcommand name. */
export function getPlatform(key: string): { key: PlatformKey; platform: Platform } {
  return { key: key as PlatformKey, platform: platforms[key as PlatformKey] };
}
