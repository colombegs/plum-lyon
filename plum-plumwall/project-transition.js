/**
 * Project Transition Script
 * Gère la navigation entre plumwall.html et plumwall-project.html (sans transition)
 */

(function() {
    'use strict';

    /**
     * Initialise les liens de projet pour navigation normale
     */
    function initProjectLinks() {
        // Fonction pour attacher les listeners
        function attachListeners() {
            const projectLinks = document.querySelectorAll('.grid-item-link[href*="plumwall-project.html"]');
            
            projectLinks.forEach(link => {
                // Vérifier si le listener est déjà attaché
                if (link.dataset.transitionListener === 'true') {
                    return;
                }
                
                link.dataset.transitionListener = 'true';
                
                // Navigation normale, pas de prévention du comportement par défaut
                // Les liens fonctionnent normalement
            });
        }

        // Attacher les listeners initialement
        attachListeners();

        // Observer les changements dans le DOM pour attacher les listeners aux nouveaux éléments
        const observer = new MutationObserver(() => {
            attachListeners();
        });

        // Observer les deux grilles possibles (plumwall.html et plumwall-project.html)
        const plumwallGrid = document.getElementById('plumwallGrid');
        const otherProjectsGrid = document.getElementById('otherProjectsGrid');
        
        if (plumwallGrid) {
            observer.observe(plumwallGrid, {
                childList: true,
                subtree: true
            });
        }
        
        if (otherProjectsGrid) {
            observer.observe(otherProjectsGrid, {
                childList: true,
                subtree: true
            });
        }
    }

    // Initialiser selon la page
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Si on est sur plumwall.html, initialiser les liens
            if (window.location.pathname.includes('plumwall.html') || 
                window.location.pathname.endsWith('plumwall.html')) {
                initProjectLinks();
            }
        });
    } else {
        // DOM déjà chargé
        if (window.location.pathname.includes('plumwall.html') || 
            window.location.pathname.endsWith('plumwall.html')) {
            initProjectLinks();
        }
    }
})();

