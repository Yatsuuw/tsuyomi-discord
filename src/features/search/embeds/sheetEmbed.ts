import { EmbedBuilder } from 'discord.js';
import { createFooter } from '../../../core/builders/createFooter.ts';
import type { TranslationKey } from '../../../i18n/locales/index.ts';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { ANILIST_COLOR } from '../../../services/anilist/model/constants.ts';
import { compactFields, type FieldEntry } from '../../../utils/discord/compactFields.ts';
import { cleanDescription } from '../../../utils/text/cleanDescription.ts';

/** Longest description shown on a sheet, in characters. */
const DESCRIPTION_LENGTH = 700;

export interface Sheet {
  /** Kind of object described, shown above the title. */
  type: TranslationKey;
  title: string;
  url: string;
  /** Description as AniList returns it (HTML and AniList markdown). */
  description: string | null;
  thumbnail: string | null;
  /** Colour of the embed, when the object has one of its own. */
  color?: number | null;
  /** Fields of the sheet. Those without a value are left out. */
  fields: FieldEntry[];
}

/** Base of every detailed sheet: the layout shared by anime, manga, characters and staff. */
export function sheetEmbed(sheet: Sheet, t: Translator): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(sheet.color ?? ANILIST_COLOR)
    .setAuthor({ name: t(sheet.type) })
    .setTitle(sheet.title)
    .setURL(sheet.url)
    .setDescription(cleanDescription(sheet.description, DESCRIPTION_LENGTH))
    .setThumbnail(sheet.thumbnail)
    .setFooter(createFooter(t, t('footer.anilist')))
    .addFields(compactFields(sheet.fields));
}
