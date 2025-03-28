 import { getElement } from '../core/utils.js';
 /**
   * ======================================
   * MODULE: MOBILE NAVIGATION
   * ======================================
   * Purpose: Implements responsive mobile navigation menu
   * 
   * Dependencies: 
   * - Core utilities (getElement)
   * 
   * When modularizing: Create mobile-nav.js with this component
   */
  export function initMobileNav(options = {}) {
    const defaultOptions = {
      navbarSelector: '.aurora-navbar',
      toggleSelector: '.aurora-navbar-toggle',
      openClass: 'aurora-open'
    };
    
    const opts = {...defaultOptions, ...options};
    const navbar = getElement(opts.navbarSelector);
    const toggleButton = getElement(opts.toggleSelector);
    
    if (!navbar || !toggleButton) return;
    
    toggleButton.addEventListener('click', () => {
      navbar.classList.toggle(opts.openClass);
      
      // Dispatch toggle event
      const isOpen = navbar.classList.contains(opts.openClass);
      const event = new CustomEvent('aurora:navToggle', { 
        detail: { isOpen } 
      });
      document.dispatchEvent(event);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navbar.classList.contains(opts.openClass) &&
          !navbar.contains(e.target) &&
          e.target !== toggleButton) {
        navbar.classList.remove(opts.openClass);
      }
    });
    
    return {
      toggle: function() {
        navbar.classList.toggle(opts.openClass);
      },
      open: function() {
        navbar.classList.add(opts.openClass);
      },
      close: function() {
        navbar.classList.remove(opts.openClass);
      },
      isOpen: function() {
        return navbar.classList.contains(opts.openClass);
      }
    };
  };
  /* MODULE: MOBILE NAVIGATION - END */