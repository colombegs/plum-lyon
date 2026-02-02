/**
 * Carousel pour Bloc 4 - Bloc PP (Project Partners)
 * Gère la navigation entre les différents concepteurs avec carousel dots
 */

(function() {
    'use strict';

    // Données des concepteurs (PP = Project Partners)
    const PP_DATA = [
        {
            name: 'Fabien',
            projectsCount: 123,
            description: 'Avec plus d\'une centaine de projets à son actif, Fabien saura mettre son expertise et sa bonne humeur pour vous aider à réaliser le projet de vos rêves.',
            image: 'images/marseille/Projet 1.jpg', // Grande image de cuisine
            avatar: 'images/marseille/PP-1.jpg' // Petit avatar
        },
        {
            name: 'Justine',
            projectsCount: 98,
            description: 'Spécialisée dans la création d\'espaces modernes et fonctionnels, Justine vous accompagne dans la concrétisation de vos projets avec créativité et professionnalisme.',
            image: 'images/marseille/Projet 2.jpg', // Grande image de cuisine
            avatar: 'images/marseille/PP-2.jpg' // Petit avatar
        },
        {
            name: 'Thomas',
            projectsCount: 156,
            description: 'Expert en design d\'intérieur, Thomas transforme vos idées en espaces élégants et harmonieux, en alliant esthétique contemporaine et fonctionnalité.',
            image: 'images/marseille/Projet 3.jpg', // Grande image de cuisine
            avatar: 'images/marseille/PP-3.jpg' // Petit avatar
        },
        {
            name: 'Marie',
            projectsCount: 87,
            description: 'Passionnée par le design et l\'architecture, Marie vous guide dans la création d\'un intérieur unique qui reflète votre personnalité et votre style de vie.',
            image: 'images/marseille/Projet 4.jpg', // Grande image de cuisine
            avatar: 'images/marseille/PP.jpg' // Petit avatar
        },
        {
            name: 'Sophie',
            projectsCount: 112,
            description: 'Designer d\'intérieur passionnée, Sophie crée des espaces harmonieux et personnalisés qui allient esthétique moderne et fonctionnalité pratique pour transformer votre quotidien.',
            image: 'images/marseille/Projet 5.jpg', // Grande image de cuisine
            avatar: 'images/marseille/PP-1.jpg' // Petit avatar (à ajuster si nécessaire)
        }
    ];

    let currentIndex = 0;

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        const imageElement = document.getElementById('marseillePpImage');
        const avatarElement = document.getElementById('marseillePpAvatar');
        const nameElement = document.getElementById('marseillePpName');
        const projectsCountElement = document.getElementById('marseillePpProjectsCount');
        const descriptionElement = document.getElementById('marseillePpDescription');
        const dotsContainer = document.getElementById('marseillePpDots');
        const imageColumn = document.querySelector('.marseille-pp-image-column');
        const textColumn = document.querySelector('.marseille-pp-text-column');
        const nextButton = document.getElementById('marseillePpNext');
        const prevButton = document.getElementById('marseillePpPrev');

        if (!imageElement || !avatarElement || !nameElement || !projectsCountElement || !descriptionElement || !dotsContainer) {
            return;
        }

        const FADE_DURATION = 200;

        // Créer les dots du carousel
        function createDots() {
            dotsContainer.innerHTML = '';
            PP_DATA.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'marseille-pp-dot';
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
            
            if (imageElement) {
                imageElement.src = currentPP.image;
                imageElement.alt = `${currentPP.name} - Concepteur Plum Living`;
            }
            
            if (avatarElement) {
                avatarElement.src = currentPP.avatar;
                avatarElement.alt = currentPP.name;
            }
            
            if (nameElement) {
                nameElement.textContent = currentPP.name;
            }
            
            if (projectsCountElement) {
                projectsCountElement.textContent = `${currentPP.projectsCount} projets réalisés`;
            }
            
            if (descriptionElement) {
                descriptionElement.textContent = currentPP.description;
            }

            // Mettre à jour les dots
            const dots = dotsContainer.querySelectorAll('.marseille-pp-dot');
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
            if (imageColumn) imageColumn.classList.add('fade-out');
            if (textColumn) textColumn.classList.add('fade-out');
            setTimeout(function() {
                currentIndex = index;
                updateContent();
                if (imageColumn) imageColumn.classList.remove('fade-out');
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

        // Défilement automatique toutes les 4 secondes
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
