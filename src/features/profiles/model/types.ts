import type { ActionRowBuilder, EmbedBuilder, MessageActionRowComponentBuilder, User } from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import type { Link } from '../../../utils/discord/linkButtons.ts';

/** A website on which users have a profile they can link with /config and share with /profile. */
export interface Platform {
  /** Name of the website, as displayed to users. */
  name: string;
  /** Format of a valid username on the website. */
  pattern: RegExp;
  /**
   * Checks that the user exists and returns the exact spelling of their username, or `null` if they do
   * not. Only the platforms read through an API can provide it.
   */
  resolve?(username: string): Promise<string | null>;
  /** Builds the message sharing the profile `username`. */
  render(username: string, share: ProfileShare, t: Translator): Promise<ProfileMessage>;
}

/** What every platform is created from, whatever the way its profiles are read. */
export interface PlatformOptions extends Pick<Platform, 'name' | 'pattern'> {
  /** Colour of the embeds sharing a profile of the platform. */
  color: number;
}

/** The message sharing a profile: its embed, then the buttons opening the pages of the profile. */
export interface ProfileMessage {
  embeds: EmbedBuilder[];
  components: ActionRowBuilder<MessageActionRowComponentBuilder>[];
}

/** Who is involved when a profile is shared. Both are the same person unless someone shares the profile of another user. */
export interface ProfileShare {
  /** Discord user the profile belongs to. */
  owner: User;
  /** Discord user posting it. */
  sharedBy: User;
}

/** A profile read from the API of a platform, in the shape every platform is converted to. */
export interface Profile {
  username: string;
  url: string;
  avatar: string | null;
  banner: string | null;
  joinedAt: Date | null;
  /** A mean score of 0 means the user rated nothing. */
  anime: { count: number; episodes: number; days: number; meanScore: number };
  manga: { count: number; chapters: number; volumes: number; meanScore: number };
  favourites: { anime: Link[]; manga: Link[]; characters: Link[] };
}

/** How the profiles of a platform are presented. */
export interface ProfileStyle {
  /** Name of the platform. */
  platform: string;
  color: number;
  /** Highest score of the platform's rating scale: 100 on AniList. */
  scoreScale: number;
}
