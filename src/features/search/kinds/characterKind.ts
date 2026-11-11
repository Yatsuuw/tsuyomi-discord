import { mediaTitle } from '../../../services/anilist/format/mediaTitle.ts';
import { personName } from '../../../services/anilist/format/personName.ts';
import type { Character } from '../../../services/anilist/model/types.ts';
import { CHARACTER_QUERY } from '../../../services/anilist/queries/character.ts';
import { characterEmbed } from '../embeds/characterEmbed.ts';
import type { SearchKind } from '../model/types.ts';

/** Search of characters, summarised by the most popular work they appear in. */
export const characterKind: SearchKind<Character> = {
  query: CHARACTER_QUERY,
  title: (character) => personName(character.name),
  summary: (character) => {
    const [media] = character.media.nodes;
    return media ? mediaTitle(media.title) : '';
  },
  embed: characterEmbed,
};
