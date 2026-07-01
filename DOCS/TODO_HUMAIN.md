# TODO HUMAIN — ananasday.com

> Tâches qui ne peuvent PAS être faites par l'agent (décisions d'art, contenu, comptes, secrets…).
> **L'agent écrit ici, l'humain barre.** Coche `[x]` quand c'est fait.
> Les TODO techniques (déploiement, SSH, crypto) restent dans `DOCS/PLAN/`.

---

## Contenu & art (réservé à Séb)

- [ ] **Photos d'artiste** — fournir des photos pour aligner le thème visuel (⛔ bloque l'habillage visuel + la page de lancement).
- [ ] **Texte de `lancement.html`** — réécrire le placeholder (actuellement lorem ipsum allemand 🇩🇪). Structure + compte à rebours déjà prêts par l'agent.
- [ ] **Relecture des textes `À RÉÉCRIRE`** — drafts à valider/réécrire sur :
  - `index.html` : portails (CoRhino / Ananas), infolettre, footer.
  - `corhino.html` : kicker, titre, bio, releases musique, 6 cartes projets, contact.
  - `ananas.html` : intro, 6 raisons, sections, infolettre.
  - `videos.html` : (voir vidéos ci-dessous).

## Liens sociaux & contact

- [x] ~~Handles LinkedIn/Facebook/TikTok/Tinder~~ — ajoutés sur `contact.html` (2026-06-21) : LinkedIn `/in/sebcorriveau`, Facebook `fb.me/CoRhino`, TikTok `@CoRhino`, Tinder `@corhino` (texte seul, pas de lien public possible sur Tinder).
- [x] ~~Arbitrage email~~ — confirmé par Séb (2026-06-21) : `contact@ananasday.com` n'a **jamais existé**, c'était une invention d'un lot précédent. Corrigé dans `DOCS/PLAN/2026-06-19 - PLAN - Lancement ananasday.com.MD`. Aucune action requise.

## Vidéos (déplacés depuis le code de `videos.html`)

- [ ] **Promesse électorale** : retrouver la **version FR** et ajouter un 2e embed (en plus de la version EN : https://www.youtube.com/watch?v=Tynlr9QXsuA).
- [x] ~~Photo GGRIL Serbie en haute résolution~~ — pas trouvée, accepté tel quel (2026-06-21). Conservé en l'état actuel (https://quoivivrerimouski.ca/...).
- [x] ~~Vidéo « Le GGRIL »~~ — remplacée (2026-06-21) par https://www.youtube.com/watch?v=kmoFRGPlHGg dans `data/videos.json` → `ggril-chef`.
- [ ] **Thumbnail « Au Phare Pointe-Métis »** : j'ai mis la vignette officielle Vimeo (via oEmbed) dans `data/videos.json` → `phare`. Si tu préfères une image différente (ex. une capture précise du clip, ou la photo que tu m'as montrée), envoie-moi le fichier ou l'URL et je remplace le champ `thumb`.

## Vérifications techniques (Séb)

- [x] ~~Compteur sur `ananasday.com`~~ — **résolu (2026-06-22)** : `chmod 666 data/counter.txt` côté Séb (664 ne suffisait pas, PHP tourne sous un autre utilisateur que le SSH/FTP). Incrémente bien à chaque passage, vérifié en direct. **Idem à prévoir pour `data/newsletter.txt`** s'il a le même souci, et à refaire après un merge si le fichier est recréé.
- [x] ~~Icône micro (SM58)~~ — validée visuellement (silhouette tête ronde + corps).

## Easter-egg IA (chaîne llm.txt)

- [ ] Valider la chaîne `llm.txt → llm2.txt → …` et le ton du pitch crypto (rien de rendu visible aux humains).

## ⚠️ Sécurité — urgent

- [ ] **`data/*.txt` étaient publics en HTTP** : j'ai vérifié, `https://ananasday.com/data/counter.txt` était lisible par n'importe qui (j'ai vu son contenu brut). Donc `data/newsletter.txt` serait aussi lisible en clair par n'importe qui qui connaît/devine l'URL — vrais courriels exposés. **Corrigé côté code** : j'ai ajouté `data/.htaccess` qui bloque l'accès HTTP direct aux `.txt` (les `.json` publics — vidéos, projets — restent accessibles, le PHP continue de lire/écrire les `.txt` normalement).
  - **Action toi, prioritaire** : ce fichier n'est utile que s'il est sur le serveur. Upload `data/.htaccess` manuellement dès que possible (ne pas attendre le merge vers `main`), puis reteste `https://ananasday.com/data/counter.txt` dans un navigateur — tu dois voir une erreur 403, plus le contenu brut.

## Infolettre — collecte démarrée

- [x] ~~Collecte email~~ — démarrée (2026-06-21) : `api/newsletter.php` ajoute chaque courriel valide dans `data/newsletter.txt` (un par ligne). Formulaire actif sur `lancement.html` en plus de `index.html`/`ananas.html`. **Même note de permissions que le compteur ci-dessus** : `data/newsletter.txt` devra être accessible en écriture par le process PHP sur NFS.
- [ ] **Page « Vie privée » (Loi 25)** : devient nécessaire maintenant qu'on collecte des courriels — courte page expliquant que l'adresse n'est utilisée que pour l'annonce du single, pas de partage à des tiers.
- [ ] Migration éventuelle vers Cyberimpact plus tard (`data/newsletter.txt` → import manuel, pas d'urgence).

## SSH NFS↔GitHub

- [ ] **`NFS_KNOWN_HOSTS`** : le hostname `ssh.phx.nearlyfreespeech.net` dans le PLAN était un exemple générique, pas une vraie valeur — relance `ssh-keyscan` avec le **vrai** hostname (celui déjà dans ton secret `NFS_HOST`, visible aussi dans le panneau NFS → ton site → onglet Info). Détails dans `DOCS/PLAN/2026-06-19 - PLAN - Lancement ananasday.com.MD` §3.

## Gamification « niveaux »

- [ ] **Plan proposé, à valider** : `DOCS/PLAN/2026-06-21 - PLAN - Gamification niveaux.md`.
      Rien n'est codé — 3 questions ouvertes dans le doc (public/privé, ton des rangs, affichage).

---

> Pour la liste des TODO techniques de lancement (SSH NFS, TLS, audio, crypto/PayPal) : voir `DOCS/PLAN/` §6.
