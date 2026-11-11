import type { FieldEntry } from './compactFields.ts';

/**
 * Invisible full-width field ending a row of inline fields. Discord lines up to three inline fields per
 * row: this keeps two pairs of fields on two rows instead of a row of three followed by a single one.
 */
export const ROW_BREAK: FieldEntry = ['​', '​', false];
