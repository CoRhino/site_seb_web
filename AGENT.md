# AGENT.md — ananasday.com

Guide pour tout agent (IA ou humain) qui travaille sur ce dépôt.
**Langue de travail : français.** Code de qualité production. Pas de bricolage.

---

## Le projet

Site web personnel de **Sébastien CoRhino** (artiste-musicien + programmeur).
Deux volets : **Sébastien CoRhino** (carrière artistique, nouveau départ rappeur/hip-hop)
et **Ananas Day** (faux jour férié, 1er juillet — date de sortie du single).

- **Deadline lancement : 1er juillet 2026** (single AnanasDay).
- Domaine : `ananasday.com`, hébergé sur **NearlyFreeSpeech (NFS)**.
- Plans, changelog et TODO humains : **`DOCS/`** (`DOCS/PLAN/` = plans ; `DOCS/CHANGELOG.md` ;
  `DOCS/TODO_HUMAIN.md` — l'agent y écrit, l'humain y barre). Lire le plan le plus récent avant de commencer.

## Stack — délibérément old-school

- **Vanilla HTML + CSS + JavaScript. Aucun framework, aucun build, aucune dépendance npm.**
  C'est un choix : Séb est programmeur « webmaster depuis 1998 », le site doit avoir l'air
  fait à la main, pas généré par IA.
- Polices : Space Mono (mono) + Inter (corps), via Google Fonts.
- PHP minimal côté serveur uniquement pour le compteur de visiteurs (`api/counter.php`).

## Architecture

| Fichier / dossier | Rôle |
|---|---|
| `index.html` | Accueil (hero, compte à rebours, 2 portes) |
| `lancement.html` | Page de lancement **temporaire** (single + compte à rebours + compteur), texte placeholder |
| `corhino.html` | Page artiste (bio, racines, musique) |
| `ananas.html` | Le mouvement Ananas Day |
| `videos.html` + `videos.js` + `data/videos.json` | Vidéos : bandeau déroulant de vignettes (titre/image/crédits), lecteur, embed au clic |
| `mixer.html` + `mixer.js` | Mixer multi-pistes (Web Audio), verrouillé jusqu'au 1er juillet |
| `donations.html` + `data/projets.json` | Soutien : dons par projet (thermomètres-ananas) + PayPal/crypto (adresses à venir) |
| `contact.html` | Contact : réseaux sociaux (3 principaux + autres). **Aucun courriel sur le site.** |
| `donation_ai.html` + `llm.txt`/`llm2.txt`/`llm3.txt` | Easter-egg bots IA : piste `llm.txt → llm2 → llm3 → donation_ai` (jamais rendu aux humains) |
| `404.html` + `tr808.js` | Page d'erreur + boîte à rythmes 808 fonctionnelle (404+404=808, son synthétisé) |
| `meteo-test.html` + `meteo.js` + `meteo.css` | Module météo du Bic (Kelvin entier) — **test, non déployé** |
| `style.css` | TOUT le style + les 7 thèmes (variables CSS) |
| `script.js` | Thèmes (+état actif), i18n, nav, animations, compteur |
| `locales/*.json` | Traductions i18n (fr/en/es + autres) |
| `data/events.json` | Timeline (données RÉELLES — voir avertissement) |
| `api/counter.php` | Compteur de visiteurs global (écrit `data/counter.txt`) |
| `archives/` | Vestiges hors-ligne (ancien design, vieux projet La Puck). **Ignoré par git.** |

## Conventions

- **Thèmes** : 7 thèmes (yellow par défaut/signature, red, green, magenta, cyan, rainbow, bw)
  définis par variables CSS sur `body.theme-*`. **L'orange a été retiré.** Fonds sombres sauf
  `bw` = **négatif photo** (`html:has(body.theme-bw){filter:invert(1) grayscale(1)}`).
  Toujours utiliser `var(--accent)`, `var(--bg)`, `var(--text)` — jamais de couleur en dur.
  Clé localStorage : `cr-theme`. Un **script inline en début de `<body>`** applique le thème
  avant le rendu (anti-flash, le thème suit les pages) et migre l'ancien `orange` → jaune.
  Switcher : gros bouton jaune + grille 3×2. (⚠️ vieux `selectedTheme`/`--bg-color` : N'EXISTENT PLUS.)
- **Contact / réseaux** : **jamais d'adresse courriel** sur le site. Liens sociaux = Bandcamp,
  YouTube, Instagram (footer de chaque page) ; `contact.html` pour le reste.
- **Notes pour IA** : jamais dans le DOM rendu (jamais lisibles par un humain) — uniquement en
  commentaires HTML et fichiers `llm*.txt`. Signature discrète « Build with NI™ » (NI = Natural Intelligence).
- **i18n** : attributs `data-i18n="cle.imbriquee"` + `locales/<lang>.json`. Clé localStorage : `cr-lang`.
- **Git** : commit après chaque itération, message concis et pertinent. Travailler sur une branche
  dédiée (`feat/...`, `work/...`). Brancher avant de toucher `main`.
- **Supprimer vite** : pas de code mort « au cas où ». L'historique git suffit.
  (Les `archives/` sont une exception ponctuelle demandée par Séb, hors git.)

## Déploiement

- **GitHub Actions** (`.github/workflows/deploy.yml`) : `push` sur `main` → `rsync --delete` vers NFS `/home/public`.
- **Ne sont PAS déployés** (exclus du rsync) : `.git`, `.github/`, `.claude/`, `docs/`, `DOCS/`, `PLAN/`,
  `archives/`, `AGENT.md`, `README.md`, `meteo-test.html`, `audio/`, `data/counter.txt`.
- `audio/` et `data/counter.txt` vivent uniquement sur le serveur — `--delete` ne doit jamais les écraser.
- Secrets requis (à configurer par l'humain) : `NFS_SSH_KEY`, `NFS_KNOWN_HOSTS`, `NFS_USER`, `NFS_HOST`.
  Procédure pas-à-pas dans `PLAN/`.

## Pièges à éviter

- **Ne jamais inventer de contenu factuel** (dates, événements, collaborations). `data/events.json`
  contenait de fausses données générées par IA — purgées. En cas de doute, mettre un champ
  `"todo": "HUMAIN: confirmer…"` plutôt que d'inventer.
- Ne pas déployer les pages de test (météo) ni les placeholders.
- Le mixer exige un tap utilisateur sur mobile (AudioContext).

## Dév local

Pas de build. Servir le dossier en statique (ex. `npx serve`) pour que `fetch` des locales/JSON
fonctionne. Le compteur PHP échoue silencieusement en local (pas de PHP) — c'est voulu.
