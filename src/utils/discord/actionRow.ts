import { ActionRowBuilder, type MessageActionRowComponentBuilder } from 'discord.js';

/** Puts buttons, or a menu, on one row of a message. */
export function actionRow(
  ...components: MessageActionRowComponentBuilder[]
): ActionRowBuilder<MessageActionRowComponentBuilder> {
  return new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(components);
}
