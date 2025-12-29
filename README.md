# BEYBLADE-TURBO-V2
👥A multiple device WHATSAPP bot ultra fast power simple with all the commands please give a like 😮‍💨. 
```markdown
# BEYBLADE TURBO V2 (Baileys) - Template

Ce dépôt contient un bot WhatsApp simple basé sur [Baileys](https://github.com/adiwajshing/Baileys). Objectif : template prêt à être cloné et déployé, avec gestion de commandes et support pour un "code parrain" à 8 chiffres.

Principaux fichiers fournis :
- index.js : démarrage du bot et loader de commandes
- commands/ : dossier des commandes (alive, ping, help, parrain, setparrain, getparrain + placeholders)
- utils/config.js : lecture / écriture persistante de config (./data/config.json)
- tools/generate-commands.js : script pour générer automatiquement 150 placeholders de commandes
- Dockerfile / docker-compose.yml : pour déploiement avec volume persistant
- .env.example : variables d'environnement

IMPORTANT : ne jamais committer les fichiers d'auth (auth_info_*.json) ni le fichier .env. Ils sont dans .gitignore.

Fonctionnalité "parrain"
- .setparrain 12345678  -> commande réservée au propriétaire (OWNER_ID) : enregistre le code (exactement 8 chiffres) dans ./data/config.json
- .getparrain           -> commande réservée au propriétaire : affiche le code sauvegardé
- .parrain              -> affiche le code dans le chat courant ou l'envoie au numéro par argument

Installation locale (pas à pas)
1) Clone le repo (ou crée un nouveau repo et colle les fichiers) :
   git clone https://github.com/TON_COMPTE/TON_REPO.git
   cd TON_REPO

2) Installe les dépendances :
   npm install

3) Copie l'exemple .env :
   cp .env.example .env
   Édite `.env` :
   - SESSION_FILE=/app/auth/auth_info_multi.json (ou ./auth_info_multi.json)
   - OWNER_ID= ton_jid@s.whatsapp.net (ex: 33612345678@s.whatsapp.net)
   - (Optionnel) PARAINE_CODE=12345678

4) Crée les dossiers persistants :
   mkdir -p auth data logs

5) Génère les placeholders (optionnel) :
   npm run generate:commands

6) Lancer le bot en local :
   node index.js
   - La première fois, un QR sera imprimé dans la console. Scanne-le avec le compte WhatsApp que tu veux lier.

Déploiement (exemple Docker / VPS)
- Build :
  docker build -t beyblade-wa-bot .
- Run (volume pour session + config) :
  docker run -d --name beyblade -v $(pwd)/auth:/app/auth -v $(pwd)/data:/app/data -e SESSION_FILE=/app/auth/auth_info_multi.json -e OWNER_ID=336...@s.whatsapp.net beyblade-wa-bot

Ou utilise docker-compose :
  docker-compose up -d --build

Notes d'hébergement
- Choisis un hébergeur qui offre un stockage persistant (VPS, Render with persistent disk, Fly.io volumes). Evite les environnements où le filesystem est éphémère (ou sauve l'auth dans S3/DB).
- Le bot doit rester connecté en permanence pour ne pas demander le QR à chaque redémarrage.

Créer un nouveau dépôt GitHub et y pousser les fichiers (rapide)
1) Sur GitHub : clique "New repository" -> donne un nom -> crée le repo.
2) Sur ta machine (dans le dossier du projet) :
   git init
   git add .
   git commit -m "Initial commit - BEYBLADE WA bot template"
   git branch -M main
   git remote add origin https://github.com/TON_COMPTE/TON_REPO.git
   git push -u origin main

Sécurité & bonnes pratiques
- Ne publie jamais OWNER_ID réel/public si tu veux restreindre l'accès. OWNER_ID doit être ton JID sécurisé.
- Protéger l'accès au QR (ne pas le montrer publiquement).
- Ajoute checks supplémentaires dans les commandes sensibles (kick, block, eval).
- Pense à limiter les utilisateurs autorisés pour certaines commandes via un fichier owners.json si nécessaire.


```
