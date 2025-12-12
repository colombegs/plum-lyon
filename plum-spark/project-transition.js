/**
 * Project Transition Script
 * Gère la transition smooth avec effet de zoom entre spark.html et spark-project.html
 */

(function() {
    'use strict';

    // Configuration
    const TRANSITION_DURATION = 600; // ms
    const TRANSITION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

    /**
     * Crée un élément de transition qui s'agrandit depuis l'image source
     */
    function createTransitionElement(sourceImg, targetUrl) {
        // Obtenir la position et taille de l'image source
        const rect = sourceImg.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // Créer l'élément de transition
        const transitionEl = document.createElement('div');
        transitionEl.className = 'project-transition';
        
        // Obtenir le border-radius de l'image source si elle en a un
        const computedStyle = window.getComputedStyle(sourceImg);
        const borderRadius = computedStyle.borderRadius || '12px';
        
        transitionEl.style.cssText = `
            position: fixed;
            top: ${rect.top + scrollTop}px;
            left: ${rect.left + scrollLeft}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            z-index: 99999;
            overflow: hidden;
            pointer-events: none;
            will-change: transform, width, height, top, left;
            border-radius: ${borderRadius};
            background-color: var(--color-white);
        `;

        // Créer l'image à l'intérieur
        const img = document.createElement('img');
        img.src = sourceImg.src;
        img.alt = sourceImg.alt;
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        `;

        transitionEl.appendChild(img);
        document.body.appendChild(transitionEl);

        // Calculer les dimensions finales (plein écran)
        const finalWidth = window.innerWidth;
        const finalHeight = window.innerHeight;
        const finalTop = scrollTop;
        const finalLeft = scrollLeft;

        // Forcer un reflow pour s'assurer que les styles initiaux sont appliqués
        transitionEl.offsetHeight;

        // Animer vers la position finale
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                transitionEl.style.transition = `all ${TRANSITION_DURATION}ms ${TRANSITION_EASING}`;
                transitionEl.style.top = `${finalTop}px`;
                transitionEl.style.left = `${finalLeft}px`;
                transitionEl.style.width = `${finalWidth}px`;
                transitionEl.style.height = `${finalHeight}px`;
                transitionEl.style.borderRadius = '0';
            });
        });

        // Stocker les informations de transition pour la page suivante
        sessionStorage.setItem('projectTransition', JSON.stringify({
            src: sourceImg.src,
            alt: sourceImg.alt,
            timestamp: Date.now()
        }));

        // Naviguer vers la nouvelle page après un court délai
        setTimeout(() => {
            window.location.href = targetUrl;
        }, TRANSITION_DURATION * 0.6); // Naviguer à 60% de l'animation pour plus de fluidité
    }

    /**
     * Initialise les transitions pour les liens de projet
     */
    function initProjectTransitions() {
        // Fonction pour attacher les listeners
        function attachListeners() {
            const projectLinks = document.querySelectorAll('.grid-item-link[href*="spark-project.html"]');
            
            projectLinks.forEach(link => {
                // Vérifier si le listener est déjà attaché
                if (link.dataset.transitionListener === 'true') {
                    return;
                }
                
                link.dataset.transitionListener = 'true';
                
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const href = this.getAttribute('href');
                    const img = this.querySelector('.grid-item-img');
                    
                    if (!img) {
                        // Fallback : navigation normale si pas d'image trouvée
                        window.location.href = href;
                        return;
                    }

                    // Créer et lancer la transition
                    createTransitionElement(img, href);
                });
            });
        }

        // Attacher les listeners initialement
        attachListeners();

        // Observer les changements dans le DOM pour attacher les listeners aux nouveaux éléments
        const observer = new MutationObserver(() => {
            attachListeners();
        });

        // Observer les deux grilles possibles (spark.html et spark-project.html)
        const sparkGrid = document.getElementById('sparkGrid');
        const otherProjectsGrid = document.getElementById('otherProjectsGrid');
        
        if (sparkGrid) {
            observer.observe(sparkGrid, {
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

    /**
     * Crée l'élément de transition sur la page de destination
     */
    function createDestinationTransition() {
        const transitionData = sessionStorage.getItem('projectTransition');
        
        if (!transitionData) {
            return;
        }

        try {
            const data = JSON.parse(transitionData);
            
            // Créer l'élément de transition qui couvre tout l'écran
            const transitionEl = document.createElement('div');
            transitionEl.className = 'project-transition';
            transitionEl.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 99999;
                overflow: hidden;
                pointer-events: none;
                background-color: var(--color-white);
            `;

            const img = document.createElement('img');
            img.src = data.src;
            img.alt = data.alt || '';
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
            `;

            transitionEl.appendChild(img);
            document.body.appendChild(transitionEl);
            
            // Ajouter une classe au body pour masquer le contenu
            document.body.classList.add('project-transition-active');

            // Attendre que le contenu de la page soit chargé
            const featuredImage = document.getElementById('featuredProjectImage');
            
            function fadeOutTransition() {
                transitionEl.style.opacity = '0';
                transitionEl.style.transition = `opacity 0.4s ${TRANSITION_EASING}`;
                
                setTimeout(() => {
                    transitionEl.remove();
                    document.body.classList.remove('project-transition-active');
                    sessionStorage.removeItem('projectTransition');
                }, 400);
            }

            if (featuredImage) {
                // Attendre que l'image soit chargée
                if (featuredImage.complete && featuredImage.naturalHeight !== 0) {
                    setTimeout(fadeOutTransition, 100);
                } else {
                    featuredImage.onload = function() {
                        setTimeout(fadeOutTransition, 100);
                    };
                }
            } else {
                // Si pas d'image trouvée, attendre un peu puis faire disparaître
                setTimeout(fadeOutTransition, 500);
            }
        } catch (e) {
            console.error('Error parsing transition data:', e);
            sessionStorage.removeItem('projectTransition');
        }
    }

    // Initialiser selon la page
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Si on est sur spark.html, initialiser les transitions
            if (window.location.pathname.includes('spark.html') || 
                window.location.pathname.endsWith('spark.html')) {
                initProjectTransitions();
            }
            
            // Si on est sur spark-project.html, créer la transition d'arrivée
            if (window.location.pathname.includes('spark-project.html')) {
                createDestinationTransition();
            }
        });
    } else {
        // DOM déjà chargé
        if (window.location.pathname.includes('spark.html') || 
            window.location.pathname.endsWith('spark.html')) {
            initProjectTransitions();
        }
        
        if (window.location.pathname.includes('spark-project.html')) {
            createDestinationTransition();
        }
    }
})();

