import {
  type ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type MessageActionRowComponentBuilder,
} from 'discord.js';
import { actionRow } from './actionRow.ts';

export interface Link {
  label: string;
  url: string;
}

/** Builds a row of buttons opening external pages. */
export function linkButtons(links: Link[]): ActionRowBuilder<MessageActionRowComponentBuilder> {
  return actionRow(
    ...links.map(({ label, url }) =>
      new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(label).setURL(url),
    ),
  );
}
