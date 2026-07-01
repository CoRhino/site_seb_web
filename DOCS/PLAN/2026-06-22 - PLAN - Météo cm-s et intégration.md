# PLAN — Widget météo : unité cm/s + intégration hors page de test

> **Statut : proposition. Le point 1 (cm/s) et le point 2 (°K, sans Celsius) sont
> tranchés par toi — je code direct. Le point 3 (où placer le widget) a besoin
> d'un choix de ta part, voir « Questions à trancher » plus bas.**

## 1. Vitesse du vent : km/h → cm/s

Open-Meteo renvoie le vent en km/h (`wind_speed_unit=kmh`). Conversion demandée :

```
km/h → m/s  : / 3.6
m/s  → cm/s : × 100
km/h → cm/s : × 100 / 3.6   (≈ × 27,78)
```

**Implémentation** (`meteo.js`) : nouvelle fonction `toCmS(kmh)` à côté de `toK()`,
résultat arrondi à l'entier (cohérent avec le traitement déjà fait pour le Kelvin —
pas de décimales pour l'humain). Tous les skins (`card`, `mono`, `retro`, `pill`)
passent de `${d.wind} km/h` à `${d.windCmS} cm/s`.

La ligne debug de `meteo-test.html` (données brutes) garde le calcul affiché en clair
pour vérification visuelle, comme déjà fait pour K = °C + 273.15.

## 2. °K partout, Celsius nulle part

Le skin `card` a déjà été ajusté (changement non commité dans `meteo.js`) :
`&deg;K` au lieu de `K`, et la mention Celsius retirée de la ligne `mw-place`.
Tu aimes le résultat → **même traitement appliqué aux 3 autres skins** (`mono`,
`retro`, `pill`), qui affichent encore `K` sans degré et gardent `${d.celsius}°C` :

- `mono` (ligne `mw-row mw-muted`) : retire `// ${d.celsius}&deg;C`, garde le vent.
- `retro` (ligne `mw-muted`) : retire `${d.celsius}&deg;C &nbsp;&middot;&nbsp;`, garde le vent.
- Les 3 skins gagnent `&deg;K` au lieu de `K` nu, comme `card`.

## 3. Sortir le widget de la page de test

Aujourd'hui `data-meteo` n'existe que dans `meteo-test.html` (page non liée en prod).
Tu veux le skin **`card`** (le défaut) sur `lancement.html` et « les différentes
pages si on trouve à quel endroit ça va ».

**Pages candidates et emplacement proposé :**

| Page | Emplacement proposé | Pourquoi |
|---|---|---|
| `lancement.html` | Sous le compte à rebours, avant l'infolettre | Ambiance « studio à Rimouski » pendant l'attente, cohérent avec le ton mono/terminal de la page |
| `index.html`, `corhino.html`, `ananas.html`, `donations.html`, `mixer.html`, `videos.html` | Dans le `<footer>`, à côté de `footer-webmaster` (`webmaster depuis 1998…`) | Toutes ces pages partagent le même footer — un seul bloc à dupliquer, n'interfère pas avec le countdown/contenu principal |

**Coût technique par page** : ajouter `<link rel="stylesheet" href="meteo.css">` au
`<head>`, `<script src="meteo.js"></script>` avant `</body>`, et
`<div data-meteo data-meteo-skin="card"></div>` à l'emplacement choisi — déjà
documenté dans `meteo-test.html`.

## Questions à trancher (toi)

1. **Footer ou pas ?** Skin `card` dans le `<footer>` de toutes les pages listées,
   ou seulement sur `lancement.html` pour l'instant (plus prudent, moins de pages
   à toucher avant le 1er juillet) ?
2. **Le skin `card` est assez large** (min-width 230px, icône 2.2rem) — adapté à un
   footer texte compact, ou tu préfères `pill` (horizontal, fait pour ce contexte —
   déjà démontré dans `meteo-test.html` en footer) pour les pages autres que
   `lancement.html`, et garder `card` seulement là où il y a de la place (lancement,
   futur sidebar studio) ?
3. **Vitesse cm/s arrondie à l'entier** comme le Kelvin, ou tu veux une décimale
   (ex. `833,3 cm/s`) ? Par défaut je pars sur l'entier, cohérent avec le reste.

## Si validé — portée technique

- `meteo.js` : `toCmS()`, remplacement des 4 templates de skin (vent + retrait
  Celsius + `&deg;K`).
- Pages choisies au point 3 : 3 lignes ajoutées chacune (`link`, `script`, `div`).
- Aucune nouvelle dépendance, pas de clé API, pas de build.
