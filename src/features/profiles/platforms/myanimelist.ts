import { linkPlatform } from '../factories/linkPlatform.ts';

/** MyAnimeList profiles. */
export const myanimelist = linkPlatform({
  name: 'MyAnimeList',
  pattern: /^[\w-]{2,16}$/,
  color: 0x2e51a2,
  links: (username, t) => [
    { label: t('profile.open'), url: `https://myanimelist.net/profile/${username}` },
    { label: t('profile.animeList'), url: `https://myanimelist.net/animelist/${username}` },
    { label: t('profile.mangaList'), url: `https://myanimelist.net/mangalist/${username}` },
  ],
});
