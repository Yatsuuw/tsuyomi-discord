import { Events } from 'discord.js';
import { defineEvent } from '../core/builders/defineEvent.ts';
import type { TsuyomiClient } from '../core/client/TsuyomiClient.ts';
import { handleError } from '../core/errors/handleError.ts';
import { UserError } from '../core/errors/UserError.ts';
import { createTranslator } from '../i18n/translator/createTranslator.ts';
import { resolveLang } from '../i18n/translator/resolveLang.ts';
import { isGuildInitialised } from '../services/database/isGuildInitialised.ts';
import { prisma } from '../services/database/prisma.ts';

/** Routes slash commands, buttons and menus to their command file. */
export default defineEvent({
  name: Events.InteractionCreate,

  async execute(interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isMessageComponent()) return;

    // Until the settings of the user are read, errors are reported in the default language.
    let t = createTranslator(resolveLang());
    try {
      const user = await prisma.user.findUnique({ where: { id: interaction.user.id } });
      t = createTranslator(resolveLang(user?.lang));

      // The custom id of a component starts with the name of the command that created it.
      const [name = '', ...args] = interaction.isChatInputCommand()
        ? [interaction.commandName]
        : interaction.customId.split(':');
      const command = (interaction.client as TsuyomiClient).commands.get(name);
      if (!command) throw new UserError('error.unknownCommand');

      if (interaction.inGuild() && !command.worksUninitialised) {
        if (!(await isGuildInitialised(interaction.guildId))) throw new UserError('error.notInitialised');
      }

      if (interaction.isChatInputCommand()) await command.execute(interaction, { t, user });
      else await command.component?.(interaction, { t, user }, args);
    } catch (error) {
      await handleError(error, { interaction, t });
    }
  },
});
