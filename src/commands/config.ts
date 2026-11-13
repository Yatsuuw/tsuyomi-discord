import { MessageFlags } from 'discord.js';
import { createCommand } from '../core/builders/createCommand.ts';
import type { Command } from '../core/types/Command.ts';
import { addPlatformSubcommands } from '../features/profiles/subcommands/addPlatformSubcommands.ts';
import { deleteSettings } from '../features/settings/actions/deleteSettings.ts';
import { linkProfile } from '../features/settings/actions/linkProfile.ts';
import { setLanguage } from '../features/settings/actions/setLanguage.ts';
import { setSharing } from '../features/settings/actions/setSharing.ts';
import { DEFAULT_LANGUAGE_CHOICE } from '../features/settings/model/constants.ts';
import type { SettingAction } from '../features/settings/model/types.ts';
import { DEFAULT_LANG, locales } from '../i18n/locales/index.ts';

const data = createCommand(
  'config',
  'Configure your language, link your profiles and decide who shares them',
);
data.addSubcommand((subcommand) =>
  subcommand
    .setName('lang')
    .setDescription('Choose the language Tsuyomi uses to talk to you')
    .addStringOption((option) =>
      option
        .setName('language')
        .setDescription('Language to use')
        .setRequired(true)
        .addChoices(
          { name: `Default (${locales[DEFAULT_LANG]['lang.name']})`, value: DEFAULT_LANGUAGE_CHOICE },
          ...Object.entries(locales).map(([value, strings]) => ({ name: strings['lang.name'], value })),
        ),
    ),
);
addPlatformSubcommands(data, (subcommand, { name }) =>
  subcommand
    .setDescription(`Link your ${name} profile`)
    .addStringOption((option) =>
      option
        .setName('username')
        .setDescription(`Your ${name} username (leave empty to unlink your profile)`)
        .setMaxLength(32),
    ),
);
data.addSubcommand((subcommand) =>
  subcommand
    .setName('sharing')
    .setDescription('Choose whether other users may share your linked profiles (they may not by default)')
    .addBooleanOption((option) =>
      option
        .setName('allow')
        .setDescription('True to let other users share your profiles, False to stop them')
        .setRequired(true),
    ),
);
data.addSubcommand((subcommand) =>
  subcommand.setName('delete').setDescription('Delete everything Tsuyomi saved about you'),
);

/** What each subcommand does. The ones named after a platform are not listed: they all link a profile. */
const ACTIONS: Record<string, SettingAction> = {
  lang: setLanguage,
  sharing: setSharing,
  delete: deleteSettings,
};

/** /config — saves, changes or deletes the settings of the user (one database row per user). */
const config: Command = {
  data: data.toJSON(),

  async execute(interaction, context) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const action = ACTIONS[interaction.options.getSubcommand()] ?? linkProfile;
    await action(interaction, context);
  },
};

export default config;
