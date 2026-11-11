import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { requireEnv } from '../../core/env/requireEnv.ts';
import { PrismaClient } from '../../generated/prisma/client.ts';

/** Single shared database connection. */
export const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: requireEnv('DATABASE_URL') }),
});
