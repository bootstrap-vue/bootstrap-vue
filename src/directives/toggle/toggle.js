import { setAttr, addClass, removeClass, hasClass } from '../../utils/dom'
import { inBrowser } from '../../utils/env'
import { bindTargets, unbindTargets } from '../../utils/target'

// Target listen types
const listenTypes = { click: true }

// Property key for handler storage
const BV_TOGGLE = '__BV_toggle__'

// Emitted control Event for collapse (emitted to collapse)
const EVENT_TOGGLE = 'bv::toggle::collapse'

// Listen to event for toggle state update (emitted by collapse)
const EVENT_STATE = 'bv::collapse::state'

/*
 * Export our directive
 */
export default {
  bind(el, binding, vnode) {
    const targets = bindTargets(vnode, binding, listenTypes, ({ targets, vnode }) => {
      targets.forEach(target => {
        vnode.context.$root.$emit(EVENT_TOGGLE, target)
      })
    })

    if (inBrowser && vnode.context && targets.length > 0) {
      // Add aria attributes to element
      setAttr(el, 'aria-controls', targets.join(' '))
      setAttr(el, 'aria-expanded', 'false')
      // If element is not a button, we add `role="button"` for accessibility
      if (el.tagName !== 'BUTTON') {
        setAttr(el, 'role', 'button')
      }

      // Toggle state handler, stored on element
      el[BV_TOGGLE] = function toggleDirectiveHandler(id, state) {
        // Exit early when unknown target or state hasn't changed
        if (targets.indexOf(id) === -1 || hasClass(el, 'collapsed') !== state) {
          return
        }
        // Set aria-expanded state
        setAttr(el, 'aria-expanded', state ? 'true' : 'false')
        // Set/clear 'collapsed' class state
        if (state) {
          removeClass(el, 'collapsed')
        } else {
          addClass(el, 'collapsed')
        }
      }

      // Listen for toggle state changes
      vnode.context.$root.$on(EVENT_STATE, el[BV_TOGGLE])
    }
  },
  unbind(el, binding, vnode) /* istanbul ignore next */ {
    unbindTargets(vnode, binding, listenTypes)
    if (el[BV_TOGGLE]) {
      // Remove our $root listener
      vnode.context.$root.$off(EVENT_STATE, el[BV_TOGGLE])
      el[BV_TOGGLE] = null
    }
  }
}
