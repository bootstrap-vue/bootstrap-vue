import { from as arrayFrom } from './array'
import { isObject } from './object'
import { inBrowser } from './env'

// Determine if the browser supports the option passive for events
let passiveEventSupported = false
/* istanbul ignore if */
if (inBrowser) {
  try {
    const options = {
      get passive() {
        // This function will be called when the browser
        // attempts to access the passive property.
        passiveEventSupported = true
      }
    }
    window.addEventListener('test', options, options)
    window.removeEventListener('test', options, options)
  } catch (err) {
    passiveEventSupported = false
  }
}

// Exported only for testing purposes
export const isPassiveSupported = () => passiveEventSupported

// Normalize event options based on support of passive option
// Exported only for testing purposes
export const parseEventOptions = options => {
  if (!passiveEventSupported) {
    // Need to translate to actual Boolean value
    return Boolean(isObject(options) ? options.useCapture : options)
  }
  /* istanbul ignore next: JSDOM doesn't support above detection of passive */
  return options || { useCapture: false }
  // So we can't reach this anymore for unit testing due to the above if statement
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
export const isElement = el => {
  return Boolean(el && el.nodeType === Node.ELEMENT_NODE)
}

// Determine if an HTML element is visible - Faster than CSS check
export const isVisible = el => /* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */ {
  if (!isElement(el) || !contains(document.body, el)) {
    return false
  }
  // All browsers support getBoundingClientRect(), except JSDOM as it returns all 0's for values :(
  // So any tests that need isVisible will fail in JSDOM
  const bcr = getBCR(el)
  return Boolean(bcr && bcr.height > 0 && bcr.width > 0)
}

// Determine if an element is disabled
export const isDisabled = el => {
  return (
    !isElement(el) || el.disabled || hasClass(el, 'disabled') || Boolean(getAttr(el, 'disabled'))
  )
}

// Cause/wait-for an element to reflow it's content (adjusting it's height/width)
export const reflow = el => {
  // Requesting an elements offsetHight will trigger a reflow of the element content
  /* istanbul ignore next: reflow doesn't happen in JSDOM */
  return isElement(el) && el.offsetHeight
}

// Select all elements matching selector. Returns `[]` if none found
export const selectAll = (selector, root) => {
  if (!isElement(root)) {
    root = document
  }
  return arrayFrom(root.querySelectorAll(selector))
}

// Select a single element, returns `null` if not found
export const select = (selector, root) => {
  if (!isElement(root)) {
    root = document
  }
  return root.querySelector(selector) || null
}

// Determine if an element matches a selector
export const matches = (el, selector) => {
  if (!isElement(el)) {
    return false
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
  // Prefer native implementations over polyfill function
  const proto = Element.prototype
  /* istanbul ignore next */
  const Matches =
    proto.matches ||
    proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    proto.webkitMatchesSelector ||
    function(sel) /* istanbul ignore next */ {
      const element = this
      const m = selectAll(sel, element.document || element.ownerDocument)
      let i = m.length
      // eslint-disable-next-line no-empty
      while (--i >= 0 && m.item(i) !== element) {}
      return i > -1
    }

  return Matches.call(el, selector)
}

// Finds closest element matching selector. Returns `null` if not found
export const closest = (selector, root) => {
  if (!isElement(root)) {
    return null
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  // Since we dont support IE < 10, we can use the "Matches" version of the polyfill for speed
  // Prefer native implementation over polyfill function
  const Closest =
    Element.prototype.closest ||
    function(sel) /* istanbul ignore next */ {
      let element = this
      if (!contains(document.documentElement, element)) {
        return null
      }
      do {
        // Use our "patched" matches function
        if (matches(element, sel)) {
          return element
        }
        element = element.parentElement
      } while (element !== null)
      return null
    }

  const el = Closest.call(root, selector)
  // Emulate jQuery closest and return `null` if match is the passed in element (root)
  return el === root ? null : el
}

// Returns true if the parent element contains the child element
export const contains = (parent, child) => {
  if (!parent || typeof parent.contains !== 'function') {
    return false
  }
  return parent.contains(child)
}

// Get an element given an ID
export const getById = id => {
  return document.getElementById(/^#/.test(id) ? id.slice(1) : id) || null
}

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

// Get an attribute value from an element (returns `null` if not found)
export const getAttr = (el, attr) => {
  if (attr && isElement(el)) {
    return el.getAttribute(attr)
  }
  return null
}

// Determine if an attribute exists on an element (returns `true`
// or `false`, or `null` if element not found)
export const hasAttr = (el, attr) => {
  if (attr && isElement(el)) {
    return el.hasAttribute(attr)
  }
  return null
}

// Return the Bounding Client Rect of an element. Returns `null` if not an element
export const getBCR = el => {
  /* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */
  return isElement(el) ? el.getBoundingClientRect() : null
}

// Get computed style object for an element
export const getCS = el => {
  /* istanbul ignore next: getComputedStyle() doesn't work in JSDOM */
  return isElement(el) ? window.getComputedStyle(el) : {}
}

// Return an element's offset with respect to document element
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset
export const offset = el => /* istanbul ignore next: getBoundingClientRect(), getClientRects() doesn't work in JSDOM */ {
  let _offset = { top: 0, left: 0 }
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

// requestAnimationFrame convenience method
// We don't have a version for cancelAnimationFrame, but we don't call it anywhere
export const requestAF = cb => {
  const w = inBrowser ? window : {}
  const rAF =
    w.requestAnimationFrame ||
    w.webkitRequestAnimationFrame ||
    w.mozRequestAnimationFrame ||
    w.msRequestAnimationFrame ||
    w.oRequestAnimationFrame ||
    (cb => {
      // Fallback, but not a true polyfill.
      // But all browsers we support (other than Opera Mini) support rAF
      // without a polyfill.
      /* istanbul ignore next */
      return setTimeout(cb, 16)
    })
  return rAF(cb)
}
