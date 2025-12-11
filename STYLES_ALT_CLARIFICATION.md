# 📝 Clarification : Styles Alt 1, 2, 3 - Design System

## ⚠️ Important

**Les styles Alt 1, 2, 3 sont des styles COMPLETS du Design System.**

Quand on utilise un style Alt, on doit utiliser **TOUTES** ses propriétés :
- ✅ Font-size
- ✅ Line-height  
- ✅ **Letter-spacing (5%)** ← FAIT PARTIE INTÉGRANTE DU DS

## 🎯 Le letter-spacing de 5%

Le `letter-spacing: 5%` **n'est PAS** une variable générale à utiliser partout.  
C'est une propriété qui fait partie intégrante des styles Alt 1, 2, 3 du Design System.

### ❌ Mauvais usage

```css
/* Utiliser seulement la taille sans le letter-spacing */
.my-text {
  font-size: var(--font-size-alt-2); /* ❌ Style Alt incomplet */
  letter-spacing: 0.5px; /* ❌ Pas le bon letter-spacing */
}
```

### ✅ Bon usage

```css
/* Utiliser le style Alt COMPLET */
.my-text {
  font-family: var(--font-primary, 'Cera Pro', sans-serif);
  font-size: var(--font-size-alt-2); /* 14px */
  line-height: var(--line-height-alt); /* 140% */
  letter-spacing: var(--letter-spacing-alt); /* 5% - FAIT PARTIE DU DS */
  font-weight: 400; /* ou 500 selon usage */
}
```

## 📋 Styles Alt complets

| Style | Font-size | Line-height | Letter-spacing |
|-------|-----------|-------------|----------------|
| **Alt 1** | 16px | 140% | **5%** |
| **Alt 2** | 14px | 140% | **5%** |
| **Alt 3** | 12px | 140% | **5%** |

## 💡 Cas d'usage

### ✅ Navigation (.nav-link)
Utilise **Alt 2 complet** :
- Font-size : 14px (Alt 2)
- Line-height : 140%
- **Letter-spacing : 5%** ← Fait partie du DS Alt 2
- Font-weight : 500
- Text-transform : uppercase

### ✅ Bouton CTA (.btn-cta)
Utilise **Alt 2 complet** :
- Font-size : 14px (Alt 2)
- Line-height : 140%
- **Letter-spacing : 5%** ← Fait partie du DS Alt 2
- Font-weight : 500
- Text-transform : uppercase

## 🔑 Points clés

1. **Le letter-spacing de 5% est UNIQUEMENT pour les styles Alt 1, 2, 3**
2. **Ne pas utiliser cette variable pour d'autres éléments**
3. **Quand on utilise un style Alt, utiliser TOUTES ses propriétés**

---

*Document de clarification - 1er décembre 2025*




