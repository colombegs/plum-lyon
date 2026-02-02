/**
 * Carousel et Tabs pour Bloc 3 - Marseille
 * Gère les tabs (ARCHITECTES, BOUTIQUES, POSEURS) et le carousel d'images
 */

(function() {
    'use strict';

    // Données des images par catégorie
    const CAROUSEL_DATA = {
        architectes: [
            { 
                image: 'images/marseille/Carouseil 1.jpg',
                category: 'ARCHITECTE',
                name: 'Nom Architecte 1',
                description: 'Un cabinet d\'architecture qui allie créativité et fonctionnalité pour créer des espaces uniques et harmonieux, adaptés à votre mode de vie.'
            },
            { 
                image: 'images/marseille/Carousel 2.jpg',
                category: 'ARCHITECTE',
                name: 'Nom Architecte 2',
                description: 'Spécialisé dans la rénovation et la transformation d\'espaces, cet architecte transforme vos idées en projets concrets et réalisables.'
            },
            { 
                image: 'images/marseille/Carousel 3.jpg',
                category: 'ARCHITECTE',
                name: 'Nom Architecte 3',
                description: 'Une approche contemporaine de l\'architecture qui privilégie la lumière, les matériaux naturels et l\'intégration harmonieuse avec l\'environnement.'
            }
        ],
        boutiques: [
            { 
                image: 'images/marseille/Carouseil 1.jpg',
                category: 'RESTAURANT',
                name: 'Tuba Club',
                description: 'Imaginez une terrasse suspendue où les parasols à franges côtoient des fauteuils en rotin acidulés, rappelant l\'insouciance des années 60. Entre deux gorgées d\'une limonade artisanale, la lumière dorée souligne les motifs géométriques et les teintes pastel qui habillent ce lieu hors du temps.'
            },
            { 
                image: 'images/marseille/Carousel 2.jpg',
                category: 'RESTAUTANT/ BAR',
                name: 'Devo',
                description: 'Un bar restaurant au charme authentique où se mêlent pierres apparentes et mobilier design. L\'ambiance chaleureuse invite à savourer des cocktails créatifs dans un décor qui allie modernité et caractère méditerranéen.'
            },
            { 
                image: 'images/marseille/Carousel 3.jpg',
                category: 'BOUTIQ',
                name: 'Sessun',
                description: 'Une boutique déco qui célèbre l\'art de vivre méditerranéen. Découvrez une sélection raffinée d\'objets et de textiles aux motifs inspirés du Sud, pour créer un intérieur empreint de douceur et d\'élégance.'
            }
        ],
        poseurs: [
            { 
                image: 'images/marseille/pose 1.jpg',
                category: 'POSEUR',
                name: 'Kulic Solution',
                description: '06 05 13 69 84\nsk.solutions.pro@gmail.com'
            },
            { 
                image: 'images/marseille/pose 2.jpg',
                category: 'POSEUR',
                name: '2I Agencement',
                description: '06 67 55 00 83\n2iagencements@gmail.com'
            },
            { 
                image: 'images/marseille/pose 3.jpg',
                category: 'POSEUR',
                name: 'R\'Moderne',
                description: '07 83 19 69 41\ngerfaud.alexandre@gmail.com'
            }
        ]
    };

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        const tabs = document.querySelectorAll('.marseille-tab');
        const carousel = document.getElementById('marseilleCarousel');
        
        if (!carousel || tabs.length === 0) {
            return;
        }

        // Fonction pour créer une slide du carousel
        function createCarouselSlide(item) {
            const slide = document.createElement('div');
            slide.className = 'marseille-carousel-slide';
            
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'marseille-carousel-image-wrapper';
            
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.className = 'marseille-carousel-image';
            
            const label = document.createElement('div');
            label.className = 'marseille-carousel-label';
            
            const category = document.createElement('div');
            category.className = 'marseille-carousel-category';
            category.textContent = item.category;
            
            const name = document.createElement('h3');
            name.className = 'marseille-carousel-name';
            name.textContent = item.name;
            
            const description = document.createElement('p');
            description.className = 'marseille-carousel-description';
            description.textContent = item.description || '';
            
            label.appendChild(category);
            label.appendChild(name);
            
            // Container pour le label et la description
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'marseille-carousel-content';
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

        // #region agent log - layout alignment debug
        function logCarouselAlignment() {
            const container = document.querySelector('.marseille-adresses-container');
            const title = document.querySelector('.marseille-adresses-title');
            const wrapper = document.querySelector('.marseille-carousel-wrapper');
            const carouselEl = document.getElementById('marseilleCarousel');
            const firstSlide = carouselEl && carouselEl.querySelector('.marseille-carousel-slide');
            const vw = window.innerWidth;
            const containerRect = container ? container.getBoundingClientRect() : null;
            const titleRect = title ? title.getBoundingClientRect() : null;
            const wrapperRect = wrapper ? wrapper.getBoundingClientRect() : null;
            const slideRect = firstSlide ? firstSlide.getBoundingClientRect() : null;
            const offsetTitleToSlide = (titleRect && slideRect) ? (slideRect.left - titleRect.left) : null;
            fetch('http://127.0.0.1:7247/ingest/45a8b155-5349-4f6e-930d-b9fa1e3c96de',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'marseille-carousel.js:logCarouselAlignment',message:'Carousel layout alignment',data:{viewportWidth:vw,containerLeft:containerRect?containerRect.left:null,titleLeft:titleRect?titleRect.left:null,wrapperLeft:wrapperRect?wrapperRect.left:null,firstSlideLeft:slideRect?slideRect.left:null,offsetTitleToSlide,targetAlignment:0},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'H1'})}).catch(()=>{});
        }
        setTimeout(logCarouselAlignment, 100);
        // #endregion
    });
})();
