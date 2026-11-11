import type { Lang } from '../../../i18n/locales/index.ts';
import type { FuzzyDate } from '../model/types.ts';

/**
 * Formats an AniList date in the given language. Such dates are often partial (a birthday without a year,
 * a release year only): only the known parts are printed. Returns `null` when nothing is known.
 */
export function formatFuzzyDate(date: FuzzyDate | null, lang: Lang): string | null {
  if (!date || (!date.year && !date.month)) return null;

  const options: Intl.DateTimeFormatOptions = { timeZone: 'UTC' };
  if (date.year) options.year = 'numeric';
  if (date.month) options.month = 'long';
  if (date.month && date.day) options.day = 'numeric';

  // 2000 is a leap year, so a 29 February birthday without a year stays valid.
  const value = new Date(Date.UTC(date.year ?? 2000, (date.month ?? 1) - 1, date.day ?? 1));
  return new Intl.DateTimeFormat(lang, options).format(value);
}
