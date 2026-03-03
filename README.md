# Cache Strategy Kit

Small dependency-free caching utilities for backend services. It includes an LRU cache and a stale-while-revalidate wrapper for expensive async reads.

## Features

- LRU eviction
- TTL expiry
- Stale-while-revalidate reads
- In-flight request deduplication
- Unit tests for cache behavior

## Run

```bash
npm test
npm run demo
```

## Use Case

This is useful for API integrations, dashboard queries, and frequently requested reference data where latency matters but absolute freshness can be traded for stability.















## Random Update 20

- 2025-03-25: captured a repository-specific status note with no sequential date pattern.
- Documented work progress, validation, and operational context for cache-strategy-kit.

## Random Pass 2 Update 8

- 2026-03-03: recorded a new randomized checkpoint for documentation, validation, and operational notes.
- Kept the update isolated to this repository and this pass.
