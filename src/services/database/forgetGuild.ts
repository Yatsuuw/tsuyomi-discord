import { prisma } from './prisma.ts';

/** Deletes the record of a server, if there is one: the bot is no longer initialised there. */
export async function forgetGuild(id: string): Promise<void> {
  await prisma.guild.deleteMany({ where: { id } });
}
