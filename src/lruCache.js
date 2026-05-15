export class LruCache {
  constructor({ maxEntries = 100, ttlMs = 60_000 } = {}) {
    this.maxEntries = maxEntries;
    this.ttlMs = ttlMs;
    this.items = new Map();
  }

  get(key) {
    const item = this.items.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.items.delete(key);
      return null;
    }

    this.items.delete(key);
    this.items.set(key, item);
    return item.value;
  }

  getStale(key) {
    const item = this.items.get(key);
    return item?.value ?? null;
  }

  set(key, value) {
    if (this.items.has(key)) this.items.delete(key);

    this.items.set(key, {
      value,
      expiresAt: Date.now() + this.ttlMs,
    });

    while (this.items.size > this.maxEntries) {
      const oldestKey = this.items.keys().next().value;
      this.items.delete(oldestKey);
    }
  }

  size() {
    return this.items.size;
  }
}
