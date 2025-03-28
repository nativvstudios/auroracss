import { getElement } from "../core/utils";
/**
   * ======================================
   * MODULE: HIGHLIGHT EFFECTS
   * ======================================
   * Purpose: Creates highlighting effects that follow mouse movement
   * 
   * Dependencies: 
   * - Core utilities (getElement)
   */

    export function initHighlightEffects(options = {}) {
    const defaultOptions = {
      container: 'body',
      primaryClass: 'aurora-code-highlight',
      secondaryClass: 'aurora-code-highlight-secondary'
    };
    
    const opts = {...defaultOptions, ...options};
    const container = getElement(opts.container);
    
    if (!container) return;
    
    // Remove existing highlights
    const existing = container.querySelectorAll(`.${opts.primaryClass}, .${opts.secondaryClass}`);
    existing.forEach(el => el.remove());
    
    // Create primary highlight
    const primaryHighlight = document.createElement('div');
    primaryHighlight.className = opts.primaryClass;
    container.appendChild(primaryHighlight);
    
    // Create secondary highlight
    const secondaryHighlight = document.createElement('div');
    secondaryHighlight.className = opts.secondaryClass;
    container.appendChild(secondaryHighlight);
    
    // Add mousemove event for parallax effect on highlights
    document.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX / window.innerWidth) - 0.5;
      const moveY = (e.clientY / window.innerHeight) - 0.5;
      
      primaryHighlight.style.transform = 
        `translate(${moveX * 30}px, ${moveY * 30}px) rotate(${moveX * 10}deg)`;
        
      secondaryHighlight.style.transform = 
        `translate(${-moveX * 40}px, ${-moveY * 40}px) rotate(${-moveX * 15}deg)`;
    });
    
    const highlightController = {
      setPrimaryColor: function(color) {
        primaryHighlight.style.backgroundColor = color;
      },
      setSecondaryColor: function(color) {
        secondaryHighlight.style.backgroundColor = color;
      }
    };
    
    // Set colors if provided in options
    if (options.setPrimaryColor) {
      highlightController.setPrimaryColor(options.setPrimaryColor);
    }
    if (options.setSecondaryColor) {
      highlightController.setSecondaryColor(options.setSecondaryColor);
    }
    
    return highlightController;
  };
  /* MODULE: HIGHLIGHT EFFECTS - END */