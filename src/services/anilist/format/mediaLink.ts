import type { Link } from '../../../utils/discord/linkButtons.ts';
import type { MediaLink } from '../model/types.ts';
import { mediaTitle } from './mediaTitle.ts';

/** Link to the AniList page of an anime or manga, labelled with its main title. */
export function mediaLink(media: MediaLink): Link {
  return { label: mediaTitle(media.title), url: media.siteUrl };
}
