import { EmbedBuilder } from 'discord.js';
import { createFooter } from '../../../core/builders/createFooter.ts';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import type { ProfileShare } from '../model/types.ts';
import { shareSentence } from '../share/shareSentence.ts';

export interface ProfileSummary {
  platform: string;
  username: string;
  url: string;
  color: number;
  /** Picture of the profile on the platform. The Discord avatar of the owner is shown without one. */
  avatar?: string | null;
  /** Short text added to the footer, after the name of the platform. */
  note?: string | null;
}

/** Base of every shared profile: whose it is, who shares it, on which platform, and a link to it. */
export function profileEmbed(profile: ProfileSummary, share: ProfileShare, t: Translator): EmbedBuilder {
  const { owner } = share;
  return new EmbedBuilder()
    .setColor(profile.color)
    .setAuthor({ name: owner.displayName, iconURL: owner.displayAvatarURL() })
    .setTitle(profile.username)
    .setURL(profile.url)
    .setDescription(shareSentence(share, profile.platform, t))
    .setThumbnail(profile.avatar ?? owner.displayAvatarURL({ size: 256 }))
    .setFooter(createFooter(t, profile.platform, profile.note));
}
