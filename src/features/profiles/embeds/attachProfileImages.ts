import { AttachmentBuilder, type EmbedBuilder } from 'discord.js';
import { downloadImage } from '../../../services/http/downloadImage.ts';
import type { Profile } from '../model/types.ts';

/**
 * Sends the avatar and the banner of a profile along with its embed instead of leaving Discord to fetch
 * them from the platform, which it sometimes fails to do: the embed then showed no picture at all.
 *
 * Returns the files to send with the embed. A picture that cannot be downloaded keeps its link in the embed,
 * as before.
 */
export async function attachProfileImages(
  embed: EmbedBuilder,
  profile: Pick<Profile, 'avatar' | 'banner'>,
): Promise<AttachmentBuilder[]> {
  const [avatar, banner] = await Promise.all([
    attach('avatar', profile.avatar),
    attach('banner', profile.banner),
  ]);
  if (avatar) embed.setThumbnail(`attachment://${avatar.name}`);
  if (banner) embed.setImage(`attachment://${banner.name}`);
  return [avatar, banner].filter((file) => file !== null);
}

/** Downloads one picture and names the file it becomes. */
async function attach(name: string, url: string | null): Promise<AttachmentBuilder | null> {
  const image = url && (await downloadImage(url));
  return image ? new AttachmentBuilder(image.data, { name: `${name}.${image.extension}` }) : null;
}
