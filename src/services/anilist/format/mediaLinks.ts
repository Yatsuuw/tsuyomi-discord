import { markdownLinks } from '../../../utils/text/markdownLinks.ts';
import type { MediaLink } from '../model/types.ts';
import { mediaLink } from './mediaLink.ts';

/** Lists anime and manga as one markdown link per line. */
export function mediaLinks(media: MediaLink[]): string {
  return markdownLinks(media.map(mediaLink));
}
