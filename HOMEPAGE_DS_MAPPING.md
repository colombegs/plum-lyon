# 📋 Mapping Design System - Page d'accueil (home.html)

Ce document détaille **précisément** quels éléments de la homepage utilisent quelles parties du Design System Plum Living.

---

## 🧭 Navbar (Navigation principale)

### `.nav-link` - Liens de navigation (CUISINE, MAISON, CONCEPT, MEDIA)
**Design System utilisé :**
- **Police** : `Cera Pro` (`--font-primary`)
- **Font-size** : **14px** (hardcodé, pas de variable)
- **Font-weight** : **500** (Medium)
- **Letter-spacing** : **0.5px**
- **Text-transform** : `uppercase`
- **Line-height** : Normal (hérité)

**Classe CSS** : `.nav-link`

---

### `.dropdown-link` - Liens dans les menus déroulants
**Design System utilisé :**
- **Police** : `Cera Pro` (`--font-primary`)
- **Font-size** : **16px** (standard) ou **18px** (pour certaines colonnes comme CUISINE, MAISON)
- **Font-weight** : **400** (Regular)
- **Letter-spacing** : **-0.5px**
- **Line-height** : **1.5**

**Classes CSS** : `.dropdown-link`

---

### `.dropdown-section-title` - Titres de sections dans les dropdowns
**Design System utilisé :**
- **Police** : `Blacklist` (`--font-heading`)
- **Font-size** : **24px** (`--font-size-h4`)
- **Font-weight** : **500** (Medium)
- **Line-height** : **120%** (`--line-height-h4`)
- **Letter-spacing** : **-0.5px**

**Classe CSS** : `.dropdown-section-title`

---

### `.dropdown-media-title` - Titres sur les images des dropdowns
**Design System utilisé :**
- **Police** : `Blacklist` (`--font-heading`)
- **Font-size** : **34px** (`--font-size-h3`)
- **Font-weight** : **400** (Regular)
- **Line-height** : **120%** (`--line-height-h3`)
- **Letter-spacing** : **-0.5px**

**Classes CSS** : `.dropdown-media-title`, `.dropdown-media-subtitle`, `.dropdown-media-description`

---

### `.btn-cta` - Bouton "JE COMMENCE"
**Design System utilisé :**
- **Police** : `Cera Pro` (`--font-primary`)
- **Font-size** : **14px**
- **Font-weight** : **500** (Medium)
- **Letter-spacing** : **0.5px**
- **Text-transform** : `uppercase`

**Classe CSS** : `.btn-cta`, `.btn-cta-text`

---

## 🎯 Hero Section

### `.hero-title` - Titre principal de la hero
**Design System utilisé :**
- **Police** : `Blacklist` (`--font-heading`)
- **Font-size** : `clamp(48px, 7vw, 84px)` (responsive, pas exactement les variables DS)
  - Desktop : ~84px (proche du H1 de 64px mais plus grand)
  - Mobile : ~48px (proche du H2 de 48px)
- **Font-weight** : **400** (Regular)
- **Line-height** : **1.1** (plus serré que le DS qui propose 90%)
- **Letter-spacing** : **-0.02em**

**Classe CSS** : `.hero-title`
**Élément HTML** : `<h1 class="hero-title">`

**Note** : La taille est responsive et ne suit pas exactement les variables `--font-size-h1` (64px), mais utilise plutôt une approche clamp().

---

### `.hero-subtitle` - Sous-titre de la hero
**Design System utilisé :**
- **Police** : `Cera Pro` (`--font-primary`)
- **Font-size** : `clamp(16px, 2vw, 20px)` (responsive)
  - Desktop : 20px (correspond à `--font-size-xl`)
  - Mobile : 16px (correspond à `--font-size-l`)
- **Font-weight** : **400** (Regular)
- **Line-height** : **1.6** (proche du 140% du DS)
- **Letter-spacing** : **-0.5px**

**Classe CSS** : `.hero-subtitle`
**Élément HTML** : `<p class="hero-subtitle">`

**Correspondance DS** :
- Desktop : **Cera Pro XL** · 20px / 140%
- Mobile : **Cera Pro L** · 16px / 140%

---

### `.hero-btn` - Bouton CTA dans la hero
**Design System utilisé :**
- **Police** : `Cera Pro` (`--font-primary`)
- **Font-size** : **16px**
- **Font-weight** : **500** (Medium)
- **Letter-spacing** : **0.5px**
- **Text-transform** : `uppercase`

**Classe CSS** : `.hero-btn`, `.hero-btn-primary`

---

## 📂 Categories Grid Section

### `.category-label` - Labels des catégories
**Design System utilisé :**
- **Police** : `Blacklist` (`--font-heading`)
- **Font-size** : `clamp(24px, 3vw, 38px)` (responsive)
  - Desktop : ~38px (entre H3 de 34px et H2 de 48px)
  - Mobile : 24px (correspond à `--font-size-h4`)
- **Font-weight** : **400** (Regular)
- **Letter-spacing** : **-0.02em**
- **Line-height** : Normal (hérité)

**Classe CSS** : `.category-label`
**Élément HTML** : `<h3 class="category-label">`

**Correspondance DS** :
- Desktop : Proche de **Blacklist H3** · 34px / 120%
- Mobile : **Blacklist H4** · 24px / 120%

**Catégories affichées** :
- Façades
- Plans de travail
- Poignées
- Étagères
- Meubles ouverts
- Dressings
- Salle de bain
- Rangement
- Ponts de lits
- Buffets

---

## 📊 Récapitulatif par composant

| Élément | Police | Taille | Weight | Letter-spacing | Text-transform |
|---------|--------|--------|--------|----------------|----------------|
| **Navbar** |
| `.nav-link` | Cera Pro | 14px | 500 | 0.5px | uppercase |
| `.dropdown-link` | Cera Pro | 16px / 18px | 400 | -0.5px | none |
| `.dropdown-section-title` | Blacklist | 24px (H4) | 500 | -0.5px | none |
| `.dropdown-media-title` | Blacklist | 34px (H3) | 400 | -0.5px | none |
| `.btn-cta` | Cera Pro | 14px | 500 | 0.5px | uppercase |
| **Hero** |
| `.hero-title` | Blacklist | clamp(48-84px) | 400 | -0.02em | none |
| `.hero-subtitle` | Cera Pro | clamp(16-20px) | 400 | -0.5px | none |
| `.hero-btn` | Cera Pro | 16px | 500 | 0.5px | uppercase |
| **Categories** |
| `.category-label` | Blacklist | clamp(24-38px) | 400 | -0.02em | none |

---

## 🎨 Correspondances avec les variables CSS du DS

### Variables utilisées directement

✅ **Utilisées :**
- `--font-primary` (Cera Pro) : Navigation, body, boutons
- `--font-heading` (Blacklist) : Titres, labels
- `--font-size-h3` (34px) : `.dropdown-media-title`
- `--font-size-h4` (24px) : `.dropdown-section-title`
- `--line-height-h3` (120%) : `.dropdown-media-title`
- `--line-height-h4` (120%) : `.dropdown-section-title`

### Variables non utilisées (valeurs hardcodées)

⚠️ **Non utilisées mais pourraient l'être :**
- `--font-size-h1` (64px) : `.hero-title` utilise clamp() à la place
- `--font-size-h2` (48px) : `.hero-title` mobile et `.category-label` mobile
- `--font-size-xl` (20px) : `.hero-subtitle` desktop utilise clamp()
- `--font-size-l` (16px) : `.hero-subtitle` mobile utilise clamp()
- `--line-height-h1` (90%) : `.hero-title` utilise 1.1 à la place
- `--line-height-body` (140%) : `.hero-subtitle` utilise 1.6 à la place

---

## 🔍 Analyse par section HTML

### Structure de la page

```html
<!-- Navbar -->
<nav class="navbar">
  <a class="nav-link">CUISINE</a>  <!-- Cera Pro 14px, weight 500 -->
  <!-- Dropdown avec .dropdown-link et .dropdown-section-title -->
  <a class="btn-cta">JE COMMENCE</a>  <!-- Cera Pro 14px, weight 500 -->
</nav>

<!-- Hero -->
<section class="hero">
  <h1 class="hero-title">...</h1>  <!-- Blacklist clamp(48-84px), weight 400 -->
  <p class="hero-subtitle">...</p>  <!-- Cera Pro clamp(16-20px), weight 400 -->
  <a class="hero-btn">Découvrir</a>  <!-- Cera Pro 16px, weight 500 -->
</section>

<!-- Categories Grid -->
<section class="categories-grid">
  <h3 class="category-label">Façades</h3>  <!-- Blacklist clamp(24-38px), weight 400 -->
</section>
```

---

## 💡 Recommandations

### 1. Harmonisation des tailles
- Le `.hero-title` pourrait utiliser `var(--font-size-h1)` comme base au lieu de clamp() hardcodé
- Le `.hero-subtitle` pourrait utiliser `var(--font-size-xl)` directement

### 2. Variables manquantes
- Créer `--font-size-nav-link: 14px` pour éviter le hardcoding
- Créer `--letter-spacing-nav-link: 0.5px` pour la navigation

### 3. Cohérence
- Tous les éléments utilisent bien les polices du DS (Cera Pro / Blacklist) ✅
- Les weights sont cohérents (400 Regular, 500 Medium) ✅
- Les letter-spacings suivent les patterns du DS ✅

---

## 📝 Notes importantes

1. **Responsive** : La homepage utilise beaucoup de `clamp()` pour les tailles responsive, ce qui est une bonne pratique mais ne correspond pas toujours exactement aux variables du DS.

2. **Hero Title** : Plus grand que le H1 standard (84px vs 64px) car il est le titre principal de la page d'accueil.

3. **Categories Labels** : Utilisent une taille responsive intermédiaire (24-38px) entre H4 (24px) et H3 (34px).

4. **Navigation** : Tous les liens de navigation suivent strictement le pattern : Cera Pro 14px, weight 500, uppercase, letter-spacing 0.5px.

---

*Document généré le 1er décembre 2025*




