import { REST, Routes } from 'discord.js';
import { loadModules } from './core/client/loadModules.ts';
import { getCredentials } from './core/env/getCredentials.ts';
import { requireEnv } from './core/env/requireEnv.ts';
import type { Command } from './core/types/Command.ts';
import { logger } from './utils/logging/logger.ts';

/**
 * Pushes the command definitions to Discord.
 * - `local`: to the development server with the development bot (available immediately).
 * - `prod`: globally with the production bot (servers and private conversations).
 */
const target = process.argv[2];
if (target !== 'local' && target !== 'prod') {
  logger.error('Usage: deploy <local|prod>');
  process.exit(1);
}

const { token, clientId } = getCredentials(target === 'prod');
const route =
  target === 'prod'
    ? Routes.applicationCommands(clientId)
    : Routes.applicationGuildCommands(clientId, requireEnv('DEV_GUILD_ID'));

const commands = await loadModules<Command>('commands');
await new REST().setToken(token).put(route, { body: commands.map((command) => command.data) });
logger.info(`${commands.length} command(s) deployed (${target})`);
