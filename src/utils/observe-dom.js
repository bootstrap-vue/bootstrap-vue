import { assign } from './object'
import { isElement } from '../utils/dom'

/**
 * Observe a DOM element changes, falls back to eventListener mode
 * @param {Element} el The DOM element to observe
 * @param {Function} callback callback to be called on change
 * @param {object} [opts={childList: true, subtree: true}] observe options
 * @see http://stackoverflow.com/questions/3219758
 */
export default function observeDOM (el, callback, opts) {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
  const eventListenerSupported = window.addEventListener

  // Handle case where we might be passed a vue instance
  el = el ? (el.$el || el) : null
  /* istanbul ignore next: dificult to test in JSDOM */
  if (!isElement(el)) {
    // We can't observe somthing that isn't an element
    return null
  }

  let obs = null

  /* istanbul ignore next: dificult to test in JSDOM */
  if (MutationObserver) {
    // Define a new observer
    obs = new MutationObserver(mutations => {
      let changed = false
      // A Mutation can contain several change records, so we loop through them to see what has changed.
      // We break out of the loop early if any "significant" change has been detected
      for (let i = 0; i < mutations.length && !changed; i++) {
        // The muttion record
        const mutation = mutations[i]
        // Mutation Type
        const type = mutation.type
        // DOM Node (could be any DOM Node type - HTMLElement, Text, comment, etc)
        const target = mutation.target
        if (type === 'characterData' && target.nodeType === Node.TEXT_NODE) {
          // We ignore nodes that are not TEXt (i.e. comments, etc) as they don't change layout
          changed = true
        } else if (type === 'attributes') {
          changed = true
        } else if (type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
          // This includes HTMLElement and Text Nodes being added/removed/re-arranged
          changed = true
        }
      }
      if (changed) {
        // We only call the callback if a change that could affect layout/size truely happened.
        callback()
      }
    })

    // Have the observer observe foo for changes in children, etc
    obs.observe(el, assign({childList: true, subtree: true}, opts))
  } else if (eventListenerSupported) {
    // Legacy interface. most likely not used in modern browsers
    el.addEventListener('DOMNodeInserted', callback, false)
    el.addEventListener('DOMNodeRemoved', callback, false)
  }

  // We return a reference to the observer so that obs.disconnect() can be called if necessary
  // To reduce overhead when the root element is hiiden
  return obs
}
