# PLAN — Fusionner (ou pas) les « stats internes »

> 2026-10-07 · analyse du travail de `feat/stats-internes`. **Pour décision de Séb — rien n'est fusionné.**

## État réel

- `feat/stats-internes` = **0 commit** d'avance sur `main`. Tout le travail (7 fichiers modifiés + `api/track.php` + plan) est **non committé** dans le working tree de `D:\Documents\GitHub\site_seb_web`. Risque : perte, ou balayage par un `git add -A` d'un autre agent.
- Fichiers touchés : `api/track.php` (nouveau), `script.js`, `mixer.js`, `videos.js`, `data/.htaccess`, `.gitignore`, `deploy.yml`, `AGENT.md`, plan.
- **Conflit avec `work/fix-404-accueil-single` : aucun** (je n'ai touché ni `script.js`, ni `mixer.js`, ni `videos.js`, ni `deploy.yml`). Fusion dans n'importe quel ordre.

## Ce qui est bon

- Aucun tiers, pas de cookie, `analytics.db` exclue de git ET du rsync `--delete` (cohérent avec `counter.txt`).
- Liste fermée d'événements, chaînes tronquées, requêtes préparées PDO, CORS limité aux deux origines.
- `crTrack` fire-and-forget (sendBeacon) : n'affecte pas l'UI.

## À régler avant de fusionner

1. **`.htaccess` du dossier `data/`** : bloque `.db`, OK. Vérifier en prod que `https://ananasday.com/data/analytics.db` répond 403 (test après déploiement).
2. **`pageview` sur toutes les pages**, y compris la 404 : ajouter l'URL demandée (utile pour voir les liens brisés) ou exclure ; à décider.
3. **Pas de limite de débit** : un script peut gonfler la base indéfiniment (`AUTOINCREMENT`, aucune purge). Proposition : plafond simple (ex. N inserts/min/IP via fichier temporaire) + purge > 12 mois.
4. **Loi 25** : identifiant `cr-sid` persistant en localStorage = identifiant pseudonyme. Pas de PII, mais à mentionner dans une courte note de confidentialité (le site n'en a pas).
5. **`mixer.js`** : mixer retiré du site → les paliers `track_progress` ne servent à rien aujourd'hui. Les stats d'écoute du **single** (lecteur `#sp-audio` de l'accueil) sont l'enjeu réel → ajouter `play` / paliers sur ce `<audio>`, et le clic « Écoutez maintenant ».
6. **Dépendance** : PDO SQLite doit être activé chez NearlyFreeSpeech (à tester avec un POST réel).
7. Pas de dashboard : lecture par SSH `sqlite3` seulement.

## Recommandation

1. Committer tout de suite le travail stats sur sa propre branche (`feat/stats-internes` existe déjà, mais vide) pour qu'il ne se perde pas.
2. Fusionner d'abord `work/fix-404-accueil-single` → `main` (visible, urgent).
3. Corriger les points 2, 3 et 5, tester `track.php` en POST réel, puis fusionner les stats.
