import { ActivityType, type PresenceData } from 'discord.js';

/**
 * What the bot is shown doing under its name: "Watching Laid-Back Camp Season 4".
 * Discord has no "reading" activity: the types are playing, streaming, listening, watching, competing and
 * a free text (`ActivityType.Custom`, the text going in `state`).
 */
export const presence: PresenceData = {
  activities: [{ type: ActivityType.Watching, name: 'Laid-Back Camp Season 4' }],
};
