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
- [ ] **Photo GGRIL Serbie** : fournir une **version haute résolution** (actuelle : https://quoivivrerimouski.ca/sites/default/files/styles/fiche_d/public/2023-04/ggriljpg-full.jpg).
- [x] ~~Vidéo « Le GGRIL »~~ — remplacée (2026-06-21) par https://www.youtube.com/watch?v=kmoFRGPlHGg dans `data/videos.json` → `ggril-chef`.
- [ ] **Thumbnail « Au Phare Pointe-Métis »** : j'ai mis la vignette officielle Vimeo (via oEmbed) dans `data/videos.json` → `phare`. Si tu préfères une image différente (ex. une capture précise du clip, ou la photo que tu m'as montrée), envoie-moi le fichier ou l'URL et je remplace le champ `thumb`.

## Vérifications techniques (Séb)

- [ ] **Compteur sur `ananasday.com`** : tu rapportes qu'il ne s'incrémente pas sur la page lancement en ligne. Cause probable : **rien n'a encore été déployé via le pipeline CI** (`deploy.yml` ne se déclenche que sur `push` vers `main` ; tout le travail récent est sur des branches `feat/...`, pas encore mergées). Si tu as collé `lancement.html` à la main sur le serveur (FTP/SSH), il manque probablement `api/counter.php` et/ou le dossier `data/` à côté. Test rapide : ouvre `https://ananasday.com/api/counter.php` directement dans un navigateur — si ça renvoie une erreur 404, les fichiers PHP n'ont pas été uploadés ; si ça renvoie `{"n":...}` qui augmente à chaque rechargement, le souci est ailleurs (vérifie alors que `data/` est accessible en écriture sur NFS).
- [ ] **Icône micro (SM58)** : redessinée en SVG (silhouette tête ronde + corps), à valider visuellement une fois en ligne.

## Easter-egg IA (chaîne llm.txt)

- [ ] Valider la chaîne `llm.txt → llm2.txt → …` et le ton du pitch crypto (rien de rendu visible aux humains).

## Gamification « niveaux »

- [ ] **Plan proposé, à valider** : `DOCS/PLAN/2026-06-21 - PLAN - Gamification niveaux.md`.
      Rien n'est codé — 3 questions ouvertes dans le doc (public/privé, ton des rangs, affichage).

---

> Pour la liste des TODO techniques de lancement (SSH NFS, TLS, audio, crypto/PayPal) : voir `DOCS/PLAN/` §6.
