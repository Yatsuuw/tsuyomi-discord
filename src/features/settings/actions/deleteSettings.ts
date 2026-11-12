import { createTranslator } from '../../../i18n/translator/createTranslator.ts';
import { resolveLang } from '../../../i18n/translator/resolveLang.ts';
import { forgetUser } from '../../../services/database/forgetUser.ts';
import type { SettingAction } from '../model/types.ts';

/** /config delete — deletes everything saved about the user. */
export const deleteSettings: SettingAction = async (interaction) => {
  await forgetUser(interaction.user.id);
  // The saved language is gone with the rest: the confirmation is written in the default one.
  await interaction.editReply(createTranslator(resolveLang())('config.deleted'));
};
