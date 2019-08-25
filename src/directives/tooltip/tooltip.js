import { BVToolTip } from '../../utils/bv-tooltip'
import { concat } from '../../utils//array'
import { getComponentConfig } from '../../utils/config'
import { isBrowser } from '../../utils/env'
import { isFunction, isObject, isString, isUndefined } from '../../utils/inspect'
import { keys } from '../../utils/object'

// Key which we use to store tooltip object on element
const BV_TOOLTIP = '__BV_ToolTip__'

// Valid event triggers
const validTriggers = {
  focus: true,
  hover: true,
  click: true,
  blur: true,
  manual: true
}

// Directive modifier test regular expressions. Pre-compile for performance
const htmlRE = /^html$/i
const noFadeRE = /^nofade$/i
const placementRE = /^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/i
const boundaryRE = /^(window|viewport|scrollParent)$/i
const delayRE = /^d\d+$/i
const delayShowRE = /^ds\d+$/i
const delayHideRE = /^dh\d+$/i
const offsetRE = /^o-?\d+$/i
const variantRE = /^v-.+$/i

// Build a ToolTip config based on bindings (if any)
// Arguments and modifiers take precedence over passed value config object
const parseBindings = (bindings, vnode) => /* istanbul ignore next: not easy to test */ {
  // We start out with a basic config
  const NAME = 'BTooltip'
  let config = {
    delay: getComponentConfig(NAME, 'delay'),
    boundary: String(getComponentConfig(NAME, 'boundary')),
    boundaryPadding: parseInt(getComponentConfig(NAME, 'boundaryPadding'), 10) || 0,
    variant: getComponentConfig(NAME, 'variant'),
    customClass: getComponentConfig(NAME, 'customClass'),
    noFade: false,
    offset: 0
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

  // If title is not provided, try title attribute
  if (isUndefined(config.title)) {
    // try attribute
    const data = vnode.data || {}
    config.title = data.attrs && data.attrs.title ? data.attrs.title : ''
  }

  // Normalize delay
  if (!isObject(config.delay)) {
    config.delay = {
      show: config.delay,
      hide: config.delay
    }
  }

  // If argument, assume element ID of container element
  if (bindings.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.container = `#${bindings.arg}`
  }

  // Process modifiers
  keys(bindings.modifiers).forEach(mod => {
    if (htmlRE.test(mod)) {
      // Title allows HTML
      config.html = true
    } else if (noFadeRE.test(mod)) {
      // No animation
      config.noFade = true
    } else if (placementRE.test(mod)) {
      // Placement of tooltip
      config.placement = mod
    } else if (boundaryRE.test(mod)) {
      // Boundary of tooltip
      mod = mod === 'scrollparent' ? 'scrollParent' : mod
      config.boundary = mod
    } else if (delayRE.test(mod)) {
      // Delay value
      const delay = parseInt(mod.slice(1), 10) || 0
      config.delay.show = delay
      config.delay.hide = delay
    } else if (delayShowRE.test(mod)) {
      // Delay show value
      config.delay.show = parseInt(mod.slice(2), 10) || 0
    } else if (delayHideRE.test(mod)) {
      // Delay hide value
      config.delay.hide = parseInt(mod.slice(2), 10) || 0
    } else if (offsetRE.test(mod)) {
      // Offset value, negative allowed
      config.offset = parseInt(mod.slice(1), 10) || 0
    } else if (variantRE.test(mod)) {
      // Variant
      config.variant = mod.slice(2) || null
    }
  })

  // Special handling of event trigger modifiers trigger is
  // a space separated list
  const selectedTriggers = {}

  // Parse current config object trigger
  const triggers = concat(config.trigger)
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .forEach(trigger => {
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
    // Remove trigger config to use default
    delete config.trigger
  }

  // If title is a string, and the html option is true, then
  // generate a div container with innerHTML set
  if (isString(config.title) && config.html) {
    config.title = vnode.context.$createElement('div', { domProps: { innerHTML: config.title } })
  }

  // return the config
  return config
}

// Add ToolTip on our element
const applyTooltip = (el, bindings, vnode) => {
  if (!isBrowser) {
    /* istanbul ignore next */
    return
  }
  const config = parseBindings(bindings, vnode)
  if (!el[BV_TOOLTIP]) {
    el[BV_TOOLTIP] = new BVTooltip({
      parent: vnode.context
    })
  }
  // The updateData method only updates values that have changed
  el[BV_TOOLTIP].updateData({
    target: el,
    title: config.title,
    triggers: config.trigger,
    placement: config.placement,
    fallbackPlacement: config.fallbackPlacement,
    variant: config.variant,
    customClass: config.customClass,
    container: config.container,
    boundary: config.boundary,
    delay: config.delay,
    offset: config.offset,
    noFade: config.noFade
  })
}

// Remove ToolTip on our element
const removeTooltip = el => {
  if (el[BV_TOOLTIP]) {
    el[BV_TOOLTIP].destroy()
    el[BV_TOOLTIP] = null
  }
  delete el[BV_TOOLTIP]
}

/*
 * Export our directive
 */
export const VBTooltip = {
  bind(el, bindings, vnode) {
    applyTooltip(el, bindings, vnode)
  },
  update(el, bindings, vnode) /* istanbul ignore next: not easy to test */ {
    applyTooltip(el, bindings, vnode)
  },
  unbind(el) {
    removeTooltip(el)
  }
}

export default VBTooltip
