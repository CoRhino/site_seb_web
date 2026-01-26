# AI Memory Template

> **Instructions**: Ce fichier est un template pour démarrer votre système de mémoire AI.
> Copiez ce fichier vers `docs/AI_MEMORY.md` et remplissez avec l'historique de votre projet.
> **Format**: Comme un changelog, le plus récent en haut ⬆️

---

## 📅 Timeline & Histoire du Projet

### [YYYY-MM-DD] — Titre de l'événement récent
**Contexte**: Pourquoi ce changement ?
**Actions**:
- Action 1 prise
- Action 2 prise
- Fichiers modifiés: `path/to/file.js`, `path/to/other.py`

**Résultat**: Impact observable
**Décisions**:
- ✅ Approuvé: Cette approche fonctionne bien
- ❌ Rejeté: Alternative X car raison Y

---

### [2024-12-01] — Migration vers TypeScript
**Contexte**: Améliorer la maintenabilité et réduire les bugs de typage
**Actions**:
- Conversion de tous les fichiers `.js` en `.ts`
- Ajout de types stricts dans `src/core/`
- Configuration de `tsconfig.json`

**Résultat**: Réduction de 40% des bugs liés aux types
**Décisions**:
- ✅ Utiliser `strict: true` dans tsconfig
- ❌ Rejeté l'usage de `any` sauf cas exceptionnels documentés

---

### [2024-11-15] — Refactoring de l'authentification
**Contexte**: Système d'auth legacy trop complexe et non sécurisé
**Actions**:
- Remplacement de sessions custom par JWT
- Implémentation de refresh tokens
- Migration base de données: `migrations/002_auth_tokens.sql`

**Résultat**: Temps de réponse API réduit de 200ms
**Décisions**:
- ✅ JWT avec expiration 15min + refresh token 7 jours
- ❌ Rejeté OAuth externe (trop complexe pour besoins actuels)

---

## 📁 Structure & Fichiers Actifs

### Architecture Principale
```
project/
├── src/
│   ├── core/          # Logique métier principale
│   ├── api/           # Endpoints REST
│   ├── utils/         # Fonctions utilitaires
│   └── types/         # Définitions TypeScript
├── tests/
│   ├── unit/
│   └── integration/
└── docs/              # Documentation projet
```

### Fichiers Clés
- `src/core/engine.ts` — Moteur principal de l'application
- `src/api/routes.ts` — Définition des routes API
- `config/database.yml` — Configuration DB (PostgreSQL)
- `.env.example` — Variables d'environnement requises

---

## 🚫 Idées Rejetées & Raisons

### Ne PAS utiliser MongoDB
**Raison**: Testé en 2024-10, mais les relations complexes rendent SQL plus adapté
**Détails**: Voir issue #42 pour benchmarks

### Ne PAS ajouter de cache Redis pour v1.0
**Raison**: Optimisation prématurée, performances actuelles suffisantes (<100ms)
**Réévaluer**: Quand trafic > 10k req/jour

### Ne PAS faire de monorepo
**Raison**: Frontend et Backend déployés séparément, complexité inutile
**Alternative**: Repos séparés avec CI/CD coordonnée

---

## 💡 Idées Latentes & Travail Futur

### À explorer (priorité haute)
- [ ] Système de notifications en temps réel (WebSocket vs SSE)
- [ ] Internationalisation (i18n) — commencer par FR/EN
- [ ] Rate limiting sur API endpoints

### À considérer (priorité basse)
- [ ] Migration vers Bun.js (attendre stabilité)
- [ ] Dark mode pour UI admin
- [ ] Export PDF des rapports

---

## 🎯 Préférences Utilisateur & Patterns Récurrents

### ✅ Préférences (À FAIRE)
- **Code style**: Prettier + ESLint, config dans `.prettierrc`
- **Tests**: Jest pour unit, Playwright pour E2E
- **Commits**: Convention Conventional Commits (`feat:`, `fix:`, etc.)
- **Branches**: `main` (prod), `develop` (staging), `feature/*` pour nouvelles features
- **Documentation**: Markdown, diagrammes en Mermaid si possible

### ❌ À Éviter (NE PAS FAIRE)
- Ne pas commit de fichiers générés (build/, dist/)
- Ne pas utiliser de dépendances sans audit de sécurité
- Ne pas modifier la DB en prod sans backup
- Ne pas pusher directement sur `main` (PR obligatoire)
- Ne pas utiliser `console.log` en production (utiliser logger)

---

## 🧠 Leçons Apprises & Conseils Opérationnels

### Performance
- **Leçon**: Les requêtes N+1 étaient la cause principale de lenteur (2024-11)
- **Solution**: Utiliser `JOIN` ou DataLoader pour batch queries
- **Référence**: `docs/performance-guide.md`

### Déploiement
- **Leçon**: Oublier de run migrations = downtime en prod (2024-09)
- **Solution**: Migrations automatiques dans CI/CD pipeline
- **Checklist**: Voir `docs/deployment-checklist.md`

### Sécurité
- **Leçon**: Validation input côté client insuffisante (CVE trouvée 2024-10)
- **Solution**: TOUJOURS valider côté serveur avec Zod/Joi
- **Référence**: `docs/security-best-practices.md`

---

## 📊 Métriques Actuelles

> Dernière mise à jour: YYYY-MM-DD

- **Couverture tests**: XX%
- **Temps build**: XX secondes
- **Performance API**: XX ms (p95)
- **Uptime**: XX.X%
- **Dette technique**: XX issues ouvertes

---

## 🔄 Maintenance de ce Fichier

**Quand mettre à jour**:
- Après chaque feature majeure complétée
- Après décisions architecturales importantes
- Après incidents/bugs critiques résolus
- Minimum 1x par sprint/semaine

**Comment mettre à jour**:
1. Ajouter nouvel événement en **haut** de Timeline
2. Mettre à jour métriques si pertinent
3. Ajouter idées rejetées avec contexte
4. Noter leçons apprises
5. Commiter avec message: `docs: update AI memory [date]`

---

**Version**: 1.0.0
**Dernière révision**: YYYY-MM-DD
