import { escapeMarkdown, MessageFlags } from 'discord.js';
import { createCommand } from '../core/builders/createCommand.ts';
import { UserError } from '../core/errors/UserError.ts';
import type { Command } from '../core/types/Command.ts';
import { getPlatform, platforms } from '../features/profiles/platforms/index.ts';
import { DEFAULT_LANG, type Lang, locales } from '../i18n/locales/index.ts';
import { createTranslator } from '../i18n/translator/createTranslator.ts';
import { resolveLang } from '../i18n/translator/resolveLang.ts';
import { forgetUser } from '../services/database/forgetUser.ts';
import { setUserSetting } from '../services/database/setUserSetting.ts';

/** Value of the language choice that gives up any saved language: the bot goes back to its default one. */
const DEFAULT_CHOICE = 'default';

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
          { name: `Default (${locales[DEFAULT_LANG]['lang.name']})`, value: DEFAULT_CHOICE },
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

/**
 * /config — saves the language and the profile usernames of the user (one database row per user), or
 * deletes that row.
 */
const config: Command = {
  data: data.toJSON(),

  async execute(interaction, { t }) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const userId = interaction.user.id;
    const setting = interaction.options.getSubcommand();

    if (setting === 'delete') {
      await forgetUser(userId);
      // The saved language is gone with the rest: the confirmation is written in the default one.
      await interaction.editReply(createTranslator(resolveLang())('config.deleted'));
      return;
    }

    if (setting === 'lang') {
      const choice = interaction.options.getString('language', true);
      const lang = choice === DEFAULT_CHOICE ? null : (choice as Lang);
      await setUserSetting(userId, 'lang', lang);
      // The confirmation is written in the language that has just been chosen.
      const reply = createTranslator(resolveLang(lang));
      await interaction.editReply(reply(lang ? 'config.lang.success' : 'config.lang.default'));
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
