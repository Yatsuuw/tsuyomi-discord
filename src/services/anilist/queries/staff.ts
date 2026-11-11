import { DATE_FIELDS, PERSON_FIELDS } from './fragments.ts';
import { searchQuery } from './searchQuery.ts';

/** Staff search. `search` matches every name of the person, alternative ones included. */
export const STAFF_QUERY = searchQuery({
  field: 'staff',
  selection: /* GraphQL */ `
    ${PERSON_FIELDS}
    dateOfDeath { ${DATE_FIELDS} }
    languageV2
    primaryOccupations
    yearsActive
    homeTown
    staffMedia(sort: POPULARITY_DESC, perPage: 5) { nodes { ...mediaLink } }
  `,
});
