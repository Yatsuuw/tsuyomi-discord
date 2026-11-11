import { linkPlatform } from '../factories/linkPlatform.ts';

/** Mangacollec profiles. */
export const mangacollec = linkPlatform({
  name: 'Mangacollec',
  pattern: /^[\w.-]{2,32}$/,
  color: 0x121212,
  links: (username, t) => [
    { label: t('profile.collection'), url: `https://www.mangacollec.com/user/${username}/collection` },
  ],
});
