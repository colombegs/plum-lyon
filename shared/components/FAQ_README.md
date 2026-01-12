# 📋 Composant FAQ - Design System Plum Living

Composant FAQ avec expanders à tiroir (accordéon) conforme au design system.

## 🚀 Utilisation

### 1. Inclure les fichiers nécessaires

Dans votre fichier HTML, ajoutez les styles et le script :

```html
<head>
    <!-- Autres styles -->
    <link rel="stylesheet" href="shared/styles/variables.css">
    <link rel="stylesheet" href="shared/styles/faq.css">
</head>
<body>
    <!-- Votre contenu -->
    
    <!-- Scripts -->
    <script src="shared/scripts/faq.js"></script>
</body>
```

### 2. Structure HTML

```html
<section class="faq-section">
    <div class="faq-container">
        <h2 class="faq-title">Questions fréquentes</h2>
        
        <div class="faq-list">
            <!-- Item FAQ -->
            <div class="faq-item">
                <div class="faq-header">
                    <div class="faq-question">Votre question ici ?</div>
                    <div class="faq-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="faq-content">
                    <div class="faq-answer">
                        <p>Votre réponse ici.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

## 🎨 Variantes

### Par défaut
```html
<section class="faq-section">
    <!-- Contenu -->
</section>
```

### Fond clair
```html
<section class="faq-section faq-light">
    <!-- Contenu -->
</section>
```

### Fond sombre
```html
<section class="faq-section faq-dark">
    <!-- Contenu -->
</section>
```

## ⚙️ Fonctionnalités

- ✅ Animation fluide d'ouverture/fermeture
- ✅ Accessible (ARIA attributes, navigation clavier)
- ✅ Responsive (mobile-friendly)
- ✅ Conforme au design system Plum Living
- ✅ Support clavier (Enter et Espace)
- ✅ Icône animée (rotation)

## 🔧 Personnalisation

### Ouvrir un item par défaut

Ajoutez la classe `is-open` à l'item FAQ :

```html
<div class="faq-item is-open">
    <!-- Contenu -->
</div>
```

### Accordéon exclusif (un seul item ouvert)

Dans `shared/scripts/faq.js`, décommentez les lignes dans la fonction `toggleFAQItem` :

```javascript
// Optionnel : Fermer les autres items ouverts (accordéon exclusif)
const openItems = document.querySelectorAll('.faq-item.is-open');
openItems.forEach(openItem => {
    if (openItem !== item) {
        // Fermer les autres items
    }
});
```

## 📐 Design System

Le composant utilise les variables du design system :

- **Typographie** : `--font-primary` (Cera Pro) pour les questions/réponses
- **Couleurs** : `--color-asphalte`, `--color-grey-1`, etc.
- **Espacements** : `--spacing-xs` à `--spacing-4xl`
- **Transitions** : `--transition-base`, `--transition-slow`
- **Border radius** : `--radius-lg`

## 📱 Responsive

Le composant s'adapte automatiquement aux écrans mobiles :
- Tailles de police réduites
- Espacements ajustés
- Icônes plus petites

## ♿ Accessibilité

- Attributs ARIA (`aria-expanded`, `aria-hidden`)
- Navigation clavier (Tab, Enter, Espace)
- Rôle `button` sur les headers
- Focus visible

## 📝 Exemple complet

Voir `shared/components/faq.html` pour un exemple complet avec plusieurs questions.
