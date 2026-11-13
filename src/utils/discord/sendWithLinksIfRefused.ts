import { RESTJSONErrorCodes } from 'discord.js';
import { hasErrorCode } from './hasErrorCode.ts';

/** Errors by which Discord refuses the files of a message: no permission to attach, or files too heavy. */
const REFUSED_FILES = [RESTJSONErrorCodes.MissingPermissions, RESTJSONErrorCodes.RequestEntityTooLarge];

/**
 * Sends the version of a message that carries its pictures as files and, if Discord refuses the files,
 * sends the version in which they are plain links: the message always goes through.
 *
 * @param withFiles The message with its pictures attached (see `attachEmbedImages`).
 * @param withLinks The same message before they were attached.
 */
export async function sendWithLinksIfRefused<M, R>(
  withFiles: M,
  withLinks: M,
  send: (message: M) => Promise<R>,
): Promise<R> {
  if (withFiles === withLinks) return send(withLinks);
  try {
    return await send(withFiles);
  } catch (error) {
    if (!hasErrorCode(error, REFUSED_FILES)) throw error;
    return send(withLinks);
  }
}
