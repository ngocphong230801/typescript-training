import { getElementById } from "./dom-element";

/**
 * Toggle the display of an element by changing its style.
 * @param {string} elementId - The ID of the element to toggle.
 * @param {boolean} isShow - If true, the element will be displayed, otherwise it will be hidden.
 */
export const toggleDisplay = (elementId: string, isShow: boolean): void => {
    const element = getElementById(elementId) as HTMLElement;
    if (element) {
        element.style.display = isShow ? "block" : "none";
    }
};
