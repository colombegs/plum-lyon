/**
 * Carousel et Tabs pour Bloc 3 - Lyon
 * Gère les tabs (ARCHITECTES, BOUTIQUES, POSEURS) et le carousel d'images
 */

(function() {
    'use strict';

    // Données des images par catégorie
    const CAROUSEL_DATA = {
        architectes: [
            { 
                image: 'images/lyon/archi1.jpg',
                category: 'ARCHITECTE',
                name: 'Studio Castille',
                description: 'Bienvenue chez Studio Castille, agence d\'architecture d\'intérieur spécialisée dans la rénovation complète et l\'aménagement sur-mesure à Paris et Lyon.<br><strong>9 rue du Doyenné, 69005 Lyon (métro Vieux-Lyon)</strong>'
            },
            { 
                image: 'images/lyon/archi2.jpg',
                category: 'ARCHITECTE',
                name: 'Constance Laurand',
                description: 'Installé à Lyon depuis 2018, son studio d\'architecture intérieure intervient dans toute la France.<br>Sa signature : l\'élégance au service du confort.<br>Son art : optimiser chaque mètre carré.<br>Son style : structurer les espaces avec des couleurs et des motifs chics.<br><strong>2 Pl. Gailleton, 69002 Lyon</strong>'
            },
            { 
                image: 'images/lyon/archi4 - copie.jpeg',
                category: 'ARCHITECTE',
                name: 'Wellsat Déco',
                description: 'En tant que décoratrice d\'intérieur, Héloïse vous guide dans la création d\'espaces singuliers conçus sur-mesure, à la fois pratiques et esthétiques. Son approche ? Des solutions personnalisées, créatives et parfaitement adaptées à vos besoins, pour un résultat qui vous ressemble vraiment !<br><strong>Contacter via le site web ou instagram</strong>'
            },
            { 
                image: 'images/lyon/archi5.png',
                category: 'ARCHITECTE',
                name: 'Émilie Darneau Lombardo',
                description: 'Concevoir des intérieurs qui reflètent un art de [bien] vivre au quotidien est sa priorité. Parce que chaque projet est unique, Émilie considère chacun de vos chantiers comme tel. Très attentive au mode de vie de ses clients, elle créee des ambiances sur mesure et qui leur ressemblent.<br><strong>Lyon</strong>'
            }
        ],
        boutiques: [
            { 
                image: 'images/lyon/boutique_presse_papier.png',
                category: 'Papier peint',
                name: 'Le Presse Papier',
                description: 'C\'est en plein cœur de la ville, dans le 1er arrondissement, que siège cette pépite. Ce qu\'on y trouve ? Des papiers peints éco friendly et des histoires à dévorer des yeux par milliers. À chaque papier peint, son histoire : qu\'elle soit animale, botanique, atypique, poétique ou encore historique. Une belle adresse qui fait honneur à la richesse textile de la ville de Lyon !<br><strong>5 Pl. Louis Chazette, 69001 Lyon</strong>'
            },
            { 
                image: 'images/lyon/sepia_interieur.jpg',
                category: 'Moulures/déco',
                name: 'Sépia intérieur',
                description: 'Moulures, corniches, plinthes ou panneaux 3D design… Orac offre une infinité de possibilités pour sublimer vos pièces, de la surface plane à l\'effet tridimensionnel saisissant. Retrouvez les produits Orac chez Sépia Intérieur, dans le 6ᵉ arrondissement de Lyon.<br><strong>99 Rue Duguesclin, 69006 Lyon</strong>'
            },
            { 
                image: 'images/lyon/ressouce_lyon.jpeg',
                category: 'Peinture',
                name: 'Ressource',
                description: 'Quelques coups de pinceau suffisent à donner une seconde vie à un intérieur et à lui conférer tout le charme qui lui manquait. La boutique Ressource s\'impose comme une adresse incontournable pour travailler la couleur avec justesse. Peintures haut de gamme, fabrication française et conseils pointus pour imaginer des projets hauts en couleur<br><strong>16 Rue Auguste Comte, 69002 Lyon</strong>'
            },
            { 
                image: 'images/lyon/bernard_ceramics.jpg',
                category: 'Carrelage',
                name: 'Bernard Ceramics',
                description: 'Rectangulaires, arqués, carrés… Les possibilités sont multiples et c\'est bien ce qui fait le charme des carreaux. En faïence pour la salle de bain ou pour habiller les murs de votre cuisine, ils ne sont pas à négliger. Chez Bernard Ceramics, retrouvez une sélection variée de collections, des grands classiques aux marques émergentes prometteuses.<br><strong>10 Rue de la Charité, 69002 Lyon</strong>'
            },
            { 
                image: 'images/lyon/easy_plan.jpeg',
                category: 'Plan de travail',
                name: 'Easy Plan',
                description: 'Entre les éclaboussures, les plats chauds et les traces en tout genre, votre plan de travail sera mis à rude épreuve. Autant allier élégance et robustesse ! Easy plan propose des créations sur mesure du plans de travail, crédences, habillages muraux… qu\'il s\'agisse de cuisines, salles de bain ou de tout autre lieu de vie.<br><strong>3 Cr de la Liberté, 69003 Lyon</strong>'
            }
        ],
        poseurs: [
            { 
                image: 'images/lyon/poseurv1.jpg',
                category: 'POSEUR',
                name: 'R\'Moderne',
                description: '07 83 19 69 41<br>gerfaud.alexandre@gmail.com<br>Auvergne-Rhône_Alpes'
            },
            { 
                image: 'images/lyon/poseurv2.jpg',
                category: 'POSEUR',
                name: 'Éric Pose Tout',
                description: '06 19 60 15 02<br>contact@ericposetout.com<br>Auvergne-Rhône_Alpes'
            },
            { 
                image: 'images/lyon/poseur3.jpg',
                category: 'POSEUR',
                name: 'R\'Moderne',
                description: '07 83 19 69 41\ngerfaud.alexandre@gmail.com'
            }
        ]
    };

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        const tabs = document.querySelectorAll('.lyon-tab');
        const carousel = document.getElementById('lyonCarousel');
        
        if (!carousel || tabs.length === 0) {
            return;
        }

        // Fonction pour créer une slide du carousel
        function createCarouselSlide(item) {
            const slide = document.createElement('div');
            slide.className = 'lyon-carousel-slide';
            
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'lyon-carousel-image-wrapper';
            
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.className = 'lyon-carousel-image';
            
            const label = document.createElement('div');
            label.className = 'lyon-carousel-label';
            
            const category = document.createElement('div');
            category.className = 'lyon-carousel-category';
            category.textContent = item.category;
            
            const name = document.createElement('h3');
            name.className = 'lyon-carousel-name';
            name.textContent = item.name;
            
            const description = document.createElement('p');
            description.className = 'lyon-carousel-description';
            description.innerHTML = item.description || '';
            
            label.appendChild(category);
            label.appendChild(name);
            
            // Container pour le label et la description
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'lyon-carousel-content';
            contentWrapper.appendChild(label);
            if (item.description) {
                contentWrapper.appendChild(description);
            }
            
            imageWrapper.appendChild(img);
            imageWrapper.appendChild(contentWrapper);
            slide.appendChild(imageWrapper);
            
            return slide;
        }

        // Fonction pour charger les images d'une catégorie avec répétition pour effet bleeding
        function loadCarousel(category) {
            const items = CAROUSEL_DATA[category] || [];
            carousel.innerHTML = '';
            
            // Répéter les images 3 fois pour créer un effet de bleeding scrollable
            const REPEAT_COUNT = 3;
            
            for (let repeat = 0; repeat < REPEAT_COUNT; repeat++) {
                items.forEach((item, index) => {
                    const slide = createCarouselSlide(item);
                    carousel.appendChild(slide);
                });
            }
        }

        // Gestion des tabs
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Retirer la classe active de tous les tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Ajouter la classe active au tab cliqué
                this.classList.add('active');
                
                // Charger le carousel correspondant
                const category = this.dataset.tab;
                loadCarousel(category);
            });
        });

        // Charger le carousel initial (BOUTIQUES par défaut)
        loadCarousel('boutiques');

        // Gestion des flèches de navigation
        const prevButton = document.getElementById('lyonCarouselPrev');
        const nextButton = document.getElementById('lyonCarouselNext');

        if (prevButton && nextButton) {
            // Fonction pour faire défiler le carousel
            function scrollCarousel(direction) {
                const slideWidth = carousel.querySelector('.lyon-carousel-slide')?.offsetWidth || 410; // 400px + 10px gap
                const scrollAmount = slideWidth;
                
                if (direction === 'prev') {
                    carousel.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                } else {
                    carousel.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }

            // Événements sur les boutons
            prevButton.addEventListener('click', () => scrollCarousel('prev'));
            nextButton.addEventListener('click', () => scrollCarousel('next'));
        }

        // #region agent log - layout alignment debug
        function logCarouselAlignment() {
            const container = document.querySelector('.lyon-adresses-container');
            const title = document.querySelector('.lyon-adresses-title');
            const wrapper = document.querySelector('.lyon-carousel-wrapper');
            const carouselEl = document.getElementById('lyonCarousel');
            const firstSlide = carouselEl && carouselEl.querySelector('.lyon-carousel-slide');
            const vw = window.innerWidth;
            const containerRect = container ? container.getBoundingClientRect() : null;
            const titleRect = title ? title.getBoundingClientRect() : null;
            const wrapperRect = wrapper ? wrapper.getBoundingClientRect() : null;
            const slideRect = firstSlide ? firstSlide.getBoundingClientRect() : null;
            const offsetTitleToSlide = (titleRect && slideRect) ? (slideRect.left - titleRect.left) : null;
            fetch('http://127.0.0.1:7247/ingest/45a8b155-5349-4f6e-930d-b9fa1e3c96de',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lyon-carousel.js:logCarouselAlignment',message:'Carousel layout alignment',data:{viewportWidth:vw,containerLeft:containerRect?containerRect.left:null,titleLeft:titleRect?titleRect.left:null,wrapperLeft:wrapperRect?wrapperRect.left:null,firstSlideLeft:slideRect?slideRect.left:null,offsetTitleToSlide,targetAlignment:0},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'H1'})}).catch(()=>{});
        }
        setTimeout(logCarouselAlignment, 100);
        // #endregion
    });
})();
