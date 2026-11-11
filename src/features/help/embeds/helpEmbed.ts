import { EmbedBuilder } from 'discord.js';
import { createFooter } from '../../../core/builders/createFooter.ts';
import type { Command } from '../../../core/types/Command.ts';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { platforms } from '../../profiles/platforms/index.ts';
import { AUTHOR_DISCORD, HELP_COLOR, HELP_COMMANDS, ISSUES_URL } from '../model/constants.ts';
import { commandUsages } from '../usage/commandUsages.ts';

/**
 * Builds the help of the bot: one field per command, holding the ways of writing it and how to use it,
 * then where to report a problem.
 */
export function helpEmbed(commands: ReadonlyMap<string, Command>, t: Translator): EmbedBuilder {
  const platformNames = Object.values(platforms).map(({ name }) => name);
  const embed = new EmbedBuilder()
    .setColor(HELP_COLOR)
    .setTitle(t('help.title'))
    .setDescription(
      t('help.intro', {
        platforms: new Intl.ListFormat(t.lang, { type: 'conjunction' }).format(platformNames),
      }),
    )
    .setFooter(createFooter(t));

  for (const name of HELP_COMMANDS) {
    const command = commands.get(name);
    if (!command) continue;
    const usages = commandUsages(command.data).map((usage) => `\`${usage}\``);
    embed.addFields({
      name: `/${name}`,
      value: [...usages, t(`help.${name}`, { validate: t('search.validate') })].join('\n'),
    });
  }

  return embed.addFields({
    name: t('help.support.title'),
    value: t('help.support.text', { url: ISSUES_URL, contact: AUTHOR_DISCORD }),
  });
}
