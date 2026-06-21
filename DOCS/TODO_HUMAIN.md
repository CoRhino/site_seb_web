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

- [ ] **Compteur sur `ananasday.com` — cause trouvée, 1 action serveur reste.** J'ai testé `https://ananasday.com/api/counter.php` directement : le PHP s'exécute et incrémente bien, **mais** `file_put_contents()` plantait avec *« Permission denied »* en écrivant `data/counter.txt`, et ce warning PHP polluait la réponse JSON — ton navigateur recevait du texte cassé au lieu de `{"n":...}`, donc l'affichage restait figé à `000000`.
  - **Corrigé côté code** (déjà fait) : `counter.php` ne laisse plus fuiter ces warnings dans la réponse.
  - **Reste à faire côté serveur (toi)** : la cause de fond est un problème de **permissions NFS**. Sur NFS, le PHP tourne sous un utilisateur différent de ton compte SSH/FTP — il faut donc rendre `data/counter.txt` et `data/newsletter.txt` accessibles en écriture pour ce compte (généralement `chmod 666` sur les fichiers, et `chmod 777` sur le dossier `data/` si un fichier doit être créé). Tu as mis `664` — augmente à `666` (ou plus si NFS l'exige) et reteste `https://ananasday.com/api/counter.php` : tu dois voir uniquement `{"n":...}`, rien d'autre.
  - Une fois le déploiement déclenché (merge vers `main`, voir `DOCS/PLAN/` §3), il faudra refaire ces permissions car le fichier risque d'être recréé.
- [x] ~~Icône micro (SM58)~~ — validée visuellement (silhouette tête ronde + corps).

## Easter-egg IA (chaîne llm.txt)

- [ ] Valider la chaîne `llm.txt → llm2.txt → …` et le ton du pitch crypto (rien de rendu visible aux humains).

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
