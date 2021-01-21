// v-b-visible
// Private visibility check directive
// Based on IntersectionObserver
//
// Usage:
//  v-b-visibility.<margin>.<once>="<callback>"
//
//  Value:
//  <callback>: method to be called when visibility state changes, receives one arg:
//     true:  element is visible
//     false: element is not visible
//     null:  IntersectionObserver not supported
//
//  Modifiers:
//    <margin>: a positive decimal value of pixels away from viewport edge
//              before being considered "visible". default is 0
//    <once>:   keyword 'once', meaning when the element becomes visible and
//              callback is called observation/notification will stop.
//
// When used in a render function:
// export default {
//   directives: { 'b-visible': VBVisible },
//   render(h) {
//     h(
//       'div',
//       {
//         directives: [
//           { name: 'b-visible', value=this.callback, modifiers: { '123':true, 'once':true } }
//         ]
//       }
//     )
//   }

import { RX_DIGITS } from '../../constants/regex'
import { requestAF } from '../../utils/dom'
import { isFunction } from '../../utils/inspect'
import { looseEqual } from '../../utils/loose-equal'
import { clone, keys } from '../../utils/object'

const OBSERVER_PROP_NAME = '__bv__visibility_observer'

class VisibilityObserver {
  constructor(el, options, vnode) {
    this.el = el
    this.callback = options.callback
    this.margin = options.margin || 0
    this.once = options.once || false
    this.observer = null
    this.visible = undefined
    this.doneOnce = false
    // Create the observer instance (if possible)
    this.createObserver(vnode)
  }

  createObserver(vnode) {
    // Remove any previous observer
    if (this.observer) {
      /* istanbul ignore next */
      this.stop()
    }

    // Should only be called once and `callback` prop should be a function
    if (this.doneOnce || !isFunction(this.callback)) {
      /* istanbul ignore next */
      return
    }

    // Create the observer instance
    try {
      // Future: Possibly add in other modifiers for left/right/top/bottom
      // offsets, root element reference, and thresholds
      this.observer = new IntersectionObserver(this.handler.bind(this), {
        // `null` = 'viewport'
        root: null,
        // Pixels away from view port to consider "visible"
        rootMargin: this.margin,
        // Intersection ratio of el and root (as a value from 0 to 1)
        threshold: 0
      })
    } catch {
      // No IntersectionObserver support, so just stop trying to observe
      this.doneOnce = true
      this.observer = undefined
      this.callback(null)
      return
    }

    // Start observing in a `$nextTick()` (to allow DOM to complete rendering)
    /* istanbul ignore next: IntersectionObserver not supported in JSDOM */
    vnode.context.$nextTick(() => {
      requestAF(() => {
        // Placed in an `if` just in case we were destroyed before
        // this `requestAnimationFrame` runs
        if (this.observer) {
          this.observer.observe(this.el)
        }
      })
    })
  }

  /* istanbul ignore next */
  handler(entries) {
    const entry = entries ? entries[0] : {}
    const isIntersecting = Boolean(entry.isIntersecting || entry.intersectionRatio > 0.0)
    if (isIntersecting !== this.visible) {
      this.visible = isIntersecting
      this.callback(isIntersecting)
      if (this.once && this.visible) {
        this.doneOnce = true
        this.stop()
      }
    }
  }

  stop() {
    /* istanbul ignore next */
    this.observer && this.observer.disconnect()
    this.observer = null
  }
}

const destroy = el => {
  const observer = el[OBSERVER_PROP_NAME]
  if (observer && observer.stop) {
    observer.stop()
  }
  delete el[OBSERVER_PROP_NAME]
}

const bind = (el, { value, modifiers }, vnode) => {
  // `value` is the callback function
  const options = {
    margin: '0px',
    once: false,
    callback: value
  }
  // Parse modifiers
  keys(modifiers).forEach(mod => {
    /* istanbul ignore else: Until <b-img-lazy> is switched to use this directive */
    if (RX_DIGITS.test(mod)) {
      options.margin = `${mod}px`
    } else if (mod.toLowerCase() === 'once') {
      options.once = true
    }
  })
  // Destroy any previous observer
  destroy(el)
  // Create new observer
  el[OBSERVER_PROP_NAME] = new VisibilityObserver(el, options, vnode)
  // Store the current modifiers on the object (cloned)
  el[OBSERVER_PROP_NAME]._prevModifiers = clone(modifiers)
}

// When the directive options may have been updated (or element)
const componentUpdated = (el, { value, oldValue, modifiers }, vnode) => {
  // Compare value/oldValue and modifiers to see if anything has changed
  // and if so, destroy old observer and create new observer
  /* istanbul ignore next */
  modifiers = clone(modifiers)
  /* istanbul ignore next */
  if (
    el &&
    (value !== oldValue ||
      !el[OBSERVER_PROP_NAME] ||
      !looseEqual(modifiers, el[OBSERVER_PROP_NAME]._prevModifiers))
  ) {
    // Re-bind on element
    bind(el, { value, modifiers }, vnode)
  }
}

// When directive un-binds from element
const unbind = el => {
  // Remove the observer
  destroy(el)
}

// Export the directive
export const VBVisible = {
  bind,
  componentUpdated,
  unbind
}
