import type { APIEmbedField } from 'discord.js';
import { truncate } from '../text/truncate.ts';

/** An embed field as `[name, value, inline]`. Fields are inline unless stated otherwise. */
export type FieldEntry = [name: string, value: string | number | null | undefined, inline?: boolean];

/** Turns entries into embed fields, dropping those without a value. */
export function compactFields(entries: FieldEntry[]): APIEmbedField[] {
  return entries.flatMap(([name, value, inline = true]) => {
    const text = String(value ?? '').trim();
    return text ? [{ name, value: truncate(text, 1024), inline }] : [];
  });
}
