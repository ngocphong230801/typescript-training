import { getElementById } from "./dom-element";

/**
 * Toggle the display of an element by changing its style.
 * @param {string} elementId - The ID of the element to toggle.
 * @param {boolean} isShow - If true, the element will be displayed, otherwise it will be hidden.
 */
export const toggleDisplay = (elementId: string, isShow: boolean): void => {
    const element = getElementById(elementId);

    // Check if element is not null or undefined before accessing its style property
    if (element !== null && element !== undefined) {
        // Use a type assertion to tell TypeScript that element is not null or undefined
        (element as HTMLElement).style.display = isShow ? "block" : "none";
    }
};
