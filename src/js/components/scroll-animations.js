 import { getAllElements } from '../core/utils.js';
 
 /**
   * ======================================
   * MODULE: SCROLL ANIMATIONS
   * ======================================
   * Purpose: Provides scroll-triggered animations for elements
   * 
   * Dependencies: 
   * - Core utilities (getAllElements)
   */
 export function initScrollAnimations(options = {}) {
    const defaultOptions = {
      selector: '[data-aurora-animate]',
      threshold: 0.2,
      once: true,
      rootMargin: '0px',
      animationClass: 'aurora-animate-running'
    };
    
    const opts = {...defaultOptions, ...options};
    const elements = getAllElements(opts.selector);
    
    if (!elements.length) return;
    
    // Check if on mobile device for better mobile animations
    const isMobile = window.innerWidth < 768;
    
    // Add appropriate animation classes and set will-change
    elements.forEach(element => {
      const animationType = element.getAttribute('data-aurora-animate');
      element.classList.add(`aurora-animate-${animationType}`);
      element.style.willChange = 'opacity, transform';
    });
    
    // Create intersection observer with mobile-optimized options
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            
            // Use setTimeout for staggered animation on mobile
            if (isMobile) {
              const container = element.closest('section') || element.parentElement;
              const siblings = container.querySelectorAll('[data-aurora-animate]');
              const index = Array.from(siblings).indexOf(element);
              
              setTimeout(() => {
                element.classList.add(opts.animationClass);
              }, Math.min(index * 100, 300));
            } else {
              element.classList.add(opts.animationClass);
            }
            
            // Save animation state for smoother page transitions
            if (element.id) {
              localStorage.setItem(`aurora-anim-${element.id}`, 'animated');
            }
            
            if (opts.once) {
              observer.unobserve(element);
            }
          } else if (!opts.once) {
            entry.target.classList.remove(opts.animationClass);
          }
        });
      },
      {
        threshold: isMobile ? 0.15 : opts.threshold,
        rootMargin: isMobile ? '0px 0px 50px 0px' : opts.rootMargin
      }
    );
    
    // Observe elements, checking for previous animations
    elements.forEach(element => {
      if (element.id && localStorage.getItem(`aurora-anim-${element.id}`) === 'animated') {
        element.classList.add(opts.animationClass);
        return;
      }
      observer.observe(element);
    });

    // Handle resize events for responsive animations
    window.addEventListener('resize', function() {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth < 768;
      
      if (wasMobile !== nowMobile) {
        observer.disconnect();
        
        elements.forEach(element => {
          if (!element.hasAttribute('data-aurora-persist')) {
            element.classList.remove(opts.animationClass);
          }
          observer.observe(element);
        });
      }
    });
    
    return {
      refresh: function() {
        const newElements = document.querySelectorAll(`${opts.selector}:not(.aurora-animate-initialized)`);
        newElements.forEach(element => {
          const animationType = element.getAttribute('data-aurora-animate');
          element.classList.add(`aurora-animate-${animationType}`);
          element.classList.add('aurora-animate-initialized');
          element.style.willChange = 'opacity, transform';
          observer.observe(element);
        });
      },
      reset: function() {
        elements.forEach(element => {
          element.classList.remove(opts.animationClass);
          observer.observe(element);
        });
      },
      observer
    };
  };
  /* MODULE: SCROLL ANIMATIONS - END */