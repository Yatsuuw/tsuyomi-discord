import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from 'discord.js';

/**
 * Starts the definition of a command usable everywhere: on servers, in the bot's direct messages and,
 * for users who installed the application on their account, in any private conversation.
 */
export function createCommand(name: string, description: string): SlashCommandBuilder {
  return new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
    .setContexts(
      InteractionContextType.Guild,
      InteractionContextType.BotDM,
      InteractionContextType.PrivateChannel,
    );
}
