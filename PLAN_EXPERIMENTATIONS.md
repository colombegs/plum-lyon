# Plan d'Expérimentations Frontend - Plum Living

## 🎯 Objectif
Créer des **expérimentations frontend** pour tester et valider le design system avant intégration dans le vrai site.

## 📋 Scope des expérimentations

### Pages à créer
1. ✅ **Navbar** (déjà fait)
2. ⏳ **Homepage** 
3. ⏳ **Pages catégories**

## 💡 Recommandation : HTML/CSS/JS Vanilla

### Pourquoi HTML plutôt que React pour des expérimentations ?

#### ✅ Avantages HTML/CSS/JS
- **Prototypage rapide** : Pas de build, pas de dépendances
- **Facilité de partage** : Fichiers statiques, ouverture directe dans le navigateur
- **Intégration facile** : Le code peut être copié directement dans le CMS existant
- **Focus design** : Pas de complexité technique, on se concentre sur le visuel
- **Performance** : Pas de bundle JS lourd, chargement instantané
- **Itération rapide** : Modifications visibles immédiatement

#### ⚠️ Inconvénients React pour ce cas
- Setup plus lourd (build, dépendances)
- Overkill pour des prototypes statiques
- Plus difficile à intégrer dans un CMS non-React
- Temps perdu en configuration vs design

## 🏗️ Structure recommandée

```
Plum/
├── experiments/
│   ├── navbar/
│   │   ├── navbar.html
│   │   └── navbar.css
│   ├── homepage/
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── script.js (si interactivité)
│   └── category/
│       ├── index.html
│       ├── styles.css
│       └── script.js
├── shared/
│   ├── fonts/
│   ├── components/     # Composants réutilisables (boutons, cards, etc.)
│   └── utilities/      # Utilitaires CSS/JS
└── README.md
```

## 🎨 Approche Design System

### Composants à créer (en HTML/CSS)
- ✅ Navbar
- ⏳ Boutons (variantes)
- ⏳ Cards produits
- ⏳ Carrousels (Swiper)
- ⏳ Filtres catégories
- ⏳ Hero sections
- ⏳ Grilles produits

### Système de design
- Variables CSS pour couleurs, typographie, espacements
- Classes utilitaires réutilisables
- Composants modulaires en HTML/CSS pur

## 🚀 Workflow recommandé

1. **Prototyper en HTML/CSS** → Valider visuellement
2. **Tester l'interactivité** → JS vanilla si nécessaire
3. **Documenter les composants** → Pour l'intégration future
4. **Exporter les styles** → Pour intégration dans le vrai site

## 📝 Notes

- **Pas de build nécessaire** : Fichiers statiques simples
- **Compatibilité** : Code facilement intégrable dans n'importe quel CMS
- **Performance** : Pas de surcharge framework
- **Focus** : Design et UX avant tout

---

*Plan mis à jour pour expérimentations frontend uniquement*

