# PLAN — Revue vocale du 19 juin 2026

**Branche :** `feat/revue-vocale-19juin` (PR → `feat/claude-code-create-website`).
**Source :** revue vocale en direct de Séb (transcrite). Décisions confirmées via questions.

> Les TODO HUMAINS sont dans `DOCS/TODO_HUMAIN.md` (exclus de ce plan).
> Bloquants signalés ⛔.

---

## Tâches AGENT

| ID | Tâche | Fichiers |
|----|-------|----------|
| 0 | `/DOCS` (déplacer `/PLAN`, `CHANGELOG`, `TODO_HUMAIN`) + exclure `DOCS/` du rsync | `DOCS/`, `deploy.yml` |
| A | Switcher : gros jaune (défaut/signature) + grille 3×2 `[rouge·vert·mauve] / [arc-en-ciel·noir·turquoise]`, **retrait orange**, état actif visible | toutes pages, `style.css` |
| B | Persistance thème inter-pages : script `<head>` anti-flash (cause probable du « ça change ») | toutes pages, `style.css` |
| C | Thème noir = vrai **négatif** (invert+grayscale, zéro couleur) | `style.css` |
| D | Rhino → 🎤 micro jaune (accueil ; rhino gardé en commentaire) | `index.html` |
| E | « Signe distinctif » → garder seulement le bouton Mixer | `corhino.html` |
| F | Retrait courriels ; footer = Bandcamp/YouTube/Instagram ; page `contact.html` (reste = TODO humain) | toutes pages, `contact.html` |
| G | Sortir TODO visibles (`videos.html`) + commentaires `À RÉÉCRIRE` → `DOCS/TODO_HUMAIN.md` | `videos.html`, autres |
| H | « Build with NI™ » discret (NI = *Natural Intelligence*, défini **en source seulement**) | pages internes |
| I | Scaffolder `lancement.html` (compte à rebours + compteur + structure ; texte = lorem ipsum **allemand**) | `lancement.html` |
| J | Page 404 améliorée + **808 séquenceur éditable** (Web Audio, look TR-808 rétro) | `404.html`, JS |
| K | Notes IA invisibles aux humains → commentaires/`.txt` + chaîne `llm.txt → llm2.txt → …` (pitch crypto) | `404.html`, `index.html`, `donations.html`, `llm*.txt` |
| L | Kelvin sans décimales (arrondi entier) | `meteo.js` |
| M | Compteur visites : global `x=x+1`, style odomètre N&B 90s avec chiffres « croches » ; aussi sur la landing | `script.js`, `style.css`, `lancement.html` |
| N | Mise à jour `AGENT.md` (faits corrigés, sans invention) | `AGENT.md` |

## Décisions confirmées (par Séb)

- **Page de lancement** : page **séparée** scaffoldée, texte placeholder (lorem ipsum allemand).
- **Contact** : retrait total des courriels ; 3 liens (Bandcamp/YouTube/Instagram) partout ; `contact.html` pour les autres.
- **808** : séquenceur **éditable** (16 pas, multi-voix, play/stop/tempo).
- **NI™** : *Natural Intelligence*, défini en code source uniquement.
- **Compteur** : compteur global old-school, sur la landing, N&B chiffres décalés.

## ⛔ Bloquants

- Photos d'artiste (habillage + landing).
- Texte de `lancement.html` (placeholder en place).
- Handles sociaux LinkedIn/Facebook/TikTok/Tinder (contact.html en placeholder).

## Vérification

- Servir en **http local** pour confirmer thème inter-pages + voir le rendu (le compteur PHP reste inactif en local = normal).
