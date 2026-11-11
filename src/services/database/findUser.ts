import type { User } from '../../generated/prisma/client.ts';
import { prisma } from './prisma.ts';

/** Reads the saved settings of a Discord user, if they have any. */
export function findUser(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}
