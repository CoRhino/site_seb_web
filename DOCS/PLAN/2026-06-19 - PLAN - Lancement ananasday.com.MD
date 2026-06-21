# PLAN — Lancement ananasday.com
**Date :** 2026-06-19 · **Deadline :** 1er juillet 2026 (single AnanasDay) · **J-12**

> Plan unique et courant. Les versions précédentes sont dans `archives/PLAN-old/`.
> Guide technique pour les agents : `AGENT.md`.

---

## 1. ÉTAT DES LIEUX (au 2026-06-19)

**Branche de travail :** `feat/claude-code-create-website` (poussée sur GitHub).
**Déploiement :** `deploy.yml` prêt (push `main` → rsync vers NFS `/home/public`). **Secrets pas encore configurés** (§3).
**DNS** ananasday.com → NFS : ✅ déjà fait.

### Fait ✅
- Pages nouveau design : `index`, `corhino`, `ananas`, `videos`, `mixer`, `donations`, `404`.
- `data/events.json` : faux contenu IA purgé, remplacé par 14 événements réels (du CV).
- Section « Racines » sur `corhino.html` (hip-hop : Sabir, Goudreault ; jazz : GGRIL ; etc.).
- Page `videos.html` : promesse électorale (YT), poésie Paraloeil (Vimeo), photo GGRIL Serbie. Embeds « lite » (iframe au clic = zéro cookie tiers avant clic).
- Compteur de visiteurs old-school (PHP `api/counter.php` + affichage odomètre, +1 par chargement).
- Footer « webmaster depuis 1998 · fait main · zéro framework » + badge 88×31.
- Page `donations.html` refaite (nouveau design) : PayPal + crypto + Bandcamp (adresses « à venir »).
- Page cachée `donation_ai.html` (easter egg bots IA) — résout les anciens liens cassés.
- **Thème arc-en-ciel** refait : vrai drapeau spectral vertical IR (rouge, haut) → UV (violet, bas), boule radiale UV-centre→IR-bord, titres de section en dégradé.
- Module **météo du Bic** (Open-Meteo, Kelvin, 4 skins) — `meteo-test.html`, **test seulement, non déployé**.
- Repo nettoyé : vestiges projet La Puck + ancien design dans `archives/` (hors git, hors déploiement). `AGENT.md` propre.
- Bugs corrigés : conversion Kelvin (273→273.15), bouton infolettre (sélecteur), liens `donation_ai.html`.

### À faire (développeur)
- Lecteur « écoute libre » du single complet sur `ananas.html`/`corhino.html` (≠ mixer de stems).
- Nudge soutien en `localStorage` (après N visites/écoutes → toast Bandcamp/don). Pas de DB, pas de bannière cookies (stockage fonctionnel = conforme Loi 25/RGPD).
- Favicon 🍍 + image Open Graph (partage réseaux).
- Page « Vie privée » courte (Loi 25) — utile dès qu'on collecte des courriels.
- Pages d'erreur comiques 403 / 500 / 418 (bandeau « toutes les erreurs » déjà dans `404.html`, cibles à créer).
- Brancher l'infolettre (Cyberimpact 🇨🇦 ou MySQL NFS).
- Liens sociaux dans le footer (§5).
- sitemap.xml + robots.txt.
- Passe mobile (AudioContext exige un tap utilisateur).

---

## 2. POSITIONNEMENT

**Site d'artiste = archives + nouveauté.**
- **Nouveauté (avant-plan) :** Séb lance sa carrière solo de chanteur/rappeur. Hip-hop. Single AnanasDay 1er juillet.
- **Archives (profondeur) :** 20 ans (GGRIL, Jazz Mess, Sabir, David Goudreault…), poésie/slam, arts visuels, politique (Parti Rhino).
- **Esthétique anti-IA / old-school :** programmeur « webmaster depuis 1998 », fait main, fonds sombres, compteur odomètre, badge 88×31.

---

## 3. DÉPLOIEMENT — connexion SSH NFS ↔ GitHub (pas-à-pas) ⚠️ HUMAIN

Le `deploy.yml` se déclenche sur `push` vers `main` et fait `rsync` vers NFS par SSH.
Il faut une **clé SSH dédiée** et **4 secrets GitHub**. Procédure complète :

### Étape 1 — Générer une paire de clés dédiée au déploiement
Sur ta machine (laisser la passphrase **vide** — GitHub Actions doit l'utiliser sans interaction) :
```bash
ssh-keygen -t ed25519 -C "github-deploy-ananasday" -f deploy_key
# produit : deploy_key (privée)  +  deploy_key.pub (publique)
```

### Étape 2 — Autoriser la clé publique sur NFS
Trouver ton nom d'utilisateur SSH NFS (format `membre_sitecourt`, ex. `corhino_ananasday`)
et le hôte SSH NFS (`ssh.phx.nearlyfreespeech.net`). Puis ajouter la **clé publique** :
```bash
ssh corhino_ananasday@ssh.phx.nearlyfreespeech.net
# une fois connecté :
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "CONTENU_DE_deploy_key.pub" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```
(Alternative : panneau membre NFS → Profile → SSH Keys → coller `deploy_key.pub`.)

### Étape 3 — Récupérer le known_hosts (anti-MITM)
```bash
ssh-keyscan ssh.phx.nearlyfreespeech.net
# copier TOUTES les lignes de sortie → ira dans le secret NFS_KNOWN_HOSTS
```

### Étape 4 — Créer les 4 secrets GitHub
Repo GitHub → **Settings → Secrets and variables → Actions → New repository secret** :
| Secret | Valeur |
|---|---|
| `NFS_SSH_KEY` | tout le contenu de la clé **privée** `deploy_key` (avec `-----BEGIN…END-----`) |
| `NFS_KNOWN_HOSTS` | la sortie de `ssh-keyscan` (étape 3) |
| `NFS_USER` | ton user SSH NFS (ex. `corhino_ananasday`) |
| `NFS_HOST` | `ssh.phx.nearlyfreespeech.net` |

### Étape 5 — Activer TLS + financer le compte NFS
- Panneau NFS → ton site → **Add TLS/SSL** (Let's Encrypt, gratuit, un clic).
- Vérifier que le compte NFS a des fonds (stockage + bande passante = quelques sous).

### Étape 6 — Premier déploiement
Merger `feat/claude-code-create-website` → `main` puis `push`. L'action tourne et `rsync`
pousse le site (sauf exclusions) vers `/home/public`. Vérifier https://www.ananasday.com.

> ⚠️ `rsync --delete` efface sur le serveur tout ce qui n'est pas dans le repo.
> `audio/` et `data/counter.txt` sont **exclus** → ils vivent uniquement sur le serveur et ne seront pas écrasés.

---

## 4. AUDIO (cœur du lancement) ⚠️ HUMAIN

- Exporter les stems web (drums / bass / piano / vox / backing, MP3 ~192 kbps) + le master complet.
- Décider : MP3 versionnés dans le repo (OK si < 20 Mo) **ou** upload manuel dans `audio/` sur NFS (déjà exclu du rsync).
- Le mixer (`mixer.html`) se déverrouille seul le 1er juillet.

---

## 5. RÉFÉRENCES (récupérées des vieilles notes)

**Liens sociaux à mettre dans le footer** (todo dev) :
- Instagram : **@CoRhino**
- Bandcamp : **corhino.bandcamp.com** (remplace l'ancien SoundCloud)
- YouTube : **@CoRhino**
- ❌ retirer LinkedIn et SoundCloud (ne pas les mettre)

**DNS NFS (déjà configuré, pour mémoire) :**
- `A` 208.94.117.27 · `AAAA` 2607:ff18:80:4::871f
- `www` CNAME → `ananasday.nfshost.com`
- Nameservers : `ns.phx3.nearlyfreespeech.net`, `ns.phx5.nearlyfreespeech.net`

**Vidéos / médias :**
- Promesse électorale (EN) : https://www.youtube.com/watch?v=Tynlr9QXsuA — HUMAIN : retrouver version FR
- Poésie / clarinette basse (Paraloeil) : https://vimeo.com/697084294
- Photo GGRIL Serbie : https://quoivivrerimouski.ca/sites/default/files/styles/fiche_d/public/2023-04/ggriljpg-full.jpg — HUMAIN : version meilleure qualité

**Projet mémoire (référencé dans vieilles notes) :** github.com/corhino/memoire (intégration future éventuelle).

---

## 6. TODO HUMAIN (liste courante)

- [ ] **SSH NFS↔GitHub** : exécuter le §3 (clé + 4 secrets) → débloque le déploiement auto.
- [ ] **TLS Let's Encrypt** sur NFS + financer le compte.
- [ ] **Audio** : exporter stems + master du single.
- [ ] **Relire chaque page** avant le merge final → `main` (vérifier qu'aucun contenu inventé ne reste).
- [ ] **CV / bio** : ajouter 2024-2026 (le CV s'arrête à 2023-10), valider ce qui est public.
- [ ] **Vidéo** : retrouver la version FR de la promesse électorale.
- [ ] **Photo** : version haute résolution du GGRIL en Serbie.
- [x] ~~**Email** : configurer le forwarding `contact@ananasday.com` sur NFS.~~ — **sans objet** : cette adresse n'a jamais existé (invention d'un lot précédent, confirmé par Séb le 2026-06-21). Le site n'affiche plus aucun courriel ; voir `contact.html`.
- [ ] **Crypto/PayPal** : créer les adresses BTC/ETH + lien PayPal → les coller dans `donations.html` et `donation_ai.html` (code déjà prêt, en commentaire).
- [ ] **Toiles** : photographier les œuvres pour la future page arts visuels.

---

## 7. FUTUR (après le 1er juillet)

- Page **arts visuels** : 50+ toiles (rhinocéros, oiseaux, marmotte… style naïf), expo Mont-Joli 2022, peinture en direct avec Armand Vaillancourt (2008).
- Pages d'erreur comiques 403 / 500 / 418 (humour de programmeur, façon Wikipedia).
- Infolettre (Cyberimpact ou MySQL NFS).
- Analytique sans cookie (GoatCounter / Plausible) si besoin de chiffres.
- EP automne 2026.

---

## ORDRE DE MARCHE

1. **Maintenant (J-12) :** §3 déploiement (HUMAIN) — c'est le seul vrai bloquant pour mettre le site en ligne.
2. **Dès que le mix est prêt :** §4 audio + lecteur écoute libre + nudge soutien.
3. **Semaine du 25 juin :** finitions (favicon, OG, vie-privée, mobile, sitemap) + gel du code 29-30 juin.
4. **1er juillet :** le mixer se déverrouille tout seul. 🍍
