const { createClient } = require('redis');

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

let client;
let ready = false;

async function init() {
  try {
    client = createClient({ url: REDIS_URL });
    client.on('error', () => {
      ready = false;
    });
    await client.connect();
    ready = true;
  } catch (_) {
    ready = false;
  }
}

// initialize immediately
init();

async function get(key) {
  if (!ready) return null;
  try {
    return await client.get(key);
  } catch (_) {
    return null;
  }
}

async function set(key, value, ttlSeconds) {
  if (!ready) return;
  try {
    if (ttlSeconds && Number.isFinite(ttlSeconds)) {
      await client.setEx(key, ttlSeconds, value);
    } else {
      await client.set(key, value);
    }
  } catch (_) {}
}

async function del(key) {
  if (!ready) return;
  try {
    await client.del(key);
  } catch (_) {}
}

function isReady() {
  return ready;
}

module.exports = {
  get,
  set,
  del,
  isReady,
};

