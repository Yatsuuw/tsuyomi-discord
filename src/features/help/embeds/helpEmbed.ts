import { EmbedBuilder } from 'discord.js';
import { createFooter } from '../../../core/builders/createFooter.ts';
import type { Command } from '../../../core/types/Command.ts';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { platforms } from '../../profiles/platforms/index.ts';
import { commandField } from '../fields/commandField.ts';
import { supportField } from '../fields/supportField.ts';
import { HELP_COLOR, HELP_COMMANDS } from '../model/constants.ts';

/**
 * Builds the help of the bot: an introduction, one field per command, then where to report a problem and
 * the legal documents.
 */
export function helpEmbed(commands: ReadonlyMap<string, Command>, t: Translator): EmbedBuilder {
  const platformNames = Object.values(platforms).map(({ name }) => name);
  const commandFields = HELP_COMMANDS.flatMap((name) => {
    const command = commands.get(name);
    return command ? [commandField(name, command, t)] : [];
  });

  return new EmbedBuilder()
    .setColor(HELP_COLOR)
    .setTitle(t('help.title'))
    .setDescription(
      t('help.intro', {
        platforms: new Intl.ListFormat(t.lang, { type: 'conjunction' }).format(platformNames),
      }),
    )
    .addFields(...commandFields, supportField(t))
    .setFooter(createFooter(t));
}
