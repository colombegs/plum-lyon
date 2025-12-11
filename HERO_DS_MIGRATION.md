# ✅ Migration Hero Section vers Design System

## 🎯 Modifications effectuées

### 1. Hero Title → H1
- ✅ **Avant** : `font-size: clamp(48px, 7vw, 84px);`
- ✅ **Après** : `font-size: var(--font-size-h1);` (64px)
- ✅ **Line-height** : `var(--line-height-h1);` (90%)
- ✅ **Font-family** : `var(--font-heading, 'Blacklist', sans-serif);`

### 2. Hero Subtitle → XL
- ✅ **Avant** : `font-size: clamp(var(--text-m), 2vw, var(--text-l));` (variables locales)
- ✅ **Après** : `font-size: var(--font-size-xl);` (20px)
- ✅ **Line-height** : `var(--line-height-body);` (140%)
- ✅ **Font-family** : `var(--font-primary, 'Cera Pro', sans-serif);`

### 3. Hero Button → Alt 1
- ✅ **Avant** : `font-size: 16px;` hardcodé
- ✅ **Après** : `font-size: var(--font-size-alt-1);` (16px)
- ✅ **Letter-spacing** : `var(--letter-spacing-alt);` (0.05em - Alt 1 complet)
- ✅ **Line-height** : `var(--line-height-alt);` (140%)
- ✅ **Font-family** : `var(--font-primary, 'Cera Pro', sans-serif);`

### 4. Category Label → H3
- ✅ **Avant** : `font-size: clamp(24px, 3vw, 38px);`
- ✅ **Après** : `font-size: var(--font-size-h3);` (34px)
- ✅ **Line-height** : `var(--line-height-h3);` (120%)
- ✅ **Font-family** : `var(--font-heading, 'Blacklist', sans-serif);`

---

## ⚠️ Règles responsive qui surchargent encore

Les règles responsive dans les media queries surchargent encore certaines valeurs :

### Tablette (@media max-width: 1024px)
- `.hero-title` : `clamp(40px, 7vw, 72px)` → surcharge H1
- `.hero-subtitle` : `clamp(15px, 1.8vw, 18px)` → surcharge XL
- `.hero-btn` : `font-size: 13px;` → surcharge Alt 1

### Mobile (@media max-width: 768px)
- `.hero-title` : `clamp(36px, 10vw, 56px)` → surcharge H1
- `.hero-subtitle` : `font-size: 16px;` → surcharge XL
- `.hero-btn` : `font-size: 13px;` → surcharge Alt 1

**Question** : Voulez-vous garder ces valeurs responsive adaptatives ou les supprimer pour garder les valeurs fixes du DS ?

---

## 📊 Résumé

| Élément | Style DS utilisé | Taille |
|---------|------------------|--------|
| `.hero-title` | **H1** | 64px / 90% |
| `.hero-subtitle` | **XL** | 20px / 140% |
| `.hero-btn` | **Alt 1** | 16px / 140% / 0.05em |
| `.category-label` | **H3** | 34px / 120% |

---

*Migration effectuée le 1er décembre 2025*




