import { fetchUser } from '../../../services/anilist/api/fetchUser.ts';
import { ANILIST_COLOR, ANILIST_NAME } from '../../../services/anilist/model/constants.ts';
import { apiPlatform } from '../factories/apiPlatform.ts';
import { anilistProfile } from '../mappers/anilistProfile.ts';

/** AniList profiles, read from the AniList API. */
export const anilist = apiPlatform({
  name: ANILIST_NAME,
  pattern: /^[A-Za-z0-9]{2,20}$/,
  color: ANILIST_COLOR,
  scoreScale: 100,
  fetchUser,
  toProfile: anilistProfile,
  links: (profile, t) => [{ label: t('profile.open'), url: profile.url }],
});
