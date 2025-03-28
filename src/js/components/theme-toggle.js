import { getAllElements } from '../core/utils.js';

/**
 * ======================================
 * MODULE: THEME TOGGLE
 * ======================================
 * Purpose: Provides a theme toggle button for the Aurora framework
 *
 * Dependencies:
 * - Core utilities (getAllElements)
 **/

  export function initThemeToggle(options = {}) {
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
    
    /**
     * Set theme to dark or light mode
     * @param {string} theme - 'dark' or 'light'
     */
    function setTheme(theme) {
      if (theme === 'dark') {
        document.body.classList.add(opts.darkThemeClass);
        document.body.classList.remove(opts.lightThemeClass);

        const icon = document.getElementById('themeToggleIcon');
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

        const icon = document.getElementById('themeToggleIcon');
        if (icon) {
            icon.className = 'fa-solid fa-moon';
        }
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
    
    return {
      setTheme,
      getTheme: () => document.body.classList.contains(opts.darkThemeClass) ? 'dark' : 'light'
    };
  };

  /* MODULE: THEME TOGGLE - END */
