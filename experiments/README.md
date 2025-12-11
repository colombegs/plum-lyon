# Expérimentations Frontend - Plum Living

## 📁 Structure

```
experiments/
├── homepage/
│   ├── index.html      # Page d'accueil
│   └── styles.css      # Styles spécifiques à la homepage
├── category/
│   ├── index.html      # Page catégorie (ex: Cuisine)
│   └── styles.css      # Styles spécifiques aux pages catégories
└── README.md           # Ce fichier

shared/
├── components/
│   ├── navbar.html     # Composant navbar (référence)
│   └── navbar.css      # Styles navbar réutilisables
└── styles/
    ├── variables.css   # Variables CSS du design system
    └── reset.css       # Reset CSS de base
```

## 🚀 Utilisation

### Homepage
Ouvrir `experiments/homepage/index.html` dans votre navigateur.

### Page Catégorie
Ouvrir `experiments/category/index.html` dans votre navigateur.

## 🎨 Design System

### Variables CSS
Toutes les variables du design system sont définies dans `shared/styles/variables.css` :
- Couleurs (palette Basics)
- Typographie (Cera Pro + Blacklist)
- Espacements
- Transitions
- Border radius

### Composants réutilisables
- **Navbar** : `shared/components/navbar.css` (styles) + HTML dans chaque page

## 📝 Notes

- Les pages utilisent la navbar fixe (110px de hauteur)
- Le contenu principal a un `padding-top` de `var(--navbar-height)`
- Tous les chemins sont relatifs depuis chaque dossier d'expérimentation
- Les images doivent être placées dans `/images/` à la racine

## 🔄 Prochaines étapes

- [ ] Ajouter des images réelles
- [ ] Implémenter le menu hamburger mobile
- [ ] Ajouter des interactions JS (filtres, carrousels)
- [ ] Créer d'autres composants (boutons, cards, etc.)

