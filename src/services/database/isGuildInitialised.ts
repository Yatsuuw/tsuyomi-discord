import { prisma } from './prisma.ts';

/** Tells whether the bot has been set up on the given server with /init setup. */
export async function isGuildInitialised(id: string): Promise<boolean> {
  return (await prisma.guild.count({ where: { id } })) > 0;
}
