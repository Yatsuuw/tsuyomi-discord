import type { APIEmbedField } from 'discord.js';
import type { Command } from '../../../core/types/Command.ts';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import type { HELP_COMMANDS } from '../model/constants.ts';
import { commandUsages } from '../usage/commandUsages.ts';

/** Builds the field describing one command: the ways of writing it, then how to use it. */
export function commandField(
  name: (typeof HELP_COMMANDS)[number],
  command: Command,
  t: Translator,
): APIEmbedField {
  const usages = commandUsages(command.data).map((usage) => `\`${usage}\``);
  return {
    name: `/${name}`,
    value: [...usages, t(`help.${name}`, { validate: t('search.validate') })].join('\n'),
  };
}
