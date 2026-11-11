import { DEFAULT_LANG, type Lang, locales } from '../locales/index.ts';

/** Picks the language of a reply: the choice the user saved with /config lang, else the default one. */
export function resolveLang(saved?: string | null): Lang {
  return saved && Object.hasOwn(locales, saved) ? (saved as Lang) : DEFAULT_LANG;
}
