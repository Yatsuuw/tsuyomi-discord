import type { PersonName } from '../model/types.ts';

/** Main name of a character, staff member or user favourite: full name when available, otherwise native. */
export function personName(name: Pick<PersonName, 'full' | 'native'>): string {
  return name.full ?? name.native ?? '?';
}
