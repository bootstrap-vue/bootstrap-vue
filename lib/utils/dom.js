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

/*
 * Element.matches polyfill, if needed
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 * Returns true or false
 */
if (typeof document !== "undefined" && window.Element && !Element.prototype.matches) {
    const proto = Element.prototype;
    proto.matches =
        proto.matchesSelector ||
        proto.mozMatchesSelector ||
        proto.msMatchesSelector ||
        proto.oMatchesSelector ||
        proto.webkitMatchesSelector ||
        function(s) {
            const matches = (this.document || this.ownerDocument).querySelectorAll(s);
            let i = matches.length;
            // eslint-disable-next-line no-empty
            while (--i >= 0 &&matches.item(i) !== this) {}
            return i > -1;
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

// Cause/wait-for an element to reflow it's content (adjusting it's height/width)
dom.reflow = function(el) {
    // requsting an elements offsetHight will trigger a reflow of the element content
    return dom.isElement(el) && el.offsetHeight;
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

// Determine if an element matches a selector
dom.matches = function(el, selector) {
    if (!dom.isElement(el)) {
        return false;
    }
    return el.matches(selector);
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

// Retur nteh Bounding Client Rec of an element. Retruns null if not an element
dom.getBCR = function(el) {
    return dom.isElement(el) ? el.getBoundingClientRect() : null;
};

// Get computed style object for an element
dom.getCS = function(el) {
    return dom.isElement(el) ? window.getComputedStyle(el) : {};
};

// Return an element's offset wrt document element
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset
dom.offset = function(el) {
    if (dom.isElement(el)) {
        if (!el.getClientRects().length) {
            return { top: 0, left: 0 };
        }
        const bcr = dom.getBCR(el);
        const win = el.ownerDocument.defaultView;
        return {
            top: bcr.top + win.pageYOffset,
            left: bcr.left + win.pageXOffset
        }
    }
};

// Return an element's offset wrt to it's offsetParent
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.position
dom.position = function(el) {
    if (!dom.isElement(el)) {
        return;
    }
    let parentOffset = { top: 0, left: 0 };
    let offset;
    let offsetParent;
    if (dom.getCS(el).position === 'fixed') {
        offset = dom.getBCR(el);
    } else {
        offset = dom.offset(el);
        const doc = el.ownerDocument;
        offsetParent = el.offsetParent || doc.documentElement;
        while (offsetParent &&
                (offsetParent === doc.body || offsetParent === doc.documentElement) &&
                dom.getCS(offsetParent).position === 'static') {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent && offsetParent !== el && offsetParent.nodeType === Node.ELEMENT_NODE) {
            parentOffset = dom.offset(offsetParent);
            parentOffset.top += parseFloat(dom.getCS(offsetParent).borderTopWidth);
            parentOffset.left += parseFloat(dom.getCS(offsetParent).borderLeftWidth);
        }
    }
    return {
        top: offset.top - parentOffset.top - parseFloat(dom.getCS(el).marginTop),
        left: offset.left - parentOffset.left - parseFloat(dom.getCS(el).marginLeft)
    };
};

// Attach an event listener to an element
dom.eventOn = function(el, evtName, handler) {
    if (el && el.addEventListener) {
        el.addEventListener(evtName, handler);
    }
};

// Remove an event listener from an element
dom.eventOff = function(el, evtName, handler) {
    if (el && el.removeEventListener) {
        el.removeEventListener(evtName, handler);
    }
};

export const isElement = dom.isElement;
export const isVisible = dom.isVisible;
export const isDisabled = dom.isDisabled;
export const reflow = dom.reflow;
export const closest = dom.closest;
export const getById = dom.getById;
export const selectAll = dom.selectAll;
export const select = dom.select;
export const addClass = dom.addClass;
export const removeClass = dom.removeClass;
export const hasClass = dom.hasClass;
export const matches = dom.matches;
export const setAttr = dom.setAttr;
export const removeAttr = dom.removeAttr;
export const getAttr = dom.getAttr;
export const getBCR = dom.getBCR;
export const getCS = dom.getCS;
export const offset = dom.offset;
export const position = dom.position;
export const eventOn = dom.eventOn;
export const eventOff = dom.eventOff;

