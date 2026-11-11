import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Imports the default export of every module of a `src` sub-folder (one command or event per file).
 * Works on the TypeScript sources in development and on the compiled JavaScript in production.
 */
export async function loadModules<T>(folder: string): Promise<T[]> {
  const directory = join(import.meta.dirname, '../..', folder);
  const files = (await readdir(directory)).filter((file) => /\.(ts|js)$/.test(file));
  return Promise.all(
    files.map(async (file) => {
      const module: { default: T } = await import(pathToFileURL(join(directory, file)).href);
      return module.default;
    }),
  );
}
