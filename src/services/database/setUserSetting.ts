import type { User } from '../../generated/prisma/client.ts';
import { prisma } from './prisma.ts';

export type UserSetting = Exclude<keyof User, 'id'>;

/**
 * Creates or updates the single settings row of a Discord user. A row left without any setting is deleted:
 * nothing is kept about a user who has nothing configured any more.
 */
export async function setUserSetting<S extends UserSetting>(
  id: string,
  setting: S,
  value: User[S],
): Promise<void> {
  const user = await prisma.user.upsert({
    where: { id },
    create: { id, [setting]: value },
    update: { [setting]: value },
  });

  const empty = Object.entries(user).every(([column, saved]) => column === 'id' || saved === null);
  if (empty) await prisma.user.delete({ where: { id } });
}
