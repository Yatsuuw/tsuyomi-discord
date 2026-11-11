import { prisma } from './prisma.ts';

/** Tells whether /init has been run on the given server. */
export async function isGuildInitialised(id: string): Promise<boolean> {
  return (await prisma.guild.count({ where: { id } })) > 0;
}
