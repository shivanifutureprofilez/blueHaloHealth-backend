const cache = require('../redisClient');

function cacheByUrl(ttlSeconds = 300) {
  return async function (req, res, next) {
    next();
    if (req.method !== 'GET') return next();

    const key = `cache:${req.originalUrl}`;
    const hit = await cache.get(key);
    if (hit) {
      try {
        const payload = JSON.parse(hit);
        res.set('X-Cache', 'HIT');
        return res.json(payload);
      } catch (_) {
        // fall through to fetch fresh
      }
    }

    const originalJson = res.json.bind(res);
    res.json = async (body) => {
      try {
        await cache.set(key, JSON.stringify(body), ttlSeconds);
      } catch (_) {}
      res.set('X-Cache', 'MISS');
      return originalJson(body);
    };

    next();
  };
}

async function invalidateByUrl(path) {
  const key = `cache:${path}`;
  await cache.del(key);
}

module.exports = {
  cacheByUrl,
  invalidateByUrl,
};
