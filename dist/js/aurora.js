(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = true,
        o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = true, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  /**
   * ======================================
   * MODULE: CORE UTILITIES START
   * ======================================
   */

  /**
   * Check if object is a DOM element
   * @param {*} element - Element to check
   * @returns {boolean} - True if element is a DOM element
   */
  function isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;
  }

  /**
   * Get a single DOM element
   * @param {string|Element} selector - CSS selector or DOM element
   * @returns {Element} - The DOM element
   */
  function getElement(selector) {
    if (isElement(selector)) return selector;
    return document.querySelector(selector);
  }

  /**
   * Get all matching DOM elements as an array
   * @param {string|Element[]} selector - CSS selector or array of DOM elements
   * @returns {Element[]} - Array of DOM elements
   */
  function getAllElements(selector) {
    if (Array.isArray(selector)) return selector.filter(isElement);
    return Array.from(document.querySelectorAll(selector));
  }

  // Add to Aurora object
  if (typeof Aurora !== 'undefined') {
    Aurora.isElement = isElement;
    Aurora.getElement = getElement;
    Aurora.getAllElements = getAllElements;
  }

  /**
   * ======================================
   * MODULE: CORE UTILITIES END
   * ======================================
   */

  /**
   * ======================================
   * MODULE: THEME TOGGLE
   * ======================================
   * Purpose: Provides a theme toggle button for the Aurora framework
   *
   * Dependencies:
   * - Core utilities (getAllElements)
   **/

  function initThemeToggle() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultOptions = {
      toggleSelector: '#themeToggle, .aurora-theme-toggle',
      darkThemeClass: 'aurora-dark',
      lightThemeClass: 'aurora-light',
      storageKey: 'aurora-theme-preference',
      defaultTheme: 'dark'
    };
    var opts = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    var toggleButtons = getAllElements(opts.toggleSelector);

    // Initialize theme based on saved preference or default
    var savedTheme = localStorage.getItem(opts.storageKey) || opts.defaultTheme;
    setTheme(savedTheme);

    // Add click event to toggle buttons
    toggleButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var currentTheme = document.body.classList.contains(opts.darkThemeClass) ? 'dark' : 'light';
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem(opts.storageKey, newTheme);
      });
    });

    /**
     * Set theme to dark or light mode
     * @param {string} theme - 'dark' or 'light'
     */
    function setTheme(theme) {
      if (theme === 'dark') {
        document.body.classList.add(opts.darkThemeClass);
        document.body.classList.remove(opts.lightThemeClass);
        var icon = document.getElementById('themeToggleIcon');
        if (icon) {
          icon.className = 'fa-solid fa-sun';
        }

        // Update CSS variables for dark theme
        document.documentElement.style.setProperty('--aurora-bg-color', '#0f1923');
        document.documentElement.style.setProperty('--aurora-card-color', 'rgba(25, 31, 40, 0.7)');
        document.documentElement.style.setProperty('--aurora-text-primary', '#ffffff');
        document.documentElement.style.setProperty('--aurora-text-secondary', 'rgba(255, 255, 255, 0.7)');
      } else {
        document.body.classList.add(opts.lightThemeClass);
        document.body.classList.remove(opts.darkThemeClass);
        var _icon = document.getElementById('themeToggleIcon');
        if (_icon) {
          _icon.className = 'fa-solid fa-moon';
        }
        // Update CSS variables for light theme
        document.documentElement.style.setProperty('--aurora-bg-color', '#f5f7fa');
        document.documentElement.style.setProperty('--aurora-card-color', 'rgba(245, 245, 245, 0.7)');
        document.documentElement.style.setProperty('--aurora-text-primary', '#1a1a1a');
        document.documentElement.style.setProperty('--aurora-text-secondary', 'rgba(26, 26, 26, 0.7)');
      }

      // Dispatch theme change event
      var event = new CustomEvent('aurora:themeChange', {
        detail: {
          theme: theme
        }
      });
      document.dispatchEvent(event);
    }
    return {
      setTheme: setTheme,
      getTheme: function getTheme() {
        return document.body.classList.contains(opts.darkThemeClass) ? 'dark' : 'light';
      }
    };
  }

  /* MODULE: THEME TOGGLE - END */

  /**
    * ======================================
    * MODULE: TYPING ANIMATION START
    * ======================================
    * Purpose: Creates a CLI typing animation on a designated element
    * 
    * Dependencies: 
    * - Core utilities (getElement)
    */
  function initTyping(elementId) {
    var texts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var defaultOptions = {
      typeSpeed: 100,
      eraseSpeed: 50,
      newTextDelay: 2000,
      cursorChar: '▐' // Changed from span to simple character
    };
    var opts = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    var element = getElement("#".concat(elementId));
    if (!element) return;
    var textIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    // Add the cursor directly to the element's content
    element.textContent = opts.cursorChar;

    /**
     * Type or erase text at the current position
     */
    function type() {
      var currentText = texts[textIndex];
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
      restart: function restart() {
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        element.textContent = '';
        setTimeout(type, opts.newTextDelay / 3);
      },
      setText: function setText(newTexts) {
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

  /**
    * ======================================
    * MODULE: SCROLL ANIMATIONS
    * ======================================
    * Purpose: Provides scroll-triggered animations for elements
    * 
    * Dependencies: 
    * - Core utilities (getAllElements)
    */
  function initScrollAnimations() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultOptions = {
      selector: '[data-aurora-animate]',
      threshold: 0.2,
      once: true,
      rootMargin: '0px',
      animationClass: 'aurora-animate-running'
    };
    var opts = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    var elements = getAllElements(opts.selector);
    if (!elements.length) return;

    // Check if on mobile device for better mobile animations
    var isMobile = window.innerWidth < 768;

    // Add appropriate animation classes and set will-change
    elements.forEach(function (element) {
      var animationType = element.getAttribute('data-aurora-animate');
      element.classList.add("aurora-animate-".concat(animationType));
      element.style.willChange = 'opacity, transform';
    });

    // Create intersection observer with mobile-optimized options
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var element = entry.target;

          // Use setTimeout for staggered animation on mobile
          if (isMobile) {
            var container = element.closest('section') || element.parentElement;
            var siblings = container.querySelectorAll('[data-aurora-animate]');
            var index = Array.from(siblings).indexOf(element);
            setTimeout(function () {
              element.classList.add(opts.animationClass);
            }, Math.min(index * 100, 300));
          } else {
            element.classList.add(opts.animationClass);
          }

          // Save animation state for smoother page transitions
          if (element.id) {
            localStorage.setItem("aurora-anim-".concat(element.id), 'animated');
          }
          if (opts.once) {
            observer.unobserve(element);
          }
        } else if (!opts.once) {
          entry.target.classList.remove(opts.animationClass);
        }
      });
    }, {
      threshold: isMobile ? 0.15 : opts.threshold,
      rootMargin: isMobile ? '0px 0px 50px 0px' : opts.rootMargin
    });

    // Observe elements, checking for previous animations
    elements.forEach(function (element) {
      if (element.id && localStorage.getItem("aurora-anim-".concat(element.id)) === 'animated') {
        element.classList.add(opts.animationClass);
        return;
      }
      observer.observe(element);
    });

    // Handle resize events for responsive animations
    window.addEventListener('resize', function () {
      var wasMobile = isMobile;
      var nowMobile = window.innerWidth < 768;
      if (wasMobile !== nowMobile) {
        observer.disconnect();
        elements.forEach(function (element) {
          if (!element.hasAttribute('data-aurora-persist')) {
            element.classList.remove(opts.animationClass);
          }
          observer.observe(element);
        });
      }
    });
    return {
      refresh: function refresh() {
        var newElements = document.querySelectorAll("".concat(opts.selector, ":not(.aurora-animate-initialized)"));
        newElements.forEach(function (element) {
          var animationType = element.getAttribute('data-aurora-animate');
          element.classList.add("aurora-animate-".concat(animationType));
          element.classList.add('aurora-animate-initialized');
          element.style.willChange = 'opacity, transform';
          observer.observe(element);
        });
      },
      reset: function reset() {
        elements.forEach(function (element) {
          element.classList.remove(opts.animationClass);
          observer.observe(element);
        });
      },
      observer: observer
    };
  }
  /* MODULE: SCROLL ANIMATIONS - END */

  /**
     * ======================================
     * MODULE: PARALLAX EFFECTS
     * ======================================
     * Purpose: Creates mouse-movement parallax effects on elements
     * 
     * Dependencies: 
     * - Core utilities (getAllElements)
     */
  function initParallax() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultOptions = {
      selector: '.aurora-parallax',
      speedAttribute: 'data-aurora-depth',
      defaultSpeed: 0.2,
      direction: 'normal'
    };
    var opts = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    var elements = getAllElements(opts.selector);
    if (!elements.length) return;

    // Initialize parallax positions
    updateParallaxPositions(0, 0);

    // Add mousemove event to document
    document.addEventListener('mousemove', handleMouseMove);

    /**
     * Handle mouse movement to calculate parallax effect
     */
    function handleMouseMove(e) {
      var mouseX = e.clientX;
      var mouseY = e.clientY;

      // Calculate position relative to center of window
      var centerX = window.innerWidth / 2;
      var centerY = window.innerHeight / 2;
      var posX = (mouseX - centerX) / centerX;
      var posY = (mouseY - centerY) / centerY;
      updateParallaxPositions(posX, posY);
    }

    /**
     * Update position of all parallax elements
     */
    function updateParallaxPositions(posX, posY) {
      elements.forEach(function (element) {
        var speed = parseFloat(element.getAttribute(opts.speedAttribute)) || opts.defaultSpeed;
        var direction = opts.direction === 'reverse' ? -1 : 1;
        var moveX = posX * speed * 100 * direction;
        var moveY = posY * speed * 100 * direction;
        var rotate = posX * speed * 10 * direction;
        element.style.transform = "translate(".concat(moveX, "px, ").concat(moveY, "px) rotate(").concat(rotate, "deg)");
      });
    }
    return {
      updatePositions: updateParallaxPositions,
      disable: function disable() {
        document.removeEventListener('mousemove', handleMouseMove);
        elements.forEach(function (element) {
          element.style.transform = '';
        });
      },
      enable: function enable() {
        document.addEventListener('mousemove', handleMouseMove);
      }
    };
  }
  /* MODULE: PARALLAX EFFECTS - END */

  /**
    * ======================================
    * MODULE: MOBILE NAVIGATION
    * ======================================
    * Purpose: Implements responsive mobile navigation menu
    * 
    * Dependencies: 
    * - Core utilities (getElement)
    * 
    * When modularizing: Create mobile-nav.js with this component
    */
  function initMobileNav() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultOptions = {
      navbarSelector: '.aurora-navbar',
      toggleSelector: '.aurora-navbar-toggle',
      openClass: 'aurora-open'
    };
    var opts = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    var navbar = getElement(opts.navbarSelector);
    var toggleButton = getElement(opts.toggleSelector);
    if (!navbar || !toggleButton) return;
    toggleButton.addEventListener('click', function () {
      navbar.classList.toggle(opts.openClass);

      // Dispatch toggle event
      var isOpen = navbar.classList.contains(opts.openClass);
      var event = new CustomEvent('aurora:navToggle', {
        detail: {
          isOpen: isOpen
        }
      });
      document.dispatchEvent(event);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      if (navbar.classList.contains(opts.openClass) && !navbar.contains(e.target) && e.target !== toggleButton) {
        navbar.classList.remove(opts.openClass);
      }
    });
    return {
      toggle: function toggle() {
        navbar.classList.toggle(opts.openClass);
      },
      open: function open() {
        navbar.classList.add(opts.openClass);
      },
      close: function close() {
        navbar.classList.remove(opts.openClass);
      },
      isOpen: function isOpen() {
        return navbar.classList.contains(opts.openClass);
      }
    };
  }
  /* MODULE: MOBILE NAVIGATION - END */

  /**
     * ======================================
     * MODULE: GRID LINES
     * ======================================
     * Purpose: Creates decorative grid lines in the background
     * 
     * Dependencies: 
     * - Core utilities (getElement)

     */

  function initGridLines() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultOptions = {
      container: '.aurora-grid-lines',
      horizontalLines: 5,
      verticalLines: 6,
      horizontalClass: 'aurora-horizontal-line',
      verticalClass: 'aurora-vertical-line'
    };
    var opts = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    var container = getElement(opts.container);
    if (!container) return;

    // Clear existing lines
    container.innerHTML = '';

    // Create horizontal lines
    for (var i = 0; i < opts.horizontalLines; i++) {
      var line = document.createElement('div');
      line.className = opts.horizontalClass;
      line.style.top = "".concat((i + 1) * (100 / (opts.horizontalLines + 1)), "%");
      container.appendChild(line);
    }

    // Create vertical lines
    for (var _i = 0; _i < opts.verticalLines; _i++) {
      var _line = document.createElement('div');
      _line.className = opts.verticalClass;
      _line.style.left = "".concat((_i + 1) * (100 / (opts.verticalLines + 1)), "%");
      container.appendChild(_line);
    }
    return {
      update: function update(newOptions) {
        initGridLines(_objectSpread2(_objectSpread2({}, opts), newOptions));
      }
    };
  }
  /* MODULE: GRID LINES - END */

  /**
     * ======================================
     * MODULE: SCROLL TO TOP
     * ======================================
     * Purpose: Implements a smooth scroll-to-top button
     * 
     * Dependencies: 
     * - Core utilities (getElement)
     */

  function initScrollToTop() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultOptions = {
      buttonSelector: '.aurora-scroll-top',
      showAtPixels: 300,
      scrollDuration: 500,
      activeClass: 'aurora-active'
    };
    var opts = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    var button = getElement(opts.buttonSelector);
    if (!button) return;

    // Initially hide the button
    button.classList.remove(opts.activeClass);

    // Show button when scrolled down
    var scrollHandler = function scrollHandler() {
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
    button.addEventListener('click', function (e) {
      e.preventDefault();
      var startPosition = window.scrollY;
      var startTime = performance.now();
      function scrollStep(timestamp) {
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / opts.scrollDuration, 1);

        // Easing function: easeInOutCubic
        var easing = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, startPosition - startPosition * easing);
        if (progress < 1) {
          window.requestAnimationFrame(scrollStep);
        }
      }
      window.requestAnimationFrame(scrollStep);
    });
    return {
      scrollToTop: function scrollToTop() {
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : opts.scrollDuration;
        var startPosition = window.scrollY;
        var startTime = performance.now();
        function scrollStep(timestamp) {
          var elapsed = timestamp - startTime;
          var progress = Math.min(elapsed / duration, 1);

          // Easing function: easeInOutCubic
          var easing = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          window.scrollTo(0, startPosition - startPosition * easing);
          if (progress < 1) {
            window.requestAnimationFrame(scrollStep);
          }
        }
        window.requestAnimationFrame(scrollStep);
      }
    };
  }
  /* MODULE: SCROLL TO TOP - END */

  /**
    * ======================================
    * MODULE: MODAL DIALOG
    * ======================================
    * Purpose: Implements modal dialog functionality
    * 
    * Dependencies: 
    * - Core utilities (getAllElements)
    */
  function initModal() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultOptions = {
      modalSelector: '.aurora-modal',
      openSelector: '[data-aurora-modal]',
      closeSelector: '.aurora-modal-close',
      activeClass: 'aurora-modal-active',
      backdropClass: 'aurora-modal-backdrop',
      animation: true
    };
    var opts = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    var modals = getAllElements(opts.modalSelector);
    var openButtons = getAllElements(opts.openSelector);
    if (!modals.length) return;

    // Create backdrop if it doesn't exist
    var backdrop = document.querySelector(".".concat(opts.backdropClass));
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = opts.backdropClass;
      document.body.appendChild(backdrop);
    }

    // Add click events to open buttons
    openButtons.forEach(function (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        var modalId = button.getAttribute('data-aurora-modal');
        var modal = document.getElementById(modalId);
        if (modal) {
          openModal(modal);
        }
      });
    });

    // Add click events to close buttons
    modals.forEach(function (modal) {
      var closeButtons = modal.querySelectorAll(opts.closeSelector);
      closeButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          e.preventDefault();
          closeModal(modal);
        });
      });
    });

    // Close modal when clicking backdrop
    backdrop.addEventListener('click', function () {
      var activeModal = document.querySelector("".concat(opts.modalSelector, ".").concat(opts.activeClass));
      if (activeModal) {
        closeModal(activeModal);
      }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var activeModal = document.querySelector("".concat(opts.modalSelector, ".").concat(opts.activeClass));
        if (activeModal) {
          closeModal(activeModal);
        }
      }
    });

    /**
     * Open a modal dialog
     * @param {Element} modal - The modal element to open
     */
    function openModal(modal) {
      // Close any open modals first
      var activeModal = document.querySelector("".concat(opts.modalSelector, ".").concat(opts.activeClass));
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
        setTimeout(function () {
          modal.style.opacity = '1';
        }, 10);
      } else {
        modal.classList.add(opts.activeClass);
      }

      // Dispatch open event
      var event = new CustomEvent('aurora:modalOpen', {
        detail: {
          modal: modal
        }
      });
      document.dispatchEvent(event);
    }

    /**
     * Close a modal dialog
     * @param {Element} modal - The modal element to close
     * @param {boolean} skipBackdrop - Whether to skip hiding the backdrop
     */
    function closeModal(modal) {
      var skipBackdrop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (opts.animation) {
        modal.style.opacity = '0';
        setTimeout(function () {
          modal.classList.remove(opts.activeClass);
          modal.style.opacity = '';

          // Hide backdrop if no modals are open and not skipping backdrop
          if (!skipBackdrop) {
            var activeModals = document.querySelectorAll("".concat(opts.modalSelector, ".").concat(opts.activeClass));
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
          var activeModals = document.querySelectorAll("".concat(opts.modalSelector, ".").concat(opts.activeClass));
          if (activeModals.length === 0) {
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      }

      // Dispatch close event
      var event = new CustomEvent('aurora:modalClose', {
        detail: {
          modal: modal
        }
      });
      document.dispatchEvent(event);
    }
    return {
      open: function open(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
          openModal(modal);
        }
      },
      close: function close(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
          closeModal(modal);
        }
      },
      closeAll: function closeAll() {
        var activeModals = document.querySelectorAll("".concat(opts.modalSelector, ".").concat(opts.activeClass));
        activeModals.forEach(function (modal) {
          closeModal(modal);
        });
      }
    };
  }
  /* MODULE: MODAL DIALOG - END */

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
  function initTooltips() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultOptions = {
      selector: '[data-aurora-tooltip]',
      position: 'top',
      spacing: 8,
      animation: 'fade',
      delay: 200,
      tooltipClass: 'aurora-tooltip'
    };
    var opts = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    var elements = getAllElements(opts.selector);
    if (!elements.length) return;

    // Create tooltip container
    var tooltipContainer = document.querySelector(".".concat(opts.tooltipClass, "-container"));
    if (!tooltipContainer) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.className = "".concat(opts.tooltipClass, "-container");
      document.body.appendChild(tooltipContainer);
    }

    // Create tooltip element
    var tooltip = document.createElement('div');
    tooltip.className = opts.tooltipClass;
    tooltip.classList.add("".concat(opts.tooltipClass, "-").concat(opts.animation));
    tooltipContainer.appendChild(tooltip);

    // Track mouse movement for follow cursor position
    var mouseX = 0;
    var mouseY = 0;
    document.addEventListener('mousemove', function (e) {
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
      tooltip.style.left = "".concat(mouseX + opts.spacing, "px");
      tooltip.style.top = "".concat(mouseY + opts.spacing, "px");
    }

    /**
     * Position tooltip next to element
     * @param {Element} element - The element to position tooltip next to
     */
    function positionTooltip(element) {
      var position = element.getAttribute('data-aurora-tooltip-position') || opts.position;
      var rect = element.getBoundingClientRect();
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      // Reset classes
      tooltip.className = opts.tooltipClass;
      tooltip.classList.add("".concat(opts.tooltipClass, "-").concat(opts.animation));
      tooltip.classList.add("".concat(opts.tooltipClass, "-").concat(position));

      // Show the tooltip to calculate its dimensions
      tooltip.style.visibility = 'hidden';
      tooltip.classList.add('active');
      var tooltipRect = tooltip.getBoundingClientRect();

      // Reset visibility
      tooltip.style.visibility = '';
      switch (position) {
        case 'top':
          tooltip.style.left = "".concat(rect.left + rect.width / 2 - tooltipRect.width / 2 + scrollLeft, "px");
          tooltip.style.top = "".concat(rect.top - tooltipRect.height - opts.spacing + scrollTop, "px");
          break;
        case 'bottom':
          tooltip.style.left = "".concat(rect.left + rect.width / 2 - tooltipRect.width / 2 + scrollLeft, "px");
          tooltip.style.top = "".concat(rect.bottom + opts.spacing + scrollTop, "px");
          break;
        case 'left':
          tooltip.style.left = "".concat(rect.left - tooltipRect.width - opts.spacing + scrollLeft, "px");
          tooltip.style.top = "".concat(rect.top + rect.height / 2 - tooltipRect.height / 2 + scrollTop, "px");
          break;
        case 'right':
          tooltip.style.left = "".concat(rect.right + opts.spacing + scrollLeft, "px");
          tooltip.style.top = "".concat(rect.top + rect.height / 2 - tooltipRect.height / 2 + scrollTop, "px");
          break;
        case 'follow':
          tooltip.classList.add('follow');
          positionTooltipAtCursor();
          break;
      }
    }

    // Show/hide tooltip with delay
    var timerId = null;
    elements.forEach(function (element) {
      element.addEventListener('mouseenter', function () {
        clearTimeout(timerId);
        timerId = setTimeout(function () {
          var content = element.getAttribute('data-aurora-tooltip');
          tooltip.textContent = content;
          positionTooltip(element);
          tooltip.classList.add('active');
        }, opts.delay);
      });
      element.addEventListener('mouseleave', function () {
        clearTimeout(timerId);
        timerId = setTimeout(function () {
          tooltip.classList.remove('active');
          tooltip.classList.remove('follow');
        }, opts.delay);
      });
    });
    return {
      show: function show(element) {
        var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        if (typeof element === 'string') {
          element = document.querySelector(element);
        }
        if (!element) return;
        var tooltipContent = content || element.getAttribute('data-aurora-tooltip');
        tooltip.textContent = tooltipContent;
        tooltip.classList.add('active');
        positionTooltip(element);
      },
      hide: function hide() {
        tooltip.classList.remove('active');
        tooltip.classList.remove('follow');
      }
    };
  }
  /* MODULE: TOOLTIPS - END */

  var Aurora$1 = {
    //Attach Utils
    getElement: getElement,
    getAllElements: getAllElements,
    isElement: isElement,
    //Attach Components
    initThemeToggle: initThemeToggle,
    initTyping: initTyping,
    initScrollAnimations: initScrollAnimations,
    initParallax: initParallax,
    initMobileNav: initMobileNav,
    initGridLines: initGridLines,
    // initHighlightEffects, 
    initScrollToTop: initScrollToTop,
    initModal: initModal,
    initTooltips: initTooltips
  };
  (function (global, factory) {
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Aurora = factory());
  })(undefined, function () {

    /**
     * ======================================
     * MODULE: INITIALIZATION
     * ======================================
     * Purpose: Main initialization function to setup all Aurora components
     * 
     * Dependencies: All component modules
     * 
     * When modularizing: This becomes the main integration point that imports
     * individual modules and provides a unified API.
     */
    Aurora$1.init = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var components = options.components || {
        themeToggle: true,
        scrollAnimations: true,
        parallax: true,
        mobileNav: true,
        gridLines: true,
        scrollToTop: true,
        modals: true,
        tooltips: true
      };

      // Initialization order matters for some components
      if (components.scrollToTop) {
        Aurora$1.initScrollToTop(options.scrollToTop || {});
      } else {
        console.log('Scroll to top is not enabled');
      }
      if (components.themeToggle) {
        Aurora$1.initThemeToggle(options.themeToggle || {});
      } else {
        console.log('Theme toggle is not enabled');
      }
      if (components.mobileNav) {
        Aurora$1.initMobileNav(options.mobileNav || {});
      } else {
        console.log('Mobile nav is not enabled');
      }
      if (components.gridLines) {
        Aurora$1.initGridLines(options.gridLines || {});
      } else {
        console.log('Grid lines are not enabled');
      }

      // if (components.highlightEffects) {
      //   Aurora.initHighlightEffects(options.highlightEffects || {});
      // }

      if (components.modals) {
        Aurora$1.initModal(options.modals || {});
      } else {
        console.log('Modals are not enabled');
      }
      if (components.tooltips) {
        Aurora$1.initTooltips(options.tooltips || {});
      } else {
        console.log('Tooltips are not enabled');
      }
      if (components.parallax) {
        Aurora$1.initParallax(options.parallax || {});
      } else {
        console.log('Parallax is not enabled');
      }
      if (components.scrollAnimations) {
        Aurora$1.initScrollAnimations(options.scrollAnimations || {});
      } else {
        console.log('Scroll animations are not enabled');
      }

      /**
       * ======================================
       * MODULE: POLYFILLS & BROWSER FIXES
       * ======================================
       * Purpose: Applies compatibility fixes for different browsers and devices
       * 
       * When modularizing: Create separate polyfill files:
       * - ios-fixes.js - iOS specific fixes
       * - backdrop-filter.js - For browsers that don't support backdrop-filter
       */

      // Add iOS specific fixes
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.documentElement.classList.add('ios-device');
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
        window.addEventListener('resize', function () {
          var vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
        });
        var fixedElements = document.querySelectorAll('.aurora-navbar, .aurora-modal, .aurora-scroll-top, .aurora-toggle-container');
        fixedElements.forEach(function (el) {
          el.addEventListener('touchstart', function (e) {
            e.stopPropagation();
          }, {
            passive: true
          });
        });
      }

      // Add backdrop-filter fallback
      if (!CSS.supports('(-webkit-backdrop-filter: blur(10px))') && !CSS.supports('(backdrop-filter: blur(10px))')) {
        document.documentElement.classList.add('no-backdrop-filter');
        var glassElements = document.querySelectorAll('.aurora-glass-card, .aurora-navbar, .aurora-modal');
        glassElements.forEach(function (el) {
          if (getComputedStyle(el).backgroundColor.includes('rgba')) {
            var style = getComputedStyle(el);
            var bgColor = style.backgroundColor;
            var matches = bgColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
            if (matches && matches.length === 5) {
              var _matches = _slicedToArray(matches, 5);
                _matches[0];
                var r = _matches[1],
                g = _matches[2],
                b = _matches[3],
                a = _matches[4];
              var newOpacity = Math.min(1, parseFloat(a) + 0.3);
              el.style.backgroundColor = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(newOpacity, ")");
            }
          }
        });
      }
      /* MODULE: POLYFILLS & BROWSER FIXES - END */
    };
    /* MODULE: INITIALIZATION - END */

    /**
     * ======================================
     * MODULE: AUTO-INITIALIZATION
     * ======================================
     * Purpose: Automatically initialize Aurora when DOM is ready
     * 
     * When modularizing: This should be in the main entry file but 
     * can be conditionally imported.
     */

    // Auto-initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function () {
      if (window.auroraAutoInit !== false) {
        Aurora$1.init();
      }
    });
    /* MODULE: AUTO-INITIALIZATION - END */

    return Aurora$1;
  });

}));
//# sourceMappingURL=aurora.js.map
