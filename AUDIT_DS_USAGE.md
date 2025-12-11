# 🔍 Audit d'utilisation du Design System - Plum Living

## ❌ Éléments CUSTOM (n'utilisent PAS les variables du DS)

### Navbar (`navbar.css`)

#### ❌ `.nav-link` - Liens de navigation
```css
font-size: 14px !important;  /* HARDCODÉ - devrait utiliser --font-size-m (14px) mais pas de variable */
```
- **Utilise** : Police Cera Pro ✅
- **N'utilise PAS** : Variable CSS ❌
- **DS attendu** : Devrait utiliser `var(--font-size-m)` qui vaut 14px

#### ❌ `.dropdown-link` - Liens dropdown
```css
font-size: 16px;  /* HARDCODÉ - devrait utiliser --font-size-l (16px) */
```
- **Utilise** : Police Cera Pro ✅
- **N'utilise PAS** : Variable CSS ❌
- **DS attendu** : Devrait utiliser `var(--font-size-l)` qui vaut 16px

#### ❌ `.dropdown-link` (colonnes spéciales)
```css
font-size: 18px !important;  /* HARDCODÉ - pas de variable DS pour 18px */
```
- **Problème** : 18px n'existe pas dans le DS
- **DS attendu** : Soit 16px (`--font-size-l`), soit créer une variable

#### ✅ `.dropdown-section-title` - Titres sections dropdown
```css
font-size: var(--font-size-h4, 24px) !important;  /* ✅ UTILISE LA VARIABLE */
line-height: var(--line-height-h4, 120%) !important;  /* ✅ UTILISE LA VARIABLE */
```
- **Conforme au DS** ✅

#### ✅ `.dropdown-media-title` - Titres images dropdown
```css
font-size: var(--font-size-h3, 34px) !important;  /* ✅ UTILISE LA VARIABLE */
line-height: var(--line-height-h3, 120%) !important;  /* ✅ UTILISE LA VARIABLE */
```
- **Conforme au DS** ✅

#### ❌ `.btn-cta` - Bouton CTA
```css
font-size: 14px;  /* HARDCODÉ - devrait utiliser --font-size-m */
```
- **N'utilise PAS** : Variable CSS ❌

---

### Hero Section (`hero.css`)

#### ❌ `.hero-title` - Titre principal
```css
font-size: clamp(48px, 7vw, 84px);  /* HARDCODÉ - utilise clamp() au lieu des variables DS */
```
- **Problème** : 
  - N'utilise pas `var(--font-size-h1)` qui vaut 64px
  - Valeur max (84px) > H1 du DS (64px)
  - Valeur min (48px) = H2 du DS mais hardcodé
- **DS attendu** : `clamp(var(--font-size-h2), 7vw, var(--font-size-h1))` ou créer une variable responsive

#### ❌ `.hero-subtitle` - Sous-titre
```css
font-size: clamp(var(--text-m), 2vw, var(--text-l));  /* Utilise --text-m/l du hero.css, pas du DS */
```
- **Problème** : Utilise des variables locales (`--text-m`, `--text-l`) au lieu des variables globales du DS
- **DS attendu** : `clamp(var(--font-size-l), 2vw, var(--font-size-xl))`

#### ❌ `.hero-btn` - Bouton hero
```css
font-size: 16px;  /* HARDCODÉ - devrait utiliser --font-size-l */
```
- **N'utilise PAS** : Variable CSS ❌

#### ❌ `.category-label` - Labels catégories
```css
font-size: clamp(24px, 3vw, 38px);  /* HARDCODÉ - utilise clamp() */
```
- **Problème** : 
  - Min (24px) = H4 du DS mais hardcodé
  - Max (38px) n'existe pas dans le DS (entre H3 34px et H2 48px)
- **DS attendu** : Devrait utiliser les variables

---

### Media Page (`experiments/media/styles.css`)

#### ❌ `.hero-title` (page media)
```css
font-size: 58px !important;  /* HARDCODÉ - pas de variable DS pour 58px */
```
- **Problème** : 58px n'existe pas dans le DS (entre H1 64px et H2 48px)
- **DS attendu** : Soit utiliser `var(--font-size-h1)` ou `var(--font-size-h2)`

#### ❌ `.article-title`
```css
font-size: 40px;  /* HARDCODÉ - pas de variable DS pour 40px */
```
- **Problème** : 40px n'existe pas dans le DS (entre H3 34px et H2 48px)
- **DS attendu** : Soit utiliser `var(--font-size-h2)` ou créer une variable

---

## ✅ Éléments CONFORMES au DS

### Variables utilisées correctement

#### ✅ Dropdowns (`navbar.css`)
- `.dropdown-section-title` → utilise `var(--font-size-h4)` et `var(--line-height-h4)` ✅
- `.dropdown-media-title` → utilise `var(--font-size-h3)` et `var(--line-height-h3)` ✅

#### ✅ Experiments (`experiments/homepage/styles.css`)
- `.hero-title` → utilise `var(--font-size-h1)` et `var(--line-height-h1)` ✅
- `.hero-subtitle` → utilise `var(--font-size-xl)` et `var(--line-height-body)` ✅
- `.feature-title` → utilise `var(--font-size-h4)` ✅
- `.feature-text` → utilise `var(--font-size-l)` et `var(--line-height-body)` ✅

#### ✅ Category Page (`experiments/category/styles.css`)
- Tous les éléments utilisent les variables du DS ✅

#### ✅ Reset CSS (`shared/styles/reset.css`)
- Tous les h1-h5 utilisent les variables du DS ✅
- Body utilise les variables du DS ✅

---

## 📊 Statistiques

### Fichiers analysés

| Fichier | Éléments DS ✅ | Éléments Custom ❌ | Score |
|---------|---------------|-------------------|-------|
| `navbar.css` | 2 | 4 | 33% |
| `hero.css` | 0 | 4 | 0% |
| `experiments/media/styles.css` | 2 | 3 | 40% |
| `experiments/homepage/styles.css` | 7 | 0 | **100%** ✅ |
| `experiments/category/styles.css` | 10 | 0 | **100%** ✅ |
| `shared/styles/reset.css` | 10 | 0 | **100%** ✅ |

### Résumé global

- **Conformes au DS** : ~40%
- **Custom/Hardcodés** : ~60%

---

## 🔧 Recommandations pour aligner sur le DS

### 1. Remplacer les valeurs hardcodées par des variables

#### Dans `navbar.css` :
```css
/* AVANT */
.nav-link {
  font-size: 14px !important;
}

/* APRÈS */
.nav-link {
  font-size: var(--font-size-m) !important;  /* 14px */
}

/* AVANT */
.dropdown-link {
  font-size: 16px;
}

/* APRÈS */
.dropdown-link {
  font-size: var(--font-size-l);  /* 16px */
}
```

#### Dans `hero.css` :
```css
/* AVANT */
.hero-title {
  font-size: clamp(48px, 7vw, 84px);
}

/* APRÈS */
.hero-title {
  font-size: clamp(var(--font-size-h2), 7vw, var(--font-size-h1));
  /* Ou créer une variable spécifique */
}

/* AVANT */
.hero-subtitle {
  font-size: clamp(var(--text-m), 2vw, var(--text-l));
}

/* APRÈS */
.hero-subtitle {
  font-size: clamp(var(--font-size-l), 2vw, var(--font-size-xl));
}
```

### 2. Créer des variables manquantes dans `variables.css`

#### Tailles manquantes détectées :
- `18px` utilisé dans dropdowns → créer `--font-size-xl-s: 18px` ?
- `38px` utilisé dans category-label → créer une variable ?
- `40px` utilisé dans article-title → utiliser `--font-size-h2` (48px) ?
- `58px` utilisé dans media hero → utiliser `--font-size-h1` (64px) ?

**Recommandation** : Utiliser les valeurs existantes du DS plutôt que créer de nouvelles variables.

### 3. Harmoniser les tailles responsive

**Option 1** : Créer des variables responsive
```css
:root {
  --font-size-hero-title: clamp(var(--font-size-h2), 7vw, var(--font-size-h1));
  --font-size-hero-subtitle: clamp(var(--font-size-l), 2vw, var(--font-size-xl));
  --font-size-category-label: clamp(var(--font-size-h4), 3vw, var(--font-size-h3));
}
```

**Option 2** : Utiliser directement les variables dans clamp()
```css
.hero-title {
  font-size: clamp(var(--font-size-h2), 7vw, var(--font-size-h1));
}
```

---

## 🎯 Plan d'action

### Priorité 1 - Quick wins (facile à corriger)
- [ ] Remplacer `14px` → `var(--font-size-m)` dans navbar
- [ ] Remplacer `16px` → `var(--font-size-l)` dans dropdowns
- [ ] Remplacer `16px` → `var(--font-size-l)` dans hero-btn
- [ ] Remplacer `14px` → `var(--font-size-m)` dans btn-cta

### Priorité 2 - Harmonisation responsive
- [ ] Remplacer `clamp(48px, 7vw, 84px)` par `clamp(var(--font-size-h2), 7vw, var(--font-size-h1))`
- [ ] Remplacer `clamp(24px, 3vw, 38px)` par `clamp(var(--font-size-h4), 3vw, var(--font-size-h3))`
- [ ] Utiliser variables globales au lieu de variables locales dans hero.css

### Priorité 3 - Taille manquantes
- [ ] Décider pour `18px` : utiliser `16px` (L) ou `20px` (XL) ?
- [ ] Décider pour `40px` : utiliser `34px` (H3) ou `48px` (H2) ?
- [ ] Décider pour `58px` : utiliser `48px` (H2) ou `64px` (H1) ?

---

## ✅ Exemples de bonnes pratiques

### ✅ Fichier conforme : `experiments/homepage/styles.css`
```css
.hero-title {
  font-size: var(--font-size-h1);  /* ✅ Variable DS */
  line-height: var(--line-height-h1);  /* ✅ Variable DS */
  color: var(--color-asphalte);  /* ✅ Variable DS */
}

.hero-subtitle {
  font-size: var(--font-size-xl);  /* ✅ Variable DS */
  line-height: var(--line-height-body);  /* ✅ Variable DS */
}
```

### ❌ Fichier non conforme : `hero.css`
```css
.hero-title {
  font-size: clamp(48px, 7vw, 84px);  /* ❌ Hardcodé */
}

.hero-subtitle {
  font-size: clamp(var(--text-m), 2vw, var(--text-l));  /* ❌ Variables locales */
}
```

---

## 📝 Conclusion

**Oui, vous avez raison !** Beaucoup d'éléments sont custom et n'utilisent pas les variables du Design System :

- **Fichiers principaux** (`navbar.css`, `hero.css`) : ~60% de valeurs hardcodées
- **Fichiers d'expérimentation** : 100% conformes au DS ✅

**Recommandation** : Migrer progressivement les valeurs hardcodées vers les variables du DS pour maintenir la cohérence et faciliter les futures modifications.

---

*Audit effectué le 1er décembre 2025*




