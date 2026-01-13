/**
 * Project Page Script - Charge et affiche un projet individuel
 * Récupère les données du projet depuis les paramètres URL
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        itemsPerLoad: 12, // Nombre d'images à charger à chaque fois
        loadThreshold: 500, // Distance en pixels avant la fin pour déclencher le chargement
        imageBasePath: 'images/', // Chemin de base pour les images (depuis la racine)
        animationDelay: 40 // Délai entre chaque animation d'image (ms)
    };

    // Pool d'images - Uniquement les images "chez vous"
    const IMAGE_POOL = [
        { src: 'media/chez vous/CORRECTION_REQUEST_80_1546_Frédérique Gobert_1.jpg', title: 'Chez Frédérique Gobert' },
        { src: 'media/chez vous/PP_REQUEST_1197_WILLAERT_3.jpg', title: 'Chez Willaert' },
        { src: 'media/chez vous/PP_REQUEST_1254_matteo Piccolomini_2.jpg', title: 'Chez Matteo Piccolomini' },
        { src: 'media/chez vous/PP_REQUEST_1254_matteo Piccolomini_4.jpg', title: 'Chez Matteo Piccolomini' },
        { src: 'media/chez vous/PP_REQUEST_1549_NAJIA_1.jpg', title: 'Chez Najia' },
        { src: 'media/chez vous/PP_REQUEST_1699_Ludmila JURCIK_3.jpg', title: 'Chez Ludmila Jurcik' },
        { src: 'media/chez vous/PP_REQUEST_2231_zivkovic_4.jpg', title: 'Chez Zivkovic' },
        { src: 'media/chez vous/PP_REQUEST_2315_7.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/PP_REQUEST_639_Lorien Alecki_4.jpg', title: 'Chez Lorien Alecki' },
        { src: 'media/chez vous/PP_REQUEST_648_CHANUT - (Chanel)_3.jpg', title: 'Chez Chanut' },
        { src: 'media/chez vous/PP_REQUEST_656_Delemotte_4.jpg', title: 'Chez Delemotte' },
        { src: 'media/chez vous/image 1.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/image 2.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/image 3.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/image 4.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/image 5.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/image 6.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/image 7.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/image 8.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/image 9.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/image 10.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/image 11.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/image 12.jpg', title: 'Projet personnalisé' },
        { src: 'media/chez vous/PP_REQUEST_1959_Mechrezia Chebbi_4.jpg', title: 'Chez Mechrezia Chebbi' },
        { src: 'media/chez vous/PP_REQUEST_639_Lorien Alecki_1.jpg', title: 'Chez Lorien Alecki' },
        { src: 'media/chez vous/PP_REQUEST_648_CHANUT - (Chanel)_1.jpg', title: 'Chez Chanut' },
    ];

    // État
    let currentIndex = 0;
    let isLoading = false;
    let sidebarImageCount = 3; // Nombre d'images dans la sidebar (par défaut)

    // Éléments DOM
    let featuredProjectImage = null;
    let featuredProjectTitle = null;
    let featuredProjectSubtitle = null;
    let sidebarProjectsGrid = null;
    let otherProjectsGrid = null;
    let loadingIndicator = null;
    let currentProjectIndex = 0;
    let availableProjects = [];

    /**
     * Récupère les paramètres de l'URL
     */
    function getURLParams() {
        const params = new URLSearchParams(window.location.search);
        const index = parseInt(params.get('index'), 10);
        const src = params.get('src');
        const title = params.get('title');
        
        return {
            index: isNaN(index) ? null : index,
            src: src || null,
            title: title || null
        };
    }

    /**
     * Trouve le projet dans le pool à partir de l'index ou du src
     */
    function findProject(params) {
        if (params.index !== null && params.index >= 0) {
            // Utiliser le modulo pour gérer les index qui dépassent la taille du pool
            const poolIndex = params.index % IMAGE_POOL.length;
            return IMAGE_POOL[poolIndex];
        }
        
        if (params.src) {
            const found = IMAGE_POOL.find(img => img.src === params.src);
            if (found) return found;
        }
        
        // Par défaut, retourner le premier projet
        return IMAGE_POOL[0];
    }

    /**
     * Récupère les données réelles du projet (ou génère des données par défaut si manquantes)
     */
    function getProjectData(imageData) {
        // Si les données sont déjà présentes dans imageData, les utiliser
        if (imageData.arrangement && imageData.color && imageData.firstName) {
            return {
                arrangement: imageData.arrangement,
                color: imageData.color,
                firstName: imageData.firstName
            };
        }
        
        // Sinon, extraire le prénom du titre si possible
        let firstName = 'Plum Planner';
        if (imageData.title) {
            const titleMatch = imageData.title.match(/Chez\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
            if (titleMatch) {
                firstName = titleMatch[1].split(' ')[0]; // Prendre seulement le prénom
            }
        }
        
        // Valeurs par défaut si les données ne sont pas disponibles
        return {
            arrangement: 'Projet personnalisé',
            color: 'Clay',
            firstName: firstName
        };
    }

    /**
     * Charge le projet principal
     */
    function loadFeaturedProject(projectData) {
        if (!featuredProjectImage || !featuredProjectTitle || !featuredProjectSubtitle) {
            console.error('Featured project elements not found');
            return;
        }

        const imagePath = CONFIG.imageBasePath + projectData.src;
        featuredProjectImage.src = imagePath;
        featuredProjectImage.alt = projectData.title || 'Rendu 3D';

        // Récupérer les données réelles du projet
        const projectInfo = getProjectData(projectData);
        
        // Appliquer la classe de couleur à l'image wrapper
        const imageWrapper = featuredProjectImage.closest('.project-featured-image-wrapper');
        if (imageWrapper) {
            // Retirer toutes les classes de couleur existantes
            imageWrapper.classList.remove('color-clay', 'color-argile', 'color-blanc', 'color-gris', 'color-noir', 'color-taupe', 'color-beige');
            // Ajouter la nouvelle classe de couleur
            const colorClass = getColorClass(projectInfo.color);
            imageWrapper.classList.add(colorClass);
        }
        
        featuredProjectTitle.textContent = `${projectInfo.arrangement} · ${projectInfo.color}`;
        featuredProjectSubtitle.textContent = `Réalisé par ${projectInfo.firstName}`;
        
        // Ajouter le bouton favori sur l'image principale
        const imageContainer = featuredProjectImage.closest('.project-featured-image-container');
        if (imageContainer) {
            // Vérifier si le bouton existe déjà
            let featuredFavoriteButton = imageContainer.querySelector('.project-featured-favorite');
            if (!featuredFavoriteButton) {
                featuredFavoriteButton = document.createElement('button');
                featuredFavoriteButton.className = 'project-featured-favorite';
                featuredFavoriteButton.setAttribute('aria-label', 'Ajouter aux favoris');
                featuredFavoriteButton.innerHTML = `
                    <svg class="favorite-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                `;
                
                // Trouver l'index du projet dans le pool
                const projectIndex = IMAGE_POOL.findIndex(img => img.src === projectData.src);
                const finalIndex = projectIndex >= 0 ? projectIndex : currentProjectIndex;
                featuredFavoriteButton.dataset.projectIndex = finalIndex;
                
                // Gestion du clic sur le bouton favori
                featuredFavoriteButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(featuredFavoriteButton, finalIndex);
                });
                
                imageContainer.appendChild(featuredFavoriteButton);
                
                // Vérifier l'état favori initial
                checkFavoriteState(featuredFavoriteButton, finalIndex);
            } else {
                // Mettre à jour l'index du projet si le bouton existe déjà
                const projectIndex = IMAGE_POOL.findIndex(img => img.src === projectData.src);
                const finalIndex = projectIndex >= 0 ? projectIndex : currentProjectIndex;
                featuredFavoriteButton.dataset.projectIndex = finalIndex;
                checkFavoriteState(featuredFavoriteButton, finalIndex);
            }
        }

        // Détecter si l'image est verticale pour appliquer object-fit: contain
        featuredProjectImage.onload = function() {
            const isPortrait = this.naturalWidth < this.naturalHeight;
            const imageWrapper = this.closest('.project-featured-image-wrapper');
            if (imageWrapper) {
                if (isPortrait) {
                    imageWrapper.classList.add('portrait-image');
                } else {
                    imageWrapper.classList.remove('portrait-image');
                }
            }
        };

        // Gestion des erreurs d'image
        featuredProjectImage.onerror = function() {
            console.warn('Failed to load featured image:', imagePath);
            // En cas d'erreur, utiliser la première image du pool
            if (IMAGE_POOL.length > 0) {
                this.src = CONFIG.imageBasePath + IMAGE_POOL[0].src;
            }
        };
    }

    /**
     * Gère l'état favori d'un projet
     */
    function toggleFavorite(button, projectIndex) {
        const favorites = getFavorites();
        const index = favorites.indexOf(projectIndex);
        
        if (index > -1) {
            // Retirer des favoris
            favorites.splice(index, 1);
            button.classList.remove('is-favorite');
        } else {
            // Ajouter aux favoris
            favorites.push(projectIndex);
            button.classList.add('is-favorite');
        }
        
        saveFavorites(favorites);
    }
    
    /**
     * Vérifie l'état favori initial
     */
    function checkFavoriteState(button, projectIndex) {
        const favorites = getFavorites();
        if (favorites.indexOf(projectIndex) > -1) {
            button.classList.add('is-favorite');
        }
    }
    
    /**
     * Récupère la liste des favoris depuis localStorage
     */
    function getFavorites() {
        try {
            const stored = localStorage.getItem('plumwall-favorites');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }
    
    /**
     * Sauvegarde la liste des favoris dans localStorage
     */
    function saveFavorites(favorites) {
        try {
            localStorage.setItem('plumwall-favorites', JSON.stringify(favorites));
        } catch (e) {
            console.warn('Failed to save favorites:', e);
        }
    }

    /**
     * Mappe les noms de couleurs aux classes CSS
     */
    function getColorClass(colorName) {
        const colorMap = {
            'Clay': 'color-clay',
            'Argile': 'color-argile',
            'Blanc': 'color-blanc',
            'Gris': 'color-gris',
            'Noir': 'color-noir',
            'Taupe': 'color-taupe',
            'Beige': 'color-beige'
        };
        return colorMap[colorName] || 'color-clay';
    }

    /**
     * Crée un élément de grille avec une image
     * @param {Object} imageData - Données de l'image
     * @param {number} index - Index global dans le pool
     * @param {number} positionInGrid - Position dans la grille (non utilisé pour les images "chez vous" qui n'ont pas de variantes hover)
     */
    function createGridItem(imageData, index, positionInGrid = 0) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.dataset.index = index;
        
        // Récupérer les données réelles du projet pour la couleur
        const projectInfo = getProjectData(imageData);
        const colorClass = getColorClass(projectInfo.color);
        item.classList.add(colorClass);

        // Trouver l'index du projet dans le pool IMAGE_POOL original
        const poolIndex = IMAGE_POOL.findIndex(img => img.src === imageData.src);
        const finalIndex = poolIndex >= 0 ? poolIndex : 0;

        const link = document.createElement('a');
        // plumwall-project.html est à la racine, donc le chemin est relatif à cette page
        link.href = `plumwall-project.html?index=${finalIndex}&src=${encodeURIComponent(imageData.src)}&title=${encodeURIComponent(imageData.title || '')}`;
        link.className = 'grid-item-link';

        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'grid-item-image';

        const img = document.createElement('img');
        const imagePath = CONFIG.imageBasePath + imageData.src;
        img.src = imagePath;
        img.alt = imageData.title || 'Rendu 3D';
        img.className = 'grid-item-img';
        img.loading = 'lazy';
        img.dataset.defaultSrc = imagePath; // Stocker l'image par défaut

        // Les images "chez vous" n'ont pas de variantes hover, donc on désactive cette fonctionnalité
        item.dataset.hoverImageExists = 'false';

        img.onerror = function() {
            console.warn('Failed to load image:', imagePath);
            // En cas d'erreur, utiliser la première image du pool
            if (IMAGE_POOL.length > 0) {
                this.src = CONFIG.imageBasePath + IMAGE_POOL[0].src;
            }
        };
        img.onload = function() {
            // Ajouter la classe loaded pour rendre l'image visible
            this.classList.add('loaded');
        };

        // Stocker les données dans les data-attributes de l'item pour la délégation d'événements
        item.dataset.defaultSrc = imagePath;

        // Créer le bouton favori
        const favoriteButton = document.createElement('button');
        favoriteButton.className = 'grid-item-favorite';
        favoriteButton.setAttribute('aria-label', 'Ajouter aux favoris');
        favoriteButton.dataset.projectIndex = finalIndex;
        favoriteButton.innerHTML = `
            <svg class="favorite-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        `;
        
        // Gestion du clic sur le bouton favori
        favoriteButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(favoriteButton, finalIndex);
        });
        
        // Créer l'overlay avec texte
        const overlay = document.createElement('div');
        overlay.className = 'grid-item-overlay';
        
        const overlayContent = document.createElement('div');
        overlayContent.className = 'grid-item-overlay-content';
        
        // Réutiliser projectInfo déjà déclaré plus haut
        
        const title = document.createElement('div');
        title.className = 'grid-item-title';
        title.textContent = `${projectInfo.arrangement} · ${projectInfo.color}`;
        
        const subtitle = document.createElement('div');
        subtitle.className = 'grid-item-subtitle';
        subtitle.textContent = `Réalisé par ${projectInfo.firstName}`;
        
        overlayContent.appendChild(title);
        overlayContent.appendChild(subtitle);
        overlay.appendChild(overlayContent);
        
        imageWrapper.appendChild(img);
        imageWrapper.appendChild(favoriteButton);
        imageWrapper.appendChild(overlay);
        link.appendChild(imageWrapper);
        item.appendChild(link);
        
        // Vérifier l'état favori initial
        checkFavoriteState(favoriteButton, finalIndex);

        return item;
    }

    /**
     * Calcule le nombre d'images à afficher dans la sidebar
     * Maintenant que la sidebar est en dessous, on charge un nombre fixe d'images
     */
    function calculateSidebarImageCount() {
        // Charger un nombre fixe d'images dans la sidebar (par exemple 6 ou 9)
        // On peut ajuster ce nombre selon les besoins
        return Math.min(9, availableProjects.length);
    }

    /**
     * Charge les projets dans la sidebar (premiers projets)
     * Maintenant que la sidebar est en dessous, on charge directement sans attendre la hauteur de l'image principale
     */
    function loadSidebarProjects() {
        if (!sidebarProjectsGrid) {
            return;
        }

        // Charger directement les images dans la sidebar
        const imageCount = calculateSidebarImageCount();
        loadSidebarProjectsWithCount(imageCount);
    }

    /**
     * Charge un nombre spécifique de projets dans la sidebar
     */
    function loadSidebarProjectsWithCount(imageCount) {
        if (!sidebarProjectsGrid) {
            return;
        }

        // Stocker le nombre d'images de la sidebar pour l'utiliser dans loadImages
        sidebarImageCount = imageCount;

        // Charger le nombre calculé de projets dans la sidebar
        const sidebarProjects = availableProjects.slice(0, imageCount);
        
        sidebarProjects.forEach((imageData, idx) => {
            const originalIndex = IMAGE_POOL.findIndex(img => img.src === imageData.src);
            // idx est la position dans la sidebar (0 = première vignette, 1 = deuxième, etc.)
            const item = createGridItem(imageData, originalIndex >= 0 ? originalIndex : idx, idx);
            
            setTimeout(() => {
                sidebarProjectsGrid.appendChild(item);
                setTimeout(() => {
                    item.classList.add('visible');
                }, 10);
            }, idx * CONFIG.animationDelay);
        });
    }

    /**
     * Charge un batch d'images avec infinite scroll (boucle infinie)
     */
    function loadImages(count = CONFIG.itemsPerLoad) {
        if (!otherProjectsGrid) {
            console.error('Project grid not found');
            return;
        }
        
        if (isLoading) {
            return;
        }

        isLoading = true;
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }

        setTimeout(() => {
            const itemsToLoad = [];
            const totalProjects = availableProjects.length;

            // Commencer après les projets de la sidebar (skip le nombre dynamique d'images)
            const startIndex = sidebarImageCount + currentIndex;

            // Charger les images en boucle infinie
            for (let i = 0; i < count; i++) {
                // Utiliser le modulo pour boucler sur le pool d'images
                const poolIndex = (startIndex + i) % totalProjects;
                const imageData = availableProjects[poolIndex];
                // Utiliser un index unique pour chaque item
                const uniqueIndex = startIndex + i;
                // positionInGrid n'est plus utilisé car les images "chez vous" n'ont pas de variantes hover
                const positionInGrid = 0;
                const item = createGridItem(imageData, uniqueIndex, positionInGrid);
                itemsToLoad.push(item);
            }

            // Ajouter les items au DOM
            itemsToLoad.forEach((item, index) => {
                otherProjectsGrid.appendChild(item);
                // Animer l'apparition avec un délai progressif
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * CONFIG.animationDelay);
            });

            // Incrémenter l'index (peut dépasser la taille du pool, le modulo gère la boucle)
            currentIndex += count;

            isLoading = false;
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }, 100);
    }

    /**
     * Vérifie si on doit charger plus d'images (boucle infinie)
     */
    function checkScrollPosition() {
        if (isLoading) {
            return;
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Si on est proche de la fin (threshold pixels avant), charger plus d'images
        if (scrollTop + windowHeight >= documentHeight - CONFIG.loadThreshold) {
            loadImages();
        }
    }

    /**
     * Initialisation
     */
    function init() {
        console.log('Project Page: Initialisation...');

        // Récupérer les éléments DOM
        featuredProjectImage = document.getElementById('featuredProjectImage');
        featuredProjectTitle = document.getElementById('featuredProjectTitle');
        featuredProjectSubtitle = document.getElementById('featuredProjectSubtitle');
        sidebarProjectsGrid = document.getElementById('sidebarProjectsGrid');
        otherProjectsGrid = document.getElementById('otherProjectsGrid');
        loadingIndicator = document.getElementById('loadingIndicator');

        if (!featuredProjectImage || !featuredProjectTitle || !featuredProjectSubtitle || !sidebarProjectsGrid || !otherProjectsGrid) {
            console.error('Project Page: Required elements not found! Retrying...');
            setTimeout(init, 100);
            return;
        }

        // Récupérer les paramètres de l'URL
        const params = getURLParams();
        console.log('Project Page: URL params:', params);

        // Trouver le projet à afficher
        const projectData = findProject(params);
        const projectIndex = IMAGE_POOL.indexOf(projectData);
        
        // Calculer l'index réel dans le pool (avec modulo si nécessaire)
        currentProjectIndex = projectIndex >= 0 ? projectIndex : 0;
        if (params.index !== null && params.index >= 0) {
            currentProjectIndex = params.index % IMAGE_POOL.length;
        }
        
        console.log('Project Page: Project found:', projectData, 'at index:', currentProjectIndex);

        // Filtrer les projets (exclure le projet actuel)
        availableProjects = IMAGE_POOL.filter((_, index) => index !== currentProjectIndex);
        
        // Réinitialiser l'index pour l'infinite scroll
        currentIndex = 0;

        // Charger le projet principal
        loadFeaturedProject(projectData);

        // Charger les projets dans la sidebar (après le chargement de l'image principale)
        // La fonction loadSidebarProjects gère le timing pour attendre le chargement de l'image
        loadSidebarProjects();

        // Charger le premier batch d'images dans la grille principale
        // Attendre un peu pour que la sidebar soit chargée d'abord
        setTimeout(() => {
            loadImages();
        }, 500);

        // Écouter le scroll pour l'infinite scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(checkScrollPosition, 100);
        }, { passive: true });

        // Vérifier aussi au resize
        window.addEventListener('resize', () => {
            checkScrollPosition();
        }, { passive: true });

        // Délégation d'événements pour le hover sur les images
        function setupHoverDelegation() {
            let currentHoveredItem = null;
            
            // Fonction pour gérer le hover
            function handleGridItemHover(e) {
                const item = e.target.closest('.grid-item');
                if (!item || item === currentHoveredItem) return;
                
                currentHoveredItem = item;
                const img = item.querySelector('.grid-item-img');
                if (!img) return;
                
                // Les images "chez vous" n'ont pas de variantes hover, donc on ne fait rien
                // Le hover est désactivé pour ces images
            }
            
            function handleGridItemLeave(e) {
                const item = e.target.closest('.grid-item');
                if (!item || item !== currentHoveredItem) return;
                
                // Vérifier si on quitte vraiment l'item (pas juste un enfant)
                const relatedTarget = e.relatedTarget;
                if (relatedTarget && item.contains(relatedTarget)) {
                    return; // On est toujours dans l'item
                }
                
                currentHoveredItem = null;
                const img = item.querySelector('.grid-item-img');
                if (!img) return;
                
                const defaultSrc = item.dataset.defaultSrc;
                console.log('Hover LEAVE - reverting to:', defaultSrc);
                if (defaultSrc) {
                    img.src = defaultSrc;
                }
            }
            
            // Utiliser mouseover/mouseout qui se propagent, avec vérification
            if (sidebarProjectsGrid) {
                sidebarProjectsGrid.addEventListener('mouseover', handleGridItemHover);
                sidebarProjectsGrid.addEventListener('mouseout', handleGridItemLeave);
            }
            
            if (otherProjectsGrid) {
                otherProjectsGrid.addEventListener('mouseover', handleGridItemHover);
                otherProjectsGrid.addEventListener('mouseout', handleGridItemLeave);
            }
            
            console.log('Hover delegation setup complete for sidebar and grid');
        }
        
        // Configurer la délégation d'événements après un court délai pour que les éléments soient dans le DOM
        setTimeout(setupHoverDelegation, 1000);
    }

    // Attendre que le DOM soit complètement chargé
    function waitForDOM() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.addEventListener('load', () => {
                    setTimeout(init, 100);
                });
            });
        } else if (document.readyState === 'interactive') {
            window.addEventListener('load', () => {
                setTimeout(init, 100);
            });
        } else {
            setTimeout(init, 100);
        }
    }
    
    waitForDOM();

    // Exposer pour debug
    window.plumPlumwallProject = {
        IMAGE_POOL,
        CONFIG,
        getURLParams,
        findProject
    };
})();

