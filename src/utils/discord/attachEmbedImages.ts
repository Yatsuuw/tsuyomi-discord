import { EmbedBuilder } from 'discord.js';
import { downloadImage } from '../http/downloadImage.ts';

/** A picture sent as a file with a message, in the shape discord.js takes. */
export interface EmbedFile {
  attachment: Buffer;
  name: string;
}

/** A message whose first embed may show pictures. */
export interface PictureMessage {
  embeds: EmbedBuilder[];
  files?: EmbedFile[];
}

/**
 * Returns a copy of a message in which the thumbnail and the image of the first embed are sent as files,
 * instead of links Discord has to fetch from another website, which it sometimes fails to do: the embed
 * then shows no picture at all.
 *
 * A picture that cannot be downloaded in time keeps its link. The message itself is returned, untouched,
 * when no picture could be attached.
 */
export async function attachEmbedImages<M extends PictureMessage>(message: M): Promise<M> {
  const [first, ...others] = message.embeds;
  if (!first) return message;

  const [thumbnail, image] = await Promise.all([
    download('thumbnail', first.data.thumbnail?.url),
    download('image', first.data.image?.url),
  ]);
  if (!thumbnail && !image) return message;

  const embed = EmbedBuilder.from(first);
  if (thumbnail) embed.setThumbnail(`attachment://${thumbnail.name}`);
  if (image) embed.setImage(`attachment://${image.name}`);
  return {
    ...message,
    embeds: [embed, ...others],
    files: [thumbnail, image].filter((file) => file !== null),
  };
}

/** Downloads one picture and names the file it becomes. Pictures Discord hosts itself are left alone. */
async function download(name: string, url: string | undefined): Promise<EmbedFile | null> {
  if (!url || /^https:\/\/[^/]*\.discord(app)?\.(com|net)\//.test(url)) return null;
  const image = await downloadImage(url);
  return image && { attachment: image.data, name: `${name}.${image.extension}` };
}
