import Popper from 'popper.js'
import ToolTip from '../../utils/tooltip.class'
import { keys } from '../../utils/object'
import warn from '../../utils/warn'

const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

// Key which we use to store tooltip object on element
const BVTT = '__BV_ToolTip__'

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
function parseBindings(bindings) {
  // We start out with a blank config
  let config = {}

  // Process bindings.value
  if (typeof bindings.value === 'string') {
    // Value is tooltip content (html optionally supported)
    config.title = bindings.value
  } else if (typeof bindings.value === 'function') {
    // Title generator function
    config.title = bindings.value
  } else if (typeof bindings.value === 'object') {
    // Value is config object, so merge
    config = { ...config, ...bindings.value }
  }

  // If Argument, assume element ID of container element
  if (bindings.arg) {
    // Element ID specified as arg. We must prepend '#' to become a CSS selector
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
      // placement of tooltip
      config.placement = mod
    } else if (/^(window|viewport)$/.test(mod)) {
      // bounday of tooltip
      config.boundary = mod
    } else if (/^d\d+$/.test(mod)) {
      // delay value
      const delay = parseInt(mod.slice(1), 10) || 0
      if (delay) {
        config.delay = delay
      }
    } else if (/^o-?\d+$/.test(mod)) {
      // offset value. Negative allowed
      const offset = parseInt(mod.slice(1), 10) || 0
      if (offset) {
        config.offset = offset
      }
    }
  })

  // Special handling of event trigger modifiers Trigger is a space separated list
  const selectedTriggers = {}

  // parse current config object trigger
  let triggers = typeof config.trigger === 'string' ? config.trigger.trim().split(/\s+/) : []
  triggers.forEach(trigger => {
    if (validTriggers[trigger]) {
      selectedTriggers[trigger] = true
    }
  })

  // Parse Modifiers for triggers
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
    // remove trigger config
    delete config.trigger
  }

  return config
}

//
// Add or Update tooltip on our element
//
/* istanbul ignore next: not easy to test */
function applyBVTT(el, bindings, vnode) {
  if (!inBrowser) {
    return
  }
  if (!Popper) {
    // Popper is required for tooltips to work
    warn('v-b-tooltip: Popper.js is required for tooltips to work')
    return
  }
  if (el[BVTT]) {
    el[BVTT].updateConfig(parseBindings(bindings))
  } else {
    el[BVTT] = new ToolTip(el, parseBindings(bindings), vnode.context.$root)
  }
}

//
// Remove tooltip on our element
//
/* istanbul ignore next: not easy to test */
function removeBVTT(el) {
  if (!inBrowser) {
    return
  }
  if (el[BVTT]) {
    el[BVTT].destroy()
    el[BVTT] = null
    delete el[BVTT]
  }
}

/*
 * Export our directive
 */
/* istanbul ignore next: not easy to test */
export default {
  bind(el, bindings, vnode) {
    applyBVTT(el, bindings, vnode)
  },
  inserted(el, bindings, vnode) {
    applyBVTT(el, bindings, vnode)
  },
  update(el, bindings, vnode) {
    if (bindings.value !== bindings.oldValue) {
      applyBVTT(el, bindings, vnode)
    }
  },
  componentUpdated(el, bindings, vnode) {
    if (bindings.value !== bindings.oldValue) {
      applyBVTT(el, bindings, vnode)
    }
  },
  unbind(el) {
    removeBVTT(el)
  }
}
