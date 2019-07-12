import { from as arrayFrom } from './array'
import { hasWindowSupport, hasDocumentSupport, hasPassiveEventSupport } from './env'
import { isFunction, isNull, isObject } from '../utils/inspect'

// --- Constants ---

const w = hasWindowSupport ? window : {}
const d = hasDocumentSupport ? document : {}
const elProto = typeof Element !== 'undefined' ? Element.prototype : {}

// --- Normalization utils ---

// See: https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
/* istanbul ignore next */
export const matchesEl =
  elProto.matches || elProto.msMatchesSelector || elProto.webkitMatchesSelector

// See: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
/* istanbul ignore next */
export const closestEl =
  elProto.closest ||
  function(sel) /* istanbul ignore next */ {
    let el = this
    do {
      // Use our "patched" matches function
      if (matches(el, sel)) {
        return el
      }
      el = el.parentElement || el.parentNode
    } while (!isNull(el) && el.nodeType === Node.ELEMENT_NODE)
    return null
  }

// `requestAnimationFrame()` convenience method
export const requestAF =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.mozRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.oRequestAnimationFrame ||
  // Fallback, but not a true polyfill
  // Only needed for Opera Mini
  /* istanbul ignore next */
  (cb => setTimeout(cb, 16))

export const MutationObs =
  w.MutationObserver || w.WebKitMutationObserver || w.MozMutationObserver || null

// --- Utils ---

// Normalize event options based on support of passive option
// Exported only for testing purposes
export const parseEventOptions = options => {
  /* istanbul ignore else: can't test in JSDOM, as it supports passive */
  if (hasPassiveEventSupport) {
    return isObject(options) ? options : { useCapture: Boolean(options || false) }
  } else {
    // Need to translate to actual Boolean value
    return Boolean(isObject(options) ? options.useCapture : options)
  }
}

// Attach an event listener to an element
export const eventOn = (el, evtName, handler, options) => {
  if (el && el.addEventListener) {
    el.addEventListener(evtName, handler, parseEventOptions(options))
  }
}

// Remove an event listener from an element
export const eventOff = (el, evtName, handler, options) => {
  if (el && el.removeEventListener) {
    el.removeEventListener(evtName, handler, parseEventOptions(options))
  }
}

// Determine if an element is an HTML Element
export const isElement = el => Boolean(el && el.nodeType === Node.ELEMENT_NODE)

// Determine if an HTML element is visible - Faster than CSS check
export const isVisible = el => {
  if (!isElement(el) || !contains(d.body, el)) {
    return false
  }
  if (el.style.display === 'none') {
    // We do this check to help with vue-test-utils when using v-show
    /* istanbul ignore next */
    return false
  }
  // All browsers support getBoundingClientRect(), except JSDOM as it returns all 0's for values :(
  // So any tests that need isVisible will fail in JSDOM
  // Except when we override the getBCR prototype in some tests
  const bcr = getBCR(el)
  return Boolean(bcr && bcr.height > 0 && bcr.width > 0)
}

// Determine if an element is disabled
export const isDisabled = el =>
  !isElement(el) || el.disabled || Boolean(getAttr(el, 'disabled')) || hasClass(el, 'disabled')

// Cause/wait-for an element to reflow it's content (adjusting it's height/width)
export const reflow = el => {
  // Requesting an elements offsetHight will trigger a reflow of the element content
  /* istanbul ignore next: reflow doesn't happen in JSDOM */
  return isElement(el) && el.offsetHeight
}

// Select all elements matching selector. Returns `[]` if none found
export const selectAll = (selector, root) =>
  arrayFrom((isElement(root) ? root : d).querySelectorAll(selector))

// Select a single element, returns `null` if not found
export const select = (selector, root) =>
  (isElement(root) ? root : d).querySelector(selector) || null

// Determine if an element matches a selector
export const matches = (el, selector) => {
  if (!isElement(el)) {
    return false
  }
  return matchesEl.call(el, selector)
}

// Finds closest element matching selector. Returns `null` if not found
export const closest = (selector, root) => {
  if (!isElement(root)) {
    return null
  }
  const el = closestEl.call(root, selector)
  // Emulate jQuery closest and return `null` if match is the passed in element (root)
  return el === root ? null : el
}

// Returns true if the parent element contains the child element
export const contains = (parent, child) => {
  if (!parent || !isFunction(parent.contains)) {
    return false
  }
  return parent.contains(child)
}

// Get an element given an ID
export const getById = id => d.getElementById(/^#/.test(id) ? id.slice(1) : id) || null

// Add a class to an element
export const addClass = (el, className) => {
  // We are checking for `el.classList` existence here since IE 11
  // returns `undefined` for some elements (e.g. SVG elements)
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
  if (className && isElement(el) && el.classList) {
    el.classList.add(className)
  }
}

// Remove a class from an element
export const removeClass = (el, className) => {
  // We are checking for `el.classList` existence here since IE 11
  // returns `undefined` for some elements (e.g. SVG elements)
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
  if (className && isElement(el) && el.classList) {
    el.classList.remove(className)
  }
}

// Test if an element has a class
export const hasClass = (el, className) => {
  // We are checking for `el.classList` existence here since IE 11
  // returns `undefined` for some elements (e.g. SVG elements)
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
  if (className && isElement(el) && el.classList) {
    return el.classList.contains(className)
  }
  return false
}

// Set an attribute on an element
export const setAttr = (el, attr, val) => {
  if (attr && isElement(el)) {
    el.setAttribute(attr, val)
  }
}

// Remove an attribute from an element
export const removeAttr = (el, attr) => {
  if (attr && isElement(el)) {
    el.removeAttribute(attr)
  }
}

// Get an attribute value from an element
// Returns `null` if not found
export const getAttr = (el, attr) => (attr && isElement(el) ? el.getAttribute(attr) : null)

// Determine if an attribute exists on an element
// Returns `true` or `false`, or `null` if element not found
export const hasAttr = (el, attr) => (attr && isElement(el) ? el.hasAttribute(attr) : null)

// Return the Bounding Client Rect of an element
// Returns `null` if not an element
/* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */
export const getBCR = el => (isElement(el) ? el.getBoundingClientRect() : null)

// Get computed style object for an element
/* istanbul ignore next: getComputedStyle() doesn't work in JSDOM */
export const getCS = el => (hasWindowSupport && isElement(el) ? w.getComputedStyle(el) : {})

// Returns a `Selection` object representing the range of text selected
// Returns `null` if no window support is given
/* istanbul ignore next: getSelection() doesn't work in JSDOM */
export const getSel = () => (hasWindowSupport && w.getSelection ? w.getSelection() : null)

// Return an element's offset with respect to document element
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset
export const offset = el => /* istanbul ignore next: getBoundingClientRect(), getClientRects() doesn't work in JSDOM */ {
  const _offset = { top: 0, left: 0 }
  if (!isElement(el) || el.getClientRects().length === 0) {
    return _offset
  }
  const bcr = getBCR(el)
  if (bcr) {
    const win = el.ownerDocument.defaultView
    _offset.top = bcr.top + win.pageYOffset
    _offset.left = bcr.left + win.pageXOffset
  }
  return _offset
}

// Return an element's offset with respect to to it's offsetParent
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.position
export const position = el => /* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */ {
  let _offset = { top: 0, left: 0 }
  if (!isElement(el)) {
    return _offset
  }
  let parentOffset = { top: 0, left: 0 }
  const elStyles = getCS(el)
  if (elStyles.position === 'fixed') {
    _offset = getBCR(el) || _offset
  } else {
    _offset = offset(el)
    const doc = el.ownerDocument
    let offsetParent = el.offsetParent || doc.documentElement
    while (
      offsetParent &&
      (offsetParent === doc.body || offsetParent === doc.documentElement) &&
      getCS(offsetParent).position === 'static'
    ) {
      offsetParent = offsetParent.parentNode
    }
    if (offsetParent && offsetParent !== el && offsetParent.nodeType === Node.ELEMENT_NODE) {
      parentOffset = offset(offsetParent)
      const offsetParentStyles = getCS(offsetParent)
      parentOffset.top += parseFloat(offsetParentStyles.borderTopWidth)
      parentOffset.left += parseFloat(offsetParentStyles.borderLeftWidth)
    }
  }
  return {
    top: _offset.top - parentOffset.top - parseFloat(elStyles.marginTop),
    left: _offset.left - parentOffset.left - parseFloat(elStyles.marginLeft)
  }
}
