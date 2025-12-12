/**
 * Project Page Script - Charge et affiche un projet individuel
 * Récupère les données du projet depuis les paramètres URL
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        imageBasePath: 'images/', // Chemin de base pour les images (depuis la racine)
        animationDelay: 40 // Délai entre chaque animation d'image (ms)
    };

    // Pool d'images - Même pool que dans infinite-scroll.js
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

    // Éléments DOM
    let featuredProjectImage = null;
    let featuredProjectTitle = null;
    let featuredProjectSubtitle = null;
    let sidebarProjectsGrid = null;
    let otherProjectsGrid = null;

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
     * Génère des données placeholder pour l'overlay
     */
    function generateOverlayData(imageData) {
        const arrangementTypes = ['Cuisine', 'Dressing', 'Meuble salle de bain', 'Buffet', 'Pont de lit', 'Rangement'];
        const colors = ['Clay', 'Argile', 'Blanc', 'Gris', 'Noir', 'Taupe', 'Beige'];
        
        let firstName = 'Plum Planner';
        if (imageData.title) {
            const titleMatch = imageData.title.match(/Chez\s+([A-Z][a-z]+)/);
            if (titleMatch) {
                firstName = titleMatch[1];
            }
        }
        
        const arrangementType = arrangementTypes[Math.floor(Math.random() * arrangementTypes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return {
            arrangement: arrangementType,
            color: color,
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

        // Générer les données pour l'affichage
        const overlayData = generateOverlayData(projectData);
        
        featuredProjectTitle.textContent = `${overlayData.arrangement} · ${overlayData.color}`;
        featuredProjectSubtitle.textContent = `Réalisé par ${overlayData.firstName}`;

        // Gestion des erreurs d'image
        featuredProjectImage.onerror = function() {
            console.warn('Failed to load featured image:', imagePath);
            this.src = CONFIG.imageBasePath + 'media/1.jpg';
        };
    }

    /**
     * Crée un élément de grille avec une image
     */
    function createGridItem(imageData, index) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.dataset.index = index;

        const link = document.createElement('a');
        // spark-project.html est à la racine, donc le chemin est relatif à cette page
        link.href = `spark-project.html?index=${index}&src=${encodeURIComponent(imageData.src)}&title=${encodeURIComponent(imageData.title || '')}`;
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

        // Créer l'overlay avec texte
        const overlay = document.createElement('div');
        overlay.className = 'grid-item-overlay';
        
        const overlayContent = document.createElement('div');
        overlayContent.className = 'grid-item-overlay-content';
        
        const overlayData = generateOverlayData(imageData);
        
        const title = document.createElement('div');
        title.className = 'grid-item-title';
        title.textContent = `${overlayData.arrangement} · ${overlayData.color}`;
        
        const subtitle = document.createElement('div');
        subtitle.className = 'grid-item-subtitle';
        subtitle.textContent = `Réalisé par ${overlayData.firstName}`;
        
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
     * Charge les autres projets (excluant le projet actuel)
     * Sidebar : premiers projets (environ 3-4)
     * Grille principale : tous les autres projets
     */
    function loadOtherProjects(currentProjectIndex) {
        if (!sidebarProjectsGrid || !otherProjectsGrid) {
            console.error('Project grids not found');
            return;
        }

        // Vider les grilles
        sidebarProjectsGrid.innerHTML = '';
        otherProjectsGrid.innerHTML = '';

        // Filtrer les projets (exclure le projet actuel)
        const availableProjects = IMAGE_POOL.filter((_, index) => index !== currentProjectIndex);
        
        // Séparer en deux groupes : sidebar (premiers 3-4) et grille principale (reste)
        const sidebarProjects = availableProjects.slice(0, 4);
        const mainGridProjects = availableProjects.slice(4);

        // Charger les projets dans la sidebar
        sidebarProjects.forEach((imageData, idx) => {
            const originalIndex = IMAGE_POOL.indexOf(imageData);
            const item = createGridItem(imageData, originalIndex);
            
            setTimeout(() => {
                sidebarProjectsGrid.appendChild(item);
                setTimeout(() => {
                    item.classList.add('visible');
                }, 10);
            }, idx * CONFIG.animationDelay);
        });

        // Charger les projets dans la grille principale
        mainGridProjects.forEach((imageData, idx) => {
            const originalIndex = IMAGE_POOL.indexOf(imageData);
            const item = createGridItem(imageData, originalIndex);
            
            setTimeout(() => {
                otherProjectsGrid.appendChild(item);
                setTimeout(() => {
                    item.classList.add('visible');
                }, 10);
            }, (sidebarProjects.length + idx) * CONFIG.animationDelay);
        });
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
        let currentProjectIndex = projectIndex >= 0 ? projectIndex : 0;
        if (params.index !== null && params.index >= 0) {
            currentProjectIndex = params.index % IMAGE_POOL.length;
        }
        
        console.log('Project Page: Project found:', projectData, 'at index:', currentProjectIndex);

        // Charger le projet principal
        loadFeaturedProject(projectData);

        // Charger les autres projets
        loadOtherProjects(currentProjectIndex);
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
    window.plumSparkProject = {
        IMAGE_POOL,
        CONFIG,
        getURLParams,
        findProject
    };
})();

