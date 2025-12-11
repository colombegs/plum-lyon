# 📐 Récapitulatif du Design System - Plum Living

## 🎨 Polices de caractères

### Police principale (Body & Contenu)
- **Cera Pro** (`--font-primary`)
  - Utilisation : Contenu texte, paragraphes, body, navigation
  - Poids disponibles : 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
  - Fallback : `sans-serif`

### Police des titres
- **Blacklist** (`--font-heading`)
  - Utilisation : Titres (h1, h2, h3, h4, h5), éléments visuels
  - Poids disponibles : 400 (Regular), 500 (Medium), 800 (ExtraBold)
  - Variantes : Regular, Bold, ExtraBold, SemiBold, Italic
  - Fallback : `sans-serif`

---

## 📏 Système de typographie

### Body - Cera Pro (Regular 400)

| Taille | Variable CSS | Font-size | Line-height | Usage |
|--------|-------------|-----------|-------------|-------|
| **XL** | `--font-size-xl` | **20px** | **140%** | Grand texte de corps |
| **L** | `--font-size-l` | **16px** | **140%** | Texte de corps standard |
| **M** | `--font-size-m` | **14px** | **140%** | Texte moyen |
| **S** | `--font-size-s` | **12px** | **140%** | Petit texte |
| **XS** | `--font-size-xs` | **10px** | **140%** | Très petit texte |

**Caractéristiques Cera Pro :**
- Letter-spacing : `-0.5px` (généralement)
- Font-weight : `400` (Regular) ou `500` (Medium) pour les liens/navigation
- Font-family : `'Cera Pro', sans-serif`

### Body - Cera Pro (Bold)

Les mêmes tailles s'appliquent avec `font-weight: 700` :
- **Cera Pro XL Bold** · 20px / 140%
- **Cera Pro L Bold** · 16px / 140%
- **Cera Pro M Bold** · 14px / 140%
- **Cera Pro S Bold** · 12px / 140%
- **Cera Pro XS Bold** · 10px / 140%

### Styles alternatifs (Cera Pro)

**Important** : Les styles Alt 1, 2, 3 sont des styles complets du Design System. Quand on utilise un style Alt, on doit utiliser **TOUTES** ses propriétés (font-size, line-height, ET letter-spacing) car elles font partie intégrante du style.

| Style | Font-size | Line-height | Letter-spacing | Usage |
|-------|-----------|-------------|----------------|-------|
| **Alt 1** | **16px** (`--font-size-alt-1`) | **140%** (`--line-height-alt`) | **5%** (`--letter-spacing-alt`) | Style alternatif moyen |
| **Alt 2** | **14px** (`--font-size-alt-2`) | **140%** (`--line-height-alt`) | **5%** (`--letter-spacing-alt`) | Style alternatif petit |
| **Alt 3** | **12px** (`--font-size-alt-3`) | **140%** (`--line-height-alt`) | **5%** (`--letter-spacing-alt`) | Style alternatif très petit |

**Caractéristiques complètes des styles Alt :**
- Font-family : `'Cera Pro', sans-serif`
- Font-weight : `400` (Regular) ou `500` (Medium selon usage)
- Line-height : `140%` (variable `--line-height-alt`)
- **Letter-spacing : `5%` (variable `--letter-spacing-alt`) - FAIT PARTIE INTÉGRANTE DU DS**

---

### Headings - Blacklist

| Heading | Variable CSS | Font-size | Line-height | Letter-spacing | Usage |
|---------|-------------|-----------|-------------|----------------|-------|
| **H1** | `--font-size-h1` | **80px** | **90%** | `-0.02em` à `-0.3px` | Titre principal |
| **H2** | `--font-size-h2` | **48px** | **100%** | `-0.3px` à `-0.5px` | Sous-titre principal |
| **H3** | `--font-size-h3` | **42px** | **120%** | `-0.2px` à `-0.5px` | Titre de section |
| **H4** | `--font-size-h4` | **24px** | **120%** | `-0.5px` | Titre de sous-section |
| **H5** | `--font-size-h5` | **20px** | **120%** | - | Petit titre |

**Caractéristiques Blacklist :**
- Font-weight : `400` (Regular) par défaut
- Font-family : `'Blacklist', sans-serif`
- Letter-spacing : Généralement négatif (`-0.02em` à `-0.5px`)

### Headings - Variantes Italic

Les mêmes tailles s'appliquent avec le style italic :
- **Blacklist H1 Italic** · 80px / 90%
- **Blacklist H2 Italic** · 48px / 100%
- **Blacklist H3 Italic** · 42px / 120%
- **Blacklist H4 Italic** · 24px / 120%

---

## 🎯 Cas d'usage spécifiques

### Navigation (.nav-link)
- Font-family : `'Cera Pro', sans-serif` (`var(--font-primary)`)
- Font-size : **14px** (`var(--font-size-alt-2)`)
- Font-weight : **500** (Medium)
- Line-height : **140%** (`var(--line-height-alt)`)
- Letter-spacing : **5%** (`var(--letter-spacing-alt)`) ← **FAIT PARTIE DU DS Alt 2**
- Text-transform : `uppercase`

**Note** : Utilise le style **Alt 2 complet** du Design System.

### Boutons CTA (.hero-btn, .btn-cta)
- Font-family : `'Cera Pro', sans-serif` (`var(--font-primary)`)
- Font-size : **14px** (`var(--font-size-alt-2)`) ou **16px** (`var(--font-size-alt-1)`) selon contexte
- Font-weight : **500** (Medium)
- Line-height : **140%** (`var(--line-height-alt)`)
- Letter-spacing : **5%** (`var(--letter-spacing-alt)`) ← **FAIT PARTIE DU DS Alt 1/2**
- Text-transform : `uppercase`

**Note** : 
- `.btn-cta` utilise **Alt 2 complet** (14px)
- `.hero-btn` utilise **Alt 1 complet** (16px)

### Hero Title
- Font-family : `'Blacklist', sans-serif` (`var(--font-heading)`)
- Font-size : **80px** (`var(--font-size-h1)`) - Desktop
- Font-size : **54px** (`var(--font-size-h2)`) - Tablette
- Font-size : **42px** (`var(--font-size-h3)`) - Mobile
- Font-weight : **400** (Regular)
- Line-height : **90%** (`var(--line-height-h1)`) - Desktop
- Letter-spacing : **-0.02em**

### Hero Subtitle
- Font-family : `'Cera Pro', sans-serif` (`var(--font-primary)`)
- Font-size : **20px** (`var(--font-size-xl)`) - Desktop
- Font-size : **16px** (`var(--font-size-l)`) - Tablette/Mobile
- Font-weight : **400** (Regular)
- Line-height : **140%** (`var(--line-height-body)`)
- Letter-spacing : **-0.5px**

### Dropdown Menu Links (.dropdown-link)
- Font-family : `'Cera Pro', sans-serif` (`var(--font-primary)`)
- Font-size : **16px** (`var(--font-size-l)`)
- Font-weight : **400** (Regular)
- Line-height : **140%** (`var(--line-height-body)`)
- Letter-spacing : **-0.5px`

**Note** : Uniformisé à 16px (L) pour toutes les colonnes.

### Dropdown Section Titles (.dropdown-section-title)
- Font-family : `'Blacklist', sans-serif`
- Font-size : **24px** (`--font-size-h4`)
- Font-weight : **500** (Medium)
- Line-height : **120%**
- Letter-spacing : **-0.5px**

### Article Titles (Media Page)
- Font-family : `'Blacklist', sans-serif`
- Font-size : **40px**
- Font-weight : **400** (Regular)
- Line-height : **1.05**
- Letter-spacing : **-0.2px**

---

## 🎨 Palette de couleurs

### Neutres (Basics)
- `--color-asphalte` : **#222** (Gris très foncé/charbon)
- `--color-black` : **#000** (Noir)
- `--color-grey-1` : **#666** (Gris moyen)
- `--color-grey-2` : **#999** (Gris clair)
- `--color-grey-3` : **#ccc** (Gris très clair)
- `--color-grey-4` : **#f5f5f5** (Gris presque blanc)
- `--color-blanc-casse` : **#fafafa** (Blanc cassé/crème)
- `--color-white` : **#ffffff** (Blanc pur)

### Couleurs fonctionnelles
- `--color-success` : **#8dc572** (Vert teal/vert foncé)
- `--color-error` : **#be6464** (Rouge corail/rouge-orange)
- `--color-warning` : **#f0ad4e** (Jaune vif/ambre)
- `--color-info` : **#337ab7** (Bleu)

---

## 📐 Espacements (Spacing System)

| Taille | Variable CSS | Valeur | Usage |
|--------|-------------|--------|-------|
| **XS** | `--spacing-xs` | **8px** | Espacement très petit |
| **SM** | `--spacing-sm` | **12px** | Espacement petit |
| **MD** | `--spacing-md` | **16px** | Espacement moyen |
| **LG** | `--spacing-lg` | **24px** | Espacement grand |
| **XL** | `--spacing-xl` | **32px** | Espacement très grand |
| **2XL** | `--spacing-2xl` | **40px** | Espacement extra grand |
| **3XL** | `--spacing-3xl` | **48px** | Espacement double extra grand |
| **4XL** | `--spacing-4xl` | **64px** | Espacement maximum |

---

## 🏗️ Layout

### Container
- `--container-max-width` : **1200px**
- `--container-padding` : **40px**

### Navbar
- `--navbar-height` : **110px** (desktop) / **80px** (mobile)

### Border Radius
- `--radius-sm` : **4px**
- `--radius-md` : **8px**
- `--radius-lg` : **16px**
- `--radius-full` : **9999px** (boutons très arrondis)

---

## ⏱️ Transitions

- `--transition-fast` : **0.2s ease**
- `--transition-base` : **0.3s ease**
- `--transition-slow` : **0.5s ease**

---

## 🔘 Boutons - Design System

### Variables de boutons

Le Design System définit des variables pour les styles de boutons :

#### Primary Button (Fill avec couleur)
- `--btn-primary-bg` : `var(--color-asphalte)`
- `--btn-primary-color` : `var(--color-white)`
- `--btn-primary-border` : `var(--color-asphalte)`

#### Secondary Button (No fill, stroke)
- `--btn-secondary-bg` : `transparent`
- `--btn-secondary-color` : `var(--color-white)`
- `--btn-secondary-border` : `var(--color-white)`

#### Ghost Button (No fill ni stroke, juste texte)
- `--btn-ghost-bg` : `transparent`
- `--btn-ghost-color` : `var(--color-white)`
- `--btn-ghost-border` : `transparent`

#### Variantes dark (pour fond clair)
- `--btn-primary-dark-bg` : `var(--color-asphalte)`
- `--btn-primary-dark-color` : `var(--color-white)`
- `--btn-primary-dark-border` : `var(--color-asphalte)`
- `--btn-secondary-dark-bg` : `transparent`
- `--btn-secondary-dark-color` : `var(--color-asphalte)`
- `--btn-secondary-dark-border` : `var(--color-asphalte)`
- `--btn-ghost-dark-bg` : `transparent`
- `--btn-ghost-dark-color` : `var(--color-asphalte)`
- `--btn-ghost-dark-border` : `transparent`

---

## 📱 Responsive Breakpoints

Bien que non définis dans les variables CSS, les breakpoints utilisés sont :
- **Mobile** : `max-width: 768px`
- **Tablette** : `max-width: 1024px`
- **Petits écrans** : `max-width: 480px`

---

## 📝 Exemples de code

### Titre H1
```css
h1 {
  font-family: var(--font-heading, 'Blacklist', sans-serif);
  font-size: var(--font-size-h1, 80px);
  font-weight: 400;
  line-height: var(--line-height-h1, 90%);
  letter-spacing: -0.02em;
}
```

### Body texte standard
```css
p {
  font-family: var(--font-primary, 'Cera Pro', sans-serif);
  font-size: var(--font-size-l, 16px);
  font-weight: 400;
  line-height: var(--line-height-body, 140%);
  letter-spacing: -0.5px;
}
```

### Style alternatif Alt 1 (complet)
**Note** : Le letter-spacing de 5% fait partie intégrante du DS Alt 1, 2, 3. Il doit toujours être utilisé avec ces styles.

```css
.text-alt-1 {
  font-family: var(--font-primary, 'Cera Pro', sans-serif);
  font-size: var(--font-size-alt-1, 16px);
  font-weight: 400; /* ou 500 (Medium) selon usage */
  line-height: var(--line-height-alt, 140%);
  letter-spacing: var(--letter-spacing-alt, 5%); /* FAIT PARTIE DU DS Alt 1, 2, 3 */
}
```

**Exemple : Navigation utilisant Alt 2 (complet)**
```css
.nav-link {
  font-family: var(--font-primary, 'Cera Pro', sans-serif);
  font-size: var(--font-size-alt-2); /* 14px */
  line-height: var(--line-height-alt); /* 140% */
  letter-spacing: var(--letter-spacing-alt); /* 5% - FAIT PARTIE DU DS Alt 2 */
  font-weight: 500;
  text-transform: uppercase;
}
```

### Navigation link (Alt 2 complet)
```css
.nav-link {
  font-family: var(--font-primary, 'Cera Pro', sans-serif);
  font-size: var(--font-size-alt-2); /* 14px */
  line-height: var(--line-height-alt); /* 140% */
  letter-spacing: var(--letter-spacing-alt); /* 5% - FAIT PARTIE DU DS Alt 2 */
  font-weight: 500;
  text-transform: uppercase;
}
```

### Hero Button (Alt 1 complet)
```css
.hero-btn {
  font-family: var(--font-primary, 'Cera Pro', sans-serif);
  font-size: var(--font-size-alt-1); /* 16px */
  line-height: var(--line-height-alt); /* 140% */
  letter-spacing: var(--letter-spacing-alt); /* 5% - FAIT PARTIE DU DS Alt 1 */
  font-weight: 500;
  text-transform: uppercase;
}
```

### Hero Title (responsive)
```css
.hero-title {
  font-family: var(--font-heading, 'Blacklist', sans-serif);
  font-size: var(--font-size-h1); /* 80px - Desktop */
  line-height: var(--line-height-h1); /* 90% */
  font-weight: 400;
  letter-spacing: -0.02em;
}

/* Tablette */
@media (max-width: 1024px) {
  .hero-title {
    font-size: var(--font-size-h2); /* 54px */
  }
}

/* Mobile */
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-h3); /* 42px */
  }
}
```

---

## 📚 Fichiers de référence

- **Variables CSS** : `/shared/styles/variables.css`
- **Documentation complète** : `/DESIGN_SYSTEM_ANALYSIS.md`
- **Styles Navbar** : `/navbar.css`
- **Styles Hero** : `/hero.css`

---

## 📝 Changelog - Design System

### 1er décembre 2025

#### ✅ Ajouts
- **Variables de boutons** : Ajout des variables pour Primary, Secondary et Ghost buttons avec variantes dark
- **Documentation styles Alt** : Clarification importante que les styles Alt 1, 2, 3 sont des styles complets (incluant letter-spacing 5%)

#### ✅ Migrations complétées
- **Navbar** : Migration 100% vers DS (Alt 2 pour nav-link, L pour dropdown-link)
- **Hero Section** : Migration 100% vers DS (H1/H2/H3 responsive pour title, XL/L pour subtitle, Alt 1 pour button)
- **Hero Responsive** : Tous les breakpoints utilisent maintenant les variables du DS

#### ✅ Corrections
- **Conflits CSS** : Résolution des conflits entre `shared/components/navbar.css` et `navbar.css`
- **Letter-spacing** : Correction de l'utilisation du letter-spacing Alt (5% au lieu de 0.5px)

#### 📚 Documentation
- Création de `PROGRES_HIER.md` - Synthèse complète des progrès du 1er décembre 2025
- Mise à jour de `RECAP_DESIGN_SYSTEM.md` avec les changements récents

---

*Récapitulatif généré le 1er décembre 2025*  
*Dernière mise à jour : 2 décembre 2025*

