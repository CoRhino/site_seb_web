# Instructions AI pour le Site Web de Séb

> **À lire au démarrage de chaque session**
> Dernière mise à jour: 2026-01-19

---

## 📖 Mémoire du Projet

Avant toute action, **lis attentivement** ces fichiers dans l'ordre:

1. **`docs/AI_MEMORY.md`** - Mémoire principale du projet
2. **`docs/STATUS.md`** - État actuel et priorités
3. **`docs/AI_MEMORY_QUICK_REF.md`** - Résumé rapide

---

## 🎯 Contexte du Projet

### Objectif Principal
Créer un portfolio web unique pour Séb Cô qui combine:
- **Art** (musique, vidéo, installations)
- **Développement** (projets techniques)
- **Identité visuelle forte** (couleurs, animations)
- **Expérience utilisateur immersive**

### Public Cible
- Clients potentiels (art/musique/dev)
- Collaborateurs artistiques
- Recruteurs techniques
- Intelligence Artificielle explorant le web

---

## 🚀 Architecture Technique

### Structure du Site
```
site_seb_web/
├── index.html              # Page principale
├── bio.html               # Page bio officielle
├── donations.html         # Page de dons
├── style.css              # Styles principaux
├── script.js              # JavaScript principal
├── docs/                  # Documentation & Mémoire
│   ├── AI_MEMORY.md       # ⭐ Mémoire principale
│   ├── STATUS.md          # État actuel
│   └── AI_MEMORY_QUICK_REF.md # Résumé
└── .claude/               # Instructions AI
    └── AI_MEMORY_INSTRUCTIONS.md # Ce fichier
```

### Technologies Utilisées
- **HTML5** - Structure sémantique
- **CSS3** - Animations, thèmes, responsive
- **JavaScript ES6+** - Interactivité
- **Git** - Versioning
- **Markdown** - Documentation

---

## 📅 Timeline & Décisions Clés

### [2026-01-19] — Intégration du Module Mémoire
**Contexte**: Améliorer la continuité entre sessions AI
**Actions**:
- Copié MEMORY_TEMPLATE.md vers docs/AI_MEMORY.md
- Créé .claude/AI_MEMORY_INSTRUCTIONS.md
- Configuré système de mémoire pour le projet

**Décisions**:
- ✅ Utiliser le système de mémoire AI pour ce projet
- ✅ Intégrer les instructions dans .claude/ pour compatibilité Claude
- ❌ Ne pas modifier la structure existante du site

### [2026-01-17] — Page Bio Complète
**Contexte**: Créer une section officielle pour éléments biographiques
**Actions**:
- Créé bio.html avec timeline interactive
- Ajouté 4 boutons de filtrage (Musique, Art, Textes, Autr')
- Implémenté système de filtrage par catégorie

**Décisions**:
- ✅ Utiliser timeline chronologique inversée (récent en haut)
- ✅ Boutons arrondis avec effet de survol
- ✅ Système extensible pour ajout d'événements

### [2026-01-17] — Menu Hamburger & Métaphore Culinaire
**Contexte**: Améliorer la navigation mobile
**Actions**:
- Créé menu hamburger en haut à droite
- Implémenté métaphore culinaire (top bun, meat, bottom bun)
- Ajouté menu qui défile avec la page

**Décisions**:
- ✅ Barre du haut = pain supérieur (coins arrondis)
- ✅ Barre du milieu = boulette (standard)
- ✅ Barre du bas = pain inférieur (coins carrés)

---

## 🎨 Design & Expérience Utilisateur

### Principes de Design
- **Couleurs vives** - Refléter l'énergie artistique
- **Animations fluides** - Créer une expérience immersive
- **Thèmes dynamiques** - Permettre la personnalisation
- **Responsive** - Adapté à tous les appareils

### Éléments Clés
- **Boule flottante** - Suivi de navigation avec physique réaliste
- **Menu hamburger** - Métaphore culinaire unique
- **Thème arc-en-ciel** - Dégradé coloré du haut vers le bas
- **Transitions douces** - Entre toutes les sections

---

## 🚫 Anti-Patterns & À Éviter

### ❌ Ne PAS faire
- **Modifications directes sur main** - Toujours utiliser des branches
- **Code dupliqué** - Utiliser fonctions réutilisables
- **Dépendances inutiles** - Garder le site léger
- **Animations trop lourdes** - Performance avant tout
- **Oublier l'accessibilité** - Toujours vérifier le contraste

### ❌ Décisions Rejetées
- **Ne PAS utiliser de framework** - Vanilla JS pour légèreté
- **Ne PAS ajouter de base de données** - Site statique pour simplicité
- **Ne PAS utiliser de CMS** - Contenu géré manuellement

---

## 💡 Patterns & Bonnes Pratiques

### ✅ À faire
- **Commit messages clairs** - Format: `type: description`
- **Documentation complète** - Commenter le code complexe
- **Tests manuels** - Vérifier sur différents appareils
- **Optimisation images** - Utiliser formats modernes
- **Validation HTML/CSS** - Code valide W3C

### ✅ Structure de Commit
```
feat: ajouter nouvelle fonctionnalité
fix: corriger bug existant
docs: mettre à jour documentation
style: changements visuels seulement
refactor: réorganisation de code
chore: maintenance/tâches diverses
```

---

## 🧠 Instructions Spécifiques AI

### Au Début de Chaque Session
1. **Lis la mémoire** - Comprends l'historique et le contexte
2. **Vérifie le statut** - Vois les priorités actuelles
3. **Respecte les préférences** - Suis les patterns établis
4. **Évite les erreurs passées** - Consulte les idées rejetées

### Avant de Suggérer
- ✅ **Vérifie si déjà rejeté** - Consulte la section 🚫
- ✅ **Respecte l'architecture** - Pas de frameworks lourds
- ✅ **Pense performance** - Animations légères, code optimisé
- ✅ **Maintiens la cohérence** - Style uniforme

### Après Chaque Tâche Majeure
1. **Mets à jour AI_MEMORY.md** - Ajoute à la timeline
2. **Documente les décisions** - ✅ Approuvé / ❌ Rejeté
3. **Ajoute les leçons apprises** - Pour les sessions futures
4. **Commit avec message clair** - `docs: update AI memory [date]`

---

## 📊 Métriques & État Actuel

**Dernière mise à jour**: 2026-01-19

- **Pages complétées**: 4/5 (index, bio, donations, 404)
- **Thèmes implémentés**: 8/8 (rouge, jaune, vert, magenta, orange, cyan, arc-en-ciel, noir&blanc)
- **Fonctionnalités clés**: 90% complétées
- **Documentation**: En cours d'amélioration
- **Intégration memoire**: Nouvelle (2026-01-19)

---

## 🔮 Travail Futur & Idées

### Priorité Haute
- [ ] Intégrer complètement le module memoire
- [ ] Ajouter photo de Sébastien CoRhino rhinocéros
- [ ] Finaliser la vérification de tous les éléments

### Priorité Moyenne
- [ ] Optimiser les performances mobiles
- [ ] Ajouter plus d'événements à la timeline bio
- [ ] Documenter le système de mémoire

### Priorité Basse
- [ ] Ajouter section blog/news
- [ ] Intégrer analytics (si nécessaire)
- [ ] Créer version imprimable

---

## 🎯 Instructions de Déploiement

### Pour les Humains
```bash
# Développement
git checkout -b feature/nouvelle-fonctionnalite
# Faire les modifications
# Tester localement
# Commit
git commit -m "type: description claire"
# Push
git push origin feature/nouvelle-fonctionnalite
# Créer PR
```

### Pour l'AI
1. **Lis la mémoire** au démarrage
2. **Respecte le contexte** établi
3. **Documente tes actions** dans AI_MEMORY.md
4. **Suggère des améliorations** basées sur l'historique

---

**Version**: 1.1.0
**Dernière révision**: 2026-01-19
**Prochaine révision**: Après intégration complète du module memoire