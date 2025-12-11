# 🔍 Audit des valeurs hardcodées - home.html

## 📋 Fichiers analysés

1. `home.html` (structure HTML)
2. `navbar.css` (déjà migré vers DS ✅)
3. `hero.css` (beaucoup de hardcodé ❌)
4. Section Categories Grid dans `hero.css`

---

## ❌ HERO.CSS - Valeurs hardcodées à migrer

### Variables locales (devraient utiliser le DS global)

**Variables définies dans `hero.css:root` qui ne sont pas dans le DS :**
```css
--hero-teal-dark: #2d5052;
--hero-teal-medium: #4a7c80;
--hero-teal-light: #6b9fa5;
--hero-wood: #d4a574;
--hero-cream: #f5f1eb;
--hero-white: #ffffff;
--hero-overlay: rgba(45, 80, 82, 0.3);
```

**Variables de tailles locales (devraient utiliser le DS) :**
```css
--text-xl: 24px;  /* Devrait être --font-size-xl du DS ? */
--text-l: 20px;   /* Devrait être --font-size-xl du DS */
--text-m: 16px;   /* Devrait être --font-size-l du DS */
--text-s: 14px;   /* Devrait être --font-size-m du DS */
--text-xs: 12px;  /* Devrait être --font-size-s du DS */
```

### Tailles de police hardcodées

#### `.hero-title`
- ❌ `font-size: clamp(48px, 7vw, 84px);` 
  - Devrait utiliser : `clamp(var(--font-size-h2), 7vw, var(--font-size-h1))` ou créer variable responsive
  - Min : 48px = H2
  - Max : 84px (plus grand que H1 qui est 64px)

#### `.hero-subtitle`
- ❌ `font-size: clamp(var(--text-m), 2vw, var(--text-l));`
  - Utilise variables locales au lieu du DS
  - Devrait utiliser : `clamp(var(--font-size-l), 2vw, var(--font-size-xl))`

#### `.hero-btn`
- ❌ `font-size: 16px;`
  - Devrait utiliser : `var(--font-size-l)` ou `var(--font-size-alt-1)`
- ❌ `letter-spacing: 0.5px;`
  - Devrait utiliser : `var(--letter-spacing-alt)` (0.05em) si c'est un style Alt, ou valeur appropriée

#### `.category-label`
- ❌ `font-size: clamp(24px, 3vw, 38px);`
  - Min : 24px = H4
  - Max : 38px (entre H3 34px et H2 48px)
  - Devrait utiliser variables du DS

### Letter-spacing hardcodé

- ❌ `letter-spacing: -0.5px;` (multiples occurrences)
  - Dans `.hero .text-xl`, `.text-l`, `.text-m`, `.text-s`, `.text-xs`
  - Dans `.hero-subtitle`
  - Devrait utiliser variables du DS ou supprimer si pas dans le DS

- ❌ `letter-spacing: 0.5px;` dans `.hero-btn`
  - Devrait utiliser variable du DS

### Couleurs hardcodées

- ❌ `rgba(255, 255, 255, 0.95)` → devrait être `var(--color-white)` avec opacity
- ❌ `rgba(45, 80, 82, 0.4)` → variables hero locales
- ❌ `rgba(255, 255, 255, 0.2)` → devrait utiliser variables
- ❌ `rgba(0, 0, 0, 0.05)` → devrait utiliser variables
- ❌ `rgba(0, 0, 0, 0.2)` → devrait utiliser variables
- ❌ `rgba(255, 255, 255, 0.5)` → devrait utiliser variables
- ❌ `rgba(255, 255, 255, 0.1)` → devrait utiliser variables

### Espacements hardcodés

- ❌ `margin-bottom: 32px;` → `var(--spacing-xl)` (32px)
- ❌ `margin: 0 auto 48px;` → `var(--spacing-3xl)` (48px)
- ❌ `gap: 20px;` → pas de variable correspondante (créer ou utiliser spacing existant)
- ❌ `gap: 12px;` → `var(--spacing-sm)` (12px)
- ❌ `padding: 16px 32px;` → utiliser variables spacing
- ❌ `padding: 0 60px;` → pas de variable (créer ou utiliser container-padding)
- ❌ `padding-top: 80px;` → `var(--navbar-height)` ou variable spécifique
- ❌ `bottom: 40px;` → `var(--spacing-2xl)` (40px)
- ❌ `bottom: 30px;` → pas de variable correspondante

### Tailles hardcodées

- ❌ `border-radius: 4px;` → `var(--radius-sm)` (4px)
- ❌ `width: 48px;` / `height: 48px;` → peut rester hardcodé (icône)
- ❌ `width: 40px;` / `height: 40px;` → peut rester hardcodé (icône responsive)
- ❌ `min-height: 600px;` → peut rester (spécifique hero)
- ❌ `max-width: 1400px;` → peut rester ou créer variable container-large
- ❌ `max-width: 90%;` → OK (pourcentage)
- ❌ `max-width: 560px;` → peut rester (spécifique design)

### Transitions hardcodées

- ❌ `transition: all 0.3s ease;` → `var(--transition-base)` (0.3s ease)
- ❌ `transition: background-color 0.3s ease;` → `var(--transition-base)`
- ❌ `transition: transform 0.3s ease;` → `var(--transition-base)`
- ❌ `transition: opacity 0.3s ease;` → `var(--transition-base)`
- ❌ `transition: transform 1.2s cubic-bezier(...)` → peut rester (animation spécifique)

---

## 📊 Résumé par catégorie

### Typographie
- ❌ **6 tailles hardcodées** (clamp avec valeurs fixes)
- ❌ **7+ letter-spacing hardcodés** (-0.5px, 0.5px)
- ❌ **Variables locales** au lieu du DS global

### Couleurs
- ❌ **8+ rgba hardcodées**
- ❌ **Variables hero locales** non standardisées

### Espacements
- ❌ **10+ espacements hardcodés** (px au lieu de variables)

### Autres
- ❌ **4+ transitions hardcodées**
- ❌ **2+ border-radius hardcodés**

---

## ✅ Priorités de migration

### Priorité 1 - Typographie
1. Migrer `.hero-title` vers variables DS (H1/H2)
2. Migrer `.hero-subtitle` vers variables DS (L/XL)
3. Migrer `.hero-btn` vers variables DS (Alt 1 ou L)
4. Migrer `.category-label` vers variables DS (H3/H4)

### Priorité 2 - Variables locales → DS global
1. Supprimer variables locales `--text-*` et utiliser DS
2. Intégrer variables hero dans le DS ou utiliser palette existante

### Priorité 3 - Espacements et transitions
1. Remplacer tous les espacements par variables
2. Remplacer transitions par variables

### Priorité 4 - Couleurs
1. Utiliser variables de couleurs du DS
2. Créer variables pour opacités si nécessaire

---

*Audit effectué le 1er décembre 2025*




