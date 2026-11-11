import type { EmbedBuilder } from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { formatFuzzyDate } from '../../../services/anilist/format/formatFuzzyDate.ts';
import { mediaLinks } from '../../../services/anilist/format/mediaLinks.ts';
import type { Staff } from '../../../services/anilist/model/types.ts';
import { personEmbed } from './personEmbed.ts';

/** Detailed sheet of a staff member (author, director, voice actor...). */
export function staffEmbed(staff: Staff, t: Translator): EmbedBuilder {
  const [firstYear, lastYear] = staff.yearsActive;
  const yearsActive = firstYear && `${firstYear} – ${lastYear ?? t('value.present')}`;

  return personEmbed(
    staff,
    'type.staff',
    [
      [t('field.death'), formatFuzzyDate(staff.dateOfDeath, t.lang)],
      [t('field.homeTown'), staff.homeTown],
      [t('field.language'), staff.languageV2],
      [t('field.yearsActive'), yearsActive],
      [t('field.occupations'), staff.primaryOccupations.join(', ')],
      [t('field.knownFor'), mediaLinks(staff.staffMedia.nodes), false],
    ],
    t,
  );
}
