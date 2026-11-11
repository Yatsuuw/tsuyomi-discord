/**
 * Removes the accents of Latin letters ("à" becomes "a"). Other scripts are left untouched: the marks of
 * Japanese kana, for instance, are not in the removed range and are put back by the final normalisation.
 */
export function stripDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
}
