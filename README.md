# GI Ambassadeurs — Serveur Backend

Serveur Node.js + Express + lowdb pour stocker les codes et candidatures.

## Lancer en local

```bash
npm install
npm start
```

Le serveur tourne sur http://localhost:3000

## Déployer sur Railway (gratuit)

1. Crée un compte sur https://railway.app
2. Clique "New Project" -> "Deploy from GitHub repo"
3. Connecte ce repo GitHub
4. Ajoute la variable d'environnement : GAS_SECRET=GI976KEY
5. Copie l'URL Railway et mets-la dans le site HTML

## Endpoints API

- GET /api?key=GI976KEY&action=listCodes
- GET /api?key=GI976KEY&action=addCode&code=NOM
- GET /api?key=GI976KEY&action=deleteCode&code=NOM
- GET /api?key=GI976KEY&action=list
- GET /api?key=GI976KEY&action=updateStatus&id=1&status=validé
