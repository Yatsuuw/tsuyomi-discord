import { UserError } from '../../core/errors/UserError.ts';

/** Longest time an API is given to answer, in milliseconds. */
const TIMEOUT = 10_000;

export interface JsonResponse<T> {
  status: number;
  ok: boolean;
  body: T;
}

/**
 * Sends an HTTP request to the API of `service` and parses its JSON answer, whatever its status.
 * Throws a `UserError` naming the service when it cannot be reached, answers something else than JSON or
 * refuses the request because too many were sent.
 */
export async function fetchJson<T>(
  service: string,
  url: string,
  init: RequestInit = {},
): Promise<JsonResponse<T>> {
  const unavailable = (cause: unknown) => new UserError('error.serviceUnavailable', { service }, cause);

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: { Accept: 'application/json', ...init.headers },
      signal: AbortSignal.timeout(TIMEOUT),
    });
  } catch (error) {
    throw unavailable(error);
  }
  if (response.status === 429) throw new UserError('error.rateLimited', { service });

  try {
    return { status: response.status, ok: response.ok, body: (await response.json()) as T };
  } catch (error) {
    throw unavailable(error);
  }
}
