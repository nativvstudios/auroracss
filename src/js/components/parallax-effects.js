import { getAllElements } from '../core/utils.js';

/**
   * ======================================
   * MODULE: PARALLAX EFFECTS
   * ======================================
   * Purpose: Creates mouse-movement parallax effects on elements
   * 
   * Dependencies: 
   * - Core utilities (getAllElements)
   */
export function initParallax(options = {}) {
    const defaultOptions = {
      selector: '.aurora-parallax',
      speedAttribute: 'data-aurora-depth',
      defaultSpeed: 0.2,
      direction: 'normal'
    };
    
    const opts = {...defaultOptions, ...options};
    const elements = getAllElements(opts.selector);
    
    if (!elements.length) return;
    
    // Initialize parallax positions
    updateParallaxPositions(0, 0);
    
    // Add mousemove event to document
    document.addEventListener('mousemove', handleMouseMove);
    
    /**
     * Handle mouse movement to calculate parallax effect
     */
    function handleMouseMove(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate position relative to center of window
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const posX = (mouseX - centerX) / centerX;
      const posY = (mouseY - centerY) / centerY;
      
      updateParallaxPositions(posX, posY);
    }
    
    /**
     * Update position of all parallax elements
     */
    function updateParallaxPositions(posX, posY) {
      elements.forEach(element => {
        const speed = parseFloat(element.getAttribute(opts.speedAttribute)) || opts.defaultSpeed;
        const direction = opts.direction === 'reverse' ? -1 : 1;
        
        const moveX = posX * speed * 100 * direction;
        const moveY = posY * speed * 100 * direction;
        const rotate = posX * speed * 10 * direction;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;
      });
    }
    
    return {
      updatePositions: updateParallaxPositions,
      disable: function() {
        document.removeEventListener('mousemove', handleMouseMove);
        elements.forEach(element => {
          element.style.transform = '';
        });
      },
      enable: function() {
        document.addEventListener('mousemove', handleMouseMove);
      }
    };
  };
  /* MODULE: PARALLAX EFFECTS - END */