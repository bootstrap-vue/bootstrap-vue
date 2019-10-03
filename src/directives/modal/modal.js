import { eventOn, eventOff, hasAttr, matches, select, setAttr } from '../../utils/dom'
import { isString } from '../../utils/inspect'
import { keys } from '../../utils/object'

// Emitted show event for modal
const EVENT_SHOW = 'bv::show::modal'

// Prop name we use to store info on root element
const HANDLER = '__bv_modal_directive__'

const EVENT_OPTS = { passive: true }

const getTarget = ({ modifiers = {}, value }) => {
  let target
  keys(modifiers).forEach(mod => {
    target = mod
  })
  if (isString(value)) {
    target = value
  }
  return target
}

const getTriggerElement = el => {
  // If root element is a dropdown item or nav item, we
  // need to target the inner link or button instead
  return el && matches(el, '.dropdown-menu > li, li.nav-item') ? select('a, button', el) || el : el
}

const setRole = trigger => {
  if (trigger && trigger.tagName !== 'BUTTON' && !hasAttr(trigger, 'role')) {
    setAttr(trigger, 'role', 'button')
  }
}

const bind = (el, binding, vnode) => {
  const target = getTarget(binding)
  vnode.context.$nextTick(() => {
    // Performed in a next tick to ensure DOM is rendered
    const trigger = getTriggerElement(el)
    if (target && trigger) {
      el[HANDLER] = evt => {
        if (target) {
          vnode.context.$root.$emit(EVENT_SHOW, target, trigger)
        }
      }
      eventOn(trigger, 'click', el[HANDLER], EVENT_OPTS)
      // If element is not a button, we add `role="button"` for accessibility
      setRole(trigger)
    }
  })
}

const unbind = (el, binding, vnode) => {
  const trigger = getTriggerElement(el)
  if (trigger && el && el[HANDLER]) {
    eventOff(trigger, 'click', el[HANDLER], EVENT_OPTS)
  }
  delete el[HANDLER]
}

const componentUpdated = (el, binding, vnode) => {
  // We bind and rebind just in case target changes
  unbind(el, binding, vnode)
  bind(el, binding, vnode)
}

const updated = () => {}

/*
 * Export our directive
 */
export const VBModal = {
  bind,
  updated,
  componentUpdated,
  unbind
}
