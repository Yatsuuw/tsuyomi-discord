import { prisma } from './prisma.ts';

/**
 * Records that the bot has been set up on a server. Doing it again is harmless and refreshes the owner
 * after an ownership transfer.
 */
export async function rememberGuild(id: string, ownerId: string): Promise<void> {
  await prisma.guild.upsert({ where: { id }, create: { id, ownerId }, update: { ownerId } });
}
