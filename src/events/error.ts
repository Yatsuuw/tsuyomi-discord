import { Events } from 'discord.js';
import { defineEvent } from '../core/builders/defineEvent.ts';
import { handleError } from '../core/errors/handleError.ts';

/** Sends the errors emitted by the Discord client (connection problems...) to the central handler. */
export default defineEvent({
  name: Events.Error,
  execute: (error) => handleError(error),
});
