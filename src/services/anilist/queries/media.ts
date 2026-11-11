import { DATE_FIELDS } from './fragments.ts';
import { searchQuery } from './searchQuery.ts';

/**
 * Anime, manga or light novel search. `search` matches romaji, english and native titles as well as
 * synonyms. `$format` and `$formatNot` are optional: unset, they filter nothing.
 */
export const MEDIA_QUERY = searchQuery({
  field: 'media',
  variables: '$type: MediaType!, $format: MediaFormat, $formatNot: MediaFormat',
  filters: 'type: $type, format: $format, format_not: $formatNot',
  selection: /* GraphQL */ `
    id
    type
    format
    status(version: 2)
    description(asHtml: false)
    synonyms
    episodes
    duration
    chapters
    volumes
    season
    seasonYear
    startDate { ${DATE_FIELDS} }
    endDate { ${DATE_FIELDS} }
    averageScore
    genres
    coverImage { extraLarge color }
    bannerImage
    studios(isMain: true) { nodes { name } }
    ...mediaLink
  `,
});
