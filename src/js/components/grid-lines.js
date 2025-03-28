
import { getElement } from '../core/utils.js';
/**
   * ======================================
   * MODULE: GRID LINES
   * ======================================
   * Purpose: Creates decorative grid lines in the background
   * 
   * Dependencies: 
   * - Core utilities (getElement)

   */

export function initGridLines(options = {}) {
    const defaultOptions = {
      container: '.aurora-grid-lines',
      horizontalLines: 5,
      verticalLines: 6,
      horizontalClass: 'aurora-horizontal-line',
      verticalClass: 'aurora-vertical-line'
    };
    
    const opts = {...defaultOptions, ...options};
    const container = getElement(opts.container);
    
    if (!container) return;
    
    // Clear existing lines
    container.innerHTML = '';
    
    // Create horizontal lines
    for (let i = 0; i < opts.horizontalLines; i++) {
      const line = document.createElement('div');
      line.className = opts.horizontalClass;
      line.style.top = `${(i + 1) * (100 / (opts.horizontalLines + 1))}%`;
      container.appendChild(line);
    }
    
    // Create vertical lines
    for (let i = 0; i < opts.verticalLines; i++) {
      const line = document.createElement('div');
      line.className = opts.verticalClass;
      line.style.left = `${(i + 1) * (100 / (opts.verticalLines + 1))}%`;
      container.appendChild(line);
    }
    
    return {
      update: function(newOptions) {
        initGridLines({...opts, ...newOptions});
      }
    };
  };
  /* MODULE: GRID LINES - END */