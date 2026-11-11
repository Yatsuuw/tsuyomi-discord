import {
  type ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type MessageActionRowComponentBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { actionRow } from '../../../utils/discord/actionRow.ts';
import { truncate } from '../../../utils/text/truncate.ts';
import type { SearchPage } from './createSearchPage.ts';

/**
 * Controls of a search message: a menu to select a result of the page, the first / previous / next / last
 * navigation, then the delete and validate buttons.
 */
export function searchControls(
  { state, rows, pageCount }: SearchPage,
  t: Translator,
): ActionRowBuilder<MessageActionRowComponentBuilder>[] {
  const button = (action: string, style: ButtonStyle, label: string, disabled: boolean) =>
    new ButtonBuilder()
      .setCustomId(state.customId(action))
      .setStyle(style)
      .setLabel(label)
      .setDisabled(disabled);

  const menu = new StringSelectMenuBuilder()
    .setCustomId(state.customId('select'))
    .setPlaceholder(t('search.select'))
    .addOptions(
      rows.map(({ entry, position, summary, selected }) => ({
        label: truncate(`${position}. ${entry.title}`, 100),
        value: String(entry.id),
        default: selected,
        ...(summary && { description: truncate(summary, 100) }),
      })),
    );

  const atStart = state.page === 0;
  const atEnd = state.page === pageCount - 1;
  return [
    actionRow(menu),
    actionRow(
      button('first', ButtonStyle.Secondary, '⏮', atStart),
      button('previous', ButtonStyle.Secondary, '◀', atStart),
      button('next', ButtonStyle.Secondary, '▶', atEnd),
      button('last', ButtonStyle.Secondary, '⏭', atEnd),
    ),
    actionRow(
      button('delete', ButtonStyle.Danger, t('search.delete'), false),
      button('validate', ButtonStyle.Success, t('search.validate'), !state.selectedId),
    ),
  ];
}
