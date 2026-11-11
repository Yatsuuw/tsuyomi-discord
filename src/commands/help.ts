import { MessageFlags } from 'discord.js';
import { createCommand } from '../core/builders/createCommand.ts';
import type { TsuyomiClient } from '../core/client/TsuyomiClient.ts';
import type { Command } from '../core/types/Command.ts';
import { helpEmbed } from '../features/help/embeds/helpEmbed.ts';

/** /help — lists the commands with their arguments, how to use them and where to report a problem. */
const help: Command = {
  data: createCommand('help', 'List the commands of Tsuyomi and explain how to use them').toJSON(),

  // The help is what explains that the server must be initialised: it cannot wait for it.
  worksUninitialised: true,

  async execute(interaction, { t }) {
    const { commands } = interaction.client as TsuyomiClient;
    await interaction.reply({ embeds: [helpEmbed(commands, t)], flags: MessageFlags.Ephemeral });
  },
};

export default help;
