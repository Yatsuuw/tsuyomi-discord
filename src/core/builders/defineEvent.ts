import type { ClientEvents } from 'discord.js';
import type { Event } from '../types/Event.ts';

/** Identity helper giving an event file fully typed `execute` arguments from its `name`. */
export function defineEvent<K extends keyof ClientEvents>(event: Event<K>): Event<K> {
  return event;
}
