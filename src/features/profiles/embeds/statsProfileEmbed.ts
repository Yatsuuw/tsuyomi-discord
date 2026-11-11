import type { EmbedBuilder } from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { compactFields } from '../../../utils/discord/compactFields.ts';
import type { Link } from '../../../utils/discord/linkButtons.ts';
import { ROW_BREAK } from '../../../utils/discord/rowBreak.ts';
import { markdownLinks } from '../../../utils/text/markdownLinks.ts';
import type { Profile, ProfileShare, ProfileStyle } from '../model/types.ts';
import { profileEmbed } from './profileEmbed.ts';

/** Number of favourites listed in each category. */
const FAVOURITES_SHOWN = 3;

/**
 * Profile read from an API, laid out the same way whatever the platform: avatar and banner, a row of anime and manga
 * statistics, a row of favourite anime and manga, then the favourite characters.
 */
export function statsProfileEmbed(
  style: ProfileStyle,
  profile: Profile,
  share: ProfileShare,
  t: Translator,
): EmbedBuilder {
  const { anime, manga, favourites } = profile;
  const number = (value: number) => value.toLocaleString(t.lang, { maximumFractionDigits: 1 });
  const score = (value: number) => (value ? `${number(value)}/${style.scoreScale}` : '–');
  const favourite = (links: Link[]) => markdownLinks(links.slice(0, FAVOURITES_SHOWN));

  const favouriteAnime = favourite(favourites.anime);
  const favouriteManga = favourite(favourites.manga);
  const memberSince = profile.joinedAt
    ? t('profile.memberSince', { date: profile.joinedAt.toLocaleDateString(t.lang, { dateStyle: 'long' }) })
    : null;

  return profileEmbed(
    {
      platform: style.platform,
      username: profile.username,
      url: profile.url,
      color: style.color,
      avatar: profile.avatar,
      note: memberSince,
    },
    share,
    t,
  )
    .setImage(profile.banner)
    .addFields(
      compactFields([
        [
          t('profile.anime'),
          t('profile.animeStats', {
            count: number(anime.count),
            episodes: number(anime.episodes),
            days: number(anime.days),
            score: score(anime.meanScore),
          }),
        ],
        [
          t('profile.manga'),
          t('profile.mangaStats', {
            count: number(manga.count),
            chapters: number(manga.chapters),
            volumes: number(manga.volumes),
            score: score(manga.meanScore),
          }),
        ],
        // The favourites start their own row, each under the statistics of the same kind.
        ...(favouriteAnime || favouriteManga ? [ROW_BREAK] : []),
        [t('profile.favouriteAnime'), favouriteAnime],
        [t('profile.favouriteManga'), favouriteManga],
        [t('profile.favouriteCharacters'), favourite(favourites.characters), false],
      ]),
    );
}
