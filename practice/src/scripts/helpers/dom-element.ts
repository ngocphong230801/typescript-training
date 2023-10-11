/**
 * Get an element by ID using `getElementById`.
 * @param {string} id - The ID of the element to retrieve.
 * @returns {Element | null} - The element retrieved using the provided ID, or null if no element is found.
 */
export const getElementById = (id: string): Element | null => document.getElementById(id);

/**
 * Get an element by selector using `querySelector`.
 * @param {string} selector - CSS selector to choose the element.
 * @returns {Element | null} - The element retrieved using the provided selector, or null if no element is found.
 */
export const querySelector = (selector: string): Element | null => document.querySelector(selector);

/**
 * Get a list of elements by selector using `querySelectorAll`.
 * @param {string} selector - CSS selector to choose the elements.
 * @returns {NodeListOf<Element>} - The list of elements retrieved using the provided selector.
 */
export const querySelectorAll = (selector: string): NodeListOf<Element> => document.querySelectorAll(selector);
