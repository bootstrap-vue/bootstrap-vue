// v-b-visible
// Private visibility check directive
// Based on IntesectionObserver
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
//
import looseEqual from './loose-equal'
import { isFunction } from './inspect'
import { keys } from './object'

const PROPNAME = '__bv__visibility_observer'

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
    if (this.observer) {
      // Remove any previous observer
      this.stop()
    }

    if (this.doneOnce) {
      // Should only be called once
      return
    }

    if (!isFunction(this.callback)) {
      return
    }

    // Create the observer instance
    try {
      // Future: possibly add in other modifiers for left/right/top/bottom
      // offsets, root element reference, and thresholds
      this.observer = new IntersectionObserver(this.handler.bind(this), {
        // null = viewport
        root: null,
        // Pixels away from view port to consider "visible"
        rootMargin: this.margin,
        // Intersection ratio of el and root (as a value from 0 to 1)
        threshold: 0
      })
    } catch {
      // No intersection observer support
      // So just stop trying to observe
      this.donOnce = true
      this.observer = null
      this.callback(null)
      return
    }

    // Start observing in a nextTick (to allow DOM to complete rendering)
    vnode.context.$nextTick(() => {
      // Start the observer
      this.observer && this.observer.observe(this.el)
    })
  }

  handler(entries) {
    const entry = entries ? entries[0] : {}
    const isInstersecting = Boolean(entry.isIntersecting || entry.intersectionRatio > 0.0)
    if (isInstersecting !== this.visible) {
      this.visible = isInstersecting
      this.callback(isInstersecting)
      if (this.once && this.visible) {
        this.doneOnce = true
        this.stop()
      }
    }
  }

  stop() {
    const observer = this.observer
    observer && observer.disconnect && observer.disconnect()
    this.observer = null
  }
}

const destroy = el => {
  el[PROPNAME] && el[PROPNAME].stop && el[PROPNAME].stop()
  delete el[PROPNAME]
}

const bind = (el, { value, modifiers }, vnode) => {
  // value is the callback function
  const options = {
    margin: '0px',
    once: false,
    callback: value
  }
  // parse modifiers
  keys(modifiers).forEach(mod => {
    if (/^\d+$/.test(mod)) {
      options.margin = `${mod}px`
    } else if (mod.toLowerCase() === 'once') {
      options.once = true
    }
  })
  // Destroy any previous observer
  destroy(el)
  // Create new observer
  el[PROPNAME] = new VisibilityObserver(el, options, vnode)
  // Store the current modifiers on the object (cloned)
  el[PROPNAME]._prevModifiers = { ...modifiers }
}

// When the directive options may have been updated (or element)
const update = (el, { value, oldValue, modifiers }, vnode) => {
  // compare value/oldValue and modifers to see if anything has changed
  // and if so, destroy old observer and create new observer
  if (value !== oldValue || !el[PROPNAME] || !looseEqual(modifiers, el[PROPNAME]._prevModifiers)) {
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
  update,
  unbind
}

export default VBVisible
