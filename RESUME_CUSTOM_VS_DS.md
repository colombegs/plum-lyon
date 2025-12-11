# ⚡ Résumé : Custom vs Design System

## 🎯 En bref

**OUI, vous avez raison !** Beaucoup d'éléments sont **CUSTOM** et n'utilisent **PAS** les variables du Design System.

---

## ❌ Ce qui est CUSTOM (hardcodé)

### Navbar
```css
.nav-link {
  font-size: 14px !important;  /* ❌ Devrait être var(--font-size-m) */
}

.dropdown-link {
  font-size: 16px;  /* ❌ Devrait être var(--font-size-l) */
  font-size: 18px !important;  /* ❌ Pas de variable DS pour 18px */
}

.btn-cta {
  font-size: 14px;  /* ❌ Devrait être var(--font-size-m) */
}
```

### Hero Section
```css
.hero-title {
  font-size: clamp(48px, 7vw, 84px);  /* ❌ Hardcodé, devrait utiliser variables */
}

.hero-subtitle {
  font-size: clamp(var(--text-m), 2vw, var(--text-l));  /* ❌ Variables locales, pas du DS */
}

.hero-btn {
  font-size: 16px;  /* ❌ Devrait être var(--font-size-l) */
}

.category-label {
  font-size: clamp(24px, 3vw, 38px);  /* ❌ Hardcodé */
}
```

---

## ✅ Ce qui utilise le DS (conforme)

### Navbar (partiellement)
```css
.dropdown-section-title {
  font-size: var(--font-size-h4, 24px) !important;  /* ✅ */
  line-height: var(--line-height-h4, 120%) !important;  /* ✅ */
}

.dropdown-media-title {
  font-size: var(--font-size-h3, 34px) !important;  /* ✅ */
  line-height: var(--line-height-h3, 120%) !important;  /* ✅ */
}
```

### Expérimentations (100% conforme !)
Les fichiers dans `experiments/` utilisent correctement les variables :
```css
/* experiments/homepage/styles.css */
.hero-title {
  font-size: var(--font-size-h1);  /* ✅ */
  line-height: var(--line-height-h1);  /* ✅ */
}
```

---

## 📊 Score par fichier

| Fichier | Score DS |
|---------|----------|
| `navbar.css` | ⚠️ **33%** (2/6 éléments) |
| `hero.css` | ❌ **0%** (0/4 éléments) |
| `experiments/homepage/styles.css` | ✅ **100%** |
| `experiments/category/styles.css` | ✅ **100%** |

---

## 🔍 Exemples concrets

### Exemple 1 : `.nav-link`

**Actuel (CUSTOM)** :
```css
.nav-link {
  font-size: 14px !important;  /* Hardcodé */
}
```

**Devrait être (DS)** :
```css
.nav-link {
  font-size: var(--font-size-m) !important;  /* 14px du DS */
}
```

### Exemple 2 : `.hero-title`

**Actuel (CUSTOM)** :
```css
.hero-title {
  font-size: clamp(48px, 7vw, 84px);  /* Hardcodé */
}
```

**Devrait être (DS)** :
```css
.hero-title {
  font-size: clamp(var(--font-size-h2), 7vw, var(--font-size-h1));
  /* clamp(48px, 7vw, 64px) mais avec variables */
}
```

---

## 💡 Le problème

1. **Polices** : ✅ Utilisées correctement (Cera Pro, Blacklist)
2. **Tailles** : ❌ Beaucoup hardcodées au lieu d'utiliser les variables
3. **Cohérence** : Les expérimentations suivent le DS, pas les fichiers principaux

---

## ✅ Solution rapide

Remplacer toutes les valeurs hardcodées par les variables existantes :

| Hardcodé actuel | Variable DS à utiliser |
|-----------------|------------------------|
| `14px` | `var(--font-size-m)` |
| `16px` | `var(--font-size-l)` |
| `20px` | `var(--font-size-xl)` |
| `24px` | `var(--font-size-h4)` |
| `34px` | `var(--font-size-h3)` |
| `48px` | `var(--font-size-h2)` |
| `64px` | `var(--font-size-h1)` |

---

**Conclusion** : Les fichiers principaux (`navbar.css`, `hero.css`) sont largement custom, tandis que les expérimentations sont conformes au DS. Il faudrait harmoniser ! 🎯




