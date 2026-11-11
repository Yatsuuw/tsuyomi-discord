import type { EmbedBuilder } from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { mediaLinks } from '../../../services/anilist/format/mediaLinks.ts';
import type { Character } from '../../../services/anilist/model/types.ts';
import { personEmbed } from './personEmbed.ts';

/** Detailed sheet of a character. */
export function characterEmbed(character: Character, t: Translator): EmbedBuilder {
  return personEmbed(
    character,
    'type.character',
    [[t('field.appearsIn'), mediaLinks(character.media.nodes), false]],
    t,
  );
}
