/**
 * Aurora CSS Framework v1.0.0
 * JavaScript Utilities
 * 
 * A lightweight collection of JavaScript utilities to enhance
 * the Aurora CSS Framework with interactive behaviors.
 * 
 */
import { getElement, getAllElements, isElement } from './core/utils.js';
import { initThemeToggle } from './components/theme-toggle.js';
import { initTyping } from './components/typing.js';
import { initScrollAnimations } from './components/scroll-animations.js';
import { initParallax } from './components/parallax-effects.js';
import { initMobileNav } from './components/mobile-nav.js';
import { initGridLines } from './components/grid-lines.js';
import { initHighlightEffects } from './components/highlight-effects.js';
import { initScrollToTop } from './components/scroll-to-top.js';
import { initModal } from './components/modal.js';
import { initTooltips } from './components/tooltips.js';

const Aurora = {
  //Attach Utils
  getElement,
  getAllElements,
  isElement,

  //Attach Components
  initThemeToggle,
  initTyping,
  initScrollAnimations,
  initParallax,
  initMobileNav,
  initGridLines,
  initHighlightEffects, 
  initScrollToTop,
  initModal,
  initTooltips
};

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' 
    ? module.exports = factory() 
    : typeof define === 'function' && define.amd 
      ? define(factory) 
      : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Aurora = factory());
})(this, function() {
  'use strict';

  /**
   * ======================================
   * MODULE: INITIALIZATION
   * ======================================
   * Purpose: Main initialization function to setup all Aurora components
   * 
   * Dependencies: All component modules
   * 
   * When modularizing: This becomes the main integration point that imports
   * individual modules and provides a unified API.
   */
  Aurora.init = function(options = {}) {
    const components = options.components || {
      themeToggle: true,
      scrollAnimations: true,
      parallax: true,
      mobileNav: true,
      gridLines: true,
      highlightEffects: true,
      scrollToTop: true,
      modals: true,
      tooltips: true
    };
    
    // Initialization order matters for some components
    if (components.scrollToTop) {
      Aurora.initScrollToTop(options.scrollToTop || {});
    } else {
      console.log('Scroll to top is not enabled');
    }
    
    if (components.themeToggle) {
      Aurora.initThemeToggle(options.themeToggle || {});
    } else {
      console.log('Theme toggle is not enabled');
    }
    
    if (components.mobileNav) {
      Aurora.initMobileNav(options.mobileNav || {});
    } else {
      console.log('Mobile nav is not enabled');
    }
    
    if (components.gridLines) {
      Aurora.initGridLines(options.gridLines || {});
    } else {
      console.log('Grid lines are not enabled');
    }
    
    // if (components.highlightEffects) {
    //   Aurora.initHighlightEffects(options.highlightEffects || {});
    // }
    
    if (components.modals) {
      Aurora.initModal(options.modals || {});
    } else {
      console.log('Modals are not enabled');
    }
    
    if (components.tooltips) {
      Aurora.initTooltips(options.tooltips || {});
    } else {
      console.log('Tooltips are not enabled');
    }
    
    if (components.parallax) {
      Aurora.initParallax(options.parallax || {});
    } else {
      console.log('Parallax is not enabled');
    }
    
    if (components.scrollAnimations) {
      Aurora.initScrollAnimations(options.scrollAnimations || {});
    } else {
      console.log('Scroll animations are not enabled');
    }

    /**
     * ======================================
     * MODULE: POLYFILLS & BROWSER FIXES
     * ======================================
     * Purpose: Applies compatibility fixes for different browsers and devices
     * 
     * When modularizing: Create separate polyfill files:
     * - ios-fixes.js - iOS specific fixes
     * - backdrop-filter.js - For browsers that don't support backdrop-filter
     */
    
    // Add iOS specific fixes
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      document.documentElement.classList.add('ios-device');
      
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
      
      const fixedElements = document.querySelectorAll('.aurora-navbar, .aurora-modal, .aurora-scroll-top, .aurora-toggle-container');
      fixedElements.forEach(el => {
        el.addEventListener('touchstart', e => {
          e.stopPropagation();
        }, { passive: true });
      });
    }

    // Add backdrop-filter fallback
    if (!CSS.supports('(-webkit-backdrop-filter: blur(10px))') && 
        !CSS.supports('(backdrop-filter: blur(10px))')) {
      document.documentElement.classList.add('no-backdrop-filter');
      
      const glassElements = document.querySelectorAll('.aurora-glass-card, .aurora-navbar, .aurora-modal');
      glassElements.forEach(el => {
        if (getComputedStyle(el).backgroundColor.includes('rgba')) {
          const style = getComputedStyle(el);
          const bgColor = style.backgroundColor;
          const matches = bgColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
          
          if (matches && matches.length === 5) {
            const [_, r, g, b, a] = matches;
            const newOpacity = Math.min(1, parseFloat(a) + 0.3);
            el.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
          }
        }
      });
    }
    /* MODULE: POLYFILLS & BROWSER FIXES - END */
  };
  /* MODULE: INITIALIZATION - END */
  
  /**
   * ======================================
   * MODULE: AUTO-INITIALIZATION
   * ======================================
   * Purpose: Automatically initialize Aurora when DOM is ready
   * 
   * When modularizing: This should be in the main entry file but 
   * can be conditionally imported.
   */
  
  // Auto-initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    if (window.auroraAutoInit !== false) {
      Aurora.init();
    }
  });
  /* MODULE: AUTO-INITIALIZATION - END */
  
  return Aurora;
});