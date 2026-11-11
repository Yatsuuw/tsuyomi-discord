import { mediaTitle } from '../../../services/anilist/format/mediaTitle.ts';
import type { Media, MediaFilter } from '../../../services/anilist/model/types.ts';
import { MEDIA_QUERY } from '../../../services/anilist/queries/media.ts';
import { mediaEmbed } from '../embeds/mediaEmbed.ts';
import type { SearchKind } from '../model/types.ts';

/** Search of anime, manga or light novels, which only differ by the filter sent to AniList. */
export function mediaKind(filter: MediaFilter): SearchKind<Media> {
  return {
    query: MEDIA_QUERY,
    variables: { ...filter },
    title: (media) => mediaTitle(media.title),
    summary: (media, t) =>
      [t.label('format', media.format), media.startDate.year, t.label('status', media.status)]
        .filter(Boolean)
        .join(' • '),
    embed: mediaEmbed,
  };
}
