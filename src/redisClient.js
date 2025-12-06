const { createClient } = require('redis');

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

let client;
let ready = false;
let mode = 'tcp';
const mem = new Map();

async function init() {
  if (REST_URL && REST_TOKEN) {
    mode = 'rest';
    try {
      let res = await fetch(`${REST_URL}/ping`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${REST_TOKEN}` },
      });
      if (!res.ok) {
        res = await fetch(REST_URL, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${REST_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(["PING"]) ,
        });
      }
      if (res.ok) {
        const data = await res.json();
        ready = String(data?.result || '').toUpperCase() === 'PONG';
      } else {
        ready = false;
      }
    } catch (_) {
      ready = false;
    }
    return;
  }
  mode = 'tcp';
  try {
    client = createClient({
      url: REDIS_URL,
      socket: {
        reconnectStrategy(retries) {
          return Math.min(retries * 500, 5000);
        },
      },
    });
    client.on('ready', () => { ready = true; });
    client.on('end', () => { ready = false; });
    client.on('error', () => { ready = false; });
    await client.connect();
    ready = true;
  } catch (_) {
    ready = false;
    setTimeout(init, 3000);
  }
}

// initialize immediately
// if(process.env.NODE_APP !== 'development'){
  init();
// }

async function get(key) {
  if (!ready && mode !== 'rest') {
    const item = mem.get(key);
    if (!item) return null;
    if (item.e && Date.now() > item.e) {
      mem.delete(key);
      return null;
    }
    return item.v;
  }
  try {
    if (mode === 'rest') {
      const res = await fetch(`${REST_URL}/get/${encodeURIComponent(key)}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${REST_TOKEN}` },
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data?.result ?? null;
    }
    return await client.get(key);
  } catch (_) {
    return null;
  }
}

async function set(key, value, ttlSeconds) {
  if (!ready && mode !== 'rest') {
    const e = ttlSeconds && Number.isFinite(ttlSeconds) ? Date.now() + ttlSeconds * 1000 : null;
    mem.set(key, { v: value, e });
    return;
  }
  try {
    if (mode === 'rest') {
      if (ttlSeconds && Number.isFinite(ttlSeconds)) {
        const res = await fetch(REST_URL, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${REST_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(["SETEX", key, String(ttlSeconds), value]),
        });
        if (!res.ok) return;
        return;
      } else {
        const res = await fetch(REST_URL, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${REST_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(["SET", key, value]),
        });
        if (!res.ok) return;
        return;
      }
    } else {
      if (ttlSeconds && Number.isFinite(ttlSeconds)) {
        await client.setEx(key, ttlSeconds, value);
      } else {
        await client.set(key, value);
      }
    }
  } catch (_) {}
}

async function del(key) {
  if (!ready && mode !== 'rest') {
    mem.delete(key);
    return;
  }
  try {
    if (mode === 'rest') {
      await fetch(REST_URL, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${REST_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(["DEL", key]),
      });
    } else {
      await client.del(key);
    }
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
