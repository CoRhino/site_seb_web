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
- Plan complet et à jour : **`PLAN/`** (lire le plus récent avant de commencer).

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
| `corhino.html` | Page artiste (bio, racines, musique, projets) |
| `ananas.html` | Le mouvement Ananas Day |
| `videos.html` | Vidéos (embeds « lite », chargés au clic) |
| `mixer.html` + `mixer.js` | Mixer multi-pistes (Web Audio), verrouillé jusqu'au 1er juillet |
| `donations.html` | Page soutien (PayPal/crypto — adresses à venir) |
| `donation_ai.html` | Page cachée easter-egg pour bots IA (dons crypto) |
| `404.html` | Page d'erreur (403/500/418 = à venir) |
| `meteo-test.html` + `meteo.js` + `meteo.css` | Module météo du Bic (Kelvin) — **test, non déployé** |
| `style.css` | TOUT le style + les 8 thèmes (variables CSS) |
| `script.js` | Thèmes, i18n, nav, animations, compteur, embeds vidéo |
| `locales/*.json` | Traductions i18n (fr/en/es + autres) |
| `data/events.json` | Timeline (données RÉELLES — voir avertissement) |
| `api/counter.php` | Compteur de visiteurs (écrit `data/counter.txt`) |
| `archives/` | Vestiges hors-ligne (ancien design, vieux projet La Puck). **Ignoré par git.** |

## Conventions

- **Thèmes** : 8 thèmes (yellow par défaut, red, green, magenta, orange, cyan, bw, rainbow)
  définis par variables CSS sur `body.theme-*`. **Tous les fonds sont sombres** (sauf `bw` = négatif).
  Toujours utiliser `var(--accent)`, `var(--bg)`, `var(--text)`, etc. — jamais de couleur en dur.
  Clé localStorage : `cr-theme`. (⚠️ vieux fichiers utilisaient `selectedTheme` + `--bg-color` :
  ces variables-là N'EXISTENT PLUS.)
- **i18n** : attributs `data-i18n="cle.imbriquee"` + `locales/<lang>.json`. Clé localStorage : `cr-lang`.
- **Git** : commit après chaque itération, message concis et pertinent. Travailler sur une branche
  dédiée (`feat/...`, `work/...`). Brancher avant de toucher `main`.
- **Supprimer vite** : pas de code mort « au cas où ». L'historique git suffit.
  (Les `archives/` sont une exception ponctuelle demandée par Séb, hors git.)

## Déploiement

- **GitHub Actions** (`.github/workflows/deploy.yml`) : `push` sur `main` → `rsync --delete` vers NFS `/home/public`.
- **Ne sont PAS déployés** (exclus du rsync) : `.git`, `.github/`, `.claude/`, `docs/`, `PLAN/`,
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
