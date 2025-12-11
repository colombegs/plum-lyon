/**
 * SCRIPT DE DEBUG NAVBAR
 * 
 * Ce script analyse l'état des dropdowns et affiche un rapport détaillé
 * dans la console pour identifier pourquoi les textes ne s'affichent pas.
 */

(function() {
  'use strict';

  function debugNavbar() {
    console.log('%c=== DEBUG NAVBAR ===', 'font-size: 20px; font-weight: bold; color: red;');
    
    const navbar = document.querySelector('.navbar');
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    
    console.log('Navbar:', navbar);
    console.log('Classes navbar:', navbar ? navbar.className : 'NON TROUVÉ');
    console.log('Nombre de dropdowns:', dropdownItems.length);
    
    dropdownItems.forEach((item, index) => {
      const link = item.querySelector('.nav-link');
      const menu = item.querySelector('.dropdown-menu');
      const content = item.querySelector('.dropdown-content');
      const links = item.querySelectorAll('.dropdown-link');
      const titles = item.querySelectorAll('.dropdown-section-title');
      
      console.log(`\n%c--- DROPDOWN ${index + 1} ---`, 'font-size: 16px; font-weight: bold; color: blue;');
      console.log('Texte du lien:', link ? link.textContent.trim() : 'NON TROUVÉ');
      console.log('Classes nav-item:', item.className);
      console.log('is-hovered?', item.classList.contains('is-hovered'));
      
      if (menu) {
        const menuStyles = window.getComputedStyle(menu);
        console.log('Dropdown Menu:');
        console.log('  - display:', menuStyles.display);
        console.log('  - opacity:', menuStyles.opacity);
        console.log('  - visibility:', menuStyles.visibility);
        console.log('  - z-index:', menuStyles.zIndex);
        console.log('  - line-height:', menuStyles.lineHeight);
        console.log('  - font-size:', menuStyles.fontSize);
        console.log('  - pointer-events:', menuStyles.pointerEvents);
      }
      
      if (content) {
        const contentStyles = window.getComputedStyle(content);
        console.log('Dropdown Content:');
        console.log('  - display:', contentStyles.display);
        console.log('  - opacity:', contentStyles.opacity);
        console.log('  - visibility:', contentStyles.visibility);
        console.log('  - z-index:', contentStyles.zIndex);
        console.log('  - line-height:', contentStyles.lineHeight);
        console.log('  - font-size:', contentStyles.fontSize);
        console.log('  - pointer-events:', contentStyles.pointerEvents);
        console.log('  - height:', contentStyles.height);
        console.log('  - min-height:', contentStyles.minHeight);
      }
      
      console.log('Nombre de liens:', links.length);
      links.forEach((link, linkIndex) => {
        const linkStyles = window.getComputedStyle(link);
        console.log(`  Lien ${linkIndex + 1} (${link.textContent.trim()}):`);
        console.log('    - display:', linkStyles.display);
        console.log('    - opacity:', linkStyles.opacity);
        console.log('    - visibility:', linkStyles.visibility);
        console.log('    - color:', linkStyles.color);
        console.log('    - font-size:', linkStyles.fontSize);
        console.log('    - line-height:', linkStyles.lineHeight);
        console.log('    - z-index:', linkStyles.zIndex);
        console.log('    - transform:', linkStyles.transform);
      });
      
      console.log('Nombre de titres:', titles.length);
      titles.forEach((title, titleIndex) => {
        const titleStyles = window.getComputedStyle(title);
        console.log(`  Titre ${titleIndex + 1} (${title.textContent.trim()}):`);
        console.log('    - display:', titleStyles.display);
        console.log('    - opacity:', titleStyles.opacity);
        console.log('    - visibility:', titleStyles.visibility);
        console.log('    - color:', titleStyles.color);
        console.log('    - font-size:', titleStyles.fontSize);
        console.log('    - line-height:', titleStyles.lineHeight);
        console.log('    - z-index:', titleStyles.zIndex);
        console.log('    - transform:', titleStyles.transform);
      });
    });
    
    // Vérifier les règles CSS appliquées
    console.log('\n%c=== RÈGLES CSS APPLIQUÉES ===', 'font-size: 16px; font-weight: bold; color: green;');
    const firstLink = document.querySelector('.dropdown-link');
    if (firstLink) {
      const styles = window.getComputedStyle(firstLink);
      console.log('Premier lien trouvé:', firstLink.textContent.trim());
      console.log('Styles calculés:', {
        display: styles.display,
        opacity: styles.opacity,
        visibility: styles.visibility,
        fontSize: styles.fontSize,
        lineHeight: styles.lineHeight,
        color: styles.color,
        zIndex: styles.zIndex
      });
    }
  }
  
  // Exécuter le debug au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(debugNavbar, 1000);
    });
  } else {
    setTimeout(debugNavbar, 1000);
  }
  
  // Exposer la fonction globalement pour pouvoir l'appeler manuellement
  window.debugNavbar = debugNavbar;
  
  // Écouter les événements de hover pour debug
  document.querySelectorAll('.nav-item-dropdown').forEach(item => {
    item.addEventListener('mouseenter', () => {
      console.log('%cHOVER ENTER:', 'color: green; font-weight: bold;', item.querySelector('.nav-link')?.textContent.trim());
      setTimeout(debugNavbar, 100);
    });
    
    item.addEventListener('mouseleave', () => {
      console.log('%cHOVER LEAVE:', 'color: red; font-weight: bold;', item.querySelector('.nav-link')?.textContent.trim());
    });
  });
  
  console.log('%cDebug script chargé! Tapez debugNavbar() dans la console pour relancer le diagnostic.', 'color: blue; font-weight: bold;');
})();




