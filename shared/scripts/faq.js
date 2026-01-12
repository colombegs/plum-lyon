/**
 * FAQ Component Handler - Plum Living
 * Gère l'ouverture/fermeture des items FAQ (accordéon)
 */

(function() {
    'use strict';

    /**
     * Initialise le composant FAQ
     */
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        if (faqItems.length === 0) {
            return;
        }

        faqItems.forEach((item) => {
            const header = item.querySelector('.faq-header');
            const content = item.querySelector('.faq-content');

            if (!header || !content) {
                return;
            }

            // Initialiser l'état ARIA
            const isOpen = item.classList.contains('is-open');
            header.setAttribute('aria-expanded', isOpen);
            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
            content.setAttribute('aria-hidden', !isOpen);

            // Gérer le clic
            header.addEventListener('click', () => {
                toggleFAQItem(item);
            });

            // Gérer le clavier (Enter et Espace)
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQItem(item);
                }
            });
        });
    }

    /**
     * Toggle l'état d'un item FAQ
     * @param {HTMLElement} item - L'élément FAQ item
     */
    function toggleFAQItem(item) {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        const isOpen = item.classList.contains('is-open');

        if (isOpen) {
            // Fermer
            item.classList.remove('is-open');
            header.setAttribute('aria-expanded', 'false');
            content.setAttribute('aria-hidden', 'true');
        } else {
            // Optionnel : Fermer les autres items ouverts (accordéon exclusif)
            // Décommentez les lignes suivantes si vous voulez qu'un seul item soit ouvert à la fois
            // const openItems = document.querySelectorAll('.faq-item.is-open');
            // openItems.forEach(openItem => {
            //     if (openItem !== item) {
            //         const openHeader = openItem.querySelector('.faq-header');
            //         const openContent = openItem.querySelector('.faq-content');
            //         openItem.classList.remove('is-open');
            //         openHeader.setAttribute('aria-expanded', 'false');
            //         openContent.setAttribute('aria-hidden', 'true');
            //     }
            // });

            // Ouvrir
            item.classList.add('is-open');
            header.setAttribute('aria-expanded', 'true');
            content.setAttribute('aria-hidden', 'false');
        }
    }

    // Initialiser au chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFAQ);
    } else {
        initFAQ();
    }

    // Exposer la fonction pour une utilisation externe si nécessaire
    window.initFAQ = initFAQ;
})();
