import { UserError } from '../../../core/errors/UserError.ts';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { type Link, linkButtons } from '../../../utils/discord/linkButtons.ts';
import { statsProfileEmbed } from '../embeds/statsProfileEmbed.ts';
import type { Platform, Profile, ProfileStyle } from '../model/types.ts';

export interface ApiPlatformOptions<U> {
  name: string;
  pattern: RegExp;
  color: number;
  scoreScale: ProfileStyle['scoreScale'];
  /** Reads a user from the API of the platform; resolves with `null` when no user has that name. */
  fetchUser(username: string): Promise<U | null>;
  /** Converts what the API returns to the shape shared by every platform. */
  toProfile(user: U): Profile;
  /** Pages opened by the buttons under the profile. */
  links(profile: Profile, t: Translator): Link[];
}

/**
 * Creates a platform whose profiles are read through an API: usernames are checked when they are linked,
 * and every platform is shared with the same embed of statistics and favourites.
 */
export function apiPlatform<U>(options: ApiPlatformOptions<U>): Platform {
  const { name, pattern, color, scoreScale, fetchUser, toProfile, links } = options;
  const fetchProfile = async (username: string) => {
    const user = await fetchUser(username);
    return user && toProfile(user);
  };

  return {
    name,
    pattern,

    async resolve(username) {
      return (await fetchProfile(username))?.username ?? null;
    },

    async render(username, share, t) {
      const profile = await fetchProfile(username);
      if (!profile) throw new UserError('config.userNotFound', { platform: name, username });
      return {
        embeds: [statsProfileEmbed({ platform: name, color, scoreScale }, profile, share, t)],
        components: [linkButtons(links(profile, t))],
      };
    },
  };
}
