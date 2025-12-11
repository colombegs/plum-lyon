/**
 * Mobile Menu Handler - Plum Living
 * Gère l'ouverture/fermeture du menu burger mobile
 */

(function() {
    'use strict';

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
        // On attend un peu pour que initMobileDrawers attache ses handlers d'abord
        setTimeout(() => {
            const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu-link:not([data-menu-trigger])');
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    closeMenu();
                });
            });
        }, 50);

        // Fermer automatiquement le menu quand on passe à un breakpoint plus grand
        const mobileBreakpoint = window.matchMedia('(max-width: 768px)');
        
        function handleBreakpointChange(e) {
            // Si on passe au-dessus de 768px (donc e.matches === false) et que le menu est ouvert
            if (!e.matches && mobileMenu.classList.contains('is-open')) {
                closeMenu();
            }
        }

        // Écouter les changements de breakpoint
        if (mobileBreakpoint.addEventListener) {
            mobileBreakpoint.addEventListener('change', handleBreakpointChange);
        } else {
            // Fallback pour les navigateurs plus anciens
            mobileBreakpoint.addListener(handleBreakpointChange);
        }

        // Vérifier aussi au chargement de la page
        if (!mobileBreakpoint.matches && mobileMenu.classList.contains('is-open')) {
            closeMenu();
        }
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
        
        // Initialiser l'état de la navbar
        updateNavbarForView('main');

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

        // Gérer le clic sur le bouton back dans la navbar (navbar-submenu-back)
        const navbarSubmenuBack = document.getElementById('navbarSubmenuBack');
        if (navbarSubmenuBack) {
            navbarSubmenuBack.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                navigateToView('main', 'backward');
            });
        }

        // Réinitialiser à la vue principale quand le menu se ferme
        const mobileMenuObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!mobileMenu.classList.contains('is-open')) {
                        // Revenir à la vue principale
                        navigateToView('main', 'backward', false);
                        // Réinitialiser la navbar
                        updateNavbarForView('main');
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
    }

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

        // Gérer l'affichage du logo/titre et l'icône burger/back
        updateNavbarForView(viewId);

        if (animate) {
            // Animation de sortie (fade out)
            if (currentView) {
                currentView.classList.add('slide-out');
                currentView.classList.remove('active');
            }

            // Animation d'entrée (fade in)
            // Forcer le reflow
            targetView.offsetHeight;

            // Activer la nouvelle vue (fade in)
            targetView.classList.add('active');

            // Nettoyer après l'animation
            setTimeout(() => {
                if (currentView) {
                    currentView.classList.remove('slide-out');
                }
            }, 300);
        } else {
            // Sans animation (pour la réinitialisation)
            if (currentView) {
                currentView.classList.remove('active', 'slide-out');
            }
            targetView.classList.add('active');
        }
    }

    /**
     * Met à jour la navbar selon la vue active (logo/titre et burger/back)
     */
    function updateNavbarForView(viewId) {
        const navbar = document.querySelector('.navbar');
        const navbarSubmenuHeader = document.getElementById('navbarSubmenuHeader');
        const navbarSubmenuTitle = document.getElementById('navbarSubmenuTitle');
        const navbarSubmenuBack = document.getElementById('navbarSubmenuBack');
        const mobileMenuSubmenuHeader = document.getElementById('mobileMenuSubmenuHeader');
        const mobileMenuSubmenuTitle = document.getElementById('mobileMenuSubmenuTitle');
        const mobileMenu = document.getElementById('mobileMenu');

        // Gérer la navbar (si elle existe)
        if (navbar && navbarSubmenuHeader && navbarSubmenuTitle && navbarSubmenuBack) {
            if (viewId === 'main') {
                navbar.classList.remove('has-submenu');
                navbarSubmenuHeader.classList.remove('is-active');
            } else {
                navbar.classList.add('has-submenu');
                navbarSubmenuHeader.classList.add('is-active');
                
                // Récupérer le titre du sous-menu depuis l'attribut data-submenu-title
                const targetView = document.querySelector(`[data-menu-view="${viewId}"]`);
                if (targetView) {
                    const submenuTitle = targetView.getAttribute('data-submenu-title');
                    if (submenuTitle) {
                        navbarSubmenuTitle.textContent = submenuTitle;
                    }
                }
            }
        }

    }

    // Initialiser quand le DOM est prêt
    console.log('mobile-menu.js loaded, document readyState:', document.readyState);
    
    function initializeAll() {
        console.log('Initializing mobile menu and drawers...');
        initMobileMenu();
        // Attendre un peu pour s'assurer que le DOM est complètement prêt
        setTimeout(() => {
            initMobileDrawers();
        }, 100);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOMContentLoaded - initializing mobile menu and drawers');
            initializeAll();
        });
    } else {
        console.log('DOM already ready - initializing mobile menu and drawers immediately');
        // Utiliser setTimeout même si le DOM est prêt pour être sûr que tout est chargé
        setTimeout(initializeAll, 100);
    }
})();

