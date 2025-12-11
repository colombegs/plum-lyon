/**
 * Logo Fade Navigation
 * Gère l'effet de fade lors du clic sur le logo pour revenir à la hero
 */

(function() {
    'use strict';

    // Fonction pour obtenir le chemin vers home.html depuis la page actuelle
    function getHomePath() {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter(part => part);
        
        // Compter le nombre de niveaux de profondeur
        let depth = 0;
        if (pathParts.includes('experiments')) {
            // Si on est dans experiments/media, experiments/category, etc.
            depth = pathParts.length - 1; // -1 car on ne compte pas le nom du fichier
        } else {
            // Si on est à la racine (navbar.html, home.html)
            depth = 0;
        }
        
        // Construire le chemin relatif
        if (depth === 0) {
            return 'home.html';
        } else {
            return '../'.repeat(depth) + 'home.html';
        }
    }

    // Initialiser le fade-in au chargement de la page
    function initFadeIn() {
        // Ne pas déclencher le fade-in sur la page media (utilise la transition overlay)
        const isMediaPage = window.location.pathname.includes('media') || 
                           window.location.pathname.includes('/media/');
        
        if (isMediaPage) {
            // La page media gère sa propre transition overlay
            return;
        }
        
        // Vérifier si on vient d'une navigation avec fade
        if (sessionStorage.getItem('fadeNavigation') === 'true') {
            // Ajouter la classe fade-in immédiatement (html et body seront invisibles)
            document.documentElement.classList.add('fade-in');
            document.body.classList.add('fade-in');
            
            // Attendre que le DOM soit complètement chargé
            // puis ajouter la classe loaded pour déclencher le fade-in
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    document.documentElement.classList.add('loaded');
                    document.body.classList.add('loaded');
                    // Nettoyer après l'animation
                    setTimeout(() => {
                        document.documentElement.classList.remove('fade-in', 'loaded');
                        document.body.classList.remove('fade-in', 'loaded');
                        document.documentElement.style.opacity = '';
                    }, 500);
                });
            });
            
            sessionStorage.removeItem('fadeNavigation');
        }
    }

    // Gérer le clic sur le logo
    function handleLogoClick(e) {
        const logoLink = e.currentTarget;
        const href = logoLink.getAttribute('href');
        
        // Si le lien pointe vers "/" ou "home.html", on gère le fade
        if (href === '/' || href === 'home.html' || href === '../../home.html' || href.includes('home.html')) {
            e.preventDefault();
            
            // Déterminer le chemin vers home.html
            let homePath;
            if (href.includes('home.html')) {
                // Utiliser le href du lien s'il pointe déjà vers home.html
                homePath = href;
            } else {
                // Calculer le chemin
                homePath = getHomePath();
            }
            
            // Ajouter la classe fade-out au html et body
            document.documentElement.classList.add('fade-out');
            document.body.classList.add('fade-out');
            
            // Marquer qu'on vient d'une navigation avec fade
            sessionStorage.setItem('fadeNavigation', 'true');
            
            // Naviguer après l'animation fade-out
            setTimeout(() => {
                window.location.href = homePath;
            }, 400); // Durée de l'animation fade-out (doit correspondre au CSS)
        }
    }

    // Initialiser quand le DOM est prêt
    function init() {
        // Fade-in au chargement
        initFadeIn();
        
        // Attacher l'événement sur tous les liens logo
        const logoLinks = document.querySelectorAll('.logo-link');
        logoLinks.forEach(link => {
            link.addEventListener('click', handleLogoClick);
        });
    }

    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

