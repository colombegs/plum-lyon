/**
 * Load Navbar Component
 * Charge dynamiquement le composant navbar depuis un fichier HTML
 */

(function() {
    'use strict';

    /**
     * Charge et insère le composant navbar
     * @param {string} componentPath - Chemin vers le fichier du composant
     * @param {string} targetSelector - Sélecteur de l'élément cible (par défaut: body)
     * @param {string} position - Position d'insertion: 'beforebegin', 'afterbegin', 'beforeend', 'afterend' (par défaut: 'afterbegin')
     */
    async function loadNavbar(componentPath, targetSelector = 'body', position = 'afterbegin') {
        try {
            console.log('Loading navbar from:', componentPath);
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load navbar: ${response.statusText} (${response.status})`);
            }
            
            const html = await response.text();
            if (!html || html.trim().length === 0) {
                throw new Error('Navbar HTML is empty');
            }
            
            const target = document.querySelector(targetSelector);
            
            if (!target) {
                throw new Error(`Target element not found: ${targetSelector}`);
            }
            
            console.log('Inserting navbar into target:', target);
            // Insérer le HTML dans le conteneur
            target.insertAdjacentHTML(position, html);
            
            // Attendre un tick pour que le DOM soit mis à jour
            await new Promise(resolve => setTimeout(resolve, 0));
            
            // Trouver la navbar qui vient d'être insérée pour corriger les chemins
            // Chercher d'abord dans le target, puis dans tout le document
            let navbar = target.querySelector('.navbar');
            if (!navbar) {
                navbar = document.querySelector('.navbar');
            }
            
            if (!navbar) {
                console.warn('Navbar element not found after insertion. HTML inserted:', html.substring(0, 200));
                return;
            }
            
            console.log('Navbar loaded successfully:', navbar);
            
            // Corriger les chemins relatifs dans les images et liens
            fixRelativePaths(navbar);
            
            // Initialiser les scripts de la navbar après chargement
            initNavbarScripts();
            // Initialiser les drawers après un court délai pour s'assurer que tout est dans le DOM
            setTimeout(() => {
                initMobileDrawers();
            }, 100);
            
        } catch (error) {
            console.error('Error loading navbar component:', error);
            // Afficher une navbar de secours ou un message d'erreur visible
            const target = document.querySelector(targetSelector);
            if (target) {
                target.innerHTML = `<div style="padding: 20px; background: #ff0000; color: white;">Erreur de chargement de la navbar: ${error.message}</div>`;
            }
        }
    }

    /**
     * Corrige les chemins relatifs dans le composant chargé
     * @param {HTMLElement} navbar - Élément navbar où le composant a été inséré
     */
    function fixRelativePaths(navbar) {
        // Obtenir le chemin de base depuis la page actuelle
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter(part => part && !part.endsWith('.html'));
        
        // Calculer la profondeur (nombre de niveaux depuis la racine)
        let depth = 0;
        if (pathParts.includes('experiments')) {
            // Pour experiments/media/index.html, depth = 2 (experiments + media)
            depth = pathParts.length;
        }
        
        // Construire le préfixe de chemin relatif
        const pathPrefix = depth > 0 ? '../'.repeat(depth) : '';
        
        // Corriger les chemins des images
        const images = navbar.querySelectorAll('img[src^="../../"]');
        images.forEach(img => {
            const src = img.getAttribute('src');
            // Remplacer ../../ par le bon nombre de ../ selon la profondeur
            if (src.startsWith('../../')) {
                const newSrc = pathPrefix + src.replace('../../', '');
                img.setAttribute('src', newSrc);
            }
        });
        
        // Corriger les liens avec data-hero-link et data-media-link
        const heroLink = navbar.querySelector('[data-hero-link]');
        if (heroLink) {
            const heroPath = depth === 0 ? 'home.html' : pathPrefix + 'home.html';
            heroLink.setAttribute('href', heroPath);
        }
        
        const mediaLink = navbar.querySelector('[data-media-link]');
        if (mediaLink) {
            const mediaPath = depth === 0 ? 'experiments/media/index.html' : pathPrefix + 'experiments/media/index.html';
            mediaLink.setAttribute('href', mediaPath);
        }
        
        // Corriger le lien du logo vers la home
        const homeLink = navbar.querySelector('[data-home-link]');
        if (homeLink) {
            const homePath = depth === 0 ? 'home.html' : pathPrefix + 'home.html';
            homeLink.setAttribute('href', homePath);
        }
        
        // Corriger le lien GALLERIE vers plumwall
        const galleryLink = navbar.querySelector('[data-gallery-link]');
        if (galleryLink) {
            const galleryPath = depth === 0 ? 'plumwall.html' : pathPrefix + 'plumwall.html';
            galleryLink.setAttribute('href', galleryPath);
        }
    }

    /**
     * Initialise les scripts nécessaires pour la navbar
     */
    function initNavbarScripts() {
        // Gestion simplifiée du hover sur les dropdowns
        const navbar = document.querySelector('.navbar');
        const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
        
        if (navbar && dropdownItems.length > 0) {
            let closeTimeout = null;
            let currentHoveredItem = null;
            
            // Fonction pour ouvrir un menu
            const openMenu = (dropdownItem) => {
                if (closeTimeout) {
                    clearTimeout(closeTimeout);
                    closeTimeout = null;
                }
                
                if (currentHoveredItem && currentHoveredItem !== dropdownItem) {
                    currentHoveredItem.classList.remove('is-hovered');
                }
                
                dropdownItem.classList.add('is-hovered');
                navbar.classList.add('navbar-white');
                navbar.classList.add('navbar-has-hover');
                currentHoveredItem = dropdownItem;
            };
            
            // Fonction pour fermer le menu
            const closeMenu = () => {
                if (closeTimeout) {
                    clearTimeout(closeTimeout);
                }
                
                closeTimeout = setTimeout(() => {
                    if (currentHoveredItem) {
                        currentHoveredItem.classList.remove('is-hovered');
                        currentHoveredItem = null;
                    }
                    
                    navbar.classList.remove('navbar-white');
                    navbar.classList.remove('navbar-has-hover');
                    closeTimeout = null;
                }, 100);
            };
            
            // Gérer les événements pour chaque dropdown
            dropdownItems.forEach(dropdownItem => {
                const dropdownMenu = dropdownItem.querySelector('.dropdown-menu');
                
                if (dropdownMenu) {
                    dropdownItem.addEventListener('mouseenter', () => openMenu(dropdownItem));
                    dropdownMenu.addEventListener('mouseenter', () => openMenu(dropdownItem));
                    dropdownItem.addEventListener('mouseleave', closeMenu);
                    dropdownMenu.addEventListener('mouseleave', closeMenu);
                }
            });
        }

        // Gestion de la barre de recherche
        const searchContainer = document.querySelector('.search-container');
        const searchBar = document.getElementById('searchBar');
        const searchInput = document.getElementById('searchInput');
        const searchClose = document.getElementById('searchClose');

        if (searchContainer && searchBar && searchInput) {
            function openSearchBar() {
                searchBar.classList.add('search-bar-active');
                setTimeout(() => {
                    searchInput.focus();
                }, 300);
            }

            function closeSearchBar() {
                searchBar.classList.remove('search-bar-active');
            }

            searchContainer.addEventListener('mouseenter', openSearchBar);
            searchContainer.addEventListener('mouseleave', closeSearchBar);
            searchBar.addEventListener('mouseleave', closeSearchBar);

            if (searchClose) {
                searchClose.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeSearchBar();
                    searchInput.value = '';
                    searchInput.blur();
                });
            }

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeSearchBar();
                    searchInput.value = '';
                    searchInput.blur();
                }
            });
        }

        // Navbar scroll effect pour navbar-over-hero
        const navbarOverHero = document.querySelector('.navbar-over-hero');
        if (navbarOverHero) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbarOverHero.classList.add('scrolled');
                } else {
                    navbarOverHero.classList.remove('scrolled');
                }
            });
        }

        // Gestion du menu burger mobile
        initMobileMenu();
    }

    /**
     * Initialise le menu burger mobile
     */
    function initMobileMenu() {
        const burgerButton = document.getElementById('burgerButton');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const body = document.body;

        if (!burgerButton || !mobileMenu || !mobileMenuOverlay) {
            return;
        }

        function openMenu() {
            burgerButton.setAttribute('aria-expanded', 'true');
            mobileMenu.classList.add('is-open');
            mobileMenuOverlay.classList.add('is-active');
            body.style.overflow = 'hidden';
        }

        function closeMenu() {
            burgerButton.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('is-open');
            mobileMenuOverlay.classList.remove('is-active');
            body.style.overflow = '';
        }

        // Ouvrir le menu
        burgerButton.addEventListener('click', () => {
            const isExpanded = burgerButton.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Fermer le menu avec l'overlay (mais pas si on clique dans le menu lui-même)
        mobileMenuOverlay.addEventListener('click', (e) => {
            // S'assurer qu'on clique bien sur l'overlay et pas sur un élément du menu
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });

        // Fermer le menu avec Escape (géré dans initMobileDrawers pour navigation)
        // La logique est dans initMobileDrawers pour gérer le retour au menu principal

        // Fermer le menu quand on clique sur un lien (seulement ceux sans sous-menu)
        const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu-link:not([data-menu-trigger])');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                closeMenu();
            });
        });
    }

    /**
     * Initialise la navigation fluide entre les vues du menu mobile
     */
    function initMobileDrawers() {
        // Éviter la double initialisation
        if (window.mobileMenuNavigationInitialized) {
            return;
        }
        window.mobileMenuNavigationInitialized = true;

        const mobileMenu = document.getElementById('mobileMenu');
        if (!mobileMenu) return;

        const menuNav = mobileMenu.querySelector('.mobile-menu-nav');
        if (!menuNav) return;

        // Afficher la vue principale par défaut
        const mainView = menuNav.querySelector('[data-menu-view="main"]');
        if (mainView) {
            mainView.classList.add('active');
        }

        // Gérer les clics sur les triggers de sous-menus
        const menuTriggers = document.querySelectorAll('[data-menu-trigger]');
        menuTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const viewId = trigger.getAttribute('data-menu-trigger');
                navigateToView(viewId, 'forward');
            });
        });

        // Gérer les boutons retour
        const backButtons = menuNav.querySelectorAll('.mobile-menu-back');
        backButtons.forEach(backButton => {
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToView('main', 'backward');
            });
        });

        // Réinitialiser à la vue principale quand le menu se ferme
        const mobileMenuObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!mobileMenu.classList.contains('is-open')) {
                        // Revenir à la vue principale
                        navigateToView('main', 'backward', false);
                    }
                }
            });
        });

        mobileMenuObserver.observe(mobileMenu, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Navigation avec Escape (revenir au menu principal)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                const activeView = menuNav.querySelector('.mobile-menu-view.active');
                if (activeView && activeView.dataset.menuView !== 'main') {
                    navigateToView('main', 'backward');
                }
            }
        });

        /**
         * Navigue vers une vue spécifique avec animation
         */
        function navigateToView(viewId, direction = 'forward', animate = true) {
            const mobileMenu = document.getElementById('mobileMenu');
            if (!mobileMenu) return;

            const menuNav = mobileMenu.querySelector('.mobile-menu-nav');
            if (!menuNav) return;

            const currentView = menuNav.querySelector('.mobile-menu-view.active');
            const targetView = menuNav.querySelector(`[data-menu-view="${viewId}"]`);

            if (!targetView) return;

            if (currentView === targetView) return;

            if (animate) {
                // Animation de sortie
                if (currentView) {
                    if (direction === 'forward') {
                        currentView.classList.add('slide-out');
                    }
                    currentView.classList.remove('active');
                }

                // Animation d'entrée
                if (direction === 'forward') {
                    targetView.style.transform = 'translateX(100%)';
                } else {
                    targetView.style.transform = 'translateX(-100%)';
                }

                // Forcer le reflow
                targetView.offsetHeight;

                // Activer la nouvelle vue
                targetView.classList.add('active');
                targetView.style.transform = '';

                // Nettoyer après l'animation
                setTimeout(() => {
                    if (currentView) {
                        currentView.classList.remove('slide-out');
                        currentView.style.transform = '';
                    }
                }, 300);
            } else {
                // Sans animation (pour la réinitialisation)
                if (currentView) {
                    currentView.classList.remove('active', 'slide-out');
                }
                targetView.classList.add('active');
                targetView.style.transform = '';
            }
        }
    }

    // Exporter la fonction pour utilisation globale
    window.loadNavbar = loadNavbar;

    // Auto-charger si un attribut data-navbar est présent
    function initNavbarLoader() {
        const navbarTarget = document.querySelector('[data-navbar]');
        if (navbarTarget) {
            const componentPath = navbarTarget.getAttribute('data-navbar');
            if (componentPath) {
                console.log('Initializing navbar loader with path:', componentPath);
                loadNavbar(componentPath, '[data-navbar]', 'afterbegin');
            } else {
                console.error('No navbar path specified in data-navbar attribute');
            }
        } else {
            console.warn('No element with [data-navbar] attribute found');
        }
    }

    // Attendre que le DOM soit complètement chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Petit délai pour s'assurer que tout est prêt
            setTimeout(initNavbarLoader, 10);
        });
    } else if (document.readyState === 'interactive') {
        // DOM en cours de chargement, attendre un peu
        setTimeout(initNavbarLoader, 10);
    } else {
        // DOM complètement chargé, exécuter immédiatement
        initNavbarLoader();
    }
})();

