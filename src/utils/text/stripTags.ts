/**
 * Removes every HTML tag from a text. Removing a tag can bring the two halves of another one together
 * (`<scr<b>ipt>`), so the removal is repeated until the text no longer changes.
 */
export function stripTags(text: string): string {
  let previous: string;
  let stripped = text;
  do {
    previous = stripped;
    stripped = stripped.replace(/<[^>]+>/g, '');
  } while (stripped !== previous);
  return stripped;
}
