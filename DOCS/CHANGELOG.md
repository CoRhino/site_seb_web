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
