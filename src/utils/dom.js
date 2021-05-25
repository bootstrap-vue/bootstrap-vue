import { DOCUMENT, WINDOW } from '../constants/env'
import { Element } from '../constants/safe-types'
import { from as arrayFrom } from './array'
import { isFunction, isNull } from './inspect'
import { toFloat } from './number'
import { toString } from './string'

// --- Constants ---

const ELEMENT_PROTO = Element.prototype

const TABABLE_SELECTOR = [
  'button',
  '[href]:not(.disabled)',
  'input',
  'select',
  'textarea',
  '[tabindex]',
  '[contenteditable]'
]
  .map(s => `${s}:not(:disabled):not([disabled])`)
  .join(', ')

// --- Normalization utils ---

// See: https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
/* istanbul ignore next */
export const matchesEl =
  ELEMENT_PROTO.matches || ELEMENT_PROTO.msMatchesSelector || ELEMENT_PROTO.webkitMatchesSelector

// See: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
/* istanbul ignore next */
export const closestEl =
  ELEMENT_PROTO.closest ||
  function(sel) {
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
/* istanbul ignore next: JSDOM always returns the first option */
export const requestAF = (
  WINDOW.requestAnimationFrame ||
  WINDOW.webkitRequestAnimationFrame ||
  WINDOW.mozRequestAnimationFrame ||
  WINDOW.msRequestAnimationFrame ||
  WINDOW.oRequestAnimationFrame ||
  // Fallback, but not a true polyfill
  // Only needed for Opera Mini
  /* istanbul ignore next */
  (cb => setTimeout(cb, 16))
).bind(WINDOW)

export const MutationObs =
  WINDOW.MutationObserver || WINDOW.WebKitMutationObserver || WINDOW.MozMutationObserver || null

// --- Utils ---

// Remove a node from DOM
export const removeNode = el => el && el.parentNode && el.parentNode.removeChild(el)

// Determine if an element is an HTML element
export const isElement = el => !!(el && el.nodeType === Node.ELEMENT_NODE)

// Get the currently active HTML element
export const getActiveElement = (excludes = []) => {
  const { activeElement } = DOCUMENT
  return activeElement && !excludes.some(el => el === activeElement) ? activeElement : null
}

// Returns `true` if a tag's name equals `name`
export const isTag = (tag, name) => toString(tag).toLowerCase() === toString(name).toLowerCase()

// Determine if an HTML element is the currently active element
export const isActiveElement = el => isElement(el) && el === getActiveElement()

// Determine if an HTML element is visible - Faster than CSS check
export const isVisible = el => {
  if (!isElement(el) || !el.parentNode || !contains(DOCUMENT.body, el)) {
    // Note this can fail for shadow dom elements since they
    // are not a direct descendant of document.body
    return false
  }
  if (getStyle(el, 'display') === 'none') {
    // We do this check to help with vue-test-utils when using v-show
    /* istanbul ignore next */
    return false
  }
  // All browsers support getBoundingClientRect(), except JSDOM as it returns all 0's for values :(
  // So any tests that need isVisible will fail in JSDOM
  // Except when we override the getBCR prototype in some tests
  const bcr = getBCR(el)
  return !!(bcr && bcr.height > 0 && bcr.width > 0)
}

// Determine if an element is disabled
export const isDisabled = el =>
  !isElement(el) || el.disabled || hasAttr(el, 'disabled') || hasClass(el, 'disabled')

// Cause/wait-for an element to reflow its content (adjusting its height/width)
export const reflow = el => {
  // Requesting an elements offsetHight will trigger a reflow of the element content
  /* istanbul ignore next: reflow doesn't happen in JSDOM */
  return isElement(el) && el.offsetHeight
}

// Select all elements matching selector. Returns `[]` if none found
export const selectAll = (selector, root) =>
  arrayFrom((isElement(root) ? root : DOCUMENT).querySelectorAll(selector))

// Select a single element, returns `null` if not found
export const select = (selector, root) =>
  (isElement(root) ? root : DOCUMENT).querySelector(selector) || null

// Determine if an element matches a selector
export const matches = (el, selector) => (isElement(el) ? matchesEl.call(el, selector) : false)

// Finds closest element matching selector. Returns `null` if not found
export const closest = (selector, root, includeRoot = false) => {
  if (!isElement(root)) {
    return null
  }
  const el = closestEl.call(root, selector)

  // Native closest behaviour when `includeRoot` is truthy,
  // else emulate jQuery closest and return `null` if match is
  // the passed in root element when `includeRoot` is falsey
  return includeRoot ? el : el === root ? null : el
}

// Returns true if the parent element contains the child element
export const contains = (parent, child) =>
  parent && isFunction(parent.contains) ? parent.contains(child) : false

// Get an element given an ID
export const getById = id => DOCUMENT.getElementById(/^#/.test(id) ? id.slice(1) : id) || null

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
export const setAttr = (el, attr, value) => {
  if (attr && isElement(el)) {
    el.setAttribute(attr, value)
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

// Set an style property on an element
export const setStyle = (el, prop, value) => {
  if (prop && isElement(el)) {
    el.style[prop] = value
  }
}

// Remove an style property from an element
export const removeStyle = (el, prop) => {
  if (prop && isElement(el)) {
    el.style[prop] = ''
  }
}

// Get an style property value from an element
// Returns `null` if not found
export const getStyle = (el, prop) => (prop && isElement(el) ? el.style[prop] || null : null)

// Return the Bounding Client Rect of an element
// Returns `null` if not an element
/* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */
export const getBCR = el => (isElement(el) ? el.getBoundingClientRect() : null)

// Get computed style object for an element
/* istanbul ignore next: getComputedStyle() doesn't work in JSDOM */
export const getCS = el => {
  const { getComputedStyle } = WINDOW
  return getComputedStyle && isElement(el) ? getComputedStyle(el) : {}
}

// Returns a `Selection` object representing the range of text selected
// Returns `null` if no window support is given
/* istanbul ignore next: getSelection() doesn't work in JSDOM */
export const getSel = () => {
  const { getSelection } = WINDOW
  return getSelection ? WINDOW.getSelection() : null
}

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

// Return an element's offset with respect to to its offsetParent
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
      parentOffset.top += toFloat(offsetParentStyles.borderTopWidth, 0)
      parentOffset.left += toFloat(offsetParentStyles.borderLeftWidth, 0)
    }
  }
  return {
    top: _offset.top - parentOffset.top - toFloat(elStyles.marginTop, 0),
    left: _offset.left - parentOffset.left - toFloat(elStyles.marginLeft, 0)
  }
}

// Find all tabable elements in the given element
// Assumes users have not used `tabindex` > `0` on elements
export const getTabables = (rootEl = document) =>
  selectAll(TABABLE_SELECTOR, rootEl)
    .filter(isVisible)
    .filter(el => el.tabIndex > -1 && !el.disabled)

// Attempt to focus an element, and return `true` if successful
export const attemptFocus = (el, options = {}) => {
  try {
    el.focus(options)
  } catch {}
  return isActiveElement(el)
}

// Attempt to blur an element, and return `true` if successful
export const attemptBlur = el => {
  try {
    el.blur()
  } catch {}
  return !isActiveElement(el)
}
