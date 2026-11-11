import type { RepliableInteraction } from 'discord.js';
import type { Translator } from '../../i18n/translator/createTranslator.ts';
import { replyEphemeral } from '../../utils/discord/replyEphemeral.ts';
import { logger } from '../../utils/logging/logger.ts';
import { UserError } from './UserError.ts';

export interface ErrorContext {
  interaction: RepliableInteraction;
  t: Translator;
}

/**
 * Single place where every error of the bot ends up. It never throws, so a failure can never take the
 * process down: unexpected errors are logged, and the user (when there is one) gets a translated message.
 */
export async function handleError(error: unknown, context?: ErrorContext): Promise<void> {
  const expected = error instanceof UserError;
  if (!expected) logger.error('Unexpected error', error);
  else if (error.cause) logger.warn(`${error.key}:`, error.cause);

  if (!context) return;
  const { interaction, t } = context;
  try {
    await replyEphemeral(interaction, expected ? t(error.key, error.params) : t('error.generic'));
  } catch (replyError) {
    logger.error('Could not report an error to the user', replyError);
  }
}
