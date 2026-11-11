import { personName } from '../../../services/anilist/format/personName.ts';
import type { Staff } from '../../../services/anilist/model/types.ts';
import { STAFF_QUERY } from '../../../services/anilist/queries/staff.ts';
import { staffEmbed } from '../embeds/staffEmbed.ts';
import type { SearchKind } from '../model/types.ts';

/** Search of staff members, summarised by their occupations. */
export const staffKind: SearchKind<Staff> = {
  query: STAFF_QUERY,
  title: (staff) => personName(staff.name),
  summary: (staff) => staff.primaryOccupations.join(', '),
  embed: staffEmbed,
};
