export function memoize(fn, options = {}) {
  const {
    limit = Infinity,
    strategy = 'LRU',
    ttl = 60000,
    customEviction = null
  } = options;

  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const entry = cache.get(key);

      if (strategy === 'TTL' && now - entry.timestamp > ttl) {
        cache.delete(key);
      } else {
        entry.count++;
        entry.lastAccessed = now;

        if (strategy === 'LRU') {
          cache.delete(key);
          cache.set(key, entry);
        }
        return entry.value;
      }
    }

    const result = fn(...args);

    if (cache.size >= limit) {
      evict(cache, strategy, customEviction);
    }

    cache.set(key, {
      value: result,
      timestamp: now,
      lastAccessed: now,
      count: 1
    });

    return result;
  };
}

function evict(cache, strategy, customEviction) {
  if (strategy === 'CUSTOM' && typeof customEviction === 'function') {
    customEviction(cache);
    return;
  }

  let keyToDelete = null;

  if (strategy === 'LFU') {
    let minCount = Infinity;
    for (const [key, entry] of cache.entries()) {
      if (entry.count < minCount) {
        minCount = entry.count;
        keyToDelete = key;
      }
    }
  } else {
    keyToDelete = cache.keys().next().value;
  }

  if (keyToDelete) cache.delete(keyToDelete);
}