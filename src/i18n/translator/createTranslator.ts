import { type Lang, locales, type TranslationKey } from '../locales/index.ts';

export type TranslationParams = Record<string, string | number>;

export interface Translator {
  /** Returns the string behind `key`, with every `{name}` placeholder replaced. */
  (key: TranslationKey, params?: TranslationParams): string;
  /**
   * Returns the label of an API enum value (e.g. `status`, `FINISHED`), or a readable fallback when it has
   * no translation. A missing value stays `null`.
   */
  label(group: string, value: string | null): string | null;
  readonly lang: Lang;
}

/** Builds the translation function of a language. */
export function createTranslator(lang: Lang): Translator {
  const strings: Record<string, string> = locales[lang];

  const translate = (key: TranslationKey, params: TranslationParams = {}): string =>
    locales[lang][key].replace(/\{(\w+)\}/g, (placeholder, name: string) =>
      String(params[name] ?? placeholder),
    );

  const label = (group: string, value: string | null): string | null =>
    value &&
    (strings[`${group}.${value}`] ?? value.charAt(0) + value.slice(1).toLowerCase().replaceAll('_', ' '));

  return Object.assign(translate, { label, lang });
}
