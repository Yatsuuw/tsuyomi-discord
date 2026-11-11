import { existsSync } from 'node:fs';
import { defineConfig, env } from 'prisma/config';

// Prisma no longer loads .env by itself; Node does it natively (no dotenv needed).
if (existsSync('.env')) process.loadEnvFile('.env');

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: { url: env('DATABASE_URL') },
});
