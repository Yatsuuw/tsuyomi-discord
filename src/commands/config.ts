import { MessageFlags } from 'discord.js';
import { createCommand } from '../core/builders/createCommand.ts';
import type { Command } from '../core/types/Command.ts';
import { platforms } from '../features/profiles/platforms/index.ts';
import { deleteSettings } from '../features/settings/actions/deleteSettings.ts';
import { linkProfile } from '../features/settings/actions/linkProfile.ts';
import { setLanguage } from '../features/settings/actions/setLanguage.ts';
import { DEFAULT_LANGUAGE_CHOICE } from '../features/settings/model/constants.ts';
import type { SettingAction } from '../features/settings/model/types.ts';
import { DEFAULT_LANG, locales } from '../i18n/locales/index.ts';

const data = createCommand('config', 'Configure your language and link your profiles');
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
for (const [key, { name }] of Object.entries(platforms)) {
  data.addSubcommand((subcommand) =>
    subcommand
      .setName(key)
      .setDescription(`Link your ${name} profile`)
      .addStringOption((option) =>
        option
          .setName('username')
          .setDescription(`Your ${name} username (leave empty to unlink your profile)`)
          .setMaxLength(32),
      ),
  );
}
data.addSubcommand((subcommand) =>
  subcommand.setName('delete').setDescription('Delete everything Tsuyomi saved about you'),
);

/** What each subcommand does. The ones named after a platform are not listed: they all link a profile. */
const ACTIONS: Record<string, SettingAction> = {
  lang: setLanguage,
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
