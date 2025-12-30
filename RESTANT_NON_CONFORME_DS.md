# 🔴 Éléments restants qui ne respectent pas le Design System

**Date** : 1er décembre 2025  
**Statut global** : ~40% conforme au DS, ~60% à migrer

---

## 📋 Résumé exécutif

### Fichiers principaux à corriger

| Fichier | Score DS | Problèmes principaux |
|---------|----------|---------------------|
| `hero.css` | ❌ **0%** | Variables locales, transitions hardcodées, espacements hardcodés |
| `navbar.css` | ⚠️ **33%** | Quelques transitions/padding hardcodés, font-size dropdown-media |
| `experiments/media/styles.css` | ⚠️ **40%** | Nombreuses valeurs hardcodées |

---

## 🔴 HERO.CSS - Problèmes majeurs

### 1. Variables locales au lieu du DS global

**❌ Problème** : Variables définies localement dans `hero.css:root` :

```css
/* ❌ À SUPPRIMER - Utiliser le DS global */
--text-xl: 24px;  /* Devrait être --font-size-xl (20px) du DS */
--text-l: 20px;   /* Devrait être --font-size-xl (20px) du DS */
--text-m: 16px;   /* Devrait être --font-size-l (16px) du DS */
--text-s: 14px;   /* Devrait être --font-size-m (14px) du DS */
--text-xs: 12px;  /* Devrait être --font-size-s (12px) du DS */
```

**✅ Solution** : Supprimer ces variables et utiliser directement les variables du DS.

---

### 2. Variables couleurs hero locales

**❌ Problème** : Variables couleurs définies localement :

```css
/* ❌ À ÉVALUER - Intégrer dans DS ou utiliser palette existante */
--hero-teal-dark: #2d5052;
--hero-teal-medium: #4a7c80;
--hero-teal-light: #6b9fa5;
--hero-wood: #d4a574;
--hero-cream: #f5f1eb;
--hero-white: #ffffff;  /* Devrait être --color-white */
--hero-overlay: rgba(45, 80, 82, 0.3);
```

**✅ Solution** : 
- `--hero-white` → utiliser `var(--color-white)`
- Les autres couleurs : soit intégrer dans `variables.css`, soit utiliser la palette produits si applicable

---

### 3. Transitions hardcodées

**❌ Problèmes** :

```css
/* ❌ Ligne 85 */
transition: background-color 0.3s ease;  /* Devrait être var(--transition-base) */

/* ❌ Ligne 287 */
transition: all 0.3s ease;  /* Devrait être var(--transition-base) */

/* ❌ Ligne 329 */
transition: transform 0.3s ease;  /* Devrait être var(--transition-base) */

/* ❌ Ligne 463 */
transition: opacity 0.3s ease;  /* Devrait être var(--transition-base) */
```

**✅ Solution** : Remplacer par `var(--transition-base)` (0.3s ease).

**Note** : La transition ligne 440 (`transition: transform 1.2s cubic-bezier(...)`) peut rester car c'est une animation spécifique.

---

### 4. Border-radius hardcodé

**❌ Problème** :

```css
/* ❌ Ligne 286 */
border-radius: 4px;  /* Devrait être var(--radius-sm) */
```

**✅ Solution** : Remplacer par `var(--radius-sm)`.

---

### 5. Espacements hardcodés

**❌ Problèmes** :

```css
/* ❌ Ligne 176 */
padding-top: 80px;  /* Devrait être var(--navbar-height) ou variable spacing */

/* ❌ Ligne 183 */
padding: 0 60px;  /* Devrait utiliser var(--container-padding) ou créer variable */

/* ❌ Ligne 201 */
margin-bottom: 32px;  /* Devrait être var(--spacing-xl) */

/* ❌ Ligne 239 */
margin: 0 auto 48px;  /* Devrait être var(--spacing-3xl) */

/* ❌ Ligne 265 */
gap: 20px;  /* Pas de variable correspondante - créer ou utiliser spacing existant */

/* ❌ Ligne 728 (navbar.css mais dans hero.css) */
padding: 20px 18px;  /* Devrait utiliser variables spacing */
```

**✅ Solution** : Remplacer par les variables du DS :
- `32px` → `var(--spacing-xl)`
- `48px` → `var(--spacing-3xl)`
- `80px` → `var(--navbar-height)` ou créer variable si nécessaire
- `20px` → créer `--spacing-xl-s: 20px` ou utiliser `var(--spacing-lg)` (24px)

---

### 6. Classes utilitaires `.text-xl`, `.text-l`, etc.

**❌ Problème** : Classes définies dans `hero.css` utilisent les variables locales :

```css
/* ❌ Lignes 34-77 */
.hero .text-xl {
  font-size: var(--text-xl);  /* Utilise variable locale */
  /* ... */
}
```

**✅ Solution** : 
- Supprimer ces classes OU
- Les modifier pour utiliser les variables du DS global

---

## 🟡 NAVBAR.CSS - Problèmes mineurs

### 1. Transitions hardcodées

**❌ Problèmes** :

```css
/* ❌ Ligne 284 */
transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
/* Devrait être var(--transition-fast) */

/* ❌ Ligne 413 */
transition: opacity 0.3s ease, visibility 0.3s ease;
/* Devrait être var(--transition-base) */
```

**✅ Solution** : Remplacer par les variables du DS.

---

### 2. Padding hardcodé

**❌ Problèmes** :

```css
/* ❌ Ligne 67 */
padding: 20px;  /* Devrait utiliser variable spacing */

/* ❌ Ligne 728 */
padding: 20px 18px;  /* Devrait utiliser variables spacing */
```

**✅ Solution** : Utiliser `var(--spacing-lg)` (24px) ou créer variable pour 20px.

---

### 3. Font-size hardcodé dans dropdown-media-title

**❌ Problème** :

```css
/* ❌ Ligne 758 */
.dropdown-media-title {
  font-size: 36px !important;  /* Pas de variable DS pour 36px */
}
```

**✅ Solution** : 
- Utiliser `var(--font-size-h3)` (42px) OU
- Utiliser `var(--font-size-h2)` (48px) OU
- Créer variable si 36px est spécifique au design

**Note** : Le DS définit H3 à 42px, pas 36px. Vérifier avec le design si 36px est intentionnel.

---

### 4. Font-size hardcodé dans règles de secours

**❌ Problème** : Plusieurs règles utilisent `font-size: 16px !important` pour forcer l'affichage :

```css
/* ❌ Lignes 357, 425, 435, 442, 460, 473, 619 */
font-size: 16px !important;
```

**✅ Solution** : Remplacer par `var(--font-size-l) !important`.

---

## 🟡 EXPERIMENTS/MEDIA/STYLES.CSS - Problèmes

### 1. Font-size hardcodés

**❌ Problèmes** :

```css
/* ❌ Ligne 111 */
font-size: 72px !important;  /* Pas de variable DS - entre H1 (80px) et H2 (48px) */

/* ❌ Ligne 156 */
font-size: 14px;  /* Devrait être var(--font-size-m) */

/* ❌ Ligne 285 */
font-size: 40px;  /* Pas de variable DS - entre H3 (42px) et H2 (48px) */

/* ❌ Lignes 366, 391, 405, 417, 429, 437 */
font-size: 20px, 18px, 12px, 16px, 16px, 11px;  /* Devraient utiliser variables DS */
```

**✅ Solution** : 
- `14px` → `var(--font-size-m)`
- `16px` → `var(--font-size-l)`
- `12px` → `var(--font-size-s)`
- `72px`, `40px`, `18px`, `20px`, `11px` → Décider quelle variable DS utiliser ou créer variables si nécessaire

---

### 2. Padding hardcodé

**❌ Problèmes** :

```css
/* ❌ Ligne 105 */
padding: 60px;  /* Devrait utiliser variable spacing */

/* ❌ Ligne 143 */
padding: 32px 0;  /* Devrait être var(--spacing-xl) */

/* ❌ Ligne 163 */
padding: 8px 0;  /* Devrait être var(--spacing-xs) */

/* ❌ Ligne 273 */
padding: 24px;  /* Devrait être var(--spacing-lg) */
```

**✅ Solution** : Remplacer par les variables du DS.

---

### 3. Transitions hardcodées

**❌ Problèmes** :

```css
/* ❌ Ligne 217 */
transition: opacity 0.6s ease-out, transform 0.6s ease-out;
/* Devrait être var(--transition-slow) ou créer variable */

/* ❌ Ligne 261 */
transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
/* Animation spécifique - peut rester */

/* ❌ Ligne 319 */
transition: background-color 0.3s ease, border-color 0.3s ease;
/* Devrait être var(--transition-base) */
```

**✅ Solution** : Remplacer par les variables du DS.

---

## 📊 Récapitulatif par catégorie

### Typographie

| Fichier | Éléments | Statut |
|---------|----------|--------|
| `hero.css` | Variables locales `--text-*` | ❌ À supprimer |
| `navbar.css` | `font-size: 16px` hardcodé | ⚠️ À remplacer |
| `navbar.css` | `font-size: 36px` dropdown-media-title | ⚠️ À vérifier |
| `experiments/media/styles.css` | Multiples font-size hardcodés | ❌ À remplacer |

### Couleurs

| Fichier | Éléments | Statut |
|---------|----------|--------|
| `hero.css` | Variables locales `--hero-*` | ⚠️ À intégrer dans DS ou remplacer |

### Espacements

| Fichier | Éléments | Statut |
|---------|----------|--------|
| `hero.css` | Padding/margin hardcodés (32px, 48px, 80px, 60px, 20px) | ❌ À remplacer |
| `navbar.css` | Padding hardcodé (20px, 18px) | ⚠️ À remplacer |
| `experiments/media/styles.css` | Padding hardcodé (60px, 32px, 24px, 8px) | ❌ À remplacer |

### Transitions

| Fichier | Éléments | Statut |
|---------|----------|--------|
| `hero.css` | `0.3s ease` hardcodé (4 occurrences) | ❌ À remplacer |
| `navbar.css` | `0.2s ease`, `0.3s ease` hardcodés | ⚠️ À remplacer |
| `experiments/media/styles.css` | Transitions hardcodées | ⚠️ À remplacer |

### Border-radius

| Fichier | Éléments | Statut |
|---------|----------|--------|
| `hero.css` | `border-radius: 4px` | ❌ À remplacer |

---

## 🎯 Plan d'action priorisé

### Priorité 1 - Quick wins (1-2h)

1. **hero.css** :
   - [ ] Remplacer `border-radius: 4px` → `var(--radius-sm)`
   - [ ] Remplacer transitions `0.3s ease` → `var(--transition-base)`
   - [ ] Remplacer `margin-bottom: 32px` → `var(--spacing-xl)`
   - [ ] Remplacer `margin: 0 auto 48px` → `var(--spacing-3xl)`

2. **navbar.css** :
   - [ ] Remplacer `font-size: 16px !important` → `var(--font-size-l) !important`
   - [ ] Remplacer transitions hardcodées par variables DS

### Priorité 2 - Variables locales → DS global (2-3h)

1. **hero.css** :
   - [ ] Supprimer variables locales `--text-*` et utiliser variables DS
   - [ ] Supprimer/modifier classes `.text-xl`, `.text-l`, etc.
   - [ ] Remplacer `--hero-white` → `var(--color-white)`
   - [ ] Évaluer intégration autres couleurs hero dans DS

### Priorité 3 - Espacements (1-2h)

1. **hero.css** :
   - [ ] Remplacer padding/margin hardcodés par variables spacing
   - [ ] Créer variable pour `20px` si nécessaire (`--spacing-xl-s`)

2. **navbar.css** :
   - [ ] Remplacer padding hardcodés par variables spacing

3. **experiments/media/styles.css** :
   - [ ] Remplacer padding hardcodés par variables spacing

### Priorité 4 - Tailles custom (1h)

1. **navbar.css** :
   - [ ] Décider pour `36px` dropdown-media-title : utiliser H3 (42px) ou créer variable

2. **experiments/media/styles.css** :
   - [ ] Décider pour `72px`, `40px`, `18px`, `20px`, `11px` : utiliser variables DS ou créer variables

---

## ✅ Fichiers déjà conformes au DS

- ✅ `experiments/homepage/styles.css` - 100% conforme
- ✅ `experiments/category/styles.css` - 100% conforme
- ✅ `shared/styles/reset.css` - 100% conforme
- ✅ `shared/styles/variables.css` - 100% conforme

---

## 📝 Notes importantes

1. **Variables locales hero.css** : Les variables `--text-*` créent une confusion et ne respectent pas le DS. Elles doivent être supprimées.

2. **Tailles custom** : Certaines tailles (36px, 40px, 72px) ne correspondent pas exactement au DS. Il faut décider :
   - Utiliser la valeur DS la plus proche
   - Créer une variable spécifique si c'est intentionnel

3. **Couleurs hero** : Les couleurs teal/wood/cream sont spécifiques à la hero. Options :
   - Les intégrer dans `variables.css` si elles sont réutilisables
   - Les garder locales mais documenter pourquoi

4. **Espacements** : Certains espacements (20px, 60px) n'ont pas de variable correspondante. Options :
   - Utiliser la variable la plus proche
   - Créer une variable si c'est récurrent

---

*Document généré le 1er décembre 2025*  
*Prochaine revue : Après migration complète*







