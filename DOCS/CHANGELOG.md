# CHANGELOG — ananasday.com

> Format : `AAAA-MM-JJ — description concise — branche`. Modifications faites par l'agent, en bullets.
> Le plus récent en haut.

## 2026-06-22 — Météo : vent en cm/s + sortie de la page de test — `docs/meteo-cms-plan`

- **Vent en cm/s** : `meteo.js` convertit le vent Open-Meteo (km/h) en cm/s (`× 100 / 3.6`), arrondi à 1 décimale sous 100 cm/s, sans décimale au-delà (ex. `21,4 cm/s` vs `153 cm/s`). Plus aucune unité km/h ni Celsius affichée — `&deg;K` uniforme sur les 4 skins (`card`, `mono`, `retro`, `pill`).
- **Widget sorti de `meteo-test.html`** : skin `card` ajouté sous le compte à rebours de `lancement.html` ; skin `pill` ajouté dans le `<footer>` de `index.html`, `corhino.html`, `ananas.html`, `donations.html`, `mixer.html`, `videos.html`.
- **Pill retravaillé** : lieu (`Le Bic, QC`) qui avait disparu en cours de route, re-ajouté ; condition `Clear`→`Ensoleillé` en français ; ordre final `Lieu · symbole · condition | °K | vents : cm/s`.
- **`api/counter.php` durci** : `display_errors`/`error_reporting` coupés pour ne plus jamais laisser fuiter un warning PHP (chemin serveur) dans la réponse JSON.
- **Bug compteur de visiteurs résolu** : la cause de fond était les permissions NFS (`664` insuffisant — le process PHP tourne sous un autre utilisateur que le SSH ; corrigé par Séb avec `chmod 666 data/counter.txt`). Vérifié en direct sur `ananasday.com` : incrémente bien à chaque visite. `TODO_HUMAIN.md` mis à jour.
- Plan détaillé : `DOCS/PLAN/2026-06-22 - PLAN - Météo cm-s et intégration.md`.

## 2026-06-21 — Sécurité : data/*.txt exposés en HTTP — `feat/donations`

- **Faille trouvée et corrigée** : `data/counter.txt` (et donc `data/newsletter.txt`) était lisible publiquement via HTTP — vérifié en direct sur `https://ananasday.com/data/counter.txt`, contenu brut retourné. Ajout de `data/.htaccess` bloquant l'accès direct aux `.txt` (les `.json` publics — vidéos, projets, events — restent accessibles, le PHP continue de lire/écrire les `.txt` via le système de fichiers, pas via HTTP). **Action serveur restante** : uploader `data/.htaccess` manuellement sur NFS sans attendre le prochain merge (voir `TODO_HUMAIN.md`).

## 2026-06-21 — Revue vocale (suite 3) — `feat/donations`

- **Bug compteur de visiteurs identifié et corrigé** : testé `https://ananasday.com/api/counter.php` en direct — le PHP plantait sur `file_put_contents()` (« Permission denied » sur `data/counter.txt`) et le warning polluait la réponse JSON, donc le `fetch` côté navigateur échouait silencieusement (affichage figé à `000000`). `api/counter.php` ne laisse plus fuiter ces warnings. **Reste une action serveur côté Séb** : ajuster les permissions NFS (voir `TODO_HUMAIN.md`).
- **`donation_ai.html`** rendu invisible aux humains : page entièrement noire (texte couleur = fond, éléments décoratifs masqués) ; le texte reste dans le HTML source pour les bots/crawlers IA.
- **Collecte email démarrée** : nouvel endpoint `api/newsletter.php` (append validé dans `data/newsletter.txt`, même pattern que le compteur) ; `script.js` poste réellement au formulaire au lieu de simuler ; formulaire ajouté sur `lancement.html`.
- **`deploy.yml`** : exclusion de `data/newsletter.txt` ajoutée (même raison que `data/counter.txt`).
- **PLAN lancement** : TLS confirmé auto-géré par NFS (rien à faire) ; clarifié que le hostname SSH de l'exemple était un placeholder, pas une vraie valeur à copier ; photo GGRIL Serbie HD acceptée comme non trouvée.

## 2026-06-21 — Revue vocale (suite 2) — `feat/donations`

- **Micro** (accueil) : remplacé par une silhouette SM58/ruban (tête ronde + corps) — l'ancien SVG ressemblait à un micro de bureau « audio in ».
- **Vidéos** (`data/videos.json`) : « Le GGRIL » remplacé par https://www.youtube.com/watch?v=kmoFRGPlHGg ; thumbnail « Au Phare de Pointe-Métis » récupérée via l'oEmbed officiel Vimeo (plus de vignette vide).
- **`contact.html`** : handles réels — LinkedIn (`/in/sebcorriveau`), Facebook (`fb.me/CoRhino`), TikTok (`@CoRhino`), Tinder (`@corhino`, texte seul). Retrait des « bientôt ».
- **404 / 808** (`tr808.js`) : remplacement du bouton DEMO par **3 presets tirés au hasard** au chargement (boom bap 85 BPM, jungle/bouyon 160 BPM, house/techno 120 BPM), sélectionnables manuellement.
- **Nudge Bandcamp** : toast discret (localStorage, sans cookie) après 3/8/15 visites, lien vers Bandcamp, auto-fermeture 12s.
- **Plan gamification « niveaux »** proposé dans `DOCS/PLAN/` — **non codé**, en attente de validation humaine (ton, affichage, public/privé).
- **`DOCS/TODO_HUMAIN.md`** nettoyé : items résolus barrés ; clarifié que `contact@ananasday.com` n'a jamais existé (confirmé par Séb) ; diagnostic du compteur qui ne s'incrémente pas sur `ananasday.com` (déploiement CI pas encore déclenché — rien n'est encore sur `main`).

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
