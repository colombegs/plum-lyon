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
                image: 'images/lyon/archi_studio_castille.jpeg',
                category: 'ARCHITECTE',
                name: 'Studio Castille',
                description: 'Bienvenue chez Studio Castille, agence d\'architecture d\'intérieur spécialisée dans la rénovation complète et l\'aménagement sur-mesure à Paris et Lyon.<br><strong>9 rue du Doyenné, 69005 Lyon (métro Vieux-Lyon)</strong>'
            },
            { 
                image: 'images/lyon/archi_constance_laurand.png',
                category: 'ARCHITECTE',
                name: 'Constance Laurand',
                description: 'Installé à Lyon depuis 2018, son studio d\'architecture intérieure intervient dans toute la France.<br>Sa signature : l\'élégance au service du confort.<br>Son art : optimiser chaque mètre carré.<br>Son style : structurer les espaces avec des couleurs et des motifs chics.<br><strong>2 Pl. Gailleton, 69002 Lyon</strong>'
            },
            { 
                image: 'images/lyon/archi_wellsat.jpeg',
                category: 'ARCHITECTE',
                name: 'Wellsat Déco',
                description: '<strong>7 Rue Montesquieu, 69007 Lyon</strong>'
            },
            { 
                image: 'images/lyon/archi_emilie_lombardo.jpeg',
                category: 'ARCHITECTE',
                name: 'Émilie Darneau Lombardo',
                description: 'Concevoir des intérieurs qui reflètent un art de [bien] vivre au quotidien est sa priorité. Parce que chaque projet est unique, Émilie considère chacun de vos chantiers comme tel. Très attentive au mode de vie de ses clients, elle créee des ambiances sur mesure et qui leur ressemblent.<br><strong>Lyon</strong>'
            },
            { 
                image: 'images/lyon/archi_Johanne.avif',
                category: 'ARCHITECTE',
                name: 'Johanne Schwab',
                description: '<strong>681 Chem. Pierre Drevet, 69300 Caluire-et-Cuire</strong>'
            },
            { 
                image: 'images/lyon/archi_ollien.png',
                category: 'ARCHITECTE',
                name: 'Anne-Valérie Ollien',
                description: '<strong>Projets toute France</strong>'
            },
            { 
                image: 'images/lyon/archi_atelier_bronner.avif',
                category: 'ARCHITECTE',
                name: 'Atelier Bronner',
                description: '<strong>Lyon | Paris| Bordeaux | Pays-Basque</strong>'
            },
            { 
                image: 'images/lyon/archi_artemesia.jpeg',
                category: 'ARCHITECTE',
                name: 'Artemesia studio',
                description: '<strong>25, rue de la Chapellerie - 69700 Beauvallon FRANCE</strong>'
            },
            { 
                image: 'images/lyon/archi_chloe_letessier.jpeg',
                category: 'ARCHITECTE',
                name: 'Chloé Le Tessier',
                description: '<strong>13 Les Tamaris, 69005 Lyon</strong>'
            },
            { 
                image: 'images/lyon/archi_bel_atelier.jpg',
                category: 'ARCHITECTE',
                name: 'Bel Atelier',
                description: '<strong>35 Bis Rte de Paris, 69160 Tassin-la-Demi-Lune</strong>'
            },
            { 
                image: 'images/lyon/archi_studio_cruzado.jpeg',
                category: 'ARCHITECTE',
                name: 'Studio Cruzado',
                description: '<strong>Lyon</strong>'
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
                image: 'images/lyon/boutique_toscane.jpeg',
                category: 'Tissus/mobilier',
                name: 'Toscane tissu',
                description: '<strong>2 RUE GASPARD ANDRE, 69002 LYON, FRANCE</strong>'
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
            },
            { 
                image: 'images/lyon/boutique_claude_cartier.jpg',
                category: 'Tissus/mobilier',
                name: 'Claude Cartier Décoration',
                description: 'Animée par une passion pour la mise en scène et le souci du détail, cette maison incarne une œuvre totale où chaque objet, matière et espace compose un récit cohérent, sensible et profondément esthétique.<br><strong>25 Rue Auguste Comte, 69002 Lyon</strong>'
            },
            { 
                image: 'images/lyon/boutique_meljac.jpg',
                category: 'Interrupteurs/prises',
                name: 'Maison Meljac',
                description: 'Fabricant précurseur de l\'appareillage électrique en laiton.<br><strong>5 rue Charles Dullin 69002 Lyon</strong>'
            },
            { 
                image: 'images/lyon/boutique_mercadier.jpg',
                category: 'Peintures/béton ciré',
                name: 'Mercadier',
                description: 'Teintes et Matières. Béton Ciré, Peinture, Chaux, Enduits métallisés.<br><strong>27 Rue des Remparts d\'Ainay, 69002 Lyon</strong>'
            },
            { 
                image: 'images/lyon/boutique_bruneel.jpg',
                category: 'Tissus/ mobilier',
                name: 'Atelier Bruneel',
                description: 'De la tringlerie aux décors de fenêtre, en passant par les accessoires et finitions, chaque réalisation témoigne de leur engagement à sublimer vos projets les plus ambitieux.<br><strong>160 Rue Vendôme, 69003 Lyon</strong>'
            },
            { 
                image: 'images/lyon/boutique_riviere_carreaux.jpg',
                category: 'Carrelage',
                name: 'La rivière de carreaux',
                description: 'Leurs produits regroupent toute une gamme de carrelages : faïence, céramique, dalle, carreaux, grès céram, grès, carreaux de ciments, décors, mosaïques et effet parquets pour satisfaire toutes vos envies.<br><strong>52 Rue Boileau, 69006 Lyon</strong>'
            },
            { 
                image: 'images/lyon/sepia_interieur.jpg',
                category: 'Moulures/déco',
                name: 'Sépia intérieur',
                description: 'Moulures, corniches, plinthes ou panneaux 3D design… Orac offre une infinité de possibilités pour sublimer vos pièces, de la surface plane à l\'effet tridimensionnel saisissant. Retrouvez les produits Orac chez Sépia Intérieur, dans le 6ᵉ arrondissement de Lyon.<br><strong>99 Rue Duguesclin, 69006 Lyon</strong>'
            },
            { 
                image: 'images/lyon/boutique_targe.jpg',
                category: 'Moulures/miroirs/décors',
                name: 'Miroiterie Targe',
                description: 'La miroiterie TARGE est spécialisée dans le découpe et la pose de tous produits verriers et fenêtres.<br><strong>60 Rue de Marseille 58, 69007 Lyon</strong>'
            }
        ],
        poseurs: []
    };

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        const tabs = document.querySelectorAll('.lyon-tab');
        const carousel = document.getElementById('lyonCarousel');
        
        if (!carousel || tabs.length === 0) {
            return;
        }

        // Fonction pour créer une slide du carousel
        function createCarouselSlide(item, currentCategory) {
            const slide = document.createElement('div');
            slide.className = 'lyon-carousel-slide';
            
            // Pour la catégorie "poseurs", rendre la slide cliquable
            if (currentCategory === 'poseurs') {
                slide.style.cursor = 'pointer';
                slide.addEventListener('click', function() {
                    window.location.href = 'https://plum-living.com/fr/media/address/annuaire-poseurs';
                });
            }
            
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'lyon-carousel-image-wrapper';
            
            const img = document.createElement('img');
            // Utiliser des chemins relatifs qui fonctionnent en local et sur Vercel
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
            
            // Pour la catégorie "architectes", extraire uniquement l'adresse (contenu du tag <strong>)
            if (currentCategory === 'architectes' && item.description) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = item.description;
                const strongElement = tempDiv.querySelector('strong');
                if (strongElement) {
                    description.innerHTML = '<strong>' + strongElement.textContent + '</strong>';
                } else {
                    description.innerHTML = item.description;
                }
            } else {
                description.innerHTML = item.description || '';
            }
            
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
            const carouselWrapper = carousel.closest('.lyon-carousel-wrapper');
            carousel.innerHTML = '';
            
            // Pour la catégorie poseurs, créer un élément cliquable qui redirige vers la page
            if (category === 'poseurs') {
                carouselWrapper.classList.add('lyon-carousel-poseurs');
                // Si le tableau est vide, créer un élément de redirection avec l'image "concept"
                if (items.length === 0) {
                    const redirectSlide = document.createElement('div');
                    redirectSlide.className = 'lyon-carousel-slide';
                    redirectSlide.style.cursor = 'pointer';
                    
                    const imageWrapper = document.createElement('div');
                    imageWrapper.className = 'lyon-carousel-image-wrapper';
                    
                    const img = document.createElement('img');
                    img.src = 'images/lyon/concept.png';
                    img.alt = 'Voir tous les poseurs';
                    img.className = 'lyon-carousel-image';
                    
                    const contentWrapper = document.createElement('div');
                    contentWrapper.className = 'lyon-carousel-content';
                    
                    const label = document.createElement('div');
                    label.className = 'lyon-carousel-label';
                    
                    const category = document.createElement('div');
                    category.className = 'lyon-carousel-category';
                    category.textContent = 'POSEUR';
                    
                    const name = document.createElement('h3');
                    name.className = 'lyon-carousel-name';
                    name.textContent = 'Voir tous les poseurs';
                    
                    label.appendChild(category);
                    label.appendChild(name);
                    contentWrapper.appendChild(label);
                    imageWrapper.appendChild(img);
                    imageWrapper.appendChild(contentWrapper);
                    redirectSlide.appendChild(imageWrapper);
                    
                    redirectSlide.addEventListener('click', function() {
                        window.location.href = 'https://plum-living.com/fr/media/address/annuaire-poseurs';
                    });
                    
                    carousel.appendChild(redirectSlide);
                } else {
                    // Afficher les éléments existants
                    items.forEach((item, index) => {
                        const slide = createCarouselSlide(item, category);
                        carousel.appendChild(slide);
                    });
                }
            } else {
                carouselWrapper.classList.remove('lyon-carousel-poseurs');
                // Répéter les images 3 fois pour créer un effet de bleeding scrollable
                const REPEAT_COUNT = 3;
                for (let repeat = 0; repeat < REPEAT_COUNT; repeat++) {
                    items.forEach((item, index) => {
                        const slide = createCarouselSlide(item, category);
                        carousel.appendChild(slide);
                    });
                }
            }
        }

        // Textes selon la catégorie
        const categoryTexts = {
            architectes: 'Cuisine, dressing ou banquette : ces architectes et décorateurs d\'intérieur connaissent notre concept sur le bout des doigts. À vous de choisir le profil parfait pour donner vie à vos envies.',
            boutiques: 'Que vous soyez à la recherche d\'un œil expert pour concevoir votre intérieur, de matériaux pour sublimer vos idées, ou d\'artisans de confiance pour en assurer la pose, ce city guide est pensé pour vous.',
            poseurs: 'Notre secret le mieux gardé. Les artisans poseurs à qui nos clients et concepteurs ont déjà confié l\'installation de leurs projets, et qu\'ils recommandent les yeux fermés.'
        };

        // Fonction pour mettre à jour le texte de description
        function updateDescriptionText(category) {
            const descriptionElement = document.getElementById('lyonAdressesDescription');
            if (descriptionElement && categoryTexts[category]) {
                descriptionElement.textContent = categoryTexts[category];
            }
        }

        // Gestion du CTA "Tout voir"
        const ctaElement = document.getElementById('lyonCarouselCta');
        function toggleCta(category) {
            if (ctaElement) {
                // Afficher le CTA uniquement pour la catégorie "boutiques" (Bonnes adresses)
                if (category === 'boutiques') {
                    ctaElement.style.display = 'inline-flex';
                } else {
                    ctaElement.style.display = 'none';
                }
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
                
                // Mettre à jour le texte de description
                updateDescriptionText(category);
                
                // Afficher/masquer le CTA selon la catégorie
                toggleCta(category);
            });
        });

        // Charger le carousel initial (BOUTIQUES par défaut)
        loadCarousel('boutiques');
        updateDescriptionText('boutiques');
        toggleCta('boutiques');

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
