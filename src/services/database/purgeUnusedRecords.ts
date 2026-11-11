import { prisma } from './prisma.ts';

/**
 * Deletes what the bot has no use for any more: the records of the servers it is no longer on, and the
 * user rows holding no setting. Both are normally removed as they become useless; this catches what was
 * missed, such as a server left while the bot was stopped.
 */
export async function purgeUnusedRecords(currentGuildIds: string[]): Promise<void> {
  await prisma.guild.deleteMany({ where: { id: { notIn: currentGuildIds } } });

  const settings = Object.keys(prisma.user.fields).filter((column) => column !== 'id');
  await prisma.user.deleteMany({ where: Object.fromEntries(settings.map((setting) => [setting, null])) });
}
