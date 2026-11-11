import { en } from './en.ts';
import { fr } from './fr.ts';

/** Every language the bot can speak. Adding a language only requires a new entry here. */
export const locales = { en, fr };

export type Lang = keyof typeof locales;

/** Language of the users who have not chosen one with /config lang. */
export const DEFAULT_LANG: Lang = 'en';
export type TranslationKey = keyof typeof en;
