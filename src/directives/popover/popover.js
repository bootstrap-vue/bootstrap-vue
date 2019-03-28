import Popper from 'popper.js'
import PopOver from '../../utils/popover.class'
import { inBrowser } from '../../utils/env'
import { keys } from '../../utils/object'
import warn from '../../utils/warn'

// Key which we use to store tooltip object on element
const BV_POPOVER = '__BV_PopOver__'

// Valid event triggers
const validTriggers = {
  focus: true,
  hover: true,
  click: true,
  blur: true
}

// Build a PopOver config based on bindings (if any)
// Arguments and modifiers take precedence over passed value config object
/* istanbul ignore next: not easy to test */
const parseBindings = bindings => /* istanbul ignore next: not easy to test */ {
  // We start out with a blank config
  let config = {}

  // Process bindings.value
  if (typeof bindings.value === 'string') {
    // Value is popover content (html optionally supported)
    config.content = bindings.value
  } else if (typeof bindings.value === 'function') {
    // Content generator function
    config.content = bindings.value
  } else if (typeof bindings.value === 'object') {
    // Value is config object, so merge
    config = { ...config, ...bindings.value }
  }

  // If argument, assume element ID of container element
  if (bindings.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.container = `#${bindings.arg}`
  }

  // Process modifiers
  keys(bindings.modifiers).forEach(mod => {
    if (/^html$/.test(mod)) {
      // Title allows HTML
      config.html = true
    } else if (/^nofade$/.test(mod)) {
      // no animation
      config.animation = false
    } else if (
      /^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/.test(mod)
    ) {
      // placement of popover
      config.placement = mod
    } else if (/^(window|viewport)$/.test(mod)) {
      // Boundary of popover
      config.boundary = mod
    } else if (/^d\d+$/.test(mod)) {
      // Delay value
      const delay = parseInt(mod.slice(1), 10) || 0
      if (delay) {
        config.delay = delay
      }
    } else if (/^o-?\d+$/.test(mod)) {
      // Offset value (negative allowed)
      const offset = parseInt(mod.slice(1), 10) || 0
      if (offset) {
        config.offset = offset
      }
    }
  })

  // Special handling of event trigger modifiers trigger is
  // a space separated list
  const selectedTriggers = {}

  // Parse current config object trigger
  let triggers = typeof config.trigger === 'string' ? config.trigger.trim().split(/\s+/) : []
  triggers.forEach(trigger => {
    if (validTriggers[trigger]) {
      selectedTriggers[trigger] = true
    }
  })

  // Parse modifiers for triggers
  keys(validTriggers).forEach(trigger => {
    if (bindings.modifiers[trigger]) {
      selectedTriggers[trigger] = true
    }
  })

  // Sanitize triggers
  config.trigger = keys(selectedTriggers).join(' ')
  if (config.trigger === 'blur') {
    // Blur by itself is useless, so convert it to focus
    config.trigger = 'focus'
  }
  if (!config.trigger) {
    // Remove trigger config
    delete config.trigger
  }

  return config
}

// Add or update PopOver on our element
const applyPopover = (el, bindings, vnode) => {
  if (!inBrowser) {
    /* istanbul ignore next */
    return
  }
  // Popper is required for PopOvers to work
  if (!Popper) {
    /* istanbul ignore next */
    warn('v-b-popover: Popper.js is required for PopOvers to work')
    /* istanbul ignore next */
    return
  }
  const config = parseBindings(bindings)
  if (el[BV_POPOVER]) {
    el[BV_POPOVER].updateConfig(config)
  } else {
    el[BV_POPOVER] = new PopOver(el, config, vnode.context.$root)
  }
}

// Remove PopOver on our element
const removePopover = el => {
  if (el[BV_POPOVER]) {
    el[BV_POPOVER].destroy()
    el[BV_POPOVER] = null
    delete el[BV_POPOVER]
  }
}

/*
 * Export our directive
 */
export default {
  bind(el, bindings, vnode) {
    applyPopover(el, bindings, vnode)
  },
  inserted(el, bindings, vnode) {
    applyPopover(el, bindings, vnode)
  },
  update(el, bindings, vnode) /* istanbul ignore next: not easy to test */ {
    if (bindings.value !== bindings.oldValue) {
      applyPopover(el, bindings, vnode)
    }
  },
  componentUpdated(el, bindings, vnode) /* istanbul ignore next: not easy to test */ {
    if (bindings.value !== bindings.oldValue) {
      applyPopover(el, bindings, vnode)
    }
  },
  unbind(el) {
    removePopover(el)
  }
}
