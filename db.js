const fs   = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const DATA_FILE = path.join(dataDir, 'gi.json');

const DEFAULT_CODES = [
  'ANFI976GI','ANTTUFF976GI','BEN976GI','BOU976GI','DL976GI',
  'JACKY976GI','LAOU976GI','LAZA976GI','MAITA976GI','MIKA976GI',
  'NAI976GI','NASRA976GI','NJ976GI','YOU976GI'
];

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { codes: [...DEFAULT_CODES], candidatures: [] };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Initialisation
let _data = readData();
if (!_data.codes)        _data.codes        = [...DEFAULT_CODES];
if (!_data.candidatures) _data.candidatures = [];
writeData(_data);

const db = {
  get data() { return _data; },
  write()    { writeData(_data); }
};

console.log(`✅ Base de données chargée — ${_data.codes.length} codes, ${_data.candidatures.length} candidatures`);

module.exports = db;
