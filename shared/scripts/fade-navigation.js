/**
 * Fade Navigation
 * Gère l'effet de fade lors de la navigation entre pages
 */

(function() {
    'use strict';

    // Configuration des transitions
    const FADE_OUT_DURATION = 500; // ms - durée du fade-out

    /**
     * Gère le fade-out avant la navigation
     */
    function handleNavigation(e) {
        const link = e.currentTarget;
        const href = link.getAttribute('href');
        
        // Ignorer les liens externes, les ancres, et les liens spéciaux
        if (!href || 
            href.startsWith('#') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:') ||
            href.startsWith('http') ||
            link.hasAttribute('data-no-fade')) {
            return; // Laisser le comportement par défaut
        }
        
        // Détecter si on navigue vers media
        const isMediaPage = href.includes('media') || href.includes('/media/');
        
        // Pour la page media, utiliser la transition overlay au lieu du fade
        if (isMediaPage) {
            // Marquer qu'on navigue vers media pour déclencher la transition overlay
            sessionStorage.setItem('navigateToMedia', 'true');
            // Naviguer immédiatement (la transition overlay se fera à l'arrivée)
            window.location.href = href;
            return;
        }
        
        // Pour les autres pages, utiliser le fade classique
        // Empêcher la navigation immédiate
        e.preventDefault();
        
        // Ajouter la classe fade-out pour déclencher l'animation
        document.documentElement.classList.add('fade-out');
        document.body.classList.add('fade-out');
        
        // Marquer qu'on vient d'une navigation avec fade
        sessionStorage.setItem('fadeNavigation', 'true');
        
        // Naviguer après l'animation fade-out
        setTimeout(() => {
            window.location.href = href;
        }, FADE_OUT_DURATION);
    }

    // Le fade-in est géré par les scripts inline dans les pages HTML
    // et par logo-fade.js, donc on ne le gère pas ici

    /**
     * Attacher les gestionnaires d'événements aux liens de navigation
     */
    function attachNavigationHandlers() {
        // Sélectionner tous les liens de navigation
        const navLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([href^="http"]):not([data-no-fade])');
        
        navLinks.forEach(link => {
            // Vérifier si c'est un lien de navigation (pas déjà géré par logo-fade.js)
            if (!link.classList.contains('logo-link')) {
                link.addEventListener('click', handleNavigation);
            }
        });
    }

    /**
     * Initialiser
     */
    function init() {
        // Attacher les gestionnaires de navigation
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', attachNavigationHandlers);
        } else {
            attachNavigationHandlers();
        }
    }

    // Démarrer l'initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

