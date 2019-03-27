import { setAttr, removeAttr } from '../../utils/dom'
import { bindTargets, unbindTargets } from '../../utils/target'

// Target listen types
const listenTypes = { click: true }

// Emitted show event for modal
const EVENT_SHOW = 'bv::show::modal'

const setRole = (el, binding, vnode) => {
  if (el.tagName !== 'BUTTON') {
    setAttr(el, 'role', 'button')
  }
}

/*
 * Export our directive
 */
export default {
  // eslint-disable-next-line no-shadow-restricted-names
  bind(el, binding, vnode) {
    bindTargets(vnode, binding, listenTypes, ({ targets, vnode }) => {
      targets.forEach(target => {
        vnode.context.$root.$emit(EVENT_SHOW, target, vnode.elm)
      })
    })
    // If element is not a button, we add `role="button"` for accessibility
    setRole(el, binding, vnode)
  },
  updated: setRole,
  componentUpdated: setRole,
  unbind(el, binding, vnode) {
    unbindTargets(vnode, binding, listenTypes)
    // If element is not a button, we add `role="button"` for accessibility
    if (el.tagName !== 'BUTTON') {
      removeAttr(el, 'role', 'button')
    }
  }
}
