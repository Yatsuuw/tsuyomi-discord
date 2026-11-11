import { escapeMarkdown, MessageFlags } from 'discord.js';
import { createCommand } from '../core/builders/createCommand.ts';
import { UserError } from '../core/errors/UserError.ts';
import type { Command } from '../core/types/Command.ts';
import { getPlatform, platforms } from '../features/profiles/platforms/index.ts';
import { type Lang, locales } from '../i18n/locales/index.ts';
import { createTranslator } from '../i18n/translator/createTranslator.ts';
import { setUserSetting } from '../services/database/setUserSetting.ts';

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
          Object.entries(locales).map(([value, strings]) => ({ name: strings['lang.name'], value })),
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

/** /config — saves the language and the profile usernames of the user (one database row per user). */
const config: Command = {
  data: data.toJSON(),

  async execute(interaction, { t }) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const userId = interaction.user.id;
    const setting = interaction.options.getSubcommand();

    if (setting === 'lang') {
      const lang = interaction.options.getString('language', true) as Lang;
      await setUserSetting(userId, 'lang', lang);
      await interaction.editReply(createTranslator(lang)('config.lang.success'));
      return;
    }

    const { key, platform } = getPlatform(setting);
    const username = interaction.options.getString('username')?.trim();
    if (!username) {
      await setUserSetting(userId, key, null);
      await interaction.editReply(t('config.profile.removed', { platform: platform.name }));
      return;
    }

    const rejected = { platform: platform.name, username: escapeMarkdown(username) };
    if (!platform.pattern.test(username)) throw new UserError('config.invalidUsername', rejected);
    const resolved = platform.resolve ? await platform.resolve(username) : username;
    if (!resolved) throw new UserError('config.userNotFound', rejected);

    await setUserSetting(userId, key, resolved);
    await interaction.editReply(t('config.profile.set', { platform: platform.name, username: resolved }));
  },
};

export default config;
