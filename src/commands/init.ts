import {
  ApplicationIntegrationType,
  InteractionContextType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import { UserError } from '../core/errors/UserError.ts';
import type { Command } from '../core/types/Command.ts';
import { prisma } from '../services/database/prisma.ts';
import { replyEphemeral } from '../utils/discord/replyEphemeral.ts';

/** /init — registers the server (and its owner) so that the bot accepts to work on it. */
const init: Command = {
  data: new SlashCommandBuilder()
    .setName('init')
    .setDescription('Initialise Tsuyomi on this server so that its commands can be used here')
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .toJSON(),

  worksUninitialised: true,

  async execute(interaction, { t }) {
    if (!interaction.inCachedGuild()) throw new UserError('error.guildOnly');
    const { id, ownerId } = interaction.guild;

    // Running the command again is harmless and refreshes the owner after an ownership transfer.
    await prisma.guild.upsert({ where: { id }, create: { id, ownerId }, update: { ownerId } });
    await replyEphemeral(interaction, t('init.success'));
  },
};

export default init;
