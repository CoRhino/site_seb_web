# PLAN — Gamification « niveaux » (proposition, à valider humain)

> **Statut : proposition seulement. Rien n'est codé.** Décision artistique = à Séb.
> L'agent ne fait que suggérer une direction et un mécanisme technique.

## Le problème à éviter

Une barre XP générique avec dégradé violet et confettis = ça sent l'IA à plein nez.
Il faut un système qui ait l'air **fait main, geek, et ancré dans l'univers CoRhino**
(Parti Rhino, Ananas Day, GGRIL, esthétique « vieux web »), pas un plug-in SaaS.

## Inspirations (existant, fun, grand public)

- **BBS/forums des années 90-2000** : rang textuel sous le pseudo qui monte avec le
  nombre de posts (« Nouveau » → « Habitué » → « Légende du forum »). Ça matche déjà
  le `webmaster depuis 1998` du footer.
- **Carrière d'un rappeur/mixtape** : Démo → Mixtape → EP → Album → Disque d'or/platine.
  Vocabulaire 100% musique, aucune saveur « app mobile ».
- **Cartouche de jeu rétro / high-score arcade** : écran « NEW RANK UNLOCKED » en ASCII,
  pas de badge SVG glossy.
- **Karma Reddit / Stack Overflow** : un seul nombre qui monte, pas de système de vies
  ou de pénalités — garde l'esprit « positif » demandé.

## Proposition de structure

**Un seul score (« XP » ou renommé, ex. `🍍 jus`) gagné par interactions réelles déjà
sur le site**, stocké en `localStorage` (pas de compte, pas de serveur, conforme à la
philosophie « pas de DB » déjà actée pour le nudge Bandcamp) :

| Action sur le site | Points suggérés |
|---|---|
| Visite (compteur déjà existant) | +1 |
| Changer de thème (première fois pour chaque thème) | +2 |
| Regarder une vidéo dans le bandeau | +3 |
| Jouer un motif sur le 808 (404) | +2 |
| Ouvrir le Mixer | +3 |
| Cliquer vers Bandcamp | +5 |
| Trouver `llm.txt` *(easter-egg IA — improbable pour un humain, gardé pour rigoler)* | +10 |

**Rangs** (proposition de ton, À VALIDER/RÉÉCRIRE — texte = toi) :

1. `0–5` — Auditeur curieux
2. `6–15` — Fan du Phare
3. `16–30` — Disciple de l'Ananas
4. `31–60` — Membre honoraire du GGRIL
5. `61–100` — Chef d'orchestre *(clin d'œil — tu diriges vraiment le GGRIL)*
6. `100+` — Légende du Parti Rhino

## Affichage suggéré

Une ligne terminal discrète, esthétique cohérente avec le compteur N&B old-school :

```
RANG: Fan du Phare (12)
[███████░░░░░░░░░░░░] vers Disciple de l'Ananas
```

Placement probable : sous le compteur de visiteurs (footer / `lancement.html`), pas
une bannière flottante intrusive.

## Questions à trancher (humain)

1. **Public ou privé ?** Système purement personnel (`localStorage`, ce que je
   recommande — pas de classement entre visiteurs, pas de serveur) ou un vrai
   classement public (implique une base de données / API — gros changement de stack) ?
2. **Ton des noms de rangs** : le tableau ci-dessus est un brouillon — tu valides,
   réécris, ou veux-tu un vocabulaire 100% hip-hop (mixtape → album → platine) plutôt
   que Parti Rhino / Ananas Day ?
3. **Affichage** : juste un nombre discret, ou tu veux un petit jingle/visuel façon
   « NEW RANK UNLOCKED » à la première montée de rang (ferait sourire, mais ajoute
   de la complexité) ?

## Si validé — portée technique (pour plus tard)

- `script.js` : un seul objet `XP_RULES` + écoute d'événements déjà présents
  (clic thème, clic vidéo, clic 808, clic Mixer, clic Bandcamp) → incrémente
  `localStorage('cr-xp')`.
- Pas de nouvelle dépendance, pas de build, cohérent avec le reste du site.
- Aucune fausse donnée affichée tant que Séb n'a pas validé les noms de rangs.
