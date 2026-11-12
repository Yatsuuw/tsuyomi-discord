import { UserError } from '../../../core/errors/UserError.ts';
import type { User as Settings } from '../../../generated/prisma/client.ts';
import { findUser } from '../../../services/database/findUser.ts';
import type { ProfileShare } from '../model/types.ts';
import { type PlatformKey, platforms } from '../platforms/index.ts';

/**
 * Returns the username the owner of a shared profile linked on a platform. Without one, throws the error
 * telling the person sharing what is missing: how to link their own profile, or that the other user has
 * not linked theirs.
 *
 * The profile of another user is only given once that user has allowed it with /config sharing. Without
 * that permission the answer is the same whether a profile is linked or not, so that nothing leaks.
 *
 * @param sharerSettings Settings of the person sharing, already read to answer in their language.
 */
export async function linkedUsername(
  key: PlatformKey,
  { owner, sharedBy }: ProfileShare,
  sharerSettings: Settings | null,
): Promise<string> {
  const own = owner.id === sharedBy.id;
  const settings = own ? sharerSettings : await findUser(owner.id);
  if (!own && !settings?.allowSharing) throw new UserError('profile.sharingOff', { user: owner.toString() });

  const username = settings?.[key];
  if (username) return username;

  const platform = platforms[key].name;
  throw own
    ? new UserError('profile.notConfigured', { platform, command: key })
    : new UserError('profile.notLinked', { platform, user: owner.toString() });
}
