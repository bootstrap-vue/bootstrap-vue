import { NAME_MODAL } from '../../constants/components'
import { EVENT_NAME_SHOW, EVENT_OPTIONS_PASSIVE } from '../../constants/events'
import { CODE_ENTER, CODE_SPACE } from '../../constants/key-codes'
import { getAttr, hasAttr, isDisabled, matches, select, setAttr } from '../../utils/dom'
import { getRootActionEventName, eventOn, eventOff } from '../../utils/events'
import { isString } from '../../utils/inspect'
import { keys } from '../../utils/object'

// Emitted show event for modal
const ROOT_ACTION_EVENT_NAME_SHOW = getRootActionEventName(NAME_MODAL, EVENT_NAME_SHOW)

// Prop name we use to store info on root element
const PROPERTY = '__bv_modal_directive__'

const getTarget = ({ modifiers = {}, arg, value }) => {
  // Try value, then arg, otherwise pick last modifier
  return isString(value) ? value : isString(arg) ? arg : keys(modifiers).reverse()[0]
}

const getTriggerElement = el => {
  // If root element is a dropdown-item or nav-item, we
  // need to target the inner link or button instead
  return el && matches(el, '.dropdown-menu > li, li.nav-item') ? select('a, button', el) || el : el
}

const setRole = trigger => {
  // Ensure accessibility on non button elements
  if (trigger && trigger.tagName !== 'BUTTON') {
    // Only set a role if the trigger element doesn't have one
    if (!hasAttr(trigger, 'role')) {
      setAttr(trigger, 'role', 'button')
    }
    // Add a tabindex is not a button or link, and tabindex is not provided
    if (trigger.tagName !== 'A' && !hasAttr(trigger, 'tabindex')) {
      setAttr(trigger, 'tabindex', '0')
    }
  }
}

const bind = (el, binding, vnode) => {
  const target = getTarget(binding)
  const trigger = getTriggerElement(el)
  if (target && trigger) {
    const handler = event => {
      // `currentTarget` is the element with the listener on it
      const currentTarget = event.currentTarget
      if (!isDisabled(currentTarget)) {
        const type = event.type
        const key = event.keyCode
        // Open modal only if trigger is not disabled
        if (
          type === 'click' ||
          (type === 'keydown' && (key === CODE_ENTER || key === CODE_SPACE))
        ) {
          vnode.context.$root.$emit(ROOT_ACTION_EVENT_NAME_SHOW, target, currentTarget)
        }
      }
    }
    el[PROPERTY] = { handler, target, trigger }
    // If element is not a button, we add `role="button"` for accessibility
    setRole(trigger)
    // Listen for click events
    eventOn(trigger, 'click', handler, EVENT_OPTIONS_PASSIVE)
    if (trigger.tagName !== 'BUTTON' && getAttr(trigger, 'role') === 'button') {
      // If trigger isn't a button but has role button,
      // we also listen for `keydown.space` && `keydown.enter`
      eventOn(trigger, 'keydown', handler, EVENT_OPTIONS_PASSIVE)
    }
  }
}

const unbind = el => {
  const oldProp = el[PROPERTY] || {}
  const trigger = oldProp.trigger
  const handler = oldProp.handler
  if (trigger && handler) {
    eventOff(trigger, 'click', handler, EVENT_OPTIONS_PASSIVE)
    eventOff(trigger, 'keydown', handler, EVENT_OPTIONS_PASSIVE)
    eventOff(el, 'click', handler, EVENT_OPTIONS_PASSIVE)
    eventOff(el, 'keydown', handler, EVENT_OPTIONS_PASSIVE)
  }
  delete el[PROPERTY]
}

const componentUpdated = (el, binding, vnode) => {
  const oldProp = el[PROPERTY] || {}
  const target = getTarget(binding)
  const trigger = getTriggerElement(el)
  if (target !== oldProp.target || trigger !== oldProp.trigger) {
    // We bind and rebind if the target or trigger changes
    unbind(el, binding, vnode)
    bind(el, binding, vnode)
  }
  // If trigger element is not a button, ensure `role="button"`
  // is still set for accessibility
  setRole(trigger)
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
