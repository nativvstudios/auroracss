import { getAllElements } from '../core/utils';

/**
   * ======================================
   * MODULE: TOOLTIPS
   * ======================================
   * Purpose: Provides tooltip functionality for elements
   * 
   * Dependencies: 
   * - Core utilities (getAllElements)
   * 
   * When modularizing: Create tooltips.js with this component
   */
    export function initTooltips(options = {}) {
    const defaultOptions = {
      selector: '[data-aurora-tooltip]',
      position: 'top',
      spacing: 8,
      animation: 'fade',
      delay: 200,
      tooltipClass: 'aurora-tooltip'
    };
    
    const opts = {...defaultOptions, ...options};
    const elements = getAllElements(opts.selector);
    
    if (!elements.length) return;
    
    // Create tooltip container
    let tooltipContainer = document.querySelector(`.${opts.tooltipClass}-container`);
    if (!tooltipContainer) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.className = `${opts.tooltipClass}-container`;
      document.body.appendChild(tooltipContainer);
    }
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = opts.tooltipClass;
    tooltip.classList.add(`${opts.tooltipClass}-${opts.animation}`);
    tooltipContainer.appendChild(tooltip);
    
    // Track mouse movement for follow cursor position
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update tooltip position if follow mode is active
      if (tooltip.classList.contains('follow')) {
        positionTooltipAtCursor();
      }
    });
    
    /**
     * Position tooltip next to cursor
     */
    function positionTooltipAtCursor() {
      tooltip.style.left = `${mouseX + opts.spacing}px`;
      tooltip.style.top = `${mouseY + opts.spacing}px`;
    }
    
    /**
     * Position tooltip next to element
     * @param {Element} element - The element to position tooltip next to
     */
    function positionTooltip(element) {
      const position = element.getAttribute('data-aurora-tooltip-position') || opts.position;
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      
      // Reset classes
      tooltip.className = opts.tooltipClass;
      tooltip.classList.add(`${opts.tooltipClass}-${opts.animation}`);
      tooltip.classList.add(`${opts.tooltipClass}-${position}`);
      
      // Show the tooltip to calculate its dimensions
      tooltip.style.visibility = 'hidden';
      tooltip.classList.add('active');
      
      const tooltipRect = tooltip.getBoundingClientRect();
      
      // Reset visibility
      tooltip.style.visibility = '';
      
      switch (position) {
        case 'top':
          tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2) + scrollLeft}px`;
          tooltip.style.top = `${rect.top - tooltipRect.height - opts.spacing + scrollTop}px`;
          break;
        case 'bottom':
          tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2) + scrollLeft}px`;
          tooltip.style.top = `${rect.bottom + opts.spacing + scrollTop}px`;
          break;
        case 'left':
          tooltip.style.left = `${rect.left - tooltipRect.width - opts.spacing + scrollLeft}px`;
          tooltip.style.top = `${rect.top + (rect.height / 2) - (tooltipRect.height / 2) + scrollTop}px`;
          break;
        case 'right':
          tooltip.style.left = `${rect.right + opts.spacing + scrollLeft}px`;
          tooltip.style.top = `${rect.top + (rect.height / 2) - (tooltipRect.height / 2) + scrollTop}px`;
          break;
        case 'follow':
          tooltip.classList.add('follow');
          positionTooltipAtCursor();
          break;
      }
    }
    
    // Show/hide tooltip with delay
    let timerId = null;
    
    elements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        clearTimeout(timerId);
        
        timerId = setTimeout(() => {
          const content = element.getAttribute('data-aurora-tooltip');
          tooltip.textContent = content;
          positionTooltip(element);
          tooltip.classList.add('active');
        }, opts.delay);
      });
      
      element.addEventListener('mouseleave', () => {
        clearTimeout(timerId);
        
        timerId = setTimeout(() => {
          tooltip.classList.remove('active');
          tooltip.classList.remove('follow');
        }, opts.delay);
      });
    });
    
    return {
      show: function(element, content = null) {
        if (typeof element === 'string') {
          element = document.querySelector(element);
        }
        
        if (!element) return;
        
        const tooltipContent = content || element.getAttribute('data-aurora-tooltip');
        tooltip.textContent = tooltipContent;
        tooltip.classList.add('active');
        positionTooltip(element);
      },
      hide: function() {
        tooltip.classList.remove('active');
        tooltip.classList.remove('follow');
      }
    };
  };
  /* MODULE: TOOLTIPS - END */