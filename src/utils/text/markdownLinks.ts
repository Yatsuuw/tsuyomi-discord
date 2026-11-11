import type { Link } from '../discord/linkButtons.ts';

/** Lists links as one markdown link per line. */
export function markdownLinks(links: Link[]): string {
  return links.map(({ label, url }) => `[${label}](${url})`).join('\n');
}
