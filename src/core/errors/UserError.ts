import type { TranslationKey } from '../../i18n/locales/index.ts';
import type { TranslationParams } from '../../i18n/translator/createTranslator.ts';

/**
 * An expected failure whose translated message is shown to the user (nothing found, profile not linked...).
 * Any other error type is treated as a bug: it is logged and the user only sees a generic message.
 * Pass `cause` when the failure hides a technical problem that still deserves a log entry.
 */
export class UserError extends Error {
  readonly key: TranslationKey;
  readonly params: TranslationParams;

  constructor(key: TranslationKey, params: TranslationParams = {}, cause?: unknown) {
    super(key, { cause });
    this.name = 'UserError';
    this.key = key;
    this.params = params;
  }
}
