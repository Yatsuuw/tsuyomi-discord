import type { EmbedBuilder } from 'discord.js';
import type { TranslationKey } from '../../../i18n/locales/index.ts';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { formatFuzzyDate } from '../../../services/anilist/format/formatFuzzyDate.ts';
import { personName } from '../../../services/anilist/format/personName.ts';
import type { Person } from '../../../services/anilist/model/types.ts';
import type { FieldEntry } from '../../../utils/discord/compactFields.ts';
import { labelledLines } from '../../../utils/text/labelledLines.ts';
import { sheetEmbed } from './sheetEmbed.ts';

/**
 * Detailed sheet of a character or a staff member: everything both have in common, followed by the
 * `extraFields` specific to one of them.
 */
export function personEmbed(
  person: Person,
  type: TranslationKey,
  extraFields: FieldEntry[],
  t: Translator,
): EmbedBuilder {
  const { name } = person;
  const names = labelledLines([
    [t('name.first'), name.first],
    [t('name.middle'), name.middle],
    [t('name.last'), name.last],
    [t('name.native'), name.native],
    [t('name.alternative'), name.alternative.join(', ')],
  ]);

  return sheetEmbed(
    {
      type,
      title: personName(name),
      url: person.siteUrl,
      description: person.description,
      thumbnail: person.image.large,
      fields: [
        [t('field.names'), names, false],
        [t('field.birthday'), formatFuzzyDate(person.dateOfBirth, t.lang)],
        [t('field.age'), person.age],
        [t('field.gender'), person.gender],
        [t('field.bloodType'), person.bloodType],
        ...extraFields,
      ],
    },
    t,
  );
}
