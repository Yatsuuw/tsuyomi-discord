import type { SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import type { Platform } from '../model/types.ts';
import { platforms } from '../platforms/index.ts';

/**
 * Adds one subcommand per platform to a command. Each is named after the key of its platform, which is how
 * `getPlatform` finds the platform back from the subcommand a user ran; `describe` fills in the rest.
 */
export function addPlatformSubcommands(
  command: SlashCommandBuilder,
  describe: (subcommand: SlashCommandSubcommandBuilder, platform: Platform) => SlashCommandSubcommandBuilder,
): void {
  for (const [key, platform] of Object.entries(platforms)) {
    command.addSubcommand((subcommand) => describe(subcommand.setName(key), platform));
  }
}
