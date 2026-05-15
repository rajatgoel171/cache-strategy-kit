import { LruCache } from "./lruCache.js";

export class StaleWhileRevalidate {
  constructor({ loader, maxEntries, ttlMs } = {}) {
    if (typeof loader !== "function") {
      throw new Error("loader is required");
    }

    this.loader = loader;
    this.cache = new LruCache({ maxEntries, ttlMs });
    this.inFlight = new Map();
  }

  async get(key) {
    const fresh = this.cache.get(key);
    if (fresh !== null) return { value: fresh, cache: "hit" };

    const stale = this.cache.getStale(key);
    if (stale !== null) {
      this.#refresh(key);
      return { value: stale, cache: "stale" };
    }

    const value = await this.#refresh(key);
    return { value, cache: "miss" };
  }

  async #refresh(key) {
    if (this.inFlight.has(key)) return this.inFlight.get(key);

    const promise = Promise.resolve(this.loader(key))
      .then((value) => {
        this.cache.set(key, value);
        return value;
      })
      .finally(() => {
        this.inFlight.delete(key);
      });

    this.inFlight.set(key, promise);
    return promise;
  }
}
