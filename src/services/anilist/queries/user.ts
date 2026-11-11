import { MEDIA_LINK } from './fragments.ts';

/** Public profile of an AniList user, found by name. */
export const USER_QUERY = /* GraphQL */ `
  query ($name: String!) {
    User(name: $name) {
      id
      name
      siteUrl
      createdAt
      avatar { large }
      bannerImage
      statistics {
        anime { count meanScore minutesWatched episodesWatched }
        manga { count meanScore chaptersRead volumesRead }
      }
      favourites {
        anime(perPage: 3) { nodes { ...mediaLink } }
        manga(perPage: 3) { nodes { ...mediaLink } }
        characters(perPage: 3) { nodes { name { full native } siteUrl } }
      }
    }
  }
  ${MEDIA_LINK}
`;
