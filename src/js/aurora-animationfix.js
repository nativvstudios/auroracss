// Enhanced animation fixes for Aurora CSS Framework
// Adds responsive improvements and better mobile support

document.addEventListener('DOMContentLoaded', function() {
  // Fix for scroll animations to ensure all directions work properly
  const animationFix = function() {
    // First, let's add the animation classes to elements that should be animated
    const animatedElements = document.querySelectorAll('[data-aurora-animate]');
    
    // Check if on mobile device for better mobile animations
    const isMobile = window.innerWidth < 768;
    
    // Add appropriate animation classes based on data attribute
    animatedElements.forEach(element => {
      const animationType = element.getAttribute('data-aurora-animate');
      element.classList.add(`aurora-animate-${animationType}`);
      
      // Set will-change for better performance
      element.style.willChange = 'opacity, transform';
    });
    
    // Create an intersection observer with appropriate options
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // When element enters viewport
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Use setTimeout for staggered animation on mobile
          if (isMobile) {
            // Get all animated elements in the same container for staggered effect
            const container = element.closest('section') || element.parentElement;
            const siblings = container.querySelectorAll('[data-aurora-animate]');
            const index = Array.from(siblings).indexOf(element);
            
            // Stagger the animations slightly
            setTimeout(() => {
              element.classList.add('aurora-animate-running');
            }, Math.min(index * 100, 300));
          } else {
            element.classList.add('aurora-animate-running');
          }
          
          // Save animation state to localStorage for smoother page transitions
          if (element.id) {
            localStorage.setItem(`aurora-anim-${element.id}`, 'animated');
          }
          
          // Optionally unobserve after animation (default is to keep observing)
          // observer.unobserve(entry.target);
        } else {
          // When element leaves viewport - remove class to reset animation
          // Comment out this section if you want animations to only play once
          entry.target.classList.remove('aurora-animate-running');
        }
      });
    }, {
      threshold: isMobile ? 0.15 : 0.2, // Lower threshold on mobile for earlier animation
      rootMargin: isMobile ? '0px 0px 50px 0px' : '0px' // Better margins for mobile scrolling
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
      // Check if already animated (for page transitions)
      if (element.id && localStorage.getItem(`aurora-anim-${element.id}`) === 'animated') {
        element.classList.add('aurora-animate-running');
        return;
      }
      
      observer.observe(element);
    });
    
    // Handle resize events to adjust for orientation changes
    window.addEventListener('resize', function() {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth < 768;
      
      if (wasMobile !== nowMobile) {
        // Update animation thresholds when device type changes
        observer.disconnect();
        
        animatedElements.forEach(element => {
          // Only reset non-persistent animations
          if (!element.hasAttribute('data-aurora-persist')) {
            element.classList.remove('aurora-animate-running');
          }
          observer.observe(element);
        });
      }
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
          element.style.willChange = 'opacity, transform';
          observer.observe(element);
        });
      },
      // Reset all animations (useful for page transitions)
      reset: function() {
        animatedElements.forEach(element => {
          element.classList.remove('aurora-animate-running');
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
    
    // Check if it's a touch device for better mobile support
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
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
    
    // Track active tooltip element
    let activeElement = null;
    
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
    
    // Position tooltip next to element with improved positioning
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
      
      // Calculate window boundaries for better positioning
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Default positions
      let left, top;
      
      switch (position) {
        case 'top':
          left = rect.left + (rect.width / 2);
          top = rect.top - tooltipRect.height - 8 + scrollTop;
          break;
        case 'bottom':
          left = rect.left + (rect.width / 2);
          top = rect.bottom + 8 + scrollTop;
          break;
        case 'left':
          left = rect.left - tooltipRect.width - 8 + scrollLeft;
          top = rect.top + (rect.height / 2) - (tooltipRect.height / 2) + scrollTop;
          break;
        case 'right':
          left = rect.right + 8 + scrollLeft;
          top = rect.top + (rect.height / 2) - (tooltipRect.height / 2) + scrollTop;
          break;
        case 'follow':
          tooltip.classList.add('follow');
          left = mouseX;
          top = mouseY;
          break;
      }
      
      // Adjust for viewport boundaries
      if (position === 'top' || position === 'bottom') {
        // Keep tooltip within horizontal bounds
        if (left - (tooltipRect.width / 2) < 10) {
          left = 10 + (tooltipRect.width / 2);
        } else if (left + (tooltipRect.width / 2) > windowWidth - 10) {
          left = windowWidth - 10 - (tooltipRect.width / 2);
        }
      }
      
      // Adjust for small screens - stack tooltips vertically on narrow screens
      if (windowWidth < 576 && (position === 'left' || position === 'right')) {
        if (position === 'left') {
          left = rect.left + (rect.width / 2);
          top = rect.top - tooltipRect.height - 8 + scrollTop;
        } else {
          left = rect.left + (rect.width / 2);
          top = rect.bottom + 8 + scrollTop;
        }
        tooltip.className = 'aurora-tooltip aurora-tooltip-mobile';
        tooltip.classList.add(`aurora-tooltip-${position === 'left' ? 'top' : 'bottom'}`);
      }
      
      // Apply final position
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }
    
    // Show/hide tooltip with delay
    let timerId = null;
    
    // Show tooltip function
    function showTooltip(element) {
      if (timerId) clearTimeout(timerId);
      
      timerId = setTimeout(() => {
        const content = element.getAttribute('data-aurora-tooltip');
        tooltip.textContent = content;
        positionTooltip(element);
        tooltip.classList.add('active');
        activeElement = element;
      }, isTouchDevice ? 0 : 200); // No delay on touch devices
    }
    
    // Hide tooltip function
    function hideTooltip() {
      if (timerId) clearTimeout(timerId);
      
      timerId = setTimeout(() => {
        tooltip.classList.remove('active');
        tooltip.classList.remove('follow');
        activeElement = null;
      }, 200);
    }
    
    // Add mouse events for desktop
    tooltips.forEach(element => {
      // Add desktop mouse events
      element.addEventListener('mouseenter', () => {
        if (!isTouchDevice) {
          showTooltip(element);
        }
      });
      
      element.addEventListener('mouseleave', () => {
        if (!isTouchDevice) {
          hideTooltip();
        }
      });
      
      // Add touch events for mobile
      if (isTouchDevice) {
        element.addEventListener('touchstart', (e) => {
          // Toggle tooltip on touch
          if (activeElement === element) {
            hideTooltip();
          } else {
            // Hide any existing tooltip
            if (activeElement) {
              hideTooltip();
            }
            showTooltip(element);
          }
          
          // Prevent default to avoid unwanted clicks
          e.preventDefault();
        }, { passive: false });
      }
    });
    
    // Hide tooltip when clicking/touching elsewhere
    if (isTouchDevice) {
      document.addEventListener('touchstart', (e) => {
        if (activeElement && !activeElement.contains(e.target) && e.target !== tooltip) {
          hideTooltip();
        }
      });
    }
    
    // Update tooltip position on scroll
    window.addEventListener('scroll', () => {
      if (activeElement && !tooltip.classList.contains('follow')) {
        if (isTouchDevice) {
          hideTooltip();
        } else {
          positionTooltip(activeElement);
        }
      }
    }, { passive: true });
    
    return {
      show: function(element, content = null) {
        if (typeof element === 'string') {
          element = document.querySelector(element);
        }
        
        if (!element) return;
        
        activeElement = element;
        const tooltipContent = content || element.getAttribute('data-aurora-tooltip');
        tooltip.textContent = tooltipContent;
        positionTooltip(element);
        tooltip.classList.add('active');
      },
      hide: function() {
        tooltip.classList.remove('active');
        tooltip.classList.remove('follow');
        activeElement = null;
      },
      // Update tooltip positions on resize
      refresh: function() {
        if (activeElement) {
          positionTooltip(activeElement);
        }
      }
    };
  };
  
  // Initialize the tooltip fix
  window.auroraTooltipFix = tooltipFix();
  
  // Add mobile navigation fix if needed
  const mobileNavFix = function() {
    const navbar = document.querySelector('.aurora-navbar');
    const toggle = document.querySelector('.aurora-navbar-toggle');
    
    if (!navbar || !toggle) return;
    
    // Add better touch support for mobile navigation
    toggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent document click from immediately closing
      navbar.classList.toggle('aurora-open');
    });
    
    // Close menu when clicking anywhere else
    document.addEventListener('click', function(e) {
      if (navbar.classList.contains('aurora-open') && 
          !navbar.contains(e.target) && 
          e.target !== toggle) {
        navbar.classList.remove('aurora-open');
      }
    });
    
    // Close menu when nav link is clicked on mobile
    const navLinks = navbar.querySelectorAll('.aurora-nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth < 768) {
          navbar.classList.remove('aurora-open');
        }
      });
    });
    
    // Add aria attributes for accessibility
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    return {
      open: function() {
        navbar.classList.add('aurora-open');
        toggle.setAttribute('aria-expanded', 'true');
      },
      close: function() {
        navbar.classList.remove('aurora-open');
        toggle.setAttribute('aria-expanded', 'false');
      },
      toggle: function() {
        navbar.classList.toggle('aurora-open');
        toggle.setAttribute('aria-expanded', navbar.classList.contains('aurora-open') ? 'true' : 'false');
      }
    };
  };
  
  // Initialize the navigation fix
  window.auroraMobileNavFix = mobileNavFix();
  
  // Fix for iOS-specific issues
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    // Add class to handle iOS-specific layout issues
    document.documentElement.classList.add('ios-device');
    
    // Fix for 100vh issue on iOS
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
    // Fix for fixed positioning on iOS
    const fixedElements = document.querySelectorAll('.aurora-navbar, .aurora-modal, .aurora-scroll-top, .aurora-toggle-container');
    
    fixedElements.forEach(el => {
      el.addEventListener('touchstart', e => {
        // Allow scroll but prevent unwanted behaviors
        e.stopPropagation();
      }, { passive: true });
    });
  }
  
  // Fix for browsers that don't support backdrop-filter
  if (!CSS.supports('(-webkit-backdrop-filter: blur(10px))') && 
      !CSS.supports('(backdrop-filter: blur(10px))')) {
    document.documentElement.classList.add('no-backdrop-filter');
    
    // Increase background opacity for elements that use backdrop-filter
    const glassElements = document.querySelectorAll('.aurora-glass-card, .aurora-navbar, .aurora-modal');
    glassElements.forEach(el => {
      // Make background more opaque to compensate for lack of blur
      if (getComputedStyle(el).backgroundColor.includes('rgba')) {
        const style = getComputedStyle(el);
        const bgColor = style.backgroundColor;
        const matches = bgColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        
        if (matches && matches.length === 5) {
          const r = matches[1];
          const g = matches[2];
          const b = matches[3];
          // Increase opacity by at least 0.3
          const newOpacity = Math.min(1, parseFloat(matches[4]) + 0.3);
          el.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
        }
      }
    });
  }
  
  // // Add responsive card height equalization
  // const equalizeCardHeights = function() {
  //   const rows = document.querySelectorAll('.aurora-row');
    
  //   // Skip on small screens
  //   if (window.innerWidth < 768) return;
    
  //   rows.forEach(row => {
  //     const cards = row.querySelectorAll('.aurora-card, .aurora-glass-card');
  //     if (cards.length <= 1) return;
      
  //     // Reset heights
  //     cards.forEach(card => card.style.height = '');
      
  //     // Find tallest card
  //     let maxHeight = 0;
  //     cards.forEach(card => {
  //       maxHeight = Math.max(maxHeight, card.offsetHeight);
  //     });
      
  //     // Apply height to all cards
  //     cards.forEach(card => {
  //       card.style.height = `${maxHeight}px`;
  //     });
  //   });
  // };
  
  // Call once on load and on resize with throttling
  equalizeCardHeights();
  
  let resizeTimeout;
  window.addEventListener('resize', () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      equalizeCardHeights();
      
      // Refresh tooltip positions
      if (window.auroraTooltipFix && typeof window.auroraTooltipFix.refresh === 'function') {
        window.auroraTooltipFix.refresh();
      }
    }, 200);
  });
});