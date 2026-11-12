import type { Lang } from '../../../i18n/locales/index.ts';
import { createTranslator } from '../../../i18n/translator/createTranslator.ts';
import { resolveLang } from '../../../i18n/translator/resolveLang.ts';
import { setUserSetting } from '../../../services/database/setUserSetting.ts';
import { DEFAULT_LANGUAGE_CHOICE } from '../model/constants.ts';
import type { SettingAction } from '../model/types.ts';

/** /config lang — saves the language the bot answers the user in, or forgets it to use the default one. */
export const setLanguage: SettingAction = async (interaction) => {
  const choice = interaction.options.getString('language', true);
  const lang = choice === DEFAULT_LANGUAGE_CHOICE ? null : (choice as Lang);
  await setUserSetting(interaction.user.id, 'lang', lang);

  // The confirmation is written in the language that has just been chosen.
  const t = createTranslator(resolveLang(lang));
  await interaction.editReply(t(lang ? 'config.lang.success' : 'config.lang.default'));
};
