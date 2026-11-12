import { escapeMarkdown } from 'discord.js';
import { UserError } from '../../../core/errors/UserError.ts';
import { setUserSetting } from '../../../services/database/setUserSetting.ts';
import { getPlatform } from '../../profiles/platforms/index.ts';
import type { SettingAction } from '../model/types.ts';

/**
 * /config <platform> — links the profile of the user on the platform the subcommand is named after, or
 * unlinks it when no username is given.
 */
export const linkProfile: SettingAction = async (interaction, { t }) => {
  const { key, platform } = getPlatform(interaction.options.getSubcommand());
  const userId = interaction.user.id;
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
};
