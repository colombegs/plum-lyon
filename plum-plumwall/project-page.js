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

    // Pool d'images avec données réelles
    const IMAGE_POOL = [
        { src: 'media/chez vous/CORRECTION_REQUEST_80_1546_Frédérique Gobert_1.jpg', title: 'Chez Frédérique Gobert', arrangement: 'Cuisine', color: 'Clay', firstName: 'Frédérique' },
        { src: 'media/chez vous/PP_REQUEST_1197_WILLAERT_3.jpg', title: 'Chez Willaert', arrangement: 'Dressing', color: 'Argile', firstName: 'Willaert' },
        { src: 'media/chez vous/PP_REQUEST_1254_matteo Piccolomini_2.jpg', title: 'Chez Matteo Piccolomini', arrangement: 'Cuisine', color: 'Blanc', firstName: 'Matteo' },
        { src: 'media/chez vous/PP_REQUEST_1254_matteo Piccolomini_4.jpg', title: 'Chez Matteo Piccolomini', arrangement: 'Meuble salle de bain', color: 'Gris', firstName: 'Matteo' },
        { src: 'media/chez vous/PP_REQUEST_1549_NAJIA_1.jpg', title: 'Chez Najia', arrangement: 'Buffet', color: 'Noir', firstName: 'Najia' },
        { src: 'media/chez vous/PP_REQUEST_1699_Ludmila JURCIK_3.jpg', title: 'Chez Ludmila Jurcik', arrangement: 'Pont de lit', color: 'Taupe', firstName: 'Ludmila' },
        { src: 'media/chez vous/PP_REQUEST_2231_zivkovic_4.jpg', title: 'Chez Zivkovic', arrangement: 'Rangement', color: 'Beige', firstName: 'Zivkovic' },
        { src: 'media/chez vous/PP_REQUEST_2315_7.jpg', title: 'Projet personnalisé', arrangement: 'Cuisine', color: 'Clay', firstName: 'Plum Planner' },
        { src: 'media/chez vous/PP_REQUEST_639_Lorien Alecki_4.jpg', title: 'Chez Lorien Alecki', arrangement: 'Dressing', color: 'Argile', firstName: 'Lorien' },
        { src: 'media/chez vous/PP_REQUEST_648_CHANUT - (Chanel)_3.jpg', title: 'Chez Chanut', arrangement: 'Buffet', color: 'Blanc', firstName: 'Chanut' },
        { src: 'media/chez vous/PP_REQUEST_656_Delemotte_4.jpg', title: 'Chez Delemotte', arrangement: 'Meuble salle de bain', color: 'Gris', firstName: 'Delemotte' },
        { src: 'media/chez vous/image 1.jpg', title: 'Projet personnalisé', arrangement: 'Cuisine', color: 'Noir', firstName: 'Plum Planner' },
        { src: 'media/chez vous/image 2.jpg', title: 'Projet personnalisé', arrangement: 'Dressing', color: 'Taupe', firstName: 'Plum Planner' },
        { src: 'media/chez vous/image 3.jpg', title: 'Projet personnalisé', arrangement: 'Pont de lit', color: 'Beige', firstName: 'Plum Planner' },
        { src: 'media/chez vous/image 4.jpg', title: 'Projet personnalisé', arrangement: 'Rangement', color: 'Clay', firstName: 'Plum Planner' },
        { src: 'media/chez vous/image 5.jpg', title: 'Projet personnalisé', arrangement: 'Buffet', color: 'Argile', firstName: 'Plum Planner' },
        { src: 'media/chez vous/image 6.jpg', title: 'Projet personnalisé', arrangement: 'Cuisine', color: 'Blanc', firstName: 'Plum Planner' },
        { src: 'media/chez vous/image 7.jpg', title: 'Projet personnalisé', arrangement: 'Meuble salle de bain', color: 'Gris', firstName: 'Plum Planner' },
        { src: 'media/chez vous/image 8.jpg', title: 'Projet personnalisé', arrangement: 'Dressing', color: 'Noir', firstName: 'Plum Planner' },
        { src: 'media/chez vous/image 9.jpg', title: 'Projet personnalisé', arrangement: 'Pont de lit', color: 'Taupe', firstName: 'Plum Planner' },
        { src: 'media/chez vous/image 10.jpg', title: 'Projet personnalisé', arrangement: 'Rangement', color: 'Beige', firstName: 'Plum Planner' },
        { src: 'media/chez vous/image 11.jpg', title: 'Projet personnalisé', arrangement: 'Buffet', color: 'Clay', firstName: 'Plum Planner' },
        { src: 'media/chez vous/image 12.jpg', title: 'Projet personnalisé', arrangement: 'Cuisine', color: 'Argile', firstName: 'Plum Planner' },
        { src: 'media/chez vous/PP_REQUEST_1959_Mechrezia Chebbi_4.jpg', title: 'Chez Mechrezia Chebbi', arrangement: 'Dressing', color: 'Blanc', firstName: 'Mechrezia' },
        { src: 'media/chez vous/PP_REQUEST_639_Lorien Alecki_1.jpg', title: 'Chez Lorien Alecki', arrangement: 'Meuble salle de bain', color: 'Gris', firstName: 'Lorien' },
        { src: 'media/chez vous/PP_REQUEST_648_CHANUT - (Chanel)_1.jpg', title: 'Chez Chanut', arrangement: 'Buffet', color: 'Noir', firstName: 'Chanut' },
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

        // Détecter si l'image est en format paysage et ajuster le layout
        featuredProjectImage.onload = function() {
            const isLandscape = this.naturalWidth > this.naturalHeight;
            const layoutElement = document.querySelector('.project-featured-layout');
            if (layoutElement) {
                if (isLandscape) {
                    layoutElement.classList.add('landscape-image');
                } else {
                    layoutElement.classList.remove('landscape-image');
                    // Pour les images portrait, s'assurer que la sidebar est visible
                    const sidebar = document.querySelector('.project-featured-sidebar');
                    if (sidebar) {
                        sidebar.style.display = 'flex';
                    }
                }
            }
        };

        // Gestion des erreurs d'image
        featuredProjectImage.onerror = function() {
            console.warn('Failed to load featured image:', imagePath);
            this.src = CONFIG.imageBasePath + 'media/1.jpg';
        };
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
     */
    function createGridItem(imageData, index) {
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

        img.onerror = function() {
            console.warn('Failed to load image:', imagePath);
            this.src = CONFIG.imageBasePath + 'media/1.jpg';
        };
        img.onload = function() {
            // Ajouter la classe loaded pour rendre l'image visible
            this.classList.add('loaded');
        };

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
        imageWrapper.appendChild(overlay);
        link.appendChild(imageWrapper);
        item.appendChild(link);

        return item;
    }

    /**
     * Calcule le nombre d'images à afficher dans la sidebar
     * Pour les images portrait : toujours 2 images
     * Pour les images paysage : calculer dynamiquement
     */
    function calculateSidebarImageCount() {
        if (!featuredProjectImage || !sidebarProjectsGrid) {
            return 2; // Valeur par défaut pour portrait
        }

        // Vérifier si l'image principale est en portrait ou paysage
        const isPortrait = featuredProjectImage.naturalWidth < featuredProjectImage.naturalHeight;
        
        // Si l'image est en portrait, toujours retourner 2 images
        if (isPortrait) {
            return 2;
        }

        // Pour les images paysage, calculer dynamiquement (mais normalement la sidebar est cachée)
        // Utiliser offsetHeight pour la hauteur réelle affichée, sinon naturalHeight
        const mainImageHeight = featuredProjectImage.offsetHeight || featuredProjectImage.naturalHeight;
        
        // Si l'image n'est pas encore chargée ou n'a pas de hauteur, retourner une valeur par défaut
        if (!mainImageHeight || mainImageHeight === 0) {
            return 2; // Valeur par défaut
        }

        const sidebarWidth = sidebarProjectsGrid.offsetWidth || sidebarProjectsGrid.parentElement.offsetWidth || 300;
        
        // Estimer la hauteur moyenne d'une image dans la sidebar
        // En supposant un ratio moyen de 4:3 pour les images de la sidebar
        const estimatedImageHeight = (sidebarWidth * 3) / 4; // Ratio 4:3
        const gapBetweenImages = 10; // column-gap
        
        // Calculer combien d'images peuvent tenir dans la hauteur de l'image principale
        let totalHeight = 0;
        let imageCount = 0;
        const maxImages = Math.min(availableProjects.length, 10); // Maximum 10 images
        
        for (let i = 0; i < maxImages; i++) {
            // Estimer la hauteur de cette image (peut varier selon le ratio réel)
            const imageHeight = estimatedImageHeight;
            totalHeight += imageHeight;
            
            // Si on dépasse la hauteur de l'image principale, arrêter
            if (totalHeight > mainImageHeight) {
                break;
            }
            
            imageCount++;
            totalHeight += gapBetweenImages; // Ajouter l'espace entre les images
        }
        
        // S'assurer d'avoir au moins 2 images et au maximum le nombre disponible
        return Math.max(2, Math.min(imageCount, availableProjects.length));
    }

    /**
     * Charge les projets dans la sidebar (premiers projets)
     * Le nombre d'images est calculé dynamiquement pour ne pas dépasser la hauteur de l'image principale
     */
    function loadSidebarProjects() {
        if (!sidebarProjectsGrid || !featuredProjectImage) {
            return;
        }

        // Fonction pour charger la sidebar une fois que l'image est prête
        const loadSidebarWhenReady = () => {
            // Attendre un peu pour que le layout soit calculé après le chargement de l'image
            setTimeout(() => {
                const imageCount = calculateSidebarImageCount();
                loadSidebarProjectsWithCount(imageCount);
            }, 150);
        };

        // Vérifier si l'image est déjà chargée
        if (featuredProjectImage.complete && featuredProjectImage.naturalHeight > 0) {
            // L'image est déjà chargée, calculer immédiatement
            loadSidebarWhenReady();
        } else {
            // Attendre que l'image soit chargée
            featuredProjectImage.addEventListener('load', loadSidebarWhenReady, { once: true });
            
            // Timeout de sécurité au cas où l'événement load ne se déclenche pas
            setTimeout(() => {
                if (sidebarProjectsGrid.children.length === 0) {
                    const imageCount = calculateSidebarImageCount();
                    loadSidebarProjectsWithCount(imageCount);
                }
            }, 2000);
        }
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
            const item = createGridItem(imageData, originalIndex >= 0 ? originalIndex : idx);
            
            setTimeout(() => {
                sidebarProjectsGrid.appendChild(item);
                setTimeout(() => {
                    item.classList.add('visible');
                    
                    // Pour les images portrait, s'assurer que les images de la sidebar sont chargées
                    // et ajuster la hauteur si nécessaire
                    if (idx === imageCount - 1) { // Dernière image chargée
                        const isPortrait = featuredProjectImage.naturalWidth < featuredProjectImage.naturalHeight;
                        if (isPortrait && featuredProjectImage.offsetHeight > 0) {
                            // Synchroniser la hauteur de la sidebar avec l'image principale
                            const sidebar = sidebarProjectsGrid.closest('.project-featured-sidebar');
                            if (sidebar) {
                                sidebar.style.height = featuredProjectImage.offsetHeight + 'px';
                            }
                        }
                    }
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
                const item = createGridItem(imageData, uniqueIndex);
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

