# Plum Living - Expérimentations Frontend

Ce dossier contient différentes expérimentations frontend pour le site de Plum Living.

## 📋 Vue d'ensemble

Plum Living est un site e-commerce français spécialisé dans les façades et accessoires pour meubles Ikea (Metod, Pax, Besta).

## 📁 Structure du projet

```
Plum/
├── fonts/                    # Polices de caractères
│   ├── blacklist/           # Police Blacklist (titres)
│   ├── cera/                # Police Cera (principale)
│   ├── source-sans-3/       # Police Source Sans 3
│   ├── sailec/              # Police Sailec
│   ├── canela/              # Police Canela
│   ├── lato/                # Police Lato
│   ├── icons/               # Polices d'icônes
│   ├── fonts.css            # Déclarations @font-face
│   ├── README.md            # Documentation des polices
│   └── FONTS_INVENTORY.md   # Inventaire détaillé
├── DESIGN_SYSTEM_ANALYSIS.md # Analyse du design system
└── README.md                # Ce fichier
```

## 🎨 Design System

### Polices principales

- **Cera** - Police principale (body et headings)
- **Cera Pro** - Variante de Cera
- **Blacklist** - Police pour les titres (Great Studio)
- **Source Sans 3** - Police secondaire
- **Sailec** - Police d'accompagnement
- **Canela** - Police décorative
- **Lato** - Police utilitaire

### Palette de couleurs

Le site utilise une palette riche de **30+ teintes** :
- **Bois naturels** : Chêne naturel, Chêne miel, Noyer naturel
- **Bleus** : Bleu lagon, Bleu nuit, Bleu gris, Ciel voilé, Bleu paon, Baltic, Givre
- **Verts** : Amandier grisé, Sombre forest, Vert de gris, Stone, Olive, Clay, Moss, Canopée
- **Neutres** : Blanc pur, Asphalte, Smoke, Beige rosé, Sable, Moka, Lin, Ivoire, Galet, Milk
- **Tons chauds** : India, Argile, Blush, Fauve, Piment, Blossom, Caramel, Grenat
- **Collection Pauline Borgia** : Vert lavé, Jaune voilé, Ciment

## 📦 Sources des ressources

### Polices
- **Dropbox** : [Lien FONTS](https://www.dropbox.com/scl/fo/l4id4n1d5eyc1r9oy4jvo/AKseFnkZoLd7HNjDfpg4clE?rlkey=pc6vizwh6gkwixdwc19iq2ux6&dl=0)
  - `Blacklist Complete Family.zip` (700.28 KB)
  - `cera-pro-sv.zip` (579.17 KB)

### Design System
- ⏳ Liens Figma (à partager)

## 🚀 Installation

### 1. Télécharger les polices

Téléchargez les polices depuis le Dropbox et placez-les dans les dossiers respectifs :

```bash
# Exemple pour Blacklist
unzip "Blacklist Complete Family.zip" -d fonts/blacklist/

# Exemple pour Cera Pro
unzip "cera-pro-sv.zip" -d fonts/cera/
```

### 2. Utiliser les polices

Inclure le fichier CSS des polices dans votre projet :

```html
<link rel="stylesheet" href="fonts/fonts.css">
```

Ou importer dans votre CSS :

```css
@import url('./fonts/fonts.css');
```

### 3. Utiliser les variables CSS

```css
body {
  font-family: var(--font-primary);
}

h1, h2, h3 {
  font-family: var(--font-heading);
}
```

## 📚 Documentation

- [Analyse du Design System](./DESIGN_SYSTEM_ANALYSIS.md) - Analyse complète du site Plum Living
- [Inventaire des Polices](./fonts/FONTS_INVENTORY.md) - Détails sur toutes les polices disponibles
- [Documentation des Polices](./fonts/README.md) - Guide d'utilisation des polices

## 🛠️ Stack technique identifiée

- **Framework** : Non détecté (probablement CMS e-commerce)
- **Bibliothèques** :
  - Swiper (carrousels)
  - React Toastify (notifications)
- **Scripts tiers** : Facebook Pixel, HubSpot, LinkedIn Analytics, Axeptio

## 🎯 Fonctionnalités principales du site

- **Styler 3D** : Outil de visualisation 3D
- **Estimation en 2 min** : Calculateur de prix rapide
- **Rendu 3D en 48h** : Service de rendu photoréaliste
- **Collection de couleurs** : 30+ teintes disponibles
- **Services d'accompagnement** : Aide à la conception

## 📝 Notes

- Les polices Blacklist sont de **Great Studio**
- Format principal : **OTF** (OpenType Font)
- Les polices variables (TTF) permettent un contrôle fin du poids
- Header fixe blanc (110px de hauteur)
- Footer noir

---

*Dernière mise à jour : 1er décembre 2025*

