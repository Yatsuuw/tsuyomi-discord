import { mediaLink } from '../../../services/anilist/format/mediaLink.ts';
import { personName } from '../../../services/anilist/format/personName.ts';
import type { AniListUser } from '../../../services/anilist/model/types.ts';
import type { Profile } from '../model/types.ts';

/** Converts an AniList user to the profile shape shared by every platform. */
export function anilistProfile(user: AniListUser): Profile {
  const { anime, manga } = user.statistics;
  const { favourites } = user;

  return {
    username: user.name,
    url: user.siteUrl,
    avatar: user.avatar.large,
    banner: user.bannerImage,
    // AniList gives the creation date in seconds.
    joinedAt: user.createdAt ? new Date(user.createdAt * 1000) : null,
    anime: {
      count: anime.count,
      episodes: anime.episodesWatched,
      days: anime.minutesWatched / 1440,
      meanScore: anime.meanScore,
    },
    manga: {
      count: manga.count,
      chapters: manga.chaptersRead,
      volumes: manga.volumesRead,
      meanScore: manga.meanScore,
    },
    favourites: {
      anime: favourites.anime.nodes.map(mediaLink),
      manga: favourites.manga.nodes.map(mediaLink),
      characters: favourites.characters.nodes.map(({ name, siteUrl }) => ({
        label: personName(name),
        url: siteUrl,
      })),
    },
  };
}
