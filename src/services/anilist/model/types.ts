/** Shapes of the AniList GraphQL objects, limited to the fields the bot requests. */

export interface FuzzyDate {
  year: number | null;
  month: number | null;
  day: number | null;
}

export interface MediaTitle {
  romaji: string | null;
  english: string | null;
  native: string | null;
}

/** Minimal media reference used inside characters, staff and user favourites. */
export interface MediaLink {
  title: MediaTitle;
  siteUrl: string;
}

export type MediaType = 'ANIME' | 'MANGA';

/** What tells the kinds of media apart. For AniList, a light novel is a `MANGA` whose format is `NOVEL`. */
export interface MediaFilter {
  type: MediaType;
  format?: 'NOVEL';
  formatNot?: 'NOVEL';
}

export interface Media extends MediaLink {
  id: number;
  type: MediaType;
  format: string | null;
  status: string | null;
  description: string | null;
  synonyms: string[];
  episodes: number | null;
  duration: number | null;
  chapters: number | null;
  volumes: number | null;
  season: string | null;
  seasonYear: number | null;
  startDate: FuzzyDate;
  endDate: FuzzyDate;
  averageScore: number | null;
  genres: string[];
  coverImage: { extraLarge: string | null; color: string | null };
  bannerImage: string | null;
  studios: { nodes: { name: string }[] };
}

export interface PersonName {
  first: string | null;
  middle: string | null;
  last: string | null;
  full: string | null;
  native: string | null;
  alternative: string[];
}

/** Fields shared by characters and staff. */
export interface Person {
  id: number;
  siteUrl: string;
  name: PersonName;
  image: { large: string | null };
  description: string | null;
  gender: string | null;
  age: string | number | null;
  dateOfBirth: FuzzyDate;
  bloodType: string | null;
}

export interface Character extends Person {
  media: { nodes: MediaLink[] };
}

export interface Staff extends Person {
  dateOfDeath: FuzzyDate;
  languageV2: string | null;
  primaryOccupations: string[];
  yearsActive: number[];
  homeTown: string | null;
  staffMedia: { nodes: MediaLink[] };
}

export interface AniListUser {
  id: number;
  name: string;
  siteUrl: string;
  createdAt: number | null;
  avatar: { large: string | null };
  bannerImage: string | null;
  statistics: {
    anime: { count: number; meanScore: number; minutesWatched: number; episodesWatched: number };
    manga: { count: number; meanScore: number; chaptersRead: number; volumesRead: number };
  };
  favourites: {
    anime: { nodes: MediaLink[] };
    manga: { nodes: MediaLink[] };
    characters: { nodes: { name: Pick<PersonName, 'full' | 'native'>; siteUrl: string }[] };
  };
}
