 import { getElement } from '../core/utils.js';
 /**
   * ======================================
   * MODULE: TYPING ANIMATION START
   * ======================================
   * Purpose: Creates a CLI typing animation on a designated element
   * 
   * Dependencies: 
   * - Core utilities (getElement)
   */
  export function initTyping(elementId, texts = [], options = {}) {
    const defaultOptions = {
        typeSpeed: 100,
        eraseSpeed: 50,
        newTextDelay: 2000,
        cursorChar: '▐'  // Changed from span to simple character
    };
    
    const opts = {...defaultOptions, ...options};
    const element = getElement(`#${elementId}`);
    
    if (!element) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    // Add the cursor directly to the element's content
    element.textContent = opts.cursorChar;
    
    /**
     * Type or erase text at the current position
     */
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Erasing text
            element.textContent = currentText.substring(0, charIndex - 1) + opts.cursorChar;
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, opts.newTextDelay / 3);
            } else {
                setTimeout(type, opts.eraseSpeed);
            }
        } else {
            // Typing text
            element.textContent = currentText.substring(0, charIndex + 1) + opts.cursorChar;
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, opts.newTextDelay);
            } else {
                setTimeout(type, opts.typeSpeed);
            }
        }
    }
    
    // Start typing animation
    setTimeout(type, opts.newTextDelay / 3);
    
    return {
      restart: function() {
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        element.textContent = '';
        setTimeout(type, opts.newTextDelay / 3);
      },
      setText: function(newTexts) {
        texts = Array.isArray(newTexts) ? newTexts : [newTexts];
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        element.textContent = '';
        setTimeout(type, opts.newTextDelay / 3);
      }
    };
  }
  /* MODULE: TYPING ANIMATION - END */