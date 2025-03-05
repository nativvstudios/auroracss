/**
 * Aurora CSS Framework v1.0.0
 * JavaScript Utilities
 * 
 * A lightweight collection of JavaScript utilities to enhance
 * the Aurora CSS Framework with interactive behaviors.
 */

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' 
    ? module.exports = factory() 
    : typeof define === 'function' && define.amd 
      ? define(factory) 
      : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Aurora = factory());
})(this, function() {
  'use strict';
  
  /**
   * Aurora Framework Main Object
   */
  const Aurora = {};
  
  /**
   * Helper Functions
   */
  function isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;
  }
  
  function getElement(selector) {
    if (isElement(selector)) return selector;
    return document.querySelector(selector);
  }
  
  function getAllElements(selector) {
    if (Array.isArray(selector)) return selector.filter(isElement);
    return Array.from(document.querySelectorAll(selector));
  }
  
  /**
   * Theme Toggle Functionality
   */
  Aurora.initThemeToggle = function(options = {}) {
    const defaultOptions = {
      toggleSelector: '#themeToggle, .aurora-theme-toggle',
      darkThemeClass: 'aurora-dark',
      lightThemeClass: 'aurora-light',
      storageKey: 'aurora-theme-preference',
      defaultTheme: 'dark'
    };
    
    const opts = {...defaultOptions, ...options};
    const toggleButtons = getAllElements(opts.toggleSelector);
    
    // Initialize theme based on saved preference or default
    const savedTheme = localStorage.getItem(opts.storageKey) || opts.defaultTheme;
    setTheme(savedTheme);
    
    // Add click event to toggle buttons
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains(opts.darkThemeClass) ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem(opts.storageKey, newTheme);
      });
    });
    
    function setTheme(theme) {
      if (theme === 'dark') {
        document.body.classList.add(opts.darkThemeClass);
        document.body.classList.remove(opts.lightThemeClass);
        // Update CSS variables for dark theme
        document.documentElement.style.setProperty('--aurora-bg-color', '#0f1923');
        document.documentElement.style.setProperty('--aurora-card-color', 'rgba(25, 31, 40, 0.7)');
        document.documentElement.style.setProperty('--aurora-text-primary', '#ffffff');
        document.documentElement.style.setProperty('--aurora-text-secondary', 'rgba(255, 255, 255, 0.7)');
      } else {
        document.body.classList.add(opts.lightThemeClass);
        document.body.classList.remove(opts.darkThemeClass);
        // Update CSS variables for light theme
        document.documentElement.style.setProperty('--aurora-bg-color', '#f5f7fa');
        document.documentElement.style.setProperty('--aurora-card-color', 'rgba(245, 245, 245, 0.7)');
        document.documentElement.style.setProperty('--aurora-text-primary', '#1a1a1a');
        document.documentElement.style.setProperty('--aurora-text-secondary', 'rgba(26, 26, 26, 0.7)');
      }
      
      // Dispatch theme change event
      const event = new CustomEvent('aurora:themeChange', { detail: { theme } });
      document.dispatchEvent(event);
    }
    
    // Expose the setTheme function
    Aurora.setTheme = setTheme;
    
    return {
      setTheme,
      getTheme: () => document.body.classList.contains(opts.darkThemeClass) ? 'dark' : 'light'
    };
  };
  
  /**
   * Typing Animation
   */
  Aurora.initTyping = function(elementId, texts = [], options = {}) {
    const defaultOptions = {
      typeSpeed: 100,
      eraseSpeed: 50,
      newTextDelay: 2000,
      cursorChar: '<span class="aurora-cursor"></span>'
    };
    
    const opts = {...defaultOptions, ...options};
    const element = getElement(`#${elementId}`);
    
    if (!element) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let cursorElement = null;
    
    // Initialize cursor if not present
    if (!document.querySelector(`#${elementId} + .aurora-cursor`)) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = opts.cursorChar;
      cursorElement = tempDiv.firstChild;
      element.parentNode.insertBefore(cursorElement, element.nextSibling);
    } else {
      cursorElement = document.querySelector(`#${elementId} + .aurora-cursor`);
    }
    
    function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        // Erasing text
        element.textContent = currentText.substring(0, charIndex - 1);
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
        element.textContent = currentText.substring(0, charIndex + 1);
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
  };
  
  /**
   * Scroll Animations
   */
  Aurora.initScrollAnimations = function(options = {}) {
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
    
    // Define animation classes if they don't exist in CSS
    if (!document.querySelector('style#aurora-animations')) {
      const style = document.createElement('style');
      style.id = 'aurora-animations';
      style.textContent = `
        .aurora-animate-fade {
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .aurora-animate-fade.aurora-animate-running {
          opacity: 1;
        }
        .aurora-animate-slide-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .aurora-animate-slide-up.aurora-animate-running {
          opacity: 1;
          transform: translateY(0);
        }
        .aurora-animate-slide-left {
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .aurora-animate-slide-left.aurora-animate-running {
          opacity: 1;
          transform: translateX(0);
        }
        .aurora-animate-slide-right {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .aurora-animate-slide-right.aurora-animate-running {
          opacity: 1;
          transform: translateX(0);
        }
      `;
      document.head.appendChild(style);
    }
    
    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animation = element.getAttribute('data-aurora-animate');
            
            // Add animation class first
            element.classList.add(`aurora-animate-${animation}`);
            
            // Trigger reflow to ensure animation applies
            void element.offsetWidth;
            
            // Then add running class
            element.classList.add(opts.animationClass);
            
            if (opts.once) {
              observer.unobserve(element);
            }
            
            // Dispatch animation start event
            const event = new CustomEvent('aurora:animationStart', { 
              detail: { element, animation } 
            });
            document.dispatchEvent(event);
          } else if (!opts.once) {
            const element = entry.target;
            const animation = element.getAttribute('data-aurora-animate');
            
            element.classList.remove(opts.animationClass);
          }
        });
      },
      {
        threshold: opts.threshold,
        rootMargin: opts.rootMargin
      }
    );
    
    // Observe all elements
    elements.forEach(element => {
      observer.observe(element);
    });
    
    // Function to manually refresh elements (useful for dynamic content)
    function refresh() {
      const newElements = getAllElements(opts.selector);
      
      newElements.forEach(element => {
        if (!element.classList.contains(opts.animationClass)) {
          observer.observe(element);
        }
      });
    }
    
    return {
      refresh,
      observer
    };
  };
  
  /**
   * Parallax Effects
   */
  Aurora.initParallax = function(options = {}) {
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
  
  /**
   * Mobile Navigation
   */
  Aurora.initMobileNav = function(options = {}) {
    const defaultOptions = {
      navbarSelector: '.aurora-navbar',
      toggleSelector: '.aurora-navbar-toggle',
      openClass: 'aurora-open'
    };
    
    const opts = {...defaultOptions, ...options};
    const navbar = getElement(opts.navbarSelector);
    const toggleButton = getElement(opts.toggleSelector);
    
    if (!navbar || !toggleButton) return;
    
    toggleButton.addEventListener('click', () => {
      navbar.classList.toggle(opts.openClass);
      
      // Dispatch toggle event
      const isOpen = navbar.classList.contains(opts.openClass);
      const event = new CustomEvent('aurora:navToggle', { 
        detail: { isOpen } 
      });
      document.dispatchEvent(event);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navbar.classList.contains(opts.openClass) &&
          !navbar.contains(e.target) &&
          e.target !== toggleButton) {
        navbar.classList.remove(opts.openClass);
      }
    });
    
    return {
      toggle: function() {
        navbar.classList.toggle(opts.openClass);
      },
      open: function() {
        navbar.classList.add(opts.openClass);
      },
      close: function() {
        navbar.classList.remove(opts.openClass);
      },
      isOpen: function() {
        return navbar.classList.contains(opts.openClass);
      }
    };
  };
  
  /**
   * Grid Lines
   */
  Aurora.initGridLines = function(options = {}) {
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
        const updatedOpts = {...opts, ...newOptions};
        Aurora.initGridLines(updatedOpts);
      }
    };
  };
  
  /**
   * Highlight Effects
   */
  Aurora.initHighlightEffects = function(options = {}) {
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
  
  /**
   * Scroll to Top Button
   */
  Aurora.initScrollToTop = function(options = {}) {
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
  
  /**
   * Modal Dialog
   */
  Aurora.initModal = function(options = {}) {
    const defaultOptions = {
      modalSelector: '.aurora-modal',
      openSelector: '[data-aurora-modal]',
      closeSelector: '.aurora-modal-close',
      activeClass: 'aurora-modal-active',
      backdropClass: 'aurora-modal-backdrop',
      animation: true
    };
    
    const opts = {...defaultOptions, ...options};
    const modals = getAllElements(opts.modalSelector);
    const openButtons = getAllElements(opts.openSelector);
    
    if (!modals.length) return;
    
    // Create backdrop if it doesn't exist
    let backdrop = document.querySelector(`.${opts.backdropClass}`);
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = opts.backdropClass;
      document.body.appendChild(backdrop);
    }
    
    // Add click events to open buttons
    openButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = button.getAttribute('data-aurora-modal');
        const modal = document.getElementById(modalId);
        
        if (modal) {
          openModal(modal);
        }
      });
    });
    
    // Add click events to close buttons
    modals.forEach(modal => {
      const closeButtons = modal.querySelectorAll(opts.closeSelector);
      closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          closeModal(modal);
        });
      });
    });
    
    // Close modal when clicking backdrop
    backdrop.addEventListener('click', () => {
      const activeModal = document.querySelector(`${opts.modalSelector}.${opts.activeClass}`);
      if (activeModal) {
        closeModal(activeModal);
      }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector(`${opts.modalSelector}.${opts.activeClass}`);
        if (activeModal) {
          closeModal(activeModal);
        }
      }
    });
    
    function openModal(modal) {
      // Close any open modals first
      const activeModal = document.querySelector(`${opts.modalSelector}.${opts.activeClass}`);
      if (activeModal && activeModal !== modal) {
        closeModal(activeModal, true);
      }
      
      // Show backdrop
      backdrop.classList.add('active');
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      
      // Show modal with optional animation
      if (opts.animation) {
        modal.style.opacity = '0';
        modal.classList.add(opts.activeClass);
        
        setTimeout(() => {
          modal.style.opacity = '1';
        }, 10);
      } else {
        modal.classList.add(opts.activeClass);
      }
      
      // Dispatch open event
      const event = new CustomEvent('aurora:modalOpen', { 
        detail: { modal } 
      });
      document.dispatchEvent(event);
    }
    
    function closeModal(modal, skipBackdrop = false) {
      if (opts.animation) {
        modal.style.opacity = '0';
        
        setTimeout(() => {
          modal.classList.remove(opts.activeClass);
          modal.style.opacity = '';
          
          // Hide backdrop if no modals are open and not skipping backdrop
          if (!skipBackdrop) {
            const activeModals = document.querySelectorAll(`${opts.modalSelector}.${opts.activeClass}`);
            if (activeModals.length === 0) {
              backdrop.classList.remove('active');
              document.body.style.overflow = '';
            }
          }
        }, 300);
      } else {
        modal.classList.remove(opts.activeClass);
        
        // Hide backdrop if no modals are open and not skipping backdrop
        if (!skipBackdrop) {
          const activeModals = document.querySelectorAll(`${opts.modalSelector}.${opts.activeClass}`);
          if (activeModals.length === 0) {
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      }
      
      // Dispatch close event
      const event = new CustomEvent('aurora:modalClose', { 
        detail: { modal } 
      });
      document.dispatchEvent(event);
    }
    
    return {
      open: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
          openModal(modal);
        }
      },
      close: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
          closeModal(modal);
        }
      },
      closeAll: function() {
        const activeModals = document.querySelectorAll(`${opts.modalSelector}.${opts.activeClass}`);
        activeModals.forEach(modal => {
          closeModal(modal);
        });
      }
    };
  };
  
  /**
   * Tooltips
   */
  Aurora.initTooltips = function(options = {}) {
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
    
    // Position tooltip next to cursor
    function positionTooltipAtCursor() {
      tooltip.style.left = `${mouseX + opts.spacing}px`;
      tooltip.style.top = `${mouseY + opts.spacing}px`;
    }
    
    // Position tooltip next to element
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
  
  /**
   * Initialize all Aurora components
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
    }
    
    if (components.themeToggle) {
      Aurora.initThemeToggle(options.themeToggle || {});
    }
    
    if (components.mobileNav) {
      Aurora.initMobileNav(options.mobileNav || {});
    }
    
    if (components.gridLines) {
      Aurora.initGridLines(options.gridLines || {});
    }
    
    if (components.highlightEffects) {
      Aurora.initHighlightEffects(options.highlightEffects || {});
    }
    
    if (components.modals) {
      Aurora.initModal(options.modals || {});
    }
    
    if (components.tooltips) {
      Aurora.initTooltips(options.tooltips || {});
    }
    
    if (components.parallax) {
      Aurora.initParallax(options.parallax || {});
    }
    
    if (components.scrollAnimations) {
      Aurora.initScrollAnimations(options.scrollAnimations || {});
    }
  };
  
  // Auto-initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    if (window.auroraAutoInit !== false) {
      Aurora.init();
    }
  });
  
  return Aurora;
});