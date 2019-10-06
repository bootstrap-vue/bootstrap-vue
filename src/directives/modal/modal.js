import {
  eventOn,
  eventOff,
  getAttr,
  hasAttr,
  isDisabled,
  matches,
  select,
  setAttr
} from '../../utils/dom'
import { isString } from '../../utils/inspect'
import { keys } from '../../utils/object'

// Emitted show event for modal
const EVENT_SHOW = 'bv::show::modal'

// Prop name we use to store info on root element
const HANDLER = '__bv_modal_directive__'

const EVENT_OPTS = { passive: true }

const getTarget = ({ modifiers = {}, arg, value }) => {
  // Try value, then arg, otherwise pick last modifier
  return isString(value) ? value : isString(arg) ? arg : keys(modifiers).reverse()[0]
}

const getTriggerElement = el => {
  // If root element is a dropdown item or nav item, we
  // need to target the inner link or button instead
  return el && matches(el, '.dropdown-menu > li, li.nav-item') ? select('a, button', el) || el : el
}

const setRole = trigger => {
  // Only set a role if the trigger element doesn't have one
  if (trigger && trigger.tagName !== 'BUTTON' && !hasAttr(trigger, 'role')) {
    setAttr(trigger, 'role', 'button')
  }
}

const bind = (el, binding, vnode) => {
  const target = getTarget(binding)
  const trigger = getTriggerElement(el)
  if (target && trigger) {
    const handler = evt => {
      // `currentTarget` is the element with the listener on it
      const currentTarget = evt.currentTarget
      if (!isDisabled(currentTarget)) {
        const type = evt.type
        // Open modal only if trigger is not disabled
        if (type === 'click' || (type === 'keydown' && evt.keyCode === 32)) {
          vnode.context.$root.$emit(EVENT_SHOW, target, currentTarget)
        }
      }
    }
    el[HANDLER] = handler
    // If element is not a button, we add `role="button"` for accessibility
    setRole(trigger)
    // Listen for click events
    eventOn(trigger, 'click', handler, EVENT_OPTS)
    if (trigger.tagName !== 'BUTTON' && getAttr(trigger, 'role') === 'button') {
      // If trigger isn't a button but has role button,
      // we also listen for `keydown.space`
      eventOn(trigger, 'keydown', handler, EVENT_OPTS)
    }
  }
}

const unbind = el => {
  const trigger = getTriggerElement(el)
  const handler = el ? el[HANDLER] : null
  if (trigger && handler) {
    eventOff(trigger, 'click', handler, EVENT_OPTS)
    eventOff(trigger, 'keydown', handler, EVENT_OPTS)
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
  inserted: componentUpdated,
  updated,
  componentUpdated,
  unbind
}
