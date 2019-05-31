import Popper from 'popper.js'
import ToolTip from '../../utils/tooltip.class'
import warn from '../../utils/warn'
import { getComponentConfig } from '../../utils/config'
import { isBrowser } from '../../utils/env'
import { isFunction, isObject, isString } from '../../utils/inspect'
import { keys } from '../../utils/object'

// Key which we use to store tooltip object on element
const BV_TOOLTIP = '__BV_ToolTip__'

// Valid event triggers
const validTriggers = {
  focus: true,
  hover: true,
  click: true,
  blur: true
}

// Build a ToolTip config based on bindings (if any)
// Arguments and modifiers take precedence over passed value config object
/* istanbul ignore next: not easy to test */
const parseBindings = bindings => /* istanbul ignore next: not easy to test */ {
  // We start out with a basic config
  const NAME = 'BTooltip'
  let config = {
    delay: getComponentConfig(NAME, 'delay'),
    boundary: String(getComponentConfig(NAME, 'boundary')),
    boundaryPadding: parseInt(getComponentConfig(NAME, 'boundaryPadding'), 10) || 0
  }

  // Process bindings.value
  if (isString(bindings.value)) {
    // Value is tooltip content (html optionally supported)
    config.title = bindings.value
  } else if (isFunction(bindings.value)) {
    // Title generator function
    config.title = bindings.value
  } else if (isObject(bindings.value)) {
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
      // No animation
      config.animation = false
    } else if (
      /^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/.test(mod)
    ) {
      // Placement of tooltip
      config.placement = mod
    } else if (/^(window|viewport|scrollParent)$/.test(mod)) {
      // Boundary of tooltip
      config.boundary = mod
    } else if (/^d\d+$/.test(mod)) {
      // Delay value
      const delay = parseInt(mod.slice(1), 10) || 0
      if (delay) {
        config.delay = delay
      }
    } else if (/^o-?\d+$/.test(mod)) {
      // Offset value, negative allowed
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
  let triggers = isString(config.trigger) ? config.trigger.trim().split(/\s+/) : []
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
    // Blur by itself is useless, so convert it to 'focus'
    config.trigger = 'focus'
  }
  if (!config.trigger) {
    // Remove trigger config
    delete config.trigger
  }

  return config
}

// Add or update ToolTip on our element
const applyTooltip = (el, bindings, vnode) => {
  if (!isBrowser) {
    /* istanbul ignore next */
    return
  }
  if (!Popper) {
    // Popper is required for ToolTips to work
    /* istanbul ignore next */
    warn('v-b-tooltip: Popper.js is required for ToolTips to work')
    /* istanbul ignore next */
    return
  }
  const config = parseBindings(bindings)
  if (el[BV_TOOLTIP]) {
    el[BV_TOOLTIP].updateConfig(config)
  } else {
    el[BV_TOOLTIP] = new ToolTip(el, config, vnode.context.$root)
  }
}

// Remove ToolTip on our element
const removeTooltip = el => {
  if (el[BV_TOOLTIP]) {
    el[BV_TOOLTIP].destroy()
    el[BV_TOOLTIP] = null
    delete el[BV_TOOLTIP]
  }
}

/*
 * Export our directive
 */
export default {
  bind(el, bindings, vnode) {
    applyTooltip(el, bindings, vnode)
  },
  inserted(el, bindings, vnode) {
    applyTooltip(el, bindings, vnode)
  },
  update(el, bindings, vnode) /* istanbul ignore next: not easy to test */ {
    if (bindings.value !== bindings.oldValue) {
      applyTooltip(el, bindings, vnode)
    }
  },
  componentUpdated(el, bindings, vnode) /* istanbul ignore next: not easy to test */ {
    if (bindings.value !== bindings.oldValue) {
      applyTooltip(el, bindings, vnode)
    }
  },
  unbind(el) {
    removeTooltip(el)
  }
}
