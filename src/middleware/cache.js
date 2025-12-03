const cache = require('../redisClient');

function cacheByUrl(ttlSeconds = 300) {
  return async function (req, res, next) {
    if (req.method !== 'GET' || !cache.isReady()) return next();

    const key = `cache:${req.originalUrl}`;
    const hit = await cache.get(key);
    if (hit) {
      try {
        const payload = JSON.parse(hit);
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
      return originalJson(body);
    };

    next();
  };
}

async function invalidateByUrl(path) {
  if (!cache.isReady()) return;
  const key = `cache:${path}`;
  await cache.del(key);
}

module.exports = {
  cacheByUrl,
  invalidateByUrl,
};

