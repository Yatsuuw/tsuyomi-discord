import { PERSON_FIELDS } from './fragments.ts';
import { searchQuery } from './searchQuery.ts';

/** Character search. `search` matches every name of the character, alternative ones included. */
export const CHARACTER_QUERY = searchQuery({
  field: 'characters',
  selection: /* GraphQL */ `
    ${PERSON_FIELDS}
    media(sort: POPULARITY_DESC, perPage: 5) { nodes { ...mediaLink } }
  `,
});
