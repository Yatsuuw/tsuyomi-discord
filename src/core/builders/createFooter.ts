import type { Translator } from '../../i18n/translator/createTranslator.ts';

/** Author of the bot, credited at the bottom of every embed. */
const AUTHOR = 'Yatsuu';

/** Builds the footer of an embed: the given parts (empty ones are skipped), then the credit of the author. */
export function createFooter(t: Translator, ...parts: (string | null | undefined)[]): { text: string } {
  return { text: [...parts, t('footer.credit', { author: AUTHOR })].filter(Boolean).join(' • ') };
}
