/**
 * Carousel pour Bloc 4 - Bloc PP (Project Partners)
 * Gère la navigation entre les différents concepteurs avec carousel dots
 */

(function() {
    'use strict';

    // Données des concepteurs (PP = Project Partners)
    const PP_DATA = [
        {
            name: 'Bénédicte',
            projectsCount: 123,
            description: 'Avec plus d\'une centaine de projets à son actif, Bénédicte saura mettre son expertise et sa bonne humeur pour vous aider à réaliser le projet de vos rêves.',
            image: 'images/lyon/Projet 1.jpg', // Grande image de cuisine
            avatar: 'images/lyon/Bénédicte.jpg' // Petit avatar
        },
        {
            name: 'Justine',
            projectsCount: 98,
            description: 'Spécialisée dans la création d\'espaces modernes et fonctionnels, Justine vous accompagne dans la concrétisation de vos projets avec créativité et professionnalisme.',
            image: 'images/lyon/Projet 2.jpg', // Grande image de cuisine
            avatar: 'images/lyon/Justine.jpg' // Petit avatar
        },
        {
            name: 'Jessica',
            projectsCount: 156,
            description: 'Expert en design d\'intérieur, Jessica transforme vos idées en espaces élégants et harmonieux, en alliant esthétique contemporaine et fonctionnalité.',
            image: 'images/lyon/Projet 3.jpg', // Grande image de cuisine
            avatar: 'images/lyon/Jessica Lejeune.jpg' // Petit avatar
        }
    ];

    let currentIndex = 0;

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        const avatarElement = document.getElementById('lyonPpAvatar');
        const nameElement = document.getElementById('lyonPpName');
        const descriptionElement = document.getElementById('lyonPpDescription');
        const dotsContainer = document.getElementById('lyonPpDots');
        const imageColumn = document.querySelector('.lyon-pp-image-column');
        const textColumn = document.querySelector('.lyon-pp-text-column');
        const nextButton = document.getElementById('lyonPpNext');
        const prevButton = document.getElementById('lyonPpPrev');

        if (!avatarElement || !nameElement || !descriptionElement || !dotsContainer) {
            return;
        }

        const FADE_DURATION = 200;

        // Créer les dots du carousel
        function createDots() {
            dotsContainer.innerHTML = '';
            PP_DATA.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'lyon-pp-dot';
                if (index === currentIndex) {
                    dot.classList.add('active');
                }
                dot.setAttribute('aria-label', `Aller au concepteur ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        // Mettre à jour le contenu affiché
        function updateContent() {
            const currentPP = PP_DATA[currentIndex];
            
            // L'image de gauche reste statique (homeproject1.jpg), on ne la modifie plus
            
            if (avatarElement) {
                avatarElement.src = currentPP.avatar;
                avatarElement.alt = currentPP.name;
            }
            
            if (nameElement) {
                nameElement.textContent = currentPP.name;
            }
            
            if (descriptionElement) {
                descriptionElement.textContent = currentPP.description;
            }

            // Mettre à jour les dots
            const dots = dotsContainer.querySelectorAll('.lyon-pp-dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Aller à une slide spécifique avec fade
        function goToSlide(index) {
            if (index < 0 || index >= PP_DATA.length || index === currentIndex) {
                return;
            }
            // L'image de gauche reste statique, on n'applique pas le fade-out
            if (textColumn) textColumn.classList.add('fade-out');
            setTimeout(function() {
                currentIndex = index;
                updateContent();
                if (textColumn) textColumn.classList.remove('fade-out');
            }, FADE_DURATION);
        }

        // Slide suivante
        function nextSlide() {
            goToSlide((currentIndex + 1) % PP_DATA.length);
        }

        // Slide précédente
        function prevSlide() {
            goToSlide((currentIndex - 1 + PP_DATA.length) % PP_DATA.length);
        }

        // Gestion des boutons de navigation
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }

        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }

        // Navigation au clavier
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Initialisation
        createDots();
        updateContent();

        // Défilement automatique toutes les 4 secondes pour les concepteurs
        const AUTO_PLAY_INTERVAL = 4000;
        let autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_INTERVAL);

        // Réinitialiser le timer lors d'une interaction manuelle
        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
        }

        [nextButton, prevButton].forEach(function(btn) {
            if (btn) btn.addEventListener('click', resetAutoPlay);
        });
        dotsContainer.addEventListener('click', resetAutoPlay);
    });
})();
