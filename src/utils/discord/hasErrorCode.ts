import { DiscordAPIError, type RESTJSONErrorCodes } from 'discord.js';

/** Tells whether an error is one of the given answers of the Discord API, and not a failure of another kind. */
export function hasErrorCode(error: unknown, codes: RESTJSONErrorCodes[]): boolean {
  return error instanceof DiscordAPIError && codes.some((code) => code === error.code);
}
