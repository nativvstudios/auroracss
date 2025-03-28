 import { getAllElements } from '../core/utils';
 
 /**
   * ======================================
   * MODULE: MODAL DIALOG
   * ======================================
   * Purpose: Implements modal dialog functionality
   * 
   * Dependencies: 
   * - Core utilities (getAllElements)
   */
  export function initModal(options = {}) {
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
    
    /**
     * Open a modal dialog
     * @param {Element} modal - The modal element to open
     */
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
    
    /**
     * Close a modal dialog
     * @param {Element} modal - The modal element to close
     * @param {boolean} skipBackdrop - Whether to skip hiding the backdrop
     */
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
  /* MODULE: MODAL DIALOG - END */