import { requireEnv } from './requireEnv.ts';

export interface Credentials {
  token: string;
  clientId: string;
}

/** Returns the credentials of the production bot or of the development bot. */
export function getCredentials(production: boolean): Credentials {
  const suffix = production ? 'PROD' : 'DEV';
  return {
    token: requireEnv(`DISCORD_TOKEN_${suffix}`),
    clientId: requireEnv(`CLIENT_ID_${suffix}`),
  };
}
