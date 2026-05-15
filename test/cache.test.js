import assert from "node:assert/strict";
import { test } from "node:test";
import { LruCache } from "../src/lruCache.js";
import { StaleWhileRevalidate } from "../src/staleWhileRevalidate.js";

test("evicts least recently used entries", () => {
  const cache = new LruCache({ maxEntries: 2, ttlMs: 1000 });
  cache.set("a", 1);
  cache.set("b", 2);
  assert.equal(cache.get("a"), 1);
  cache.set("c", 3);

  assert.equal(cache.get("b"), null);
  assert.equal(cache.get("a"), 1);
  assert.equal(cache.get("c"), 3);
});

test("deduplicates concurrent cache misses", async () => {
  let calls = 0;
  const cache = new StaleWhileRevalidate({
    loader: async () => {
      calls += 1;
      return "value";
    },
  });

  const results = await Promise.all([cache.get("x"), cache.get("x")]);

  assert.equal(calls, 1);
  assert.equal(results[0].value, "value");
  assert.equal(results[1].value, "value");
});
