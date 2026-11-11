import type { User } from '../../generated/prisma/client.ts';
import { prisma } from './prisma.ts';

export type UserSetting = Exclude<keyof User, 'id'>;

/** Creates or updates the single settings row of a Discord user. */
export async function setUserSetting(id: string, setting: UserSetting, value: string | null): Promise<void> {
  await prisma.user.upsert({
    where: { id },
    create: { id, [setting]: value },
    update: { [setting]: value },
  });
}
