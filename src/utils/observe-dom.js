import { MutationObs, isElement } from './dom'
import { warnNoMutationObserverSupport } from './warn'

/**
 * Observe a DOM element changes, falls back to eventListener mode
 * @param {Element} el The DOM element to observe
 * @param {Function} callback callback to be called on change
 * @param {object} [options={childList: true, subtree: true}] observe options
 * @see https://stackoverflow.com/questions/3219758
 */
const observeDom = (
  el,
  callback,
  options
) => /* istanbul ignore next: difficult to test in JSDOM */ {
  // Handle cases where we might be passed a Vue instance
  el = el ? el.$el || el : null

  // Early exit when we have no element
  /* istanbul ignore next: difficult to test in JSDOM */
  if (!isElement(el)) {
    return null
  }

  // Exit and throw a warning when `MutationObserver` isn't available
  if (warnNoMutationObserverSupport('observeDom')) {
    return null
  }

  // Define a new observer
  const obs = new MutationObs(mutations => {
    let changed = false

    // A mutation can contain several change records, so we loop
    // through them to see what has changed
    // We break out of the loop early if any "significant" change
    // has been detected
    for (let i = 0; i < mutations.length && !changed; i++) {
      // The mutation record
      const mutation = mutations[i]
      // Mutation type
      const type = mutation.type
      // DOM node (could be any DOM node type - HTMLElement, Text, comment, etc.)
      const target = mutation.target

      // Detect whether a change happened based on type and target
      if (type === 'characterData' && target.nodeType === Node.TEXT_NODE) {
        // We ignore nodes that are not TEXT (i.e. comments, etc)
        // as they don't change layout
        changed = true
      } else if (type === 'attributes') {
        changed = true
      } else if (
        type === 'childList' &&
        (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
      ) {
        // This includes HTMLElement and text nodes being
        // added/removed/re-arranged
        changed = true
      }
    }

    // We only call the callback if a change that could affect
    // layout/size truely happened
    if (changed) {
      callback()
    }
  })

  // Have the observer observe foo for changes in children, etc
  obs.observe(el, { childList: true, subtree: true, ...options })

  // We return a reference to the observer so that `obs.disconnect()`
  // can be called if necessary
  // To reduce overhead when the root element is hidden
  return obs
}

export default observeDom
