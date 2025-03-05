// Add this script after the main Aurora.js file to fix animations

document.addEventListener('DOMContentLoaded', function() {
  // Fix for scroll animations to ensure all directions work properly
  const animationFix = function() {
    // First, let's add the animation classes to elements that should be animated
    const animatedElements = document.querySelectorAll('[data-aurora-animate]');
    
    // Add appropriate animation classes based on data attribute
    animatedElements.forEach(element => {
      const animationType = element.getAttribute('data-aurora-animate');
      element.classList.add(`aurora-animate-${animationType}`);
    });
    
    // Create an intersection observer with appropriate options
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // When element enters viewport
        if (entry.isIntersecting) {
          entry.target.classList.add('aurora-animate-running');
          
          // Optional: If we only want animation to play once
          // observer.unobserve(entry.target);
        } else {
          // When element leaves viewport - remove class to reset animation
          // Comment out this section if you want animations to only play once
          entry.target.classList.remove('aurora-animate-running');
        }
      });
    }, {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: '0px'
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    return {
      observer,
      refresh: function() {
        // Re-initialize for dynamically added elements
        const newElements = document.querySelectorAll('[data-aurora-animate]:not(.aurora-animate-initialized)');
        newElements.forEach(element => {
          const animationType = element.getAttribute('data-aurora-animate');
          element.classList.add(`aurora-animate-${animationType}`);
          element.classList.add('aurora-animate-initialized');
          observer.observe(element);
        });
      }
    };
  };
  
  // Initialize the animation fix
  window.auroraAnimationFix = animationFix();
  
  // Fix for tooltips to improve positioning and text wrapping
  const tooltipFix = function() {
    const tooltips = document.querySelectorAll('[data-aurora-tooltip]');
    if (!tooltips.length) return;
    
    // Create tooltip container if it doesn't exist
    let tooltipContainer = document.querySelector('.aurora-tooltip-container');
    if (!tooltipContainer) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.className = 'aurora-tooltip-container';
      document.body.appendChild(tooltipContainer);
    }
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'aurora-tooltip';
    tooltipContainer.appendChild(tooltip);
    
    // Track mouse movement for follow cursor position
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update tooltip position if follow mode is active
      if (tooltip.classList.contains('follow')) {
        tooltip.style.left = `${mouseX}px`;
        tooltip.style.top = `${mouseY}px`;
      }
    });
    
    // Position tooltip next to element
    function positionTooltip(element) {
      const position = element.getAttribute('data-aurora-tooltip-position') || 'top';
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      
      // Reset classes
      tooltip.className = 'aurora-tooltip';
      tooltip.classList.add(`aurora-tooltip-${position}`);
      
      // Show the tooltip to calculate its dimensions
      tooltip.style.visibility = 'hidden';
      tooltip.classList.add('active');
      
      const tooltipRect = tooltip.getBoundingClientRect();
      
      // Reset visibility
      tooltip.style.visibility = '';
      
      switch (position) {
        case 'top':
          tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
          tooltip.style.top = `${rect.top - tooltipRect.height - 8 + scrollTop}px`;
          break;
        case 'bottom':
          tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
          tooltip.style.top = `${rect.bottom + 8 + scrollTop}px`;
          break;
        case 'left':
          tooltip.style.left = `${rect.left - tooltipRect.width - 8 + scrollLeft}px`;
          tooltip.style.top = `${rect.top + (rect.height / 2) - (tooltipRect.height / 2) + scrollTop}px`;
          break;
        case 'right':
          tooltip.style.left = `${rect.right + 8 + scrollLeft}px`;
          tooltip.style.top = `${rect.top + (rect.height / 2) - (tooltipRect.height / 2) + scrollTop}px`;
          break;
        case 'follow':
          tooltip.classList.add('follow');
          tooltip.style.left = `${mouseX}px`;
          tooltip.style.top = `${mouseY}px`;
          break;
      }
    }
    
    // Show/hide tooltip with delay
    let timerId = null;
    
    tooltips.forEach(element => {
      element.addEventListener('mouseenter', () => {
        clearTimeout(timerId);
        
        timerId = setTimeout(() => {
          const content = element.getAttribute('data-aurora-tooltip');
          tooltip.textContent = content;
          positionTooltip(element);
          tooltip.classList.add('active');
        }, 200);
      });
      
      element.addEventListener('mouseleave', () => {
        clearTimeout(timerId);
        
        timerId = setTimeout(() => {
          tooltip.classList.remove('active');
          tooltip.classList.remove('follow');
        }, 200);
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
        positionTooltip(element);
        tooltip.classList.add('active');
      },
      hide: function() {
        tooltip.classList.remove('active');
        tooltip.classList.remove('follow');
      }
    };
  };
  
  // Initialize the tooltip fix
  window.auroraTooltipFix = tooltipFix();
});