import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { type Link, linkButtons } from '../../../utils/discord/linkButtons.ts';
import { profileEmbed } from '../embeds/profileEmbed.ts';
import type { Platform } from '../model/types.ts';

export interface LinkPlatformOptions {
  name: string;
  pattern: RegExp;
  color: number;
  /** Pages of the profile, the first one being the main page. */
  links(username: string, t: Translator): [Link, ...Link[]];
}

/** Creates a platform without an API: nothing is fetched, its profiles are shared as links only. */
export function linkPlatform({ name, pattern, color, links }: LinkPlatformOptions): Platform {
  return {
    name,
    pattern,
    async render(username, share, t) {
      const pages = links(encodeURIComponent(username), t);
      return {
        embeds: [profileEmbed({ platform: name, username, url: pages[0].url, color }, share, t)],
        components: [linkButtons(pages)],
      };
    },
  };
}
