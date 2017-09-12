import { from as arrayFrom } from './array';

/*
 * Element closest polyfill, if needed
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
 * Returns null of not found
 */
if (typeof document !== "undefined" && window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s);
        let el = this;
        let i;
        do {
            i = matches.length;
            // eslint-disable-next-line no-empty
            while (--i >= 0 && matches.item(i) !== el) {}
        } while (i < 0 && (el = el.parentElement));
        return el;
    };
}

const dom = {};

// Determine if an element is an HTML Element
dom.isElement = function(el) {
    return el && el.nodeType === Node.ELEMENT_NODE;
};

// Determine if an HTML element is visible - Faster than CSS check
dom.isVisible = function(el) {
    return dom.isElement(el) &&
           document.body.contains(el) &&
           (el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0);
};

// Determine if an element is disabled
dom.isDisabled = function(el) {
    return !dom.isElement(el) ||
           el.disabled ||
           el.classList.contains('disabled') ||
           Boolean(el.getAttribute('disabled'));
};

// Select all elements matching selector. Returns [] if none found
dom.selectAll = function(selector, root) {
    if (!dom.isElement(root)) {
        root = document;
    }
    return arrayFrom(root.querySelectorAll(selector));
};

// Select a single element, returns null if not found
dom.select = function(selector, root) {
    if (!dom.isElement(root)) {
        root = document;
    }
    return root.querySelector(selector) || null;
};

// Finds closest element matching selector. Returns null if not found
dom.closest = function(selector, root) {
    if (!dom.isElement(root)) {
        return null;
    }
    const el = root.closest(selector);
    return el === root ? null : el;
};

// Get an element given an ID
dom.getById = function(id) {
    return document.getElementById(/^#/.test(id) ? id.slice(1) : id) || null;
};

// Add a class to an element
dom.addClass = function(el, className) {
    if (className && dom.isElement(el)) {
        el.classList.add(className);
    }
};

// Remove a class from an element
dom.removeClass = function(el, className) {
    if (className && dom.isElement(el)) {
        el.classList.remove(className);
    }
};

// Test if an element has a class
dom.hasClass = function(el, className) {
    if (className && dom.isElement(el)) {
        return el.classList.contains(className);
    }
    return false;
};

// Set an attribute on an element
dom.setAttr = function(el, attr, value) {
    if (attr && dom.isElement(el)) {
        el.setAttribute(attr, value);
    }
};

// Remove an attribute from an element
dom.removeAttr = function(el, attr) {
    if (attr && dom.isElement(el)) {
        el.removeAttribute(attr);
    }
};

// Get an attribute value from an element (returns null if not found)
dom.getAttr = function(el, attr) {
    if (attr && dom.isElement(el)) {
        return el.getAttribute(attr);
    }
    return null;
};


export const isElement = dom.isElement;
export const isVisible = dom.isVisible;
export const isDisabled = dom.isDisabled;
export const closest = dom.closest;
export const getById = dom.getById;
export const selectAll = dom.selectAll;
export const select = dom.select;
export const addClass = dom.addClass;
export const removeClass = dom.removeClass;
export const hasClass = dom.hasClass;
export const setAttr = dom.setAttr;
export const removeAttr = dom.removeAttr;
export const getAttr = dom.getAttr;
