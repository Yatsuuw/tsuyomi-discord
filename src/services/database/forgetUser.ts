import { prisma } from './prisma.ts';

/** Deletes everything saved about a Discord user, if anything is: their language and linked profiles. */
export async function forgetUser(id: string): Promise<void> {
  await prisma.user.deleteMany({ where: { id } });
}
