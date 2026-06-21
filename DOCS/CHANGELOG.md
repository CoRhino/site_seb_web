# CHANGELOG — ananasday.com

> Format : `AAAA-MM-JJ — description concise — branche`. Modifications faites par l'agent, en bullets.
> Le plus récent en haut.

## 2026-06-19 — Revue vocale (lot en cours) — `feat/revue-vocale-19juin`

- Mise en place `/DOCS` : déplacement de `/PLAN` → `/DOCS/PLAN`, ajout `CHANGELOG.md` + `TODO_HUMAIN.md`.
- `deploy.yml` : ajout de `DOCS/` aux exclusions rsync (sensible à la casse côté serveur).
- **Switcher de thème** redessiné : gros bouton jaune (défaut/signature) + grille 3×2 `[rouge·vert·mauve]/[arc-en-ciel·négatif·turquoise]` ; **thème orange retiré** ; état actif visible.
- **Persistance du thème** : script inline anti-flash dans chaque `<body>` (applique le thème avant le rendu). Migration de l'ancien `orange` → jaune. *(Le « thème qui ne suit pas » venait de `file://`, pas du code — confirmé en http.)*
- **Thème noir = négatif photo** : `invert(1) grayscale(1)` sur `<html>` (aucune couleur).
- **Compteur visiteurs** : style cadran mécanique N&B (aucune couleur), chiffres « croches » (décalage fixe par position).
- **Courriels retirés** du site ; footer = liens sociaux Bandcamp/YouTube/Instagram ; nouvelle page `contact.html` (autres réseaux en TODO humain).
- **Accueil** : émoji rhino → micro de scène jaune (SVG, suit le thème) ; rhino gardé en commentaire.
- **corhino** : section « signe distinctif » réduite au seul bouton Mixer.
- **Notes IA** retirées du DOM rendu (`.robot-note`, liens cachés) → commentaires source.
- Marques discrètes **« Build with NI™ »** (NI = Natural Intelligence, défini en commentaire) sur ananas/vidéos/mixer/contact.
- **Kelvin** (`meteo.js`) : arrondi entier, plus de décimales.

## 2026-06-20 — Revue vocale (suite) — `feat/revue-vocale-19juin`

- **Page vidéos** : bandeau déroulant horizontal de vignettes (3 étages : titre / image / crédits), clic = lecture en grand dessous, défaut = une vidéo au hasard. Données `data/videos.json`, rendu `videos.js`. Ancienne grille statique + `TODO` visibles retirés (déplacés dans `TODO_HUMAIN.md`).
- Renommage alter-ego allemand **« Good Guy Kanada » → « Guter Typ Kanada »** (corhino + `data/projets.json`).
- **`lancement.html`** : page de lancement temporaire (single + compte à rebours + compteur), texte placeholder = lorem ipsum allemand (à réécrire).
- **Page 404** : boîte à rythmes **808 fonctionnelle** (`tr808.js`) — séquenceur 16 pas éditable, 6 voix synthétisées en Web Audio, play/stop/tempo, motif démo. Gag « 404 + 404 = 808 ». Note IA visible retirée, switcher migré.
- **Chaîne `llm.txt → llm2.txt → llm3.txt`** : easter-egg pour IA curieuses → pitch crypto / `donation_ai.html` (rien de rendu aux humains).
- **`AGENT.md`** mis à jour : 7 thèmes, nouvelles pages, contact sans courriel, notes IA hors DOM, dossier `DOCS/`.
