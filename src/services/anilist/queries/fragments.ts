/** GraphQL snippets shared by several queries. */

export const MEDIA_LINK = /* GraphQL */ `
  fragment mediaLink on Media {
    siteUrl
    title { romaji english native }
  }
`;

/** Selection of a `FuzzyDate` object. */
export const DATE_FIELDS = 'year month day';

/**
 * Fields `Character` and `Staff` have in common (the `Person` type). They are two unrelated GraphQL types,
 * so a fragment cannot be shared between them: the selection is inserted as text instead.
 */
export const PERSON_FIELDS = /* GraphQL */ `
  id
  siteUrl
  name { first middle last full native alternative }
  image { large }
  description(asHtml: false)
  gender
  age
  dateOfBirth { ${DATE_FIELDS} }
  bloodType
`;
