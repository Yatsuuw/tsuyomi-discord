type Level = 'info' | 'warn' | 'error';

/** Creates the function writing the timestamped lines of one level. */
function writer(level: Level) {
  return (message: string, detail?: unknown): void => {
    const line = `${new Date().toISOString()} [${level.toUpperCase()}] ${message}`;
    if (detail === undefined) console[level](line);
    else console[level](line, detail);
  };
}

/** Minimal logger writing to stdout/stderr (collected by Docker in production). */
export const logger = { info: writer('info'), warn: writer('warn'), error: writer('error') };
