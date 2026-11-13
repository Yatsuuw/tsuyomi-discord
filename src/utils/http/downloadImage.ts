/** Longest time an image is given to download, in milliseconds. */
const TIMEOUT = 3_000;

/** Heaviest image accepted, in bytes: Discord refuses attachments above 10 MB. */
const MAX_SIZE = 8 * 1024 * 1024;

/** File extension of each image format Discord displays in an embed. */
const EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
};

export interface DownloadedImage {
  data: Buffer;
  /** File extension matching the format of the image, without the dot. */
  extension: string;
}

/**
 * Downloads an image. Resolves with `null` instead of throwing when it cannot be had (unreachable, too slow,
 * too heavy, or not an image): a missing picture must never fail what it only illustrates.
 */
export async function downloadImage(url: string): Promise<DownloadedImage | null> {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
    const extension = EXTENSIONS[response.headers.get('content-type')?.split(';')[0]?.trim() ?? ''];
    if (!response.ok || !extension) return null;
    // The announced size spares the download of an image that would be refused anyway.
    if (Number(response.headers.get('content-length')) > MAX_SIZE) return null;

    const data = Buffer.from(await response.arrayBuffer());
    return data.byteLength > MAX_SIZE ? null : { data, extension };
  } catch {
    return null;
  }
}
