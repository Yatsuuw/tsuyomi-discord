interface Entry<V> {
  value: V;
  expiresAt: number;
}

/** Small in-memory cache whose entries expire after a fixed delay, bounded in size. */
export class TtlCache<V> {
  readonly #entries = new Map<string, Entry<V>>();
  readonly #ttl: number;
  readonly #maxSize: number;

  constructor(ttl: number, maxSize: number) {
    this.#ttl = ttl;
    this.#maxSize = maxSize;
  }

  get(key: string): V | undefined {
    const entry = this.#entries.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt > Date.now()) return entry.value;
    this.#entries.delete(key);
    return undefined;
  }

  set(key: string, value: V): void {
    // Re-inserting moves the key to the end, so the first key is always the oldest one.
    this.#entries.delete(key);
    this.#entries.set(key, { value, expiresAt: Date.now() + this.#ttl });
    if (this.#entries.size > this.#maxSize) {
      const oldest = this.#entries.keys().next();
      if (!oldest.done) this.#entries.delete(oldest.value);
    }
  }

  /** Returns the cached value of `key`, calling `load` to obtain and store it when there is none. */
  async getOrLoad(key: string, load: () => Promise<V>): Promise<V> {
    const cached = this.get(key);
    if (cached !== undefined) return cached;

    const value = await load();
    this.set(key, value);
    return value;
  }
}
