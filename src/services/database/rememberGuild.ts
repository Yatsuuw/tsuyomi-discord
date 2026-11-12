import { prisma } from './prisma.ts';

/** Records that the bot has been set up on a server. Doing it again is harmless. */
export async function rememberGuild(id: string): Promise<void> {
  await prisma.guild.upsert({ where: { id }, create: { id }, update: {} });
}
