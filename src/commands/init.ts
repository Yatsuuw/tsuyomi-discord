import {
  ApplicationIntegrationType,
  InteractionContextType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import { UserError } from '../core/errors/UserError.ts';
import type { Command } from '../core/types/Command.ts';
import { forgetGuild } from '../services/database/forgetGuild.ts';
import { rememberGuild } from '../services/database/rememberGuild.ts';
import { replyEphemeral } from '../utils/discord/replyEphemeral.ts';

/**
 * /init — `setup` registers the server (and its owner) so that the bot accepts to work on it, `remove`
 * deletes that record. Discord cannot run a command that has subcommands on its own: there is no bare /init.
 */
const init: Command = {
  data: new SlashCommandBuilder()
    .setName('init')
    .setDescription('Set up Tsuyomi on this server, or delete what it saved about it')
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((subcommand) =>
      subcommand
        .setName('setup')
        .setDescription('Initialise Tsuyomi on this server so that its commands can be used here'),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('remove')
        .setDescription('Delete what Tsuyomi saved about this server: its commands stop working here'),
    )
    .toJSON(),

  worksUninitialised: true,

  async execute(interaction, { t }) {
    if (!interaction.inCachedGuild()) throw new UserError('error.guildOnly');
    const { id, ownerId } = interaction.guild;

    if (interaction.options.getSubcommand() === 'remove') {
      await forgetGuild(id);
      await replyEphemeral(interaction, t('init.removed'));
      return;
    }

    await rememberGuild(id, ownerId);
    await replyEphemeral(interaction, t('init.success'));
  },
};

export default init;
