const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const configFile = path.join(dataDir, 'config.json');

function ensureDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

function readConfig() {
  ensureDir();
  try {
    if (!fs.existsSync(configFile)) return {};
    const raw = fs.readFileSync(configFile, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (err) {
    console.error('Erreur lecture config:', err);
    return {};
  }
}

function writeConfig(obj) {
  ensureDir();
  fs.writeFileSync(configFile, JSON.stringify(obj, null, 2), 'utf8');
}

module.exports = {
  get(key) {
    const cfg = readConfig();
    return cfg[key];
  },
  set(key, value) {
    const cfg = readConfig();
    cfg[key] = value;
    writeConfig(cfg);
  },
  getAll() {
    return readConfig();
  }
};
