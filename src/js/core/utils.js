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
export function isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;
}

/**
 * Get a single DOM element
 * @param {string|Element} selector - CSS selector or DOM element
 * @returns {Element} - The DOM element
 */
export function getElement(selector) {
    if (isElement(selector)) return selector;
    return document.querySelector(selector);
}

/**
 * Get all matching DOM elements as an array
 * @param {string|Element[]} selector - CSS selector or array of DOM elements
 * @returns {Element[]} - Array of DOM elements
 */
export function getAllElements(selector) {
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
