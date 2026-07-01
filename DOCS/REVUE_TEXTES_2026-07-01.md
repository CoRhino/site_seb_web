# REVUE DES TEXTES — ananasday.com (1er juillet 2026)

> Document généré pour relecture humaine (HITL). Tous les textes du site sont regroupés ici,
> page par page, avec leur statut. Coche/corrige directement dans ce doc ou dans le HTML —
> au choix. Les sections "⚠️ Cohérence" comparent le site au communiqué de presse fourni.

Légende des statuts :
- ✅ **Validé** — déjà relu/retouché par Séb (pas de marqueur `À RÉÉCRIRE` dans le code).
- ✏️ **Draft IA — à valider** — marqué `À RÉÉCRIRE ✏️` dans le code, écrit par un agent, jamais relu.
- 🔒 **Verrouillé** — texte technique/légal, ne pas réécrire sans raison (ex. mentions Cyberimpact, avertissement crypto).

---

## 0. Info clé — titre de la chanson

**Titre validé : `Ananas > Canada`** (se prononce *"ananas plus grand que canada"*).

Vérifié cohérent partout où il apparaît :
- `index.html` — lecteur single (`data-i18n="index.player.desc"`)
- `locales/fr.json` → `index.player.desc`
- `corhino.html` — bio, paragraphe 2
- `donations.html` — carte Bandcamp

⚠️ **Aucune page n'explique la prononciation** ("plus grand que"). Le communiqué de presse la précise en note de bas de page — vaut la peine d'ajouter cette précision quelque part sur le site (ex. sous le lecteur audio ou sur `corhino.html`), sinon les gens liront "Ananas Canada" ou resteront perplexes devant le symbole `>`.

---

## 1. `index.html` (page d'accueil)

| Élément | Statut | Texte actuel |
|---|---|---|
| Eyebrow hero | ✅ | Premier jour férié international universel |
| Titre hero | ✅ | ANANAS DAY |
| Sous-titre hero | ✅ | Le *1er juillet*, tout le monde est en congé. Partout sur Terre. C'est officiel — enfin presque. |
| Lecteur single — titre | ✅ | 🎵 Écoutez le single |
| Lecteur single — desc | ✅ | Ananas > Canada |
| Portail CoRhino | ✏️ | Artiste, musicien, rappeur. Ancien chef du Parti Rhinocéros. Maintenant sur scène — sa vraie scène. |
| Portail Ananas Day | ✏️ | Le mouvement. Le premier jour férié universel. Le 1er juillet, tout le monde décroche. |
| Infolettre — titre | ✅ | 🍍 Restez dans la boucle |
| Infolettre — desc (HTML, fallback avant JS) | ✏️⚠️ | Le single arrive le 1er juillet. Soyez les premiers à l'entendre. |
| Infolettre — desc (`locales/fr.json`, texte réel affiché) | ✅ | Ananas > Canada maintenant disponible ! |
| Footer copyright | ✏️ | © 2026 Sébastien CoRhino. Tous droits réservés. Sauf le 1er juillet — ce jour-là, personne ne travaille. |

### ⚠️ Cohérence / bugs de contenu détectés

1. **Texte infolettre désynchronisé.** Le HTML brut (`index.html` ligne 129) dit encore *"Le single arrive le 1er juillet"* (futur), alors que `locales/fr.json` dit *"maintenant disponible"*. Comme le JS réécrit le texte après chargement, l'utilisateur voit une micro-seconde de texte périmé avant le remplacement — et si le JS échoue (ex. `file://`, erreur réseau), c'est carrément la version "à venir" qui reste affichée **le jour même du lancement**. → Il faut mettre à jour le HTML brut pour qu'il corresponde au texte "disponible", pas juste le JSON.
2. **Compte à rebours obsolète.** `TARGET = 2026-07-01T00:00:00-04:00` — on est déjà le 1er juillet. Le countdown affichera "🍍 C'EST AUJOURD'HUI!" toute la journée, ce qui est correct, mais vaut la peine de vérifier en vrai que ce message convient une fois le single sorti (plutôt qu'un member "aujourd'hui, ça sort" — le single EST déjà sorti).
3. **Prononciation du titre absente** (voir §0).

---

## 2. `corhino.html`

| Élément | Statut | Texte actuel |
|---|---|---|
| Kicker | ✅ | Musique · Mots · Idées · Inventions |
| Titre | ✏️ | Sébastien CoRhino |
| Sous-titre | ✅ | Aka Côrriveau, Séb Cô, Guter Typ Kanada. L'artiste total — à la Zappa, en mieux habillé. |
| Bio §1 | ✏️ | Sébastien CoRhino, c'est 20 ans de musique — compo, voix, clarinette basse, hip-hop — qui arrivent enfin à la surface. Après une carrière politique aussi sérieuse que déjantée (chef du Parti Rhinocéros du Canada pendant 10 ans, candidat trois fois au poste de premier ministre), il lance maintenant ce pour quoi il était fait depuis le début : faire de la musique. |
| Bio §2 | ✏️ | Chef du Parti Rhinocéros de 2014 à 2024, Sébastien CoRhino a perdu 10 élections fédérales en 20 ans. Après avoir pris sa retraite de la politique, il se recycle aujourd'hui dans la chanson populaire : Ananas > Canada est son premier single. CoRhino a notamment joué avec Le GGRIL, David Goudreault et Sabir, et est détenteur d'un baccalauréat en musique de l'Université de Sherbrooke. Bientôt suivra un album complet, son autobiographie, puis un deuxième album. Stay tuned! |
| Bio §3 | ✏️ | Le style CoRhino ne rentre pas dans une case. Rap, hip-hop, humour absurde sérieux, couleurs flamboyantes, rhinocéros, ananas. Un artiste total, à la Zappa. |
| Racines (4 blocs) | ✅ | Hip-hop / Jazz improvisé / Poésie & slam / Arts visuels — bios courtes |
| Contact | ✏️ | Collaboration, presse, booking conférence, ou juste envie de parler rhinocéros et ananas? |
| Section "Musique" (2 sorties) | 🔒 commentée | Bloc HTML désactivé (`<!-- ... -->`), pas affiché sur le site actuellement |

### ⚠️ Cohérence / bugs de contenu détectés

4. **Bio §2 = quasi copier-coller du communiqué de presse.** C'est cohérent (bien), mais confirme que ce paragraphe n'a **jamais été personnalisé** pour le site — c'est littéralement le texte du communiqué. À valider si Séb veut un ton différent ici vs. dans le communiqué officiel, ou si le recyclage est voulu.
5. **DJ Horg absent du site.** Le communiqué crédite explicitement *"un beat de DJ Horg (Samian) aux sonorités Hip-Hop West Coast / funk"* pour Ananas > Canada. Aucune page du site ne mentionne ce collaborateur. À ajouter (bio ou fiche chanson) si c'est important pour Séb/DJ Horg.
6. **Refrain et extrait de couplet absents.** Le communiqué contient des paroles ("J'aime mieux manger des fruits...", "monter monter monter..."). Rien de tel n'apparaît sur le site — pourrait être un ajout fort pour `corhino.html` ou `index.html` (extrait qui donne le ton comique/politique de la chanson).
7. **Section "Musique" commentée** contient encore une ancienne date "Bientôt" pour le single — à laisser désactivée puisqu'elle est obsolète (le single est sorti), sauf si on veut la réactiver en mode "disponible maintenant".

---

## 3. `ananas.html`

| Élément | Statut | Texte actuel |
|---|---|---|
| Titre H1 | ✏️ | ANANAS DAY |
| Sous-titre mono | ✅ | 1er JUILLET · CHAQUE ANNÉE · PARTOUT SUR TERRE |
| Citation manifeste | ✏️ | "Le 1er juillet, tout le monde est en congé. Pas juste au Canada. Partout." |
| Intro §1 | ✅ | L'Ananas Day, c'est une idée simple : et si on inventait un jour férié universel? Pas géré par un gouvernement. Pas rattaché à une religion. Pas attaché à une nation. Un jour que l'humanité se donne à elle-même, parce qu'elle le mérite. |
| Intro §2 | ✅ | Mangez des fruits! Chillez dans votre communauté! |
| 3 raisons "Pourquoi" | ✏️ | 🌍 Parce que le monde en a besoin / 🍍 Parce que l'ananas est neutre / 🍁 C'est déjà férié (voir texte complet dans le fichier) |
| 4 cartes "Comment participer" | ✏️ | Décrochez / Mangez un ananas / Parlez-en / Convertissez votre pays |
| Timeline (3 phases) | ✏️ | Ananas Day (phase 1) / Marketing (phase 2) / Reconnaissance internationale (phase 3) |
| Infolettre — titre | ✅ | 🍍 Rejoindre le mouvement |
| Infolettre — desc | ✏️ | Soyez parmi les premiers à recevoir les nouvelles de l'Ananas Day. |

### ⚠️ Cohérence / bugs de contenu détectés

8. **L'origine "déménagement + pizza à l'ananas" est absente du site.** C'est pourtant l'explication centrale du communiqué de presse : *"au Québec, on ne célèbre pas la fête du Canada : on déménage! Et qui dit déménagement dit pizza, et la pizza à l'ananas a été inventée au Canada!"* Le site, lui, présente l'Ananas Day comme un concept universel/neutre sans jamais raconter cette origine québécoise précise. À décider : veut-on cette anecdote sur `ananas.html` (elle est mémorable et drôle), ou le site reste volontairement plus "international / neutre" que le communiqué (qui lui vise la presse québécoise)?
9. **"6 raisons" annoncées dans le commentaire de code, seulement 3 présentes.** `<!-- À RÉÉCRIRE ✏️ — 6 raisons draft -->` mais il n'y a que 3 cartes dans la grille (les 3 autres emplacements sont des `<div>` vides lignes 111-112). À compléter avec 3 raisons de plus, ou retirer le "6" du commentaire si 3 suffit.
10. **Timeline dit "2e édition" mais le communiqué dit que c'est la première.** `ananas.html` : *"Né en 2025, nous sommes déjà à la 2e édition de l'Ananas Day"* — alors que le communiqué de presse annonce *"CoRhino lance aujourd'hui... Ananas Day"* comme une première (aucune mention de 2025 ni d'une "2e édition"). Contradiction à trancher : est-ce vraiment la 2e édition, ou la timeline invente une histoire qui n'existe pas ailleurs?
11. **Boutons de langue JP / CR commentés dans le HTML** (`ananas.html` lignes 31-32, 46-47) — laissés en commentaire, cohérent avec "on s'occupe des traductions plus tard", juste un signal que quelqu'un avait commencé à prévoir japonais + langue crie.

---

## 4. `donations.html`

| Élément | Statut | Texte actuel |
|---|---|---|
| Kicker / titre / sous-titre | ✅ | Soutien · Merci · Encouragement / Soutenir mon travail / (texte café) |
| Intro "Financer un projet" | ✅ | Chaque projet a un objectif... |
| Cartes Patreon / Bandcamp / PayPal / Crypto | ✅ | — |
| Note prudence crypto | 🔒 | Aucune adresse publiée pour l'instant (légitime, adresses vides dans le JS) |
| 6 projets (`data/projets.json`) | ⚠️ non marqués mais clairement placeholders | Tournée Allemagne, Album allemand, Reprises, YouTube Chef, T-shirts, Autobiographie |

### ⚠️ Cohérence / bugs de contenu détectés

12. **Les 6 campagnes de `data/projets.json` ne sont mentionnées nulle part ailleurs sur le site ni dans le communiqué.** Ce ne sont pas forcément des textes "à réécrire" au sens `À RÉÉCRIRE`, mais ce sont des engagements publics (tournée en Allemagne, album en allemand, etc.) — à confirmer que Séb est réellement engagé publiquement sur ces 6 projets avant le lancement, vu que `donations.html` est public dès le 1er juillet.
13. **Montants "recolte" ont des valeurs bizarres** (5.50 €, 13.37 €, 19.98 €) — semblent volontairement symboliques/humoristiques (13.37 = "leet"), pas des erreurs, mais à confirmer que c'est voulu avant mise en ligne.

---

## 5. `contact.html`

Tout est marqué ✅ (pas de `À RÉÉCRIRE`), cohérent avec le communiqué (réseaux : Bandcamp, YouTube, Instagram + LinkedIn, Facebook, TikTok, Tinder). Aligné avec `TODO_HUMAIN.md` qui confirme ces handles ajoutés le 2026-06-21.

---

## 6. `videos.html`

Pas de texte statique à réécrire (contenu vient de `data/videos.json`, déjà rempli). Un point encore ouvert dans `DOCS/TODO_HUMAIN.md` : version FR de la vidéo "promesse électorale" à ajouter en plus de la version EN.

---

## 7. `lancement.html`

| Élément | Statut | Texte actuel |
|---|---|---|
| Titre | ✏️ | CoRhino |
| Paragraphe principal | 🇩🇪 **placeholder allemand jamais remplacé** | *"Sehr geehrte Ananasfreunde..."* (lorem ipsum en allemand, cf. clin d'œil "Guter Typ Kanada") |

### ⚠️ Cohérence / bugs de contenu détectés — **URGENT, bloquant**

14. **`lancement.html` est une page "compte à rebours avant le 1er juillet" — mais on est le 1er juillet aujourd'hui.** Cette page entière (placeholder allemand inclus, jamais réécrit) est maintenant **périmée** : son countdown va afficher "C'EST AUJOURD'HUI" avec, juste en dessous, un paragraphe en lorem ipsum allemand jamais traduit. Si cette page est encore liée quelque part ou indexée, il faut d'urgence soit (a) la rediriger vers `index.html` maintenant que le single est sorti, soit (b) la réécrire en "c'est sorti, écoutez-le" avant qu'un visiteur ne tombe dessus aujourd'hui.

---

## Plan proposé pour la suite

**Étape 1 — Décisions de contenu (Séb, pas l'agent) :**
- Trancher les 4 questions de cohérence les plus importantes : DJ Horg (#5), refrain/paroles sur le site (#6), origine "déménagement + pizza" (#8), "2e édition" vs première édition (#10).
- Relire/approuver ou réécrire chaque texte ✏️ ci-dessus (portails, bio, 6 raisons, cartes participer, timeline, infolettres, footer).
- Statuer sur `lancement.html` (#14) — priorité la plus haute vu la date d'aujourd'hui.

**Étape 2 — Corrections techniques (agent, une fois les décisions prises) :**
- Resynchroniser `index.html` (fallback HTML) avec `locales/fr.json` pour l'infolettre (#1).
- Compléter les "6 raisons" sur `ananas.html` ou ajuster le commentaire (#9).
- Ajouter la note de prononciation "Ananas > Canada" (#0).
- Traiter `lancement.html` selon la décision de Séb (redirection ou réécriture).

**Étape 3 — Traductions EN/ES** : reportées comme convenu, une fois le FR figé.

Je n'ai touché à aucun fichier HTML — ce document est en lecture seule, prêt pour ta relecture. Dis-moi lesquels des ✏️ tu veux que je réécrive une fois que t'as tranché les points ci-dessus, et je les corrige directement dans le code.
