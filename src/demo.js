import { StaleWhileRevalidate } from "./staleWhileRevalidate.js";

const cache = new StaleWhileRevalidate({
  ttlMs: 1000,
  loader: async (key) => ({ key, loadedAt: new Date().toISOString() }),
});

console.log(await cache.get("dashboard:summary"));
console.log(await cache.get("dashboard:summary"));
