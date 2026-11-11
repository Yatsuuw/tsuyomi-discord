import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import type { ProfileShare } from '../model/types.ts';

/** Says who shares the profile: its owner, or someone else posting it for them. */
export function shareSentence({ owner, sharedBy }: ProfileShare, platform: string, t: Translator): string {
  return owner.id === sharedBy.id
    ? t('profile.share', { user: owner.toString(), platform })
    : t('profile.shareOther', { sharer: sharedBy.toString(), user: owner.toString(), platform });
}
