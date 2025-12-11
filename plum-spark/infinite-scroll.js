/**
 * Infinite Scroll Script pour Plum Spark
 * Charge dynamiquement plus d'images au scroll
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        itemsPerLoad: 12, // Nombre d'images à charger à chaque fois
        loadThreshold: 500, // Distance en pixels avant la fin pour déclencher le chargement
        imageBasePath: 'images/', // Chemin de base pour les images (depuis la racine)
        animationDelay: 50 // Délai entre chaque animation d'image (ms)
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

    // Éléments DOM - seront récupérés après le chargement du DOM
    let grid = null;
    let loadingIndicator = null;
    let modalGrid = null;
    let modalInitialized = false;
    
    function getDOMElements() {
        if (!grid) {
            grid = document.getElementById('sparkGrid');
        }
        if (!loadingIndicator) {
            loadingIndicator = document.getElementById('loadingIndicator');
        }
        if (!modalGrid) {
            modalGrid = document.getElementById('modalGrid');
        }
        return grid !== null;
    }

    /**
     * Vérifie si les éléments de la modal sont disponibles
     */
    function areModalElementsAvailable() {
        const modal = document.getElementById('imageModal');
        const backdrop = document.getElementById('modalBackdrop');
        const closeBtn = document.getElementById('modalClose');
        const modalImage = document.getElementById('modalImage');
        const modalImageWrapper = document.getElementById('modalImageWrapper');
        
        const available = !!(modal && backdrop && closeBtn && modalImage && modalImageWrapper);
        
        if (!available) {
            // Debug: vérifier quels éléments manquent
            console.log('Modal elements check:', {
                modal: !!modal,
                backdrop: !!backdrop,
                closeBtn: !!closeBtn,
                modalImage: !!modalImage,
                modalImageWrapper: !!modalImageWrapper
            });
        }
        
        return available;
    }

    /**
     * Génère des données placeholder pour l'overlay
     */
    function generateOverlayData(imageData) {
        // Types d'agencement possibles
        const arrangementTypes = ['Cuisine', 'Dressing', 'Meuble salle de bain', 'Buffet', 'Pont de lit', 'Rangement'];
        
        // Couleurs possibles
        const colors = ['Clay', 'Argile', 'Blanc', 'Gris', 'Noir', 'Taupe', 'Beige'];
        
        // Extraire le prénom du titre si possible
        let firstName = 'Plum Planner';
        if (imageData.title) {
            const titleMatch = imageData.title.match(/Chez\s+([A-Z][a-z]+)/);
            if (titleMatch) {
                firstName = titleMatch[1];
            }
        }
        
        // Sélectionner aléatoirement un type et une couleur
        const arrangementType = arrangementTypes[Math.floor(Math.random() * arrangementTypes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return {
            arrangement: arrangementType,
            color: color,
            firstName: firstName
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
        link.href = '#';
        link.className = 'grid-item-link';
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openImageModal(imageData, img, item);
        });

        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'grid-item-image';

        const img = document.createElement('img');
        const imagePath = CONFIG.imageBasePath + imageData.src;
        img.src = imagePath;
        img.alt = imageData.title || 'Rendu 3D';
        img.className = 'grid-item-img';
        img.loading = 'lazy'; // Lazy loading natif

        // Gestion des erreurs d'image
        img.onerror = function() {
            console.warn('Failed to load image:', imagePath);
            // Optionnel: afficher une image placeholder
            this.src = CONFIG.imageBasePath + 'media/1.jpg';
        };
        
        img.onload = function() {
            console.log('Image loaded:', imagePath);
        };

        // Créer l'overlay avec texte
        const overlay = document.createElement('div');
        overlay.className = 'grid-item-overlay';
        
        const overlayContent = document.createElement('div');
        overlayContent.className = 'grid-item-overlay-content';
        
        // Générer les données pour l'overlay
        const overlayData = generateOverlayData(imageData);
        
        // Titre : Type d'agencement · Couleur
        const title = document.createElement('div');
        title.className = 'grid-item-title';
        title.textContent = `${overlayData.arrangement} · ${overlayData.color}`;
        
        // Sous-titre : Réalisé par X
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
     * Charge un batch d'images (boucle infinie)
     */
    function loadImages(count = CONFIG.itemsPerLoad) {
        if (!grid) {
            console.error('Plum Spark: Grid not available');
            return;
        }
        
        if (isLoading) {
            console.log('Plum Spark: loadImages skipped - isLoading:', isLoading);
            return;
        }

        console.log('Plum Spark: Chargement de', count, 'images, index:', currentIndex);
        isLoading = true;
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }

        // Simuler un délai de chargement (à retirer en production si les images sont locales)
        setTimeout(() => {
            const itemsToLoad = [];
            const totalImages = IMAGE_POOL.length;

            console.log('Plum Spark: Création des items de', currentIndex, 'à', currentIndex + count);

            // Charger les images en boucle infinie
            for (let i = 0; i < count; i++) {
                // Utiliser le modulo pour boucler sur le pool d'images
                const poolIndex = (currentIndex + i) % totalImages;
                const imageData = IMAGE_POOL[poolIndex];
                // Utiliser un index unique pour chaque item (pour éviter les conflits)
                const uniqueIndex = currentIndex + i;
                const item = createGridItem(imageData, uniqueIndex);
                itemsToLoad.push(item);
            }

            // Ajouter les items au DOM
            itemsToLoad.forEach((item, index) => {
                grid.appendChild(item);
                
                // Animer l'apparition avec un délai progressif
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * CONFIG.animationDelay);
            });

            console.log('Plum Spark:', itemsToLoad.length, 'items ajoutés au DOM');

            // Incrémenter l'index (peut dépasser la taille du pool, le modulo gère la boucle)
            currentIndex += count;

            isLoading = false;
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }, 100); // Délai réduit pour un chargement plus rapide
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
     * Intersection Observer pour les animations au scroll
     */
    function setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observer les nouveaux items ajoutés
        const observeNewItems = () => {
            const items = grid.querySelectorAll('.grid-item:not(.observed)');
            items.forEach(item => {
                item.classList.add('observed');
                observer.observe(item);
            });
        };

        // Observer initial
        observeNewItems();

        // Observer après chaque chargement
        const originalLoadImages = loadImages;
        loadImages = function(...args) {
            const result = originalLoadImages.apply(this, args);
            setTimeout(observeNewItems, 100);
            return result;
        };
    }

    /**
     * Initialisation
     */
    function init() {
        console.log('Plum Spark: Initialisation...');
        
        // Récupérer les éléments DOM
        if (!getDOMElements()) {
            console.error('Plum Spark: Grid element not found! Retrying...');
            setTimeout(init, 100);
            return;
        }
        
        console.log('Plum Spark: Grid element found:', grid);
        console.log('Plum Spark: Image pool size:', IMAGE_POOL.length);
        
        // Charger le premier batch d'images
        loadImages();

        // Écouter le scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(checkScrollPosition, 100);
        }, { passive: true });

        // Vérifier aussi au resize (pour les changements de colonnes)
        window.addEventListener('resize', () => {
            checkScrollPosition();
        }, { passive: true });

        // Setup Intersection Observer
        setupIntersectionObserver();

        // Setup Image Modal - essayer plusieurs fois si nécessaire
        let modalSetupAttempts = 0;
        const maxModalSetupAttempts = 10;
        const trySetupModal = () => {
            modalSetupAttempts++;
            if (!setupImageModal() && modalSetupAttempts < maxModalSetupAttempts) {
                setTimeout(trySetupModal, 100);
            } else if (modalSetupAttempts >= maxModalSetupAttempts) {
                console.warn('Could not setup modal after', maxModalSetupAttempts, 'attempts');
            }
        };
        
        // Utiliser requestAnimationFrame pour s'assurer que le DOM est complètement rendu
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                trySetupModal();
            });
        });
    }

    /**
     * Ouvre la modal avec une image et animation de zoom
     */
    function openImageModal(imageData, sourceImg, sourceItem) {
        // S'assurer que la modal est initialisée
        if (!modalInitialized) {
            if (!setupImageModal()) {
                // Si la modal n'est pas encore disponible, essayer de l'initialiser et réessayer
                let retryAttempts = 0;
                const maxRetries = 10;
                const retryInterval = setInterval(() => {
                    retryAttempts++;
                    if (setupImageModal() || retryAttempts >= maxRetries) {
                        clearInterval(retryInterval);
                        if (areModalElementsAvailable()) {
                            openImageModal(imageData, sourceImg, sourceItem);
                        } else {
                            console.error('Modal elements still not available after', retryAttempts, 'attempts');
                        }
                    }
                }, 50);
                return;
            }
        }

        // Vérifier à nouveau que les éléments sont disponibles
        if (!areModalElementsAvailable()) {
            console.error('Modal elements not found');
            return;
        }

        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalImageWrapper = document.getElementById('modalImageWrapper');

        // Obtenir la position de l'image source dans la page
        const sourceRect = sourceImg.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // Définir l'image dans la modal
        modalImage.src = sourceImg.src;
        modalImage.alt = imageData.title || 'Rendu 3D';

        // Positionner initialement l'image wrapper à la position source
        const initialWidth = sourceRect.width;
        const initialHeight = sourceRect.height;
        const initialTop = sourceRect.top + scrollTop;
        const initialLeft = sourceRect.left + scrollLeft;

        modalImageWrapper.style.position = 'fixed';
        modalImageWrapper.style.top = initialTop + 'px';
        modalImageWrapper.style.left = initialLeft + 'px';
        modalImageWrapper.style.width = initialWidth + 'px';
        modalImageWrapper.style.height = initialHeight + 'px';
        modalImageWrapper.style.opacity = '0';
        modalImageWrapper.style.transform = 'scale(0.8)';
        modalImageWrapper.style.transition = 'none';

        // Activer la modal (backdrop visible)
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Calculer la position finale (centré)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Calculer les dimensions finales
                const maxWidth = Math.min(1400, window.innerWidth - 80);
                const maxHeight = window.innerHeight * 0.85;
                const imgAspectRatio = sourceImg.naturalWidth / sourceImg.naturalHeight;
                
                let finalWidth = maxWidth;
                let finalHeight = maxWidth / imgAspectRatio;
                
                if (finalHeight > maxHeight) {
                    finalHeight = maxHeight;
                    finalWidth = maxHeight * imgAspectRatio;
                }

                const finalTop = scrollTop + (window.innerHeight / 2) - (finalHeight / 2);
                const finalLeft = scrollLeft + (window.innerWidth / 2) - (finalWidth / 2);

                // Activer la transition et animer vers la position finale
                modalImageWrapper.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                modalImageWrapper.style.top = finalTop + 'px';
                modalImageWrapper.style.left = finalLeft + 'px';
                modalImageWrapper.style.width = finalWidth + 'px';
                modalImageWrapper.style.height = finalHeight + 'px';
                modalImageWrapper.style.opacity = '1';
                modalImageWrapper.style.transform = 'scale(1)';

                // Après l'animation, passer en position relative pour le scroll
                setTimeout(() => {
                    modalImageWrapper.style.position = 'relative';
                    modalImageWrapper.style.top = 'auto';
                    modalImageWrapper.style.left = 'auto';
                    modalImageWrapper.style.width = '100%';
                    modalImageWrapper.style.height = 'auto';
                }, 600);

                // Charger les images dans la grille de la modal
                loadModalGrid();
            });
        });
    }

    /**
     * Charge les images dans la grille de la modal
     */
    function loadModalGrid() {
        if (!modalGrid) {
            modalGrid = document.getElementById('modalGrid');
        }
        if (!modalGrid) return;

        // Vider la grille si nécessaire
        modalGrid.innerHTML = '';

        // Charger toutes les images disponibles
        IMAGE_POOL.forEach((imageData, index) => {
            const item = createGridItem(imageData, index);
            item.classList.add('visible');
            modalGrid.appendChild(item);
        });
    }

    /**
     * Crée la modal dynamiquement si elle n'existe pas
     */
    function createModalIfNeeded() {
        let modal = document.getElementById('imageModal');
        
        if (!modal) {
            // Créer la modal dynamiquement
            modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.id = 'imageModal';
            
            const backdrop = document.createElement('div');
            backdrop.className = 'image-modal-backdrop';
            backdrop.id = 'modalBackdrop';
            
            const content = document.createElement('div');
            content.className = 'image-modal-content';
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'image-modal-close';
            closeBtn.id = 'modalClose';
            closeBtn.setAttribute('aria-label', 'Fermer');
            closeBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
            
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'image-modal-image-wrapper';
            imageWrapper.id = 'modalImageWrapper';
            
            const img = document.createElement('img');
            img.className = 'image-modal-image';
            img.id = 'modalImage';
            img.src = '';
            img.alt = '';
            
            imageWrapper.appendChild(img);
            content.appendChild(closeBtn);
            content.appendChild(imageWrapper);
            
            const gridSection = document.createElement('div');
            gridSection.className = 'image-modal-grid-section';
            
            const container = document.createElement('div');
            container.className = 'container';
            
            const grid = document.createElement('div');
            grid.className = 'spark-grid';
            grid.id = 'modalGrid';
            
            container.appendChild(grid);
            gridSection.appendChild(container);
            
            modal.appendChild(backdrop);
            modal.appendChild(content);
            modal.appendChild(gridSection);
            
            document.body.appendChild(modal);
            
            console.log('Modal créée dynamiquement');
        }
        
        return modal;
    }

    /**
     * Setup de la modal d'image
     */
    function setupImageModal() {
        // Éviter les appels multiples
        if (modalInitialized) {
            return true;
        }

        // Créer la modal si elle n'existe pas
        createModalIfNeeded();

        // Vérifier si les éléments sont maintenant disponibles
        if (!areModalElementsAvailable()) {
            return false;
        }

        const modal = document.getElementById('imageModal');
        const backdrop = document.getElementById('modalBackdrop');
        const closeBtn = document.getElementById('modalClose');

        if (!modal || !backdrop || !closeBtn) {
            return false;
        }

        // Marquer comme initialisé
        modalInitialized = true;

        // Fermer au clic sur le backdrop
        backdrop.addEventListener('click', closeImageModal);

        // Fermer au clic sur le bouton close
        closeBtn.addEventListener('click', closeImageModal);

        // Fermer avec Escape (une seule fois)
        const escapeHandler = (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeImageModal();
            }
        };
        document.addEventListener('keydown', escapeHandler);

        return true;
    }

    /**
     * Ferme la modal avec animation
     */
    function closeImageModal() {
        const modal = document.getElementById('imageModal');
        const modalImageWrapper = document.getElementById('modalImageWrapper');
        const modalImage = document.getElementById('modalImage');

        if (!modal || !modal.classList.contains('active')) {
            return;
        }

        // Animation de fermeture avec le même cubic-bezier
        modalImageWrapper.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        modalImageWrapper.style.opacity = '0';
        modalImageWrapper.style.transform = 'scale(0.8)';

        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            modalImageWrapper.style.opacity = '';
            modalImageWrapper.style.transform = '';
            modalImageWrapper.style.transition = '';
            modalImageWrapper.style.position = '';
            modalImageWrapper.style.top = '';
            modalImageWrapper.style.left = '';
            modalImageWrapper.style.width = '';
            modalImageWrapper.style.height = '';
            modalImage.src = '';
        }, 400);
    }

    // Attendre que le DOM soit complètement chargé
    function waitForDOM() {
        if (document.readyState === 'loading') {
            // Attendre DOMContentLoaded puis window.load pour être sûr
            document.addEventListener('DOMContentLoaded', () => {
                window.addEventListener('load', () => {
                    setTimeout(init, 100);
                });
            });
        } else if (document.readyState === 'interactive') {
            // DOM est chargé mais pas toutes les ressources
            window.addEventListener('load', () => {
                setTimeout(init, 100);
            });
        } else {
            // Tout est déjà chargé
            setTimeout(init, 100);
        }
    }
    
    waitForDOM();

    // Exposer pour debug
    window.plumSpark = {
        loadImages,
        currentIndex,
        IMAGE_POOL,
        CONFIG
    };
})();
