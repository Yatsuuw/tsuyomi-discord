import { setUserSetting } from '../../../services/database/setUserSetting.ts';
import type { SettingAction } from '../model/types.ts';

/** /config sharing — lets other users share the profiles of the user with /profile, or stops them. */
export const setSharing: SettingAction = async (interaction, { t }) => {
  const allowed = interaction.options.getBoolean('allow', true);
  // Refusing is the default, so it is saved as "nothing": a user with nothing else saved leaves no row.
  await setUserSetting(interaction.user.id, 'allowSharing', allowed || null);
  await interaction.editReply(t(allowed ? 'config.sharing.on' : 'config.sharing.off'));
};
