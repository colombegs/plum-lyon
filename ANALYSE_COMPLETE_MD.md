# 📊 Analyse Complète de la Documentation - Projet Plum Living

**Date d'analyse** : 1er décembre 2025  
**Dernière mise à jour** : 1er décembre 2025 (progrès du jour)  
**Nombre de fichiers MD analysés** : 23 fichiers

---

## 📋 Vue d'ensemble du projet

### Contexte
**Plum Living** est un site e-commerce français spécialisé dans les façades et accessoires pour meubles Ikea (Metod, Pax, Besta).

### Objectif principal
Créer des **expérimentations frontend** pour tester et valider le design system avant intégration dans le site de production.

### Stack technique
- **Approche** : HTML/CSS/JS Vanilla (pas de framework)
- **Bibliothèques** : Swiper (carrousels), React Toastify (notifications)
- **CMS** : Probablement Sylius (mentionné dans les classes CSS)
- **Scripts tiers** : Facebook Pixel, HubSpot, LinkedIn Analytics, Axeptio

---

## 🎨 Design System - État actuel

### Polices de caractères

#### Polices principales (2 seulement)
1. **Cera Pro** (`--font-primary`)
   - **Usage** : Body, contenu texte, navigation
   - **Poids** : 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
   - **Source** : `cera-pro-sv.zip` (579.17 KB) - Dropbox
   - **Status** : ✅ Archive disponible

2. **Blacklist** (`--font-heading`)
   - **Usage** : Titres et éléments visuels
   - **Variantes** : Regular, Bold, ExtraBold, SemiBold, Italic
   - **Poids** : 400, 500, 800
   - **Source** : `Blacklist Complete Family.zip` (700.28 KB) - Dropbox
   - **Fichiers** : 20 fichiers OTF + 2 fichiers variables TTF
   - **Status** : ✅ Complet

#### Polices identifiées mais non utilisées
- Source Sans 3, Sailec, Canela, Lato → Mentionnées mais ne font pas partie du DS principal

### Système de typographie

#### Body - Cera Pro
| Taille | Variable | Font-size | Line-height | Usage |
|--------|----------|-----------|-------------|-------|
| **XL** | `--font-size-xl` | 20px | 140% | Grand texte de corps |
| **L** | `--font-size-l` | 16px | 140% | Texte de corps standard |
| **M** | `--font-size-m` | 14px | 140% | Texte moyen |
| **S** | `--font-size-s` | 12px | 140% | Petit texte |
| **XS** | `--font-size-xs` | 10px | 140% | Très petit texte |

#### Styles alternatifs (Cera Pro)
**⚠️ IMPORTANT** : Les styles Alt 1, 2, 3 sont des styles **COMPLETS**. Quand on utilise un style Alt, on doit utiliser **TOUTES** ses propriétés (font-size, line-height, **ET letter-spacing**).

| Style | Font-size | Line-height | Letter-spacing |
|-------|-----------|-------------|----------------|
| **Alt 1** | 16px | 140% | **5% (0.05em)** |
| **Alt 2** | 14px | 140% | **5% (0.05em)** |
| **Alt 3** | 12px | 140% | **5% (0.05em)** |

**Variables CSS** :
- `--font-size-alt-1`, `--font-size-alt-2`, `--font-size-alt-3`
- `--line-height-alt` (140%)
- `--letter-spacing-alt` (0.05em) ← **FAIT PARTIE INTÉGRANTE DU DS**

#### Headings - Blacklist
| Heading | Variable | Font-size | Line-height | Letter-spacing |
|---------|----------|-----------|-------------|----------------|
| **H1** | `--font-size-h1` | 80px | 90% | -0.02em à -0.3px |
| **H2** | `--font-size-h2` | 48px | 100% | -0.3px à -0.5px |
| **H3** | `--font-size-h3` | 42px | 120% | -0.2px à -0.5px |
| **H4** | `--font-size-h4` | 24px | 120% | -0.5px |
| **H5** | `--font-size-h5` | 20px | 120% | - |

### Palette de couleurs

#### Neutres (Basics)
- `--color-asphalte` : #222 (Gris très foncé/charbon)
- `--color-black` : #000
- `--color-grey-1` : #666 (Gris moyen)
- `--color-grey-2` : #999 (Gris clair)
- `--color-grey-3` : #ccc (Gris très clair)
- `--color-grey-4` : #f5f5f5 (Gris presque blanc)
- `--color-blanc-casse` : #fafafa
- `--color-white` : #ffffff

#### Couleurs fonctionnelles
- `--color-success` : #8dc572 (Vert teal)
- `--color-error` : #be6464 (Rouge corail)
- `--color-warning` : #f0ad4e (Jaune vif/ambre)
- `--color-info` : #337ab7 (Bleu)

#### Palette produits (30+ teintes)
Le site utilise une palette riche avec bois naturels, bleus, verts, neutres, tons chauds, et la collection Pauline Borgia. **Non encore intégrée dans les variables CSS**.

### Espacements (Spacing System)
| Taille | Variable | Valeur | Usage |
|--------|----------|--------|-------|
| **XS** | `--spacing-xs` | 8px | Espacement très petit |
| **SM** | `--spacing-sm` | 12px | Espacement petit |
| **MD** | `--spacing-md` | 16px | Espacement moyen |
| **LG** | `--spacing-lg` | 24px | Espacement grand |
| **XL** | `--spacing-xl` | 32px | Espacement très grand |
| **2XL** | `--spacing-2xl` | 40px | Espacement extra grand |
| **3XL** | `--spacing-3xl` | 48px | Espacement double extra grand |
| **4XL** | `--spacing-4xl` | 64px | Espacement maximum |

### Layout
- `--navbar-height` : 110px (desktop) / 80px (mobile)
- `--container-max-width` : 1200px
- `--container-padding` : 40px

### Transitions
- `--transition-fast` : 0.2s ease
- `--transition-base` : 0.3s ease
- `--transition-slow` : 0.5s ease

### Border Radius
- `--radius-sm` : 4px
- `--radius-md` : 8px
- `--radius-lg` : 16px
- `--radius-full` : 9999px

---

## 📚 Documentation disponible

### Fichiers de documentation (23 au total)

#### Documentation principale
1. **README.md** - Vue d'ensemble du projet, structure, installation
2. **DESIGN_SYSTEM_ANALYSIS.md** - Analyse complète du design system (polices, couleurs, composants)
3. **RECAP_DESIGN_SYSTEM.md** - Récapitulatif structuré du DS avec exemples de code

#### Documentation des migrations
4. **NAVBAR_DS_MIGRATION.md** - Migration navbar vers DS (✅ complété)
5. **HERO_DS_MIGRATION.md** - Migration hero section vers DS (⚠️ partiel)
6. **HERO_RESPONSIVE_DS.md** - Migration responsive hero vers DS (✅ complété)
7. **AUDIT_DS_USAGE.md** - Audit complet de l'utilisation du DS (conformité ~40%)
8. **RESUME_CUSTOM_VS_DS.md** - Résumé custom vs DS (confirme ~60% custom)
9. **HOMEPAGE_DS_MAPPING.md** - Mapping précis DS pour homepage
10. **CONFLIT_RESOLU.md** - Résolution des conflits CSS navbar

#### Documentation technique
11. **NAVBAR_DROPDOWN_FIX.md** - Correction du gap navbar/dropdown + documentation complète
12. **STYLES_ALT_CLARIFICATION.md** - Clarification importante sur les styles Alt 1, 2, 3
13. **HOME_HARDCODED_AUDIT.md** - Audit des valeurs hardcodées dans home.html/hero.css
14. **MCP_SETUP_GUIDE.md** - Guide de configuration MCP pour Figma
15. **SERVEUR_README.md** - Guide de démarrage du serveur local

#### Documentation expérimentations
16. **PLAN_EXPERIMENTATIONS.md** - Plan des expérimentations (HTML/CSS/JS vanilla)
17. **experiments/README.md** - Documentation des expérimentations
18. **experiments/media/README.md** - Documentation page media
19. **experiments/media/IMAGES_MAPPING.md** - Mapping des images page media
20. **experiments/media/IMAGES_STRUCTURE.md** - Structure des images page media

#### Documentation polices
21. **fonts/README.md** - Documentation des polices
22. **fonts/FONTS_INVENTORY.md** - Inventaire détaillé des polices (Dropbox)
23. **fonts/POLICES_STATUS.md** - État des polices (disponibilité, utilisation)

---

## 🔄 État des migrations vers le Design System

### ✅ Fichiers conformes au DS (100%)

1. **experiments/homepage/styles.css** - ✅ 100% conforme
2. **experiments/category/styles.css** - ✅ 100% conforme
3. **shared/styles/reset.css** - ✅ 100% conforme
4. **experiments/media/styles.css** - ✅ Partiellement conforme (conflit avec valeurs hardcodées)

### ⚠️ Fichiers partiellement conformes

1. **shared/components/navbar.css** - ✅ **~95% conforme** (migration DS complétée aujourd'hui)
   - ✅ `.nav-link` : Utilise `var(--font-size-alt-3)` (12px) avec `var(--line-height-alt)` et `var(--letter-spacing-alt)`
   - ✅ `.btn-cta` : Utilise `var(--font-size-alt-3)` (12px) avec variables DS complètes
   - ✅ `.mobile-menu-link` : Utilise `var(--font-size-h5)` pour menu principal
   - ✅ `.mobile-menu-alt .mobile-menu-link` : Utilise `var(--font-size-m)` pour sous-menu
   - ✅ Toutes les couleurs utilisent variables DS (`var(--color-white)`, `var(--color-asphalte)`, etc.)
   - ✅ Tous les espacements utilisent variables DS (`var(--spacing-xs)`, `var(--spacing-sm)`, etc.)
   - ✅ Toutes les transitions utilisent variables DS (`var(--transition-fast)`, `var(--transition-base)`)
   - ✅ Border-radius utilise variables DS (`var(--radius-sm)`, `var(--radius-md)`)
   - 📊 **70+ occurrences de variables DS** dans le fichier
   - ⚠️ Quelques valeurs hardcodées restantes (gaps spécifiques, padding mobile) qui peuvent être justifiées

2. **hero.css** - ❌ **0% conforme** (0/4 éléments)
   - ❌ `.hero-title` : `clamp(48px, 7vw, 84px)` hardcodé
   - ❌ `.hero-subtitle` : Variables locales au lieu du DS
   - ❌ `.hero-btn` : `16px` hardcodé
   - ❌ `.category-label` : `clamp(24px, 3vw, 38px)` hardcodé

### 📊 Statistiques globales

- **Conformes au DS** : ~55% (amélioration de +15% aujourd'hui grâce à la migration navbar)
- **Custom/Hardcodés** : ~45%

**Problèmes identifiés** :
- Valeurs hardcodées au lieu de variables CSS
- Variables locales créées dans `hero.css` au lieu d'utiliser le DS global
- Tailles responsive non alignées avec le DS (ex: 84px au lieu de 64px pour H1)

---

## 🧪 Expérimentations - État d'avancement

### ✅ Complétées

1. **Navbar** (`shared/components/navbar.css`, `shared/components/navbar.html`)
   - ✅ Dropdown menus fonctionnels (CUISINE, MAISON, CONCEPT)
   - ✅ Transitions fluides
   - ✅ Changement de couleur navbar au hover
   - ✅ Barre de recherche
   - ✅ Responsive (mobile, tablette)
   - ✅ **Migration DS complétée** : Utilise Alt 3 (12px) pour nav-links et btn-cta
   - ✅ **70+ variables DS** utilisées dans le fichier
   - ✅ Menu mobile conforme au DS (H5 pour menu principal, M pour sous-menu)

2. **Page Media** (`experiments/media/`)
   - ✅ Page complète pixel perfect
   - ✅ Hero section avec texte superposé
   - ✅ Navigation catégories (NEW, HOMETOURS, IDEAS, GUIDES)
   - ✅ Grille masonry (3/2/1 colonnes responsive)
   - ✅ 9 articles avec animations
   - ✅ Intersection Observer pour animations au scroll
   - ✅ Documentation complète (README, IMAGES_MAPPING, IMAGES_STRUCTURE)

3. **Page Category** (`experiments/category/`)
   - ✅ Page catégorie complète
   - ✅ Header avec titre et description
   - ✅ Filtres sticky
   - ✅ Grille produits responsive
   - ✅ 100% conforme au DS

### ⏳ En cours

1. **Page Homepage** (`experiments/homepage/`)
   - ✅ Structure HTML
   - ⏳ Styles à compléter
   - ✅ 100% conforme au DS (pour ce qui est implémenté)

### 📝 À faire

- [ ] Compléter homepage styles
- [ ] Menu hamburger pour mobile
- [ ] Tests cross-browser
- [ ] Optimisation des performances
- [ ] Documentation des composants individuels

---

## 🎯 Points d'attention identifiés

### 1. Styles Alt 1, 2, 3 - Clarification importante

**Problème** : Les styles Alt sont souvent utilisés de manière incomplète.

**Solution** : Les styles Alt 1, 2, 3 sont des **styles COMPLETS**. Il faut utiliser :
- Font-size
- Line-height
- **Letter-spacing (5%)** ← FAIT PARTIE INTÉGRANTE DU DS

**Exemple correct** :
```css
.nav-link {
  font-size: var(--font-size-alt-2); /* 14px */
  line-height: var(--line-height-alt); /* 140% */
  letter-spacing: var(--letter-spacing-alt); /* 5% - OBLIGATOIRE */
}
```

### 2. Valeurs hardcodées vs variables DS

**Problème** : Beaucoup de valeurs hardcodées dans `navbar.css` et `hero.css`.

**Impact** :
- Difficile de maintenir la cohérence
- Modifications futures plus compliquées
- Écarts avec le DS

**Action requise** :
- Remplacer `14px` → `var(--font-size-m)`
- Remplacer `16px` → `var(--font-size-l)`
- Remplacer `24px` → `var(--font-size-h4)`
- Utiliser variables dans `clamp()` : `clamp(var(--font-size-h2), 7vw, var(--font-size-h1))`

### 3. Variables locales dans hero.css

**Problème** : `hero.css` définit des variables locales (`--text-xl`, `--text-l`, etc.) au lieu d'utiliser le DS global.

**Solution** : Supprimer les variables locales et utiliser les variables du DS global.

### 4. Tailles responsive non standardisées

**Problème** : Les tailles responsive utilisent des valeurs custom (ex: 84px max pour hero-title au lieu de 64px H1).

**Question ouverte** : 
- Garder les valeurs responsive adaptatives ?
- Ou utiliser strictement les valeurs du DS ?

**Recommandation** : Créer des variables responsive dans le DS :
```css
--font-size-hero-title: clamp(var(--font-size-h2), 7vw, var(--font-size-h1));
```

### 5. Couleurs produits non intégrées

**Problème** : La palette de 30+ teintes produits n'est pas dans les variables CSS.

**Recommandation** : Intégrer progressivement dans `variables.css` selon les besoins.

---

## 📋 Plan d'action recommandé

### Priorité 1 - Quick wins (facile à corriger)

1. **✅ Migrer navbar.css** - **COMPLÉTÉ AUJOURD'HUI**
   - ✅ Remplacé par `var(--font-size-alt-3)` (12px) dans `.nav-link`
   - ✅ Remplacé par `var(--font-size-alt-3)` (12px) dans `.btn-cta`
   - ✅ Ajouté `var(--line-height-alt)` et `var(--letter-spacing-alt)` partout
   - ✅ Migration complète vers variables DS (couleurs, espacements, transitions, border-radius)

2. **Migrer hero.css**
   - [ ] Remplacer variables locales par variables DS global
   - [ ] Utiliser variables dans `clamp()` pour responsive
   - [ ] Remplacer espacements hardcodés par variables

### Priorité 2 - Harmonisation responsive

1. **Créer variables responsive**
   - [ ] `--font-size-hero-title` (clamp avec variables DS)
   - [ ] `--font-size-hero-subtitle` (clamp avec variables DS)
   - [ ] `--font-size-category-label` (clamp avec variables DS)

2. **Harmoniser les tailles**
   - [ ] Décider pour `18px` dropdown : utiliser `16px` (L) ou créer variable ?
   - [ ] Décider pour `40px` article-title : utiliser `34px` (H3) ou `48px` (H2) ?
   - [ ] Décider pour `58px` media hero : utiliser `48px` (H2) ou `64px` (H1) ?

### Priorité 3 - Documentation

1. **Compléter la documentation**
   - [ ] Ajouter exemples de code pour chaque composant
   - [ ] Documenter les variables responsive
   - [ ] Créer guide de migration pour futurs composants

2. **Mettre à jour les MD obsolètes**
   - [ ] Vérifier cohérence entre tous les documents
   - [ ] Supprimer les doublons
   - [ ] Créer un index de documentation

### Priorité 4 - Expérimentations

1. **Compléter homepage**
   - [ ] Finaliser les styles
   - [ ] Tester responsive
   - [ ] Documenter

2. **Tests et optimisations**
   - [ ] Tests cross-browser
   - [ ] Optimisation images
   - [ ] Performance (lighthouse)

---

## 🎯 Synthèse et recommandations

### ✅ Points forts

1. **Design System bien documenté** : Variables CSS complètes et bien structurées
2. **Expérimentations conformes** : Les pages dans `experiments/` respectent le DS
3. **Documentation exhaustive** : 23 fichiers MD couvrent tous les aspects
4. **Clarifications importantes** : Styles Alt bien documentés

### ⚠️ Points d'attention

1. **Migration incomplète** : ~60% du code principal est encore custom
2. **Incohérences** : Fichiers principaux vs expérimentations
3. **Variables locales** : Création de variables redondantes dans `hero.css`
4. **Responsive non standardisé** : Valeurs custom au lieu du DS

### 💡 Recommandations prioritaires

1. **Finaliser la migration DS** sur `navbar.css` et `hero.css` (Priorité 1)
2. **Standardiser le responsive** avec variables DS (Priorité 2)
3. **Harmoniser** les fichiers principaux avec les expérimentations (Priorité 1-2)
4. **Documenter** les décisions prises pour tailles custom (Priorité 3)

### 📈 État global du projet

| Aspect | État | Score |
|--------|------|-------|
| **Design System** | ✅ Bien défini | 90% |
| **Documentation** | ✅ Exhaustive | 95% |
| **Migration DS** | ⚠️ Partielle | 40% |
| **Expérimentations** | ✅ Bien avancées | 80% |
| **Cohérence** | ⚠️ À améliorer | 60% |

**Score global** : **~73%** - Projet bien structuré, migration DS à finaliser

---

## 📝 Notes finales

### Prochaines étapes immédiates

1. Migrer `navbar.css` vers DS complet (1-2h)
2. Migrer `hero.css` vers DS complet (2-3h)
3. Créer variables responsive dans DS (30min)
4. Tester et valider (1h)

### Questions ouvertes à clarifier

1. **Responsive** : Garder valeurs adaptatives ou strictement DS ?
2. **Tailles custom** : Créer variables pour 18px, 40px, 58px ou utiliser valeurs DS existantes ?
3. **Couleurs produits** : Intégrer dans `variables.css` maintenant ou plus tard ?

---

*Analyse effectuée le 1er décembre 2025*  
*Prochaine revue recommandée : Après migration complète du DS*

