# Analyse du Design System Plum Living

## 📋 Vue d'ensemble
Plum Living est un site e-commerce français spécialisé dans les façades et accessoires pour meubles Ikea (Metod, Pax, Besta).

## 🎨 Polices identifiées

### Polices principales
- **Cera** (sans-serif) - Police principale du body et des headings
  - Variantes : normal (400, 500, 600, 700)
  
- **Cera Pro** - Variante de Cera
  - Poids : 300, 500, 700
  
- **Blacklist** - Police pour les titres et éléments visuels
  - Variantes : Bold, ExtraBold, SemiBold, Italic
  - Poids : 400, 500, 800
  
- **Source Sans 3** - Police secondaire
  - Poids : 400, 500, 600, 700
  
- **Sailec** - Police d'accompagnement
  - Variantes : normal (400, 500), italic (400)
  
- **Canela** - Police décorative
  - Variante : italic (300)
  
- **Lato** - Police utilitaire
  - Variantes : normal (400, 700), italic (400, 700)

### Polices d'icônes
- **Icons** - Police d'icônes principale
- **outline-icons** - Variante outline des icônes
- **brand-icons** - Icônes de marques/réseaux sociaux
- **swiper-icons** - Icônes pour le composant Swiper (carrousels)

## 🎨 Système de couleurs

### Palette de couleurs identifiée
Le site utilise une palette riche de **30+ teintes** :

**Bois naturels :**
- Chêne naturel
- Chêne miel
- Noyer naturel

**Bleus :**
- Bleu lagon
- Bleu nuit
- Bleu gris
- Ciel voilé
- Bleu paon
- Baltic
- Givre (NEW)

**Verts :**
- Amandier grisé
- Sombre forest
- Vert de gris
- Stone
- Olive
- Clay
- Moss
- Canopée (NEW)

**Neutres :**
- Blanc pur
- Asphalte
- Smoke
- Beige rosé
- Sable
- Moka
- Lin
- Ivoire
- Galet
- Milk

**Tons chauds :**
- India
- Argile
- Blush
- Fauve
- Piment
- Blossom
- Caramel
- Grenat (NEW)

**Collection Pauline Borgia :**
- Vert lavé
- Jaune voilé
- Ciment

### Palette "Basics" (Couleurs de base)
Palette fondamentale du design system :

**Neutres :**
- **Asphalte** - Gris très foncé/charbon
- **Black** - Noir
- **Grey-1** - Gris moyen
- **Grey-2** - Gris clair
- **Grey-3** - Gris très clair
- **Grey-4** - Gris presque blanc
- **Blanc Cassé** - Blanc cassé/crème
- **White** - Blanc pur

**Couleurs fonctionnelles :**
- **Success Green** - Vert teal/vert foncé (succès)
- **Error Red** - Rouge corail/rouge-orange (erreur)
- **Warning** - Jaune vif/ambre (avertissement)

### Variables CSS détectées
- `--rt-color-error`: #be6464
- `--rt-color-info`: #337ab7
- `--rt-color-dark`: #222
- `--rt-color-warning`: #f0ad4e
- `--rt-color-white`: #fff
- `--rt-color-success`: #8dc572
- `--swiper-theme-color`: #007aff

## 🏗️ Structure et Layout

### Header
- **Position** : Fixed
- **Hauteur** : 110px
- **Background** : Blanc (rgb(255, 255, 255))
- **Contenu** :
  - Logo Plum Kitchen
  - Barre de recherche
  - Navigation principale (Cuisine, Chambre, Salon, Salle de bain, Bureau, Kids)
  - Liens : Club Pro, Compte, Panier

### Footer
- **Background** : Noir (rgb(0, 0, 0))
- **Sections** :
  - Suivez-nous (Instagram, Pinterest, YouTube)
  - À propos
  - Customer Care
  - Pièces
  - Newsletter

### Navigation
Menu complexe avec catégories :
- **Cuisine** : Nos cuisines chez vous, Styler 3D, Estimation, Collection Pauline Borgia, Façades Metod, Plans de travail, Étagères, etc.
- **Chambre** : Dressings, Autres rangements, Banquettes, Têtes de lit, Façades Pax/Metod/Besta
- **Salon** : Buffets, Meubles TV, Meubles d'entrée, Banquettes
- **Salle de bain** : Cube (NEW), Meuble Metod, Façades, Plans de travail
- **Bureau** : Bureaux adulte/enfants, Rangements, Plateaux
- **Kids** : Rangements, Banquettes, Dressings, Bureaux

## 🎯 Composants UI

### Boutons
- **Border-radius** : Très arrondis (8000px, 100%, 40px)
- **Padding** : Variable (0px à 12px)
- **Styles** : 
  - Ripple effect (ripple-button)
  - Icon buttons
  - Link buttons

### Typographie
- **Body font** : Cera Pro, sans-serif (16px)
- **Heading font** : Blacklist, sans-serif (pour les titres principaux)
- **Police principale** : Cera Pro (pour tout le contenu texte)

### Styles de texte (Design System)

#### Body (Police Cera Pro)
Styles de texte pour le contenu principal utilisant **Cera Pro** :

**Regular :**
- **Cera Pro XL** · 20px / 140% (font-size / line-height)
- **Cera Pro L** · 16px / 140%
- **Cera Pro M** · 14px / 140%
- **Cera Pro S** · 12px / 140%
- **Cera Pro XS** · 10px / 140%

**Bold :**
- **Cera Pro XL Bold** · 20px / 140%
- **Cera Pro L Bold** · 16px / 140%
- **Cera Pro M Bold** · 14px / 140%
- **Cera Pro S Bold** · 12px / 140%
- **Cera Pro XS Bold** · 10px / 140%

#### Titres (Police Blacklist)
Styles de texte pour les titres et headings utilisant **Blacklist** :

**Regular :**
- **Blacklist h1** · 80px / 90%
- **Blacklist h2** · 48px / 100%
- **Blacklist h3** · 42px / 120%
- **Blacklist h4** · 24px / 120%
- **Blacklist h5** · 20px / 120%

**Alternatives (Cera Pro) :**
- **Cera Pro alt 1** · 16px / 140%
- **Cera Pro alt 2** · 14px / 140%
- **Cera Pro alt 3** · 12px / 140%

**Italic :**
- **Blacklist h1 italic** · 80px / 90%
- **Blacklist h2 italic** · 48px / 100%
- **Blacklist h3 italic** · 42px / 120%
- **Blacklist h4 italic** · 24px / 120%

## 🛠️ Stack technique

### Frameworks
- Pas de framework React/Vue/Angular détecté
- Probablement un site e-commerce avec CMS (Sylius mentionné dans les classes)

### Bibliothèques identifiées
- **Swiper** : Pour les carrousels
- **React Toastify** : Pour les notifications (--rt-* variables)

### Scripts tiers
- Facebook Pixel
- HubSpot Analytics
- LinkedIn Analytics
- Axeptio (gestion des cookies)
- YouTube Player API

## 📱 Responsive Design
- Viewport : `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no`
- Classes utilitaires détectées : `@lg:u-hidden` (système de breakpoints)

## 🎨 Caractéristiques visuelles

### Design
- Esthétique moderne et épurée
- Focus sur les images produits
- Palette de couleurs riche et subtile
- Typographie soignée avec hiérarchie claire

### Fonctionnalités principales
- **Styler 3D** : Outil de visualisation 3D
- **Estimation en 2 min** : Calculateur de prix rapide
- **Rendu 3D en 48h** : Service de rendu photoréaliste
- **Collection de couleurs** : 30+ teintes disponibles
- **Services d'accompagnement** : Aide à la conception

## 📝 Notes pour les expérimentations

### ✅ Polices documentées
- ✅ **Blacklist Complete Family** - Toutes les variantes disponibles (Dropbox)
  - Utilisée pour les titres et éléments visuels
  - 20 fichiers OTF + 2 fichiers variables TTF
- ✅ **Cera Pro** - Archive disponible (Dropbox)
  - Police principale pour le body et le contenu texte
  - Poids : Light (300), Medium (500), Bold (700)

**Note** : Seules **Cera Pro** et **Blacklist** sont utilisées dans le design system.

### ✅ Icônes documentées
- ✅ **Bibliothèque d'icônes complète** - Disponible sur Dropbox
  - Icons (principale)
  - outline-icons
  - brand-icons
  - swiper-icons

### À documenter (en attente)
- ⏳ Liste détaillée des icônes disponibles (à extraire du Dropbox)
- ⏳ Codes Unicode/classes CSS pour chaque icône
- ⏳ Liens Figma du design system
- ⏳ Variables CSS complètes
- ⏳ Breakpoints exacts
- ⏳ Espacements (spacing system)
- ⏳ Composants détaillés

## 🎨 Système d'icônes

### Bibliothèque d'icônes
Le design system utilise une bibliothèque d'icônes complète accessible via Dropbox.

**Source :** [ICÔNES - Dropbox](https://www.dropbox.com/scl/fo/4iah2nwp2xbkghcir9s3o/AJVDRzDePmseh9fkWBMCU8w?rlkey=pil4ev3ab5cr4i8epmtsfjcxx&dl=0)

### Types d'icônes disponibles
- **Icons** - Police d'icônes principale du design system
- **outline-icons** - Variante avec contour (outline)
- **brand-icons** - Icônes pour les marques et réseaux sociaux
- **swiper-icons** - Icônes spécifiques pour les composants de carrousel

### Utilisation
Les icônes sont disponibles sous forme de police de caractères (icon font) permettant une utilisation flexible avec CSS.

### 📦 Sources des polices
- **Dropbox Polices** : [FONTS](https://www.dropbox.com/scl/fo/l4id4n1d5eyc1r9oy4jvo/AKseFnkZoLd7HNjDfpg4clE?rlkey=pc6vizwh6gkwixdwc19iq2ux6&dl=0)
  - Blacklist Complete Family.zip
  - cera-pro-sv.zip
  - Dossier OLD

- **Dropbox Icônes** : [ICÔNES](https://www.dropbox.com/scl/fo/4iah2nwp2xbkghcir9s3o/AJVDRzDePmseh9fkWBMCU8w?rlkey=pil4ev3ab5cr4i8epmtsfjcxx&dl=0)

---

*Analyse effectuée le 1er décembre 2025*
*Polices Blacklist et Cera Pro identifiées dans le Dropbox*

