import { stripTags } from './stripTags.ts';
import { truncate } from './truncate.ts';

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#039;': "'",
  '&nbsp;': ' ',
};

/**
 * Converts an AniList description (a mix of HTML and AniList markdown) to Discord markdown, cut to `max`
 * characters. AniList spoilers (`~!...!~`) become Discord spoilers and stay hidden even when cut.
 */
export function cleanDescription(text: string | null, max: number): string | null {
  if (!text) return null;

  // The tags with an equivalent in Discord markdown are converted, the others are removed.
  const converted = text
    .replace(/<br\s*\/?>\s*/gi, '\n')
    .replace(/<\/?(i|em)>/gi, '*')
    .replace(/<\/?(b|strong)>/gi, '**');

  const cleaned = stripTags(converted)
    .replace(/img\d*%?\([^)]*\)/gi, '')
    .replace(/~!|!~/g, '||')
    .replace(/__/g, '**')
    .replace(/&(amp|lt|gt|quot|#039|nbsp);/g, (entity) => ENTITIES[entity] ?? entity)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (!cleaned) return null;

  const cut = truncate(cleaned, max);
  const spoilerMarks = cut.split('||').length - 1;
  return spoilerMarks % 2 === 0 ? cut : `${cut}||`;
}
