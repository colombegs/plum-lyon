/**
 * Script pour la page Poseurs
 * 
 * Gère les interactions avec la carte de France et la sidebar
 */

// Données des poseurs par région
const poseursData = {
    'ile-de-france': {
        name: 'Île-de-France',
        poseurs: [
            {
                id: 1,
                name: 'Purpose',
                phone: '06 13 97 53 58',
                email: 'contact@mypurpose.fr',
                instagram: '@mypurpose_fr',
                description: 'Chez Purpose FR, rien n\'est laissé au hasard. Ce couple de poseurs certifiés Plum Living maîtrise parfaitement notre univers et sait le traduire avec justesse sur le terrain.',
                image: 'images/poseurs/Purpose.jpg',
                video: 'images/poseurs/purpose.mp4'
            },
            {
                id: 2,
                name: 'Salif Agencement',
                phone: '06 13 97 53 58',
                email: 'contact@salif-agencement.fr',
                instagram: '@salif_agencement',
                description: 'Spécialiste en agencement sur mesure, Salif Agencement vous accompagne dans la réalisation de vos projets Plum Living avec professionnalisme et expertise.',
                image: 'images/poseurs/Salif Agencement.jpg',
                video: 'images/poseurs/salifagencements.mp4'
            },
            {
                id: 3,
                name: 'Top Pose',
                phone: '06 13 97 53 58',
                email: 'contact@toppose.fr',
                instagram: '@toppose',
                description: 'Top Pose est une équipe de professionnels dédiés à l\'installation de vos meubles Plum Living. Qualité et précision sont nos maîtres mots.',
                image: 'images/poseurs/Top Pose.jpg',
                video: 'images/poseurs/toppose.mp4'
            },
            {
                id: 4,
                name: 'Magic Pose',
                phone: '06 13 97 53 58',
                email: 'contact@magicpose.fr',
                instagram: '@magicpose',
                description: 'Magic Pose transforme vos espaces avec élégance. Nos installateurs certifiés garantissent une pose parfaite de vos meubles Plum Living.',
                image: 'images/poseurs/Purpose.jpg' // Image par défaut si pas de fichier spécifique
            }
        ]
    },
    'auvergne-rhone-alpes': {
        name: 'Auvergne-Rhône-Alpes',
        poseurs: [
            {
                id: 6,
                name: 'R Moderne',
                phone: '06 12 34 56 78',
                email: 'contact@rmoderne.fr',
                instagram: '@rmoderne',
                description: 'R Moderne est spécialisé dans l\'agencement moderne et sur mesure. Installateur certifié Plum Living pour vos projets en Auvergne-Rhône-Alpes.',
                image: 'images/poseurs/R Modern.jpg'
            },
            {
                id: 7,
                name: 'Eric Pose Tout',
                phone: '06 23 45 67 89',
                email: 'contact@ericposetout.fr',
                instagram: '@ericposetout',
                description: 'Eric Pose Tout met son expertise au service de vos projets Plum Living. Installation professionnelle dans toute la région Auvergne-Rhône-Alpes.',
                image: 'images/poseurs/Eric Pose Tout.jpg'
            }
        ]
    },
    'provence-alpes-cote-azur': {
        name: 'Provence-Alpes-Côte d\'Azur',
        poseurs: [
            {
                id: 9,
                name: 'Kulic Solution',
                phone: '06 45 67 89 01',
                email: 'contact@kulicsolution.fr',
                instagram: '@kulicsolution',
                description: 'Kulic Solution est votre partenaire pour l\'installation de vos meubles Plum Living en région PACA. Expertise et professionnalisme garantis.',
                image: 'images/poseurs/Kulic Solutions.jpg'
            },
            {
                id: 10,
                name: '2I Agencement',
                phone: '06 56 78 90 12',
                email: 'contact@2iagencement.fr',
                instagram: '@2iagencement',
                description: '2I Agencement vous accompagne dans vos projets Plum Living en Provence-Alpes-Côte d\'Azur. Installation sur mesure et de qualité.',
                image: 'images/poseurs/Purpose.jpg' // Image par défaut si pas de fichier spécifique
            }
        ]
    },
    'nouvelle-aquitaine': {
        name: 'Nouvelle-Aquitaine',
        poseurs: [
            {
                id: 11,
                name: 'Bordeaux Agencement',
                phone: '06 67 89 01 23',
                email: 'contact@bordeaux-agencement.fr',
                instagram: '@bordeaux_agencement',
                description: 'Installateur certifié Plum Living à Bordeaux. Nous réalisons vos projets avec expertise et professionnalisme.',
                image: 'images/hero-interior.jpg'
            },
            {
                id: 12,
                name: 'La Rochelle Pose',
                phone: '06 78 90 12 34',
                email: 'contact@larochelle-pose.fr',
                instagram: '@larochelle_pose',
                description: 'Spécialiste de l\'installation Plum Living à La Rochelle et dans la région. Qualité et précision garanties.',
                image: 'images/hero-interior.jpg'
            },
            {
                id: 13,
                name: 'Limoges Installation',
                phone: '06 89 01 23 45',
                email: 'contact@limoges-installation.fr',
                instagram: '@limoges_installation',
                description: 'Installateur certifié à Limoges. Nous intervenons dans toute la Nouvelle-Aquitaine pour vos projets Plum Living.',
                image: 'images/hero-interior.jpg'
            },
            {
                id: 14,
                name: 'Poitiers Agencement',
                phone: '06 90 12 34 56',
                email: 'contact@poitiers-agencement.fr',
                instagram: '@poitiers_agencement',
                description: 'Expert en agencement Plum Living à Poitiers. Une équipe dédiée à la réalisation de vos projets.',
                image: 'images/hero-interior.jpg'
            }
        ]
    },
    'occitanie': {
        name: 'Occitanie',
        poseurs: [
            {
                id: 15,
                name: 'Toulouse Installation',
                phone: '06 01 23 45 67',
                email: 'contact@toulouse-installation.fr',
                instagram: '@toulouse_installation',
                description: 'Installateur certifié Plum Living à Toulouse. Nous intervenons dans toute la région Occitanie pour vos projets d\'agencement.',
                image: 'images/hero-interior.jpg'
            },
            {
                id: 16,
                name: 'Montpellier Pose',
                phone: '06 12 34 56 78',
                email: 'contact@montpellier-pose.fr',
                instagram: '@montpellier_pose',
                description: 'Spécialiste de l\'installation Plum Living à Montpellier. Qualité et respect des délais garantis.',
                image: 'images/hero-interior.jpg'
            }
        ]
    },
    'hauts-de-france': {
        name: 'Hauts-de-France',
        poseurs: [
            {
                id: 17,
                name: 'Lille Agencement',
                phone: '06 23 45 67 89',
                email: 'contact@lille-agencement.fr',
                instagram: '@lille_agencement',
                description: 'Installateur certifié Plum Living à Lille. Nous réalisons vos projets avec expertise dans toute la région Hauts-de-France.',
                image: 'images/hero-interior.jpg'
            }
        ]
    },
    'grand-est': {
        name: 'Grand Est',
        poseurs: [
            {
                id: 18,
                name: 'Hop Je Pose',
                phone: '06 34 56 78 90',
                email: 'contact@hopjepose.fr',
                instagram: '@hopjepose',
                description: 'Hop Je Pose est votre installateur certifié Plum Living dans le Grand Est. Une équipe expérimentée pour vos projets d\'agencement.',
                image: 'images/poseurs/Hopjepose.jpg'
            }
        ]
    },
    'normandie': {
        name: 'Normandie',
        poseurs: [
            {
                id: 19,
                name: 'Rouen Agencement',
                phone: '06 45 67 89 01',
                email: 'contact@rouen-agencement.fr',
                instagram: '@rouen_agencement',
                description: 'Installateur certifié Plum Living à Rouen. Nous intervenons dans toute la Normandie pour vos projets.',
                image: 'images/hero-interior.jpg'
            }
        ]
    },
    'bretagne': {
        name: 'Bretagne',
        poseurs: [
            {
                id: 20,
                name: 'Rennes Installation',
                phone: '06 56 78 90 12',
                email: 'contact@rennes-installation.fr',
                instagram: '@rennes_installation',
                description: 'Installateur certifié Plum Living à Rennes. Spécialiste de l\'agencement sur mesure en Bretagne.',
                image: 'images/hero-interior.jpg'
            }
        ]
    },
    'pays-de-la-loire': {
        name: 'Pays de la Loire',
        poseurs: [
            {
                id: 21,
                name: 'Nantes Agencement',
                phone: '06 67 89 01 23',
                email: 'contact@nantes-agencement.fr',
                instagram: '@nantes_agencement',
                description: 'Installateur certifié Plum Living à Nantes. Nous réalisons vos projets avec professionnalisme dans toute la région.',
                image: 'images/hero-interior.jpg'
            }
        ]
    },
    'centre-val-de-loire': {
        name: 'Centre-Val de Loire',
        poseurs: [
            {
                id: 22,
                name: 'Tours Installation',
                phone: '06 78 90 12 34',
                email: 'contact@tours-installation.fr',
                instagram: '@tours_installation',
                description: 'Installateur certifié Plum Living à Tours. Une équipe dédiée à la réalisation de vos projets d\'agencement.',
                image: 'images/hero-interior.jpg'
            }
        ]
    },
    'bourgogne-franche-comte': {
        name: 'Bourgogne-Franche-Comté',
        poseurs: [
            {
                id: 23,
                name: 'Vallet Joiners\'Holz',
                phone: '06 89 01 23 45',
                email: 'contact@valletjoiners.fr',
                instagram: '@valletjoiners',
                description: 'Vallet Joiners\'Holz est spécialisé dans l\'installation de meubles Plum Living en Bourgogne-Franche-Comté. Qualité et savoir-faire garantis.',
                image: 'images/poseurs/Purpose.jpg' // Image par défaut si pas de fichier spécifique
            }
        ]
    },
    'menuipac': {
        name: 'Menuipac',
        poseurs: [
            {
                id: 24,
                name: 'Menuipac',
                phone: '06 90 12 34 56',
                email: 'contact@menuipac.fr',
                instagram: '@menuipac',
                description: 'Menuipac est votre partenaire pour l\'installation de vos meubles Plum Living. Expertise et professionnalisme à votre service.',
                image: 'images/poseurs/Purpose.jpg' // Image par défaut si pas de fichier spécifique
            }
        ]
    }
};

// État de l'application
let currentRegion = null;
let expandedPoseur = null;

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initSidebar();
});

/**
 * Initialise les interactions avec la carte
 */
function initMap() {
    const mapWrapper = document.getElementById('franceMapWrapper');
    
    // Charger le SVG via fetch
    fetch('images/poseurs/francev2.svg')
        .then(response => response.text())
        .then(svgText => {
            // Parser le SVG
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svg = svgDoc.documentElement;
            
            // Ajouter l'ID et la classe
            svg.setAttribute('id', 'franceMap');
            svg.classList.add('france-map');
            
            // Supprimer les attributs width et height pour que le SVG s'adapte au conteneur
            svg.removeAttribute('width');
            svg.removeAttribute('height');
            
            // Changer le fond du rect en grey-4 et les paths en blanc
            const rect = svg.querySelector('rect');
            if (rect) {
                rect.setAttribute('fill', 'var(--color-grey-4)');
            }
            
            // Mettre tous les paths en blanc par défaut avec opacité normale
            const allPaths = svg.querySelectorAll('path');
            allPaths.forEach(path => {
                path.setAttribute('fill', '#ffffff');
                path.setAttribute('opacity', '1');
            });
            
            // Injecter le SVG dans le wrapper
            mapWrapper.appendChild(svg);
            
            // Une fois le SVG injecté, initialiser les interactions
            setTimeout(() => {
                setupMapInteractions(svg);
                // Sélectionner Paris (Île-de-France) par défaut après un court délai supplémentaire
                // pour s'assurer que tous les éléments sont prêts
                setTimeout(() => {
                    selectRegion('ile-de-france');
                }, 200);
            }, 100);
        })
        .catch(error => {
            console.error('Erreur lors du chargement de la carte SVG:', error);
            mapWrapper.innerHTML = '<p>Erreur lors du chargement de la carte</p>';
        });
}

/**
 * Configure les interactions avec la carte SVG
 */
function setupMapInteractions(svg) {
    // Ajouter les attributs data-region aux paths et les rendre cliquables
    const paths = svg.querySelectorAll('path');
    
    // #region agent log
    // Log tous les attributs de chaque path pour voir s'il y a des data-region ou id
    const pathsInfo = Array.from(paths).map((path, index) => {
        const attrs = {};
        for (let attr of path.attributes) {
            attrs[attr.name] = attr.value;
        }
        return { index, attrs };
    });
    fetch('http://127.0.0.1:7242/ingest/65978d4b-c1c6-4d32-b09d-f1c50637bde9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'poseurs.js:342',message:'All paths attributes',data:{totalPaths:paths.length,pathsInfo},timestamp:Date.now(),sessionId:'debug-session',runId:'check-attrs',hypothesisId:'ATTRS'})}).catch(()=>{});
    // #endregion
    
    // Liste des régions qui ont un pin (et donc cliquables)
    const regionsWithPins = [
        'ile-de-france',
        'provence-alpes-cote-azur',
        'auvergne-rhone-alpes',
        'grand-est',
        'nouvelle-aquitaine',
        'hauts-de-france'
    ];
    
    // Mapping des paths par index vers les IDs de région (même mapping que dans getRegionCenter et selectRegion)
    const pathIndexToRegionId = {
        0: 'nouvelle-aquitaine',
        1: 'occitanie',
        2: 'auvergne-rhone-alpes',
        3: 'grand-est',
        4: 'bourgogne-franche-comte',
        5: 'centre-val-de-loire',
        6: 'hauts-de-france',
        7: 'pays-de-la-loire',
        8: 'normandie',
        9: 'provence-alpes-cote-azur',
        10: 'bretagne',
        11: 'ile-de-france'
    };
    
    paths.forEach((path, index) => {
        path.classList.add('region-path');
        path.style.transition = 'fill 0.3s ease';
        // Initialiser en blanc avec opacité normale
        path.style.fill = 'var(--color-white)';
        path.style.opacity = '1';
        
        // Obtenir l'ID de région à partir de l'index du path
        const regionId = pathIndexToRegionId[index];
        const hasPin = regionId && regionsWithPins.includes(regionId);
        
        // Si la région a un pin, la rendre cliquable
        if (hasPin) {
            path.style.cursor = 'pointer';
            
            // Ajouter un événement de clic
            path.addEventListener('click', (e) => {
                e.stopPropagation(); // Empêcher la propagation vers d'autres éléments
                if (regionId) {
                    selectRegion(regionId);
                }
            });
            
            path.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.fill = 'var(--color-grey-3)'; /* Grey-3 pour hover */
                }
            });
            
            path.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.fill = 'var(--color-white)';
                }
            });
        } else {
            // Région sans poseurs : pas cliquable, curseur normal, mais toujours blanche
            path.style.cursor = 'default';
            path.style.fill = 'var(--color-white)'; // Toujours blanche par défaut
            path.style.opacity = '1'; // Opacité normale
        }
    });
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/65978d4b-c1c6-4d32-b09d-f1c50637bde9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'poseurs.js:374',message:'Before addMarkersToMap',data:{pathsWithClass:svg.querySelectorAll('.region-path').length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    // #region agent log
    // Analyser tous les paths pour comprendre leur distribution géographique
    const allPaths = svg.querySelectorAll('path');
    const pathCenters = Array.from(allPaths).map((path, index) => {
        const bbox = path.getBBox();
        return {
            index,
            center: { x: bbox.x + bbox.width/2, y: bbox.y + bbox.height/2 },
            bbox: { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height }
        };
    });
    fetch('http://127.0.0.1:7242/ingest/65978d4b-c1c6-4d32-b09d-f1c50637bde9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'poseurs.js:374',message:'All paths analysis',data:{totalPaths:allPaths.length,pathCenters,svgViewBox:svg.getAttribute('viewBox')},timestamp:Date.now(),sessionId:'debug-session',runId:'coords-debug',hypothesisId:'COORDS'})}).catch(()=>{});
    // #endregion
    
    // Ajouter les labels de région
    addRegionLabels(svg);
    
    // Ajouter les marqueurs sur le SVG
    addMarkersToMap(svg);
}

/**
 * Détermine la région à partir de la position (coordonnées dans le viewBox 0-3247)
 */
function getRegionFromPosition(x, y) {
    // Coordonnées approximatives basées sur le viewBox 3247x3245
    // Ces valeurs doivent être ajustées selon la vraie carte
    
    // Île-de-France (centre-nord)
    if (x > 900 && x < 1200 && y > 1500 && y < 2000) return 'ile-de-france';
    
    // Auvergne-Rhône-Alpes (centre-est)
    if (x > 1400 && x < 2000 && y > 2400 && y < 3000) return 'auvergne-rhone-alpes';
    
    // Provence-Alpes-Côte d'Azur (sud-est)
    if (x > 2000 && x < 2600 && y > 2700 && y < 3100) return 'provence-alpes-cote-azur';
    
    // Nouvelle-Aquitaine (sud-ouest)
    if (x > 200 && x < 800 && y > 2200 && y < 2800) return 'nouvelle-aquitaine';
    
    // Occitanie (sud-centre)
    if (x > 1000 && x < 1600 && y > 2600 && y < 3000) return 'occitanie';
    
    // Hauts-de-France (nord)
    if (x > 800 && x < 1200 && y > 200 && y < 800) return 'hauts-de-france';
    
    // Grand Est (est)
    if (x > 1800 && x < 2400 && y > 800 && y < 1800) return 'grand-est';
    
    // Normandie (nord-ouest)
    if (x > 400 && x < 900 && y > 600 && y < 1200) return 'normandie';
    
    // Bretagne (ouest)
    if (x > 100 && x < 500 && y > 1000 && y < 1800) return 'bretagne';
    
    // Pays de la Loire (ouest-centre)
    if (x > 500 && x < 900 && y > 1600 && y < 2200) return 'pays-de-la-loire';
    
    // Centre-Val de Loire (centre)
    if (x > 900 && x < 1300 && y > 1600 && y < 2200) return 'centre-val-de-loire';
    
    // Bourgogne-Franche-Comté (est-centre)
    if (x > 1300 && x < 1800 && y > 1900 && y < 2500) return 'bourgogne-franche-comte';
    
    return null;
}

/**
 * Calcule le centre géométrique d'une région en utilisant l'attribut data-region des paths SVG
 * Si data-region n'existe pas, utilise le mapping par index (fallback)
 */
function getRegionCenter(svg, regionId) {
    // D'abord, essayer de trouver le path avec l'attribut data-region correspondant
    const pathWithRegion = svg.querySelector(`path[data-region="${regionId}"]`);
    
    if (pathWithRegion) {
        const bbox = pathWithRegion.getBBox();
        const center = {
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2
        };
        
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/65978d4b-c1c6-4d32-b09d-f1c50637bde9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'poseurs.js:450',message:'Region center from data-region attribute',data:{regionId,center,bbox:{x:bbox.x,y:bbox.y,width:bbox.width,height:bbox.height}},timestamp:Date.now(),sessionId:'debug-session',runId:'data-region',hypothesisId:'DATA_REGION'})}).catch(()=>{});
        // #endregion
        
        return center;
    }
    
    // Fallback: utiliser le mapping par index si data-region n'existe pas
    // Mapping basé sur la carte des régions fournie par l'utilisateur
    // Analyse géographique des centres des paths (coordonnées SVG 0-3247 x 0-3245)
    // Path 0: (1297, 2268) - Centre-Val de Loire (centre-sud)
    // Path 1: (1762, 2749) - Auvergne-Rhône-Alpes (sud-est)
    // Path 2: (2355, 2086) - Grand Est (est)
    // Path 3: (2646, 850) - Hauts-de-France (nord-est)
    // Path 4: (2442, 1414) - Bourgogne-Franche-Comté (est-centre)
    // Path 5: (1589, 1271) - Île-de-France (centre, petite région autour de Paris)
    // Path 6: (1905, 411) - Hauts-de-France (nord, partie nord)
    // Path 7: (982, 1357) - Nouvelle-Aquitaine (ouest-centre, grande région sud-ouest)
    // Path 8: (1175, 714) - Normandie (nord-ouest)
    // Path 9: (2687, 2597) - Provence-Alpes-Côte d'Azur (extrême sud-est)
    // Path 10: (472, 1092) - Bretagne (ouest, péninsule)
    // Path 11: (1820, 885) - Pays de la Loire (ouest-centre)
    
    const paths = svg.querySelectorAll('path');
    // Mapping corrigé selon les observations visuelles de l'utilisateur
    const regionToPathIndex = {
        'nouvelle-aquitaine': 0,        // Path 0 → Nouvelle-Aquitaine
        'occitanie': 1,                  // Path 1 → Occitanie
        'auvergne-rhone-alpes': 2,      // Path 2 → Auvergne-Rhône-Alpes
        'grand-est': 3,                  // Path 3 → Grand Est
        'bourgogne-franche-comte': 4,   // Path 4 → Bourgogne-Franche-Comté (non mentionné, garde)
        'centre-val-de-loire': 5,       // Path 5 → Centre-Val de Loire
        'hauts-de-france': 6,           // Path 6 → Hauts-de-France (non mentionné, garde)
        'pays-de-la-loire': 7,          // Path 7 → Pays de la Loire
        'normandie': 8,                 // Path 8 → Normandie (non mentionné, garde)
        'provence-alpes-cote-azur': 9,   // Path 9 → Provence-Alpes-Côte d'Azur (non mentionné, garde)
        'bretagne': 10,                 // Path 10 → Bretagne (non mentionné, garde)
        'ile-de-france': 11             // Path 11 → Île-de-France
    };
    
    const pathIndex = regionToPathIndex[regionId];
    if (pathIndex !== undefined && paths[pathIndex]) {
        const path = paths[pathIndex];
        const bbox = path.getBBox();
        const center = {
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2
        };
        
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/65978d4b-c1c6-4d32-b09d-f1c50637bde9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'poseurs.js:495',message:'Region center from fallback mapping',data:{regionId,pathIndex,center,bbox:{x:bbox.x,y:bbox.y,width:bbox.width,height:bbox.height}},timestamp:Date.now(),sessionId:'debug-session',runId:'fallback-mapping',hypothesisId:'FALLBACK'})}).catch(()=>{});
        // #endregion
        
        return center;
    }
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/65978d4b-c1c6-4d32-b09d-f1c50637bde9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'poseurs.js:510',message:'No mapping found, returning 0,0',data:{regionId},timestamp:Date.now(),sessionId:'debug-session',runId:'data-region',hypothesisId:'DATA_REGION'})}).catch(()=>{});
    // #endregion
    
    return { x: 0, y: 0 };
}

/**
 * Ajoute les labels de région sur chaque path pour vérifier le mapping
 */
function addRegionLabels(svg) {
    const paths = svg.querySelectorAll('path');
    
    // Mapping inverse : pathIndex -> nom de région (corrigé selon les observations visuelles)
    const pathIndexToRegionName = {
        0: 'Nouvelle-Aquitaine',           // Path 0 → Nouvelle-Aquitaine
        1: 'Occitanie',                    // Path 1 → Occitanie
        2: 'Auvergne-Rhône-Alpes',         // Path 2 → Auvergne-Rhône-Alpes
        3: 'Grand Est',                    // Path 3 → Grand Est
        4: 'Bourgogne-Franche-Comté',      // Path 4 → (non mentionné, garde)
        5: 'Centre-Val de Loire',          // Path 5 → Centre-Val de Loire
        6: 'Hauts-de-France',              // Path 6 → (non mentionné, garde)
        7: 'Pays de la Loire',             // Path 7 → Pays de la Loire
        8: 'Normandie',                    // Path 8 → (non mentionné, garde)
        9: 'Provence-Alpes-Côte d\'Azur',  // Path 9 → (non mentionné, garde)
        10: 'Bretagne',                    // Path 10 → (non mentionné, garde)
        11: 'Île-de-France'                // Path 11 → Île-de-France
    };
    
    paths.forEach((path, index) => {
        const regionName = pathIndexToRegionName[index] || `Path ${index}`;
        const bbox = path.getBBox();
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;
        
        // Créer un élément texte SVG
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', centerX);
        text.setAttribute('y', centerY + 100); // Déplacer 100px en dessous
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-size', '74.88'); // Augmenter de 20% supplémentaire (62.4 * 1.2 = 74.88)
        text.setAttribute('fill', '#999'); // grey-2 par défaut
        text.setAttribute('stroke', 'none');
        text.setAttribute('stroke-width', '0');
        text.setAttribute('pointer-events', 'none');
        text.setAttribute('class', 'region-label');
        // Mapping pathIndex -> regionId pour pouvoir cibler le label
        const pathIndexToRegionId = {
            0: 'nouvelle-aquitaine',
            1: 'occitanie',
            2: 'auvergne-rhone-alpes',
            3: 'grand-est',
            4: 'bourgogne-franche-comte',
            5: 'centre-val-de-loire',
            6: 'hauts-de-france',
            7: 'pays-de-la-loire',
            8: 'normandie',
            9: 'provence-alpes-cote-azur',
            10: 'bretagne',
            11: 'ile-de-france'
        };
        const regionId = pathIndexToRegionId[index];
        if (regionId) {
            text.setAttribute('data-region-label', regionId);
        }
        
        // Si le nom dépasse 14 caractères, le diviser en plusieurs lignes
        if (regionName.length > 14) {
            // Trouver un espace autour de la moitié pour couper
            const midPoint = Math.floor(regionName.length / 2);
            let splitIndex = midPoint;
            
            // Chercher un espace proche du milieu
            for (let i = 0; i < midPoint; i++) {
                if (regionName[midPoint + i] === ' ' || regionName[midPoint + i] === '-') {
                    splitIndex = midPoint + i;
                    break;
                }
                if (regionName[midPoint - i] === ' ' || regionName[midPoint - i] === '-') {
                    splitIndex = midPoint - i;
                    break;
                }
            }
            
            const firstLine = regionName.substring(0, splitIndex).trim();
            const secondLine = regionName.substring(splitIndex).trim();
            
            // Première ligne
            const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan1.setAttribute('x', centerX);
            tspan1.setAttribute('dy', '0');
            tspan1.textContent = firstLine;
            text.appendChild(tspan1);
            
            // Deuxième ligne
            const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan2.setAttribute('x', centerX);
            tspan2.setAttribute('dy', '1.2em'); // Espacement entre les lignes
            tspan2.textContent = secondLine;
            text.appendChild(tspan2);
        } else {
            text.textContent = regionName;
        }
        
        // Ajouter le texte au SVG
        svg.appendChild(text);
        
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/65978d4b-c1c6-4d32-b09d-f1c50637bde9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'poseurs.js:395',message:'Region label added',data:{pathIndex:index,regionName,center:{x:centerX,y:centerY},bbox:{x:bbox.x,y:bbox.y,width:bbox.width,height:bbox.height}},timestamp:Date.now(),sessionId:'debug-session',runId:'region-labels',hypothesisId:'LABELS'})}).catch(()=>{});
        // #endregion
    });
}

/**
 * Ajoute les marqueurs sur la carte SVG
 */
function addMarkersToMap(svg) {
    const markerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    markerGroup.setAttribute('class', 'markers-layer');
    // Permettre aux événements de passer à travers le groupe de marqueurs sauf sur les pins
    markerGroup.style.pointerEvents = 'none';
    
    // Charger le pin SVG d'abord
    fetch('images/poseurs/locationpin.svg')
        .then(response => response.text())
        .then(pinSvgText => {
            const parser = new DOMParser();
            const pinDoc = parser.parseFromString(pinSvgText, 'image/svg+xml');
            const pinPath = pinDoc.querySelector('path');
            const pinPathData = pinPath ? pinPath.getAttribute('d') : '';
            
            // Liste des régions avec leur nombre de poseurs (récupéré depuis poseursData)
            const regions = [
                'ile-de-france',
                'provence-alpes-cote-azur',
                'auvergne-rhone-alpes',
                'grand-est',
                'nouvelle-aquitaine',
                'hauts-de-france'
            ];
            
            // Calculer les positions centrées pour chaque région
            const markers = regions.map(regionId => {
                const center = getRegionCenter(svg, regionId);
                const regionData = poseursData[regionId];
                const count = regionData ? regionData.poseurs.length : 0;
                return {
                    region: regionId,
                    x: center.x,
                    y: center.y,
                    count: count
                };
            }).filter(marker => marker.x !== 0 || marker.y !== 0); // Filtrer les pins invalides
            
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/65978d4b-c1c6-4d32-b09d-f1c50637bde9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'poseurs.js:610',message:'Markers calculated',data:{totalMarkers:markers.length,markers:markers.map(m=>({region:m.region,pos:{x:m.x,y:m.y}}))},timestamp:Date.now(),sessionId:'debug-session',runId:'multi-regions',hypothesisId:'MARKERS'})}).catch(()=>{});
            // #endregion
            
            markers.forEach(marker => {
                const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                group.setAttribute('class', 'region-marker-group');
                group.setAttribute('data-region', marker.region);
                // Désactiver les interactions sur le groupe du pin - seules les régions sont cliquables
                group.style.pointerEvents = 'none';
                
                // Créer un groupe pour le pin avec transformation
                // Le pin SVG a un viewBox de 32x42, le point de référence (bas du pin) est à (16, 42)
                const pinGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                pinGroup.setAttribute('class', 'region-marker-pin');
                
                // Taille du pin identique pour tous (agrandie de 100% = multipliée par 2)
                const pinScale = 4.0; // Taille fixe pour tous les pins
                pinGroup.setAttribute('data-scale', pinScale);
                
                // Positionner le pin : le bas du pin (16, 42 dans le viewBox) doit être à (marker.x, marker.y)
                // On translate pour centrer horizontalement et placer le bas à la bonne position
                const pinWidth = 32 * pinScale;
                const pinHeight = 42 * pinScale;
                const transformX = marker.x - pinWidth/2;
                const transformY = marker.y - pinHeight;
                pinGroup.setAttribute('transform', `translate(${transformX}, ${transformY})`);
                
                // Créer un groupe interne pour le pin et le texte qui sera scalé ensemble
                const pinContentGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                pinContentGroup.setAttribute('transform', `scale(${pinScale})`);
                
                // Créer le path du pin
                const pin = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pin.setAttribute('d', pinPathData);
                pin.setAttribute('fill', '#222');
                pin.setAttribute('opacity', '0.9');
                pin.style.cursor = 'pointer';
                pin.style.transition = 'opacity 0.3s ease';
                
                // Créer le texte avec le nombre (positionné au centre du cercle du pin)
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('class', 'region-marker-number');
                // Le texte doit être positionné au centre du pin (16 dans le viewBox original, environ 20 pour le centre vertical)
                text.setAttribute('x', '16');
                text.setAttribute('y', '20');
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('dominant-baseline', 'middle');
                text.setAttribute('fill', 'white');
                // Taille du texte proportionnelle au scale pour qu'il soit visible (réduite de 20%)
                text.setAttribute('font-size', '19.2'); // Taille de base qui sera scalée avec le pin (19.2 * 4 = 76.8px, soit 20% de moins que 96px)
                text.setAttribute('font-weight', 'bold');
                text.setAttribute('font-family', 'Cera Pro, sans-serif');
                text.setAttribute('pointer-events', 'none');
                text.textContent = marker.count;
                
                pinContentGroup.appendChild(pin);
                pinContentGroup.appendChild(text);
                pinGroup.appendChild(pinContentGroup);
                group.appendChild(pinGroup);
                markerGroup.appendChild(group);
                
                // Désactiver toutes les interactions sur les pins - seules les régions sont cliquables
                pinGroup.style.pointerEvents = 'none';
                pin.style.pointerEvents = 'none';
                group.style.pointerEvents = 'none';
                // Pas d'événements sur les pins - les interactions se font uniquement sur les paths des régions
            });
            
            svg.appendChild(markerGroup);
        })
        .catch(error => {
            console.error('Erreur lors du chargement du pin SVG:', error);
        });
}

/**
 * Gère le clic sur une région
 */
function handleRegionClick(e) {
    e.stopPropagation();
    const regionId = e.target.getAttribute('data-region') || 
                     e.target.closest('[data-region]')?.getAttribute('data-region');
    
    if (regionId && poseursData[regionId]) {
        selectRegion(regionId);
    }
}

/**
 * Gère le survol d'une région
 */
function handleRegionHover(e) {
    const regionId = e.target.getAttribute('data-region') || 
                     e.target.closest('[data-region]')?.getAttribute('data-region');
    
    if (regionId && currentRegion !== regionId) {
        const path = document.querySelector(`.region-path[data-region="${regionId}"]`);
        const markerGroup = document.querySelector(`.region-marker-group[data-region="${regionId}"]`);
        const marker = markerGroup?.querySelector('.region-marker');
        
        if (path) {
            path.style.fill = '#ededed'; /* Grey-3 éclairci pour un hover plus subtil */
            path.style.cursor = 'pointer';
        }
        if (marker) {
            marker.setAttribute('r', '12');
            marker.style.opacity = '1';
        }
    }
}

/**
 * Gère la fin du survol d'une région
 */
function handleRegionLeave(e) {
    const regionId = e.target.getAttribute('data-region') || 
                     e.target.closest('[data-region]')?.getAttribute('data-region');
    
    if (regionId && currentRegion !== regionId) {
        const path = document.querySelector(`.region-path[data-region="${regionId}"]`);
        const markerGroup = document.querySelector(`.region-marker-group[data-region="${regionId}"]`);
        const marker = markerGroup?.querySelector('.region-marker');
        
        if (path) {
            path.style.fill = '';
        }
        if (marker) {
            // Restaurer la taille originale selon le nombre de poseurs
            const region = poseursData[regionId];
            const originalSize = region && region.poseurs.length >= 4 ? '10' : (region && region.poseurs.length >= 3 ? '9' : '8');
            marker.setAttribute('r', originalSize);
            marker.style.opacity = '';
        }
    }
}

/**
 * Sélectionne une région et affiche ses poseurs
 */
function selectRegion(regionId) {
    const svg = document.getElementById('franceMap');
    if (!svg) return;
    
    // Vérifier que la région a des poseurs
    if (!poseursData[regionId] || !poseursData[regionId].poseurs || poseursData[regionId].poseurs.length === 0) {
        return; // Ne rien faire si la région n'a pas de poseurs
    }
    
    // Désélectionner la région précédente dans le SVG
    if (currentRegion) {
        const prevPaths = svg.querySelectorAll('.region-path.active');
        prevPaths.forEach(path => {
            path.classList.remove('active');
            path.style.fill = 'var(--color-white)';
            path.style.opacity = '1'; // Toujours opacité normale
        });
        
        // Remettre le label de la région précédente en grey-2
        const prevLabel = svg.querySelector(`.region-label[data-region-label="${currentRegion}"]`);
        if (prevLabel) {
            prevLabel.setAttribute('fill', '#999'); // grey-2
        }
        
        const prevMarkerGroup = svg.querySelector(`.region-marker-group[data-region="${currentRegion}"]`);
        const prevPinGroup = prevMarkerGroup?.querySelector('.region-marker-pin');
        const prevPin = prevPinGroup?.querySelector('path');
        if (prevPinGroup && prevPin) {
            prevPinGroup.classList.remove('active');
            // Ne pas changer la taille du pin - juste restaurer l'opacité
            prevPin.setAttribute('opacity', '0.9');
        }
    }

    // Sélectionner la nouvelle région dans le SVG
    currentRegion = regionId;
    
    // Utiliser le même mapping que getRegionCenter pour identifier le path
    const paths = svg.querySelectorAll('.region-path');
    const regionToPathIndex = {
        'nouvelle-aquitaine': 0,
        'occitanie': 1,
        'auvergne-rhone-alpes': 2,
        'grand-est': 3,
        'bourgogne-franche-comte': 4,
        'centre-val-de-loire': 5,
        'hauts-de-france': 6,
        'pays-de-la-loire': 7,
        'normandie': 8,
        'provence-alpes-cote-azur': 9,
        'bretagne': 10,
        'ile-de-france': 11
    };
    
    const pathIndex = regionToPathIndex[regionId];
    if (pathIndex !== undefined && paths[pathIndex]) {
        const path = paths[pathIndex];
        path.classList.add('active');
        path.style.fill = '#E1B0A2'; /* Couleur pour la région sélectionnée */
        path.style.opacity = '1';
    }
    
    // Mettre le label de la région sélectionnée en black
    const label = svg.querySelector(`.region-label[data-region-label="${regionId}"]`);
    if (label) {
        label.setAttribute('fill', '#000'); // black
    }
    
    const markerGroup = svg.querySelector(`.region-marker-group[data-region="${regionId}"]`);
    const pinGroup = markerGroup?.querySelector('.region-marker-pin');
    const pinContentGroup = pinGroup?.querySelector('g[transform*="scale"]');
    const pin = pinContentGroup?.querySelector('path');
    if (pinGroup && pinContentGroup && pin) {
        pinGroup.classList.add('active');
        // Ne pas changer la taille du pin lors de la sélection - garder la taille originale
        pin.setAttribute('opacity', '1');
        // Ne pas modifier la position ni la taille du pin
    }

    // Afficher les poseurs dans la sidebar
    displayPoseurs(regionId);
}

/**
 * Affiche les poseurs d'une région dans la sidebar
 */
function displayPoseurs(regionId) {
    const region = poseursData[regionId];
    if (!region) return;

    const sidebarTitle = document.getElementById('sidebarTitle');
    const sidebarSubtitle = document.getElementById('sidebarSubtitle');
    const sidebarContent = document.getElementById('sidebarContent');

    // Mettre à jour le titre
    sidebarTitle.textContent = `${region.poseurs.length} poseur${region.poseurs.length > 1 ? 's' : ''} en ${region.name}`;
    sidebarSubtitle.textContent = '';

    // Vider le contenu
    sidebarContent.innerHTML = '';

    // Créer les cartes de poseurs
    region.poseurs.forEach(poseur => {
        const card = createPoseurCard(poseur);
        sidebarContent.appendChild(card);
    });

    // Réinitialiser l'état expanded
    expandedPoseur = null;
}

/**
 * Crée une carte de poseur
 */
function createPoseurCard(poseur) {
    const card = document.createElement('div');
    card.className = 'poseur-card';
    card.dataset.poseurId = poseur.id;

    // Header avec image de fond et vidéo
    const header = document.createElement('div');
    header.className = 'poseur-card-header';
    
    // Image par défaut
    const image = document.createElement('img');
    image.className = 'poseur-card-image';
    image.src = poseur.image;
    image.alt = poseur.name;
    image.style.display = 'block';
    header.appendChild(image);
    
    // Vidéo (si disponible)
    if (poseur.video) {
        const video = document.createElement('video');
        video.className = 'poseur-card-video';
        video.src = poseur.video;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.style.display = 'none';
        video.style.opacity = '0';
        video.style.transition = 'opacity 0.3s ease';
        header.appendChild(video);
        
        // Précharger la vidéo dès que possible
        video.load();
        
        // Gérer le hover pour lancer la vidéo
        card.addEventListener('mouseenter', () => {
            image.style.opacity = '0';
            video.style.display = 'block';
            setTimeout(() => {
                video.style.opacity = '1';
                video.play().catch(err => {
                    console.warn('Erreur lors de la lecture de la vidéo:', err);
                    // En cas d'erreur, réafficher l'image
                    video.style.display = 'none';
                    image.style.opacity = '1';
                });
            }, 50);
        });
        
        card.addEventListener('mouseleave', () => {
            video.style.opacity = '0';
            setTimeout(() => {
                video.pause();
                video.currentTime = 0;
                video.style.display = 'none';
            }, 300);
            image.style.opacity = '1';
        });
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'poseur-card-overlay';
    header.appendChild(overlay);

    // Contenu dans l'overlay
    const content = document.createElement('div');
    content.className = 'poseur-card-content';

    // Bloc 1 : titre + contact
    const bloc1 = document.createElement('div');
    bloc1.className = 'poseur-card-bloc-1';

    const name = document.createElement('h3');
    name.className = 'poseur-card-name';
    name.textContent = poseur.name;
    bloc1.appendChild(name);

    const contact = document.createElement('div');
    contact.className = 'poseur-card-contact';
    contact.textContent = `${poseur.phone} · ${poseur.email}`;
    bloc1.appendChild(contact);

    content.appendChild(bloc1);

    // Body avec description et instagram
    const body = document.createElement('div');
    body.className = 'poseur-card-body';

    const description = document.createElement('p');
    description.className = 'poseur-card-description';
    description.textContent = poseur.description;
    body.appendChild(description);

    // Instagram (affiché seulement quand expanded)
    if (poseur.instagram) {
        const instagramLink = document.createElement('a');
        instagramLink.className = 'poseur-card-instagram';
        instagramLink.href = `https://instagram.com/${poseur.instagram.replace('@', '')}`;
        instagramLink.target = '_blank';
        instagramLink.rel = 'noopener noreferrer';
        instagramLink.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>INSTAGRAM</span>
        `;
        body.appendChild(instagramLink);
    }

    content.appendChild(body);
    header.appendChild(content);

    card.appendChild(header);

    // Ajouter l'événement de clic pour expand/collapse
    card.addEventListener('click', () => togglePoseurCard(card, poseur.id));

    return card;
}

/**
 * Toggle l'état expanded d'une carte de poseur
 */
function togglePoseurCard(card, poseurId) {
    // Si cette carte est déjà expanded, la réduire
    if (expandedPoseur === poseurId) {
        card.classList.remove('expanded');
        expandedPoseur = null;
    } else {
        // Réduire la carte précédemment expanded
        if (expandedPoseur) {
            const prevCard = document.querySelector(`.poseur-card[data-poseur-id="${expandedPoseur}"]`);
            if (prevCard) {
                prevCard.classList.remove('expanded');
            }
        }

        // Expand la nouvelle carte
        card.classList.add('expanded');
        expandedPoseur = poseurId;

        // Scroll vers la carte si nécessaire
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

/**
 * Initialise la sidebar
 */
function initSidebar() {
    // La sidebar est déjà initialisée avec le contenu vide
    // Les poseurs seront affichés quand une région sera sélectionnée
}
