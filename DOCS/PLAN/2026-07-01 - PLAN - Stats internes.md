# PLAN — Stats internes (SQLite, première partie)

> 2026-07-01 · branche `docs/audit-securite-2026-07-01`
> Suite à l'audit sécurité du lancement : Séb veut des stats de visite/clic/écoute, mais refuse de
> donner ses données à un tiers (Google en particulier). Décision : module maison, première partie,
> aucune dépendance externe — dans la continuité du `api/counter.php` déjà existant.

## Ce qui a été fait

- **`api/track.php`** : reçoit des événements JSON en POST (`event`, `page`, `value`, `meta`,
  `session`) et les écrit dans **`data/analytics.db`** (SQLite, créée automatiquement au premier
  écrit — comme `counter.txt`). Événements acceptés : `pageview`, `theme`, `lang`, `click`,
  `track_progress`. Tout événement hors liste est rejeté (400).
- **`data/.htaccess`** étendu pour bloquer aussi `.db`/`.sqlite` en HTTP direct (même protection que
  les `.txt`).
- **`data/analytics.db`** exclue de git (`.gitignore`) et du déploiement rsync (`deploy.yml`),
  comme `counter.txt`/`newsletter.txt` — vit uniquement sur le serveur, jamais écrasée.
- **`script.js`** : identifiant anonyme `cr-sid` (UUID en localStorage, pas de cookie), fonction
  globale `window.crTrack(event, data)` (sendBeacon, fire-and-forget). Événements câblés :
  - `pageview` — à chaque chargement de page (page déduite de l'URL).
  - `theme` — au clic sur un bouton de thème (`value` = nom du thème).
  - `lang` — au clic sur un bouton de langue.
  - `click` / `video_open` — au clic sur une vignette vidéo (`.vid-lite` et `videos.js`).
  - `click` / `newsletter_signup` — à l'inscription réussie à l'infolettre.
- **`mixer.js`** : paliers d'écoute du mix (`track_progress`) à 10s, 25 %, 50 %, 75 %, 100 % de la
  durée — une seule fois par passage (remis à zéro sur stop/rewind, pas sur pause/reprise).

## Ce qui n'est PAS fait (hors scope pour l'instant)

- **Pas de dashboard/`stats.html`.** Séb a dit vouloir garder les données en interne et analyser —
  donc pour l'instant : lecture directe de `data/analytics.db` via SSH (`sqlite3`) ou en
  téléchargeant le fichier. Un dashboard est une suite naturelle si voulu plus tard.
- **Pas de % écouté sur les vidéos** (YouTube/Vimeo/Facebook) : nécessiterait de charger l'API
  JS de la plateforme (dépendance externe, contraire au style « vanilla, aucune dépendance » du
  site). Seul `video_open` (a cliqué play) est tracké pour l'instant.
- **Pas de rate-limiting** sur `track.php` (contrairement à `newsletter.php`, l'enjeu est bien plus
  faible : pas de PII, événements limités à une liste fermée, chaînes tronquées).

## Exemples de requêtes (SSH sur NFS, ou fichier téléchargé)

```bash
sqlite3 data/analytics.db "SELECT page, COUNT(*) FROM events WHERE event='pageview' GROUP BY page ORDER BY 2 DESC;"

# Thème préféré (tous les changements, y compris retours au défaut)
sqlite3 data/analytics.db "SELECT value, COUNT(*) FROM events WHERE event='theme' GROUP BY value ORDER BY 2 DESC;"

# Combien de sessions ont changé de thème au moins une fois (proxy pour « qui garde le jaune par défaut »)
sqlite3 data/analytics.db "SELECT COUNT(DISTINCT session) FROM events WHERE event='theme';"

# Funnel d'écoute du mixer (combien de passages atteignent chaque palier)
sqlite3 data/analytics.db "SELECT value, COUNT(*) FROM events WHERE event='track_progress' GROUP BY value;"

# Vidéos les plus ouvertes
sqlite3 data/analytics.db "SELECT json_extract(meta,'$.id'), COUNT(*) FROM events WHERE value='video_open' GROUP BY 1 ORDER BY 2 DESC;"
```

## Pistes suivantes (à valider par Séb)

1. Dashboard `stats.html` (page cachée, même logique que `donation_ai.html`) pour visualiser sans SSH.
2. % réel écouté sur vidéos (nécessite l'API JS YouTube — dépendance externe à accepter ou refuser).
3. Distinguer visiteurs uniques vs répétés dans les pageviews (déjà possible via `session`, juste pas
   encore agrégé/affiché).
