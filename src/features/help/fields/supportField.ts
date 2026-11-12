import type { APIEmbedField } from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { AUTHOR_DISCORD, ISSUES_URL, PRIVACY_URL, TERMS_URL } from '../model/constants.ts';

/**
 * Builds the last field of the help: where to report a problem, then, in small print, the links to the
 * privacy policy and the terms of service ("-# " starts a line of small text in Discord).
 */
export function supportField(t: Translator): APIEmbedField {
  const legal = [`[${t('help.privacy')}](${PRIVACY_URL})`, `[${t('help.terms')}](${TERMS_URL})`];
  return {
    name: t('help.support.title'),
    value: [
      t('help.support.text', { url: ISSUES_URL, contact: AUTHOR_DISCORD }),
      `-# ${legal.join(' • ')}`,
    ].join('\n'),
  };
}
