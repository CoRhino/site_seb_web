# PLAN — Lancement ananasday.com
**Date :** 2026-06-11 · **Deadline :** 1er juillet 2026 (single AnanasDay) · **J-20**

---

## 1. ÉTAT DES LIEUX

- Branche de travail : `feat/claude-code-create-website` (1 commit devant `main`, merge facile).
- Déploiement : `deploy.yml` prêt, déclenché sur push `main` → rsync vers NFS `/home/public`. **Secrets pas configurés.**
- DNS ananasday.com → NFS : ✅ déjà fait.
- Mixer multi-pistes : ✅ codé, verrouillé jusqu'au 1er juillet. **Aucun fichier audio dans le repo** (bloquant : exporter stems + master).
- Pages nouvelles (nouveau design) : `index`, `corhino`, `ananas`, `mixer`, `404`.
- Pages ANCIEN design non intégrées : `bio.html` (template à placeholders), `donations.html`, `design.html`.
- ⚠️ `data/events.json` = contenu majoritairement **inventé par IA** (détail §4).

---

## 2. PHASES

### PHASE 0 — Déploiement (faire en premier, indépendant du contenu)
- [ ] **HUMAIN** : générer clé SSH, ajouter clé publique sur NFS, créer les 4 secrets GitHub (`NFS_SSH_KEY`, `NFS_KNOWN_HOSTS`, `NFS_USER`, `NFS_HOST`).
- [ ] **HUMAIN** : activer TLS/Let's Encrypt sur NFS + vérifier fonds du compte.
- [ ] Ajuster `deploy.yml` : `--exclude 'audio/'` au rsync (sinon `--delete` efface les MP3 uploadés) + exclure `.git`, `docs/`, `PLAN/`.
- [ ] Merger `feat/...` → `main` → premier déploiement réel (site verrouillé + compte à rebours = OK public).

### PHASE 1 — Contenu réel (purge du faux)
- [ ] Réécrire `data/events.json` avec les **vraies données du CV artistique** (§5).
- [ ] Refaire la bio de `corhino.html` à partir de la vraie biographie + CV (§5) — garder le ton CoRhino, corriger les faits (1998 = début programmation, pas musique; instruments réels : clarinette basse, contrebasse, basse, chant — PAS seulement piano).
- [ ] **Page `videos.html` (NOW)** — nouveau design, même nav :
  - Promesse électorale (EN) : https://www.youtube.com/watch?v=Tynlr9QXsuA — **HUMAIN : retrouver version FR**
  - Vidéo poésie/clarinette basse Paraloeil : https://vimeo.com/697084294
  - Photo GGRIL en Serbie (orchestre) : récupérer https://quoivivrerimouski.ca/sites/default/files/styles/fiche_d/public/2023-04/ggriljpg-full.jpg — **HUMAIN : version meilleure qualité si possible**
- [ ] Intégrer la timeline bio (events.json corrigé) dans le nouveau design (section dans `corhino.html` ou page `bio.html` refaite). Supprimer `design.html` et l'ancien template (philosophie : delete fast).
- [ ] Harmoniser `donations.html` au nouveau design (nav/footer).

### PHASE 2 — Audio (le cœur du lancement)
- [ ] **HUMAIN** : exporter stems web (drums/bass/piano/vox/backing, MP3 ~192kbps) + master complet.
- [ ] Ajouter lecteur simple « écoute libre » du single complet sur `ananas.html`/`corhino.html` (≠ mixer de stems).
- [ ] Décider : MP3 versionnés dans le repo (recommandé si <20 Mo) OU upload manuel + exclude rsync.
- [ ] Nudge soutien : compteur d'écoutes en `localStorage` → après 2-3 visites/écoutes, toast discret « Acheter sur Bandcamp / Faire un don ». Pas de DB, pas de bannière cookies (stockage fonctionnel local = conforme Loi 25/RGPD).

### PHASE 3 — Finitions lancement
- [ ] Favicon 🍍 + image OG (partage réseaux sociaux le jour J).
- [ ] Page « Vie privée » courte et honnête.
- [ ] 404 comique (idée déjà notée dans docs/) + config erreur custom NFS.
- [ ] **HUMAIN** : configurer forwarding email `contact@ananasday.com` sur NFS.
- [ ] Passe mobile complète (l'AudioContext exige un tap utilisateur sur mobile).
- [ ] sitemap.xml + robots.txt.

### FUTUR (après le 1er juillet)
- Page **arts visuels** : 50+ toiles figuratives (rhinocéros, oiseaux, marmotte, castor, écureuil, poissons — style art naïf), expo Mont-Joli 2022, peinture en direct avec Armand Vaillancourt (2008). **HUMAIN : photographier les toiles.**
- Infolettre (MySQL NFS ou service tiers) pour « M'avertir à la sortie ».
- Analytique sans cookie (GoatCounter/Plausible) si besoin de chiffres.
- EP automne 2026.

---

## 3. POSITIONNEMENT DU SITE

**Site d'artiste = archives + nouveauté.**
- **La nouveauté (avant-plan)** : Séb lance sa carrière solo de **chanteur/rappeur**. Hip-hop vibe. Single AnanasDay 1er juillet.
- **Les archives (profondeur)** : 20 ans de musique (GGRIL, Jazz Mess, Sabir, David Goudreault…), poésie/slam, arts visuels, politique (Parti Rhino).
- Le visiteur comprend : « ce gars-là a un vrai parcours, et là il sort SA musique ».

**Anti-look-IA / old school (programmeur depuis 1998)** : voir suggestions §6.

---

## 4. CONTENU INVENTÉ DÉTECTÉ — à purger

`data/events.json` :
| Événement | Verdict |
|---|---|
| Concert au Phare de Mitis (2023) | ⚠️ Réel mais déformé — vrai : **Séb x Louis x Jo, phare de Pointe-Métis, 2021** (Paraloeil) |
| Exposition Art Numérique, Montréal (2023) | ❌ Inventé — vrai : **galerie Jean-Louis Desrosiers, Mont-Joli, 2022** (peinture/sculpture) |
| Publication Poésie Expérimentale, Éditions Libres (2022) | ❌ Inventé — vrai : **« Petits Poèmes », recueil, 2019** |
| Album « Frequencies of Silence » (2022) | ❌ Inventé |
| Installation Data Visualization (2021) | ❌ Inventé |
| Atelier Créativité et Technologie, Montréal (2021) | ❌ Inventé |
| Electro Hockey au **Centre Bell** (2024) | ❌ Inventé (La Puck = projet perso, jamais au Centre Bell) |
| Résidence AI & Créativité (2024) | ❌ Inventé |

`corhino.html` : faits politiques/Rimouski OK, mais « La musique, c'est le plan A depuis 1998 » (faux — 1998 = programmation) et « INSTRU : Piano · Voix » (incomplet — voir CV).

**TODO HUMAIN : relire chaque page avant le merge final → main.**

---

## 5. VRAIES DONNÉES (extraites CV 2023-10 + bio officielle — *pas à jour, HUMAIN doit réviser*)

**Bio courte (base à adapter au ton CoRhino) :**
Musicien, preneur de son, poète et artiste visuel depuis ~20 ans. Clarinette basse, contrebasse, basse électrique, chant. Styles : chanson, rap/hip-hop, free jazz, musique improvisée, conte. Bac en musique (Sherbrooke, 2011 — composition, enregistrement, mixage) + DEC informatique de gestion (2005). Cofondateur Studio du Monde (Coaticook). Membre du GGRIL depuis 2014 (clarinette basse, direction). Premier lauréat SLAM de contes, Festicourt Sherbrooke 2013. Peinture depuis 2007 : a commencé par peindre des rhinocéros pour financer une campagne électorale (10 toiles vendues), 50+ œuvres depuis.

**Jalons pour la timeline (sélection) :**
- 2021 — *Explosion*, compositeur + chef d'orchestre (orchestre d'improvisateurs)
- 2021 — *Séb x Louis x Jo*, phare de Pointe-Métis (compo, clarinette basse, poésie) → vidéo Vimeo
- 2019 — *Duclos / Colonie Anglaise* (auteur-compositeur-interprète)
- 2019 — *Petits Poèmes* (recueil)
- Depuis 2014 — GGRIL, orchestre d'improvisateurs (→ photo Serbie)
- 2016-2019 — Jazz Mess (clarinette basse, compo)
- 2011-2013 — David Goudreault, slam et poésie (basse, compo, arrangements)
- 2010-2013 — Sabir, hip-hop conscient (basse, guitare, compo) ← **racine hip-hop, à mettre en valeur!**
- 2022 — Expo galerie Jean-Louis Desrosiers, Mont-Joli (peinture, sculpture)
- 2008 — Peinture en direct avec Armand Vaillancourt, Lion d'Or
- 2021 — Jury, Conseil des Arts du Canada
- Collabs notables : Oliver Jones, Michel Donato, Jean Derome, Lori Freedman, David Goudreault, Klô Pelgag, Richard Séguin, Zachary Richard…

**TODO HUMAIN : ajouter 2024-2026 (CV s'arrête à 2023) + valider ce qui est public.**

---

## 6. SUGGESTIONS À VALIDER (oui/non par numéro)

1. **Compteur de visiteurs old-school** (vrai compteur PHP sur NFS, esthétique odomètre 1998). Authentique, drôle, zéro tracking individuel.
2. **Footer artisanal** : « Site fait à la main en HTML depuis 1998 · Dernière mise à jour : [date] » — anti-badge-IA par excellence.
3. **Réduire les emojis dans les pages** (🍍🦏 partout = tell visuel « généré par IA »). Garder le 🍍 logo, remplacer le reste par tes vraies images (toiles, photos).
4. **Embeds vidéo « lite »** (façade cliquable → iframe YouTube/Vimeo seulement au clic) : page rapide + zéro cookie tiers avant le clic = pas de bannière requise.
5. **Section « racines hip-hop »** sur corhino.html : Sabir (hip-hop conscient, 2010-13) + David Goudreault (slam) → légitimité rap réelle, pas inventée.
6. **Badge 88×31 pixel-art** « ananasday.com » téléchargeable (clin d'œil webring 1998) — gadget, si temps.
7. **Supprimer `What_Claude_thinks_of_me.md` et `design.html` du repo public** avant mise en ligne (le rsync pousse TOUT le repo, y compris docs/ et fichiers perso → d'où l'exclude en Phase 0).

---

## ORDRE DE MARCHE RECOMMANDÉ

1. **Semaine du 11 juin** : Phase 0 (déploiement) + purge events.json + bio réelle + page vidéos.
2. **Semaine du 18 juin** : Phase 2 (audio dès que le mix est prêt) + nudge + lecteur.
3. **Semaine du 25 juin** : Phase 3 (finitions, OG, mobile, 404) + gel du code le 29-30 juin.
4. **1er juillet** : le mixer se déverrouille tout seul. 🍍
