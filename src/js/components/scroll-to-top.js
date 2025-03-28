import { getElement } from '../core/utils';

/**
   * ======================================
   * MODULE: SCROLL TO TOP
   * ======================================
   * Purpose: Implements a smooth scroll-to-top button
   * 
   * Dependencies: 
   * - Core utilities (getElement)
   */

export function initScrollToTop(options = {}) {
  const defaultOptions = {
    buttonSelector: '.aurora-scroll-top',
    showAtPixels: 300,
    scrollDuration: 500,
    activeClass: 'aurora-active'
    };
    
    const opts = {...defaultOptions, ...options};
    const button = getElement(opts.buttonSelector);
    
    if (!button) return;
    
    // Initially hide the button
    button.classList.remove(opts.activeClass);
    
    // Show button when scrolled down
    const scrollHandler = () => {
      if (window.scrollY > opts.showAtPixels) {
        button.classList.add(opts.activeClass);
      } else {
        button.classList.remove(opts.activeClass);
      }
    };
    
    window.addEventListener('scroll', scrollHandler);
    
    // Initial check
    scrollHandler();
    
    // Scroll to top with animation
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const startPosition = window.scrollY;
      const startTime = performance.now();
      
      function scrollStep(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / opts.scrollDuration, 1);
        
        // Easing function: easeInOutCubic
        const easing = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startPosition - (startPosition * easing));
        
        if (progress < 1) {
          window.requestAnimationFrame(scrollStep);
        }
      }
      
      window.requestAnimationFrame(scrollStep);
    });
    
    return {
      scrollToTop: function(duration = opts.scrollDuration) {
        const startPosition = window.scrollY;
        const startTime = performance.now();
        
        function scrollStep(timestamp) {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function: easeInOutCubic
          const easing = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          
          window.scrollTo(0, startPosition - (startPosition * easing));
          
          if (progress < 1) {
            window.requestAnimationFrame(scrollStep);
          }
        }
        
        window.requestAnimationFrame(scrollStep);
      }
    };
  };
  /* MODULE: SCROLL TO TOP - END */