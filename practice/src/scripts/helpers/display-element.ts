import { getElementById } from "./dom-element";

/**

 * @param {boolean} show - If true, the element will be displayed, otherwise it will be hidden.
 */

export const toggleDisplay = (element: HTMLElement, show: boolean): void =>{
    element.style.display = show ? "block" : "none";
}