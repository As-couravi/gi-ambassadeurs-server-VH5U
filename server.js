require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const db      = require('./db');

const app    = express();
const PORT   = process.env.PORT || 3000;
const SECRET = process.env.GAS_SECRET || 'GI976KEY';

app.use(cors());
app.use(express.json());

function checkKey(req, res) {
  const key = req.query.key || req.body?.key;
  if (key !== SECRET) { res.json({ error: 'unauthorized' }); return false; }
  return true;
}

app.get('/api', (req, res) => {
  const p = req.query;
  if (p.key !== SECRET) return res.json({ error: 'unauthorized' });
  const action = p.action || '';

  if (action === 'listCodes') return res.json(db.data.codes);

  if (action === 'addCode') {
    const code = (p.code || '').trim().toUpperCase();
    if (!code) return res.json({ success: false, error: 'code manquant' });
    if (db.data.codes.includes(code)) return res.json({ success: false, error: 'existe deja' });
    db.data.codes.push(code);
    db.write();
    return res.json({ success: true });
  }

  if (action === 'deleteCode') {
    const code = (p.code || '').trim().toUpperCase();
    const idx  = db.data.codes.indexOf(code);
    if (idx === -1) return res.json({ success: false, error: 'code non trouve' });
    db.data.codes.splice(idx, 1);
    db.write();
    return res.json({ success: true });
  }

  if (action === 'list') return res.json(db.data.candidatures);

  if (action === 'save') {
    db.data.candidatures = JSON.parse(p.data || '[]');
    db.write();
    return res.json({ success: true });
  }

  if (action === 'updateStatus') {
    const id  = parseInt(p.id);
    const cand = db.data.candidatures.find(c => c.id === id);
    if (!cand) return res.json({ success: false, error: 'id non trouve' });
    cand.status = p.status;
    if (p.validatedAt) cand.validatedAt = p.validatedAt;
    if (p.password)    cand.password    = p.password;
    db.write();
    return res.json({ success: true });
  }

  res.json({ error: 'unknown action' });
});

app.get('/', (req, res) => {
  res.json({ status: 'Serveur GI Ambassadeurs actif', codes: db.data.codes.length, candidatures: db.data.candidatures.length });
});

app.listen(PORT, () => console.log('Serveur -> http://localhost:' + PORT));
