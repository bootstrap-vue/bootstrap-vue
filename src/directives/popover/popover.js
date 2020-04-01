import getScopId from '../../utils/get-scope-id'
import identity from '../../utils/identity'
import looseEqual from '../../utils/loose-equal'
import { concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { isBrowser } from '../../utils/env'
import {
  isFunction,
  isNumber,
  isPlainObject,
  isString,
  isUndefined,
  isUndefinedOrNull
} from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { keys } from '../../utils/object'
import { BVPopover } from '../../components/popover/helpers/bv-popover'

// Key which we use to store tooltip object on element
const BV_POPOVER = '__BV_Popover__'

// Default trigger
const DefaultTrigger = 'click'

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
const spacesRE = /\s+/

// Build a Popover config based on bindings (if any)
// Arguments and modifiers take precedence over passed value config object
const parseBindings = (bindings, vnode) => /* istanbul ignore next: not easy to test */ {
  // We start out with a basic config
  const NAME = 'BPopover'
  let config = {
    title: undefined,
    content: undefined,
    trigger: '', // Default set below if needed
    placement: 'right',
    fallbackPlacement: 'flip',
    container: false, // Default of body
    animation: true,
    offset: 0,
    disabled: false,
    id: null,
    html: false,
    delay: getComponentConfig(NAME, 'delay'),
    boundary: String(getComponentConfig(NAME, 'boundary')),
    boundaryPadding: toInteger(getComponentConfig(NAME, 'boundaryPadding'), 0),
    variant: getComponentConfig(NAME, 'variant'),
    customClass: getComponentConfig(NAME, 'customClass')
  }

  // Process `bindings.value`
  if (isString(bindings.value) || isNumber(bindings.value)) {
    // Value is popover content (html optionally supported)
    config.content = bindings.value
  } else if (isFunction(bindings.value)) {
    // Content generator function
    config.content = bindings.value
  } else if (isPlainObject(bindings.value)) {
    // Value is config object, so merge
    config = { ...config, ...bindings.value }
  }

  // If argument, assume element ID of container element
  if (bindings.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.container = `#${bindings.arg}`
  }

  // If title is not provided, try title attribute
  if (isUndefined(config.title)) {
    // Try attribute
    const data = vnode.data || {}
    config.title = data.attrs && !isUndefinedOrNull(data.attrs.title) ? data.attrs.title : undefined
  }

  // Normalize delay
  if (!isPlainObject(config.delay)) {
    config.delay = {
      show: toInteger(config.delay, 0),
      hide: toInteger(config.delay, 0)
    }
  }

  // Process modifiers
  keys(bindings.modifiers).forEach(mod => {
    if (htmlRE.test(mod)) {
      // Title/content allows HTML
      config.html = true
    } else if (noFadeRE.test(mod)) {
      // No animation
      config.animation = false
    } else if (placementRE.test(mod)) {
      // Placement of popover
      config.placement = mod
    } else if (boundaryRE.test(mod)) {
      // Boundary of popover
      mod = mod === 'scrollparent' ? 'scrollParent' : mod
      config.boundary = mod
    } else if (delayRE.test(mod)) {
      // Delay value
      const delay = toInteger(mod.slice(1), 0)
      config.delay.show = delay
      config.delay.hide = delay
    } else if (delayShowRE.test(mod)) {
      // Delay show value
      config.delay.show = toInteger(mod.slice(2), 0)
    } else if (delayHideRE.test(mod)) {
      // Delay hide value
      config.delay.hide = toInteger(mod.slice(2), 0)
    } else if (offsetRE.test(mod)) {
      // Offset value, negative allowed
      config.offset = toInteger(mod.slice(1), 0)
    } else if (variantRE.test(mod)) {
      // Variant
      config.variant = mod.slice(2) || null
    }
  })

  // Special handling of event trigger modifiers trigger is
  // a space separated list
  const selectedTriggers = {}

  // Parse current config object trigger
  concat(config.trigger || '')
    .filter(identity)
    .join(' ')
    .trim()
    .toLowerCase()
    .split(spacesRE)
    .forEach(trigger => {
      if (validTriggers[trigger]) {
        selectedTriggers[trigger] = true
      }
    })

  // Parse modifiers for triggers
  keys(bindings.modifiers).forEach(mod => {
    mod = mod.toLowerCase()
    if (validTriggers[mod]) {
      // If modifier is a valid trigger
      selectedTriggers[mod] = true
    }
  })

  // Sanitize triggers
  config.trigger = keys(selectedTriggers).join(' ')
  if (config.trigger === 'blur') {
    // Blur by itself is useless, so convert it to 'focus'
    config.trigger = 'focus'
  }
  if (!config.trigger) {
    // Use default trigger
    config.trigger = DefaultTrigger
  }

  return config
}

// Add or update Popover on our element
const applyPopover = (el, bindings, vnode) => {
  if (!isBrowser) {
    /* istanbul ignore next */
    return
  }
  const config = parseBindings(bindings, vnode)
  if (!el[BV_POPOVER]) {
    const $parent = vnode.context
    el[BV_POPOVER] = new BVPopover({
      parent: $parent,
      // Add the parent's scoped style attribute data
      _scopeId: getScopId($parent, undefined)
    })
    el[BV_POPOVER].__bv_prev_data__ = {}
    el[BV_POPOVER].$on('show', () => /* istanbul ignore next: for now */ {
      // Before showing the popover, we update the title
      // and content if they are functions
      const data = {}
      if (isFunction(config.title)) {
        data.title = config.title(el)
      }
      if (isFunction(config.content)) {
        data.content = config.content(el)
      }
      if (keys(data).length > 0) {
        el[BV_POPOVER].updateData(data)
      }
    })
  }
  const data = {
    title: config.title,
    content: config.content,
    triggers: config.trigger,
    placement: config.placement,
    fallbackPlacement: config.fallbackPlacement,
    variant: config.variant,
    customClass: config.customClass,
    container: config.container,
    boundary: config.boundary,
    delay: config.delay,
    offset: config.offset,
    noFade: !config.animation,
    id: config.id,
    disabled: config.disabled,
    html: config.html
  }
  const oldData = el[BV_POPOVER].__bv_prev_data__
  el[BV_POPOVER].__bv_prev_data__ = data
  if (!looseEqual(data, oldData)) {
    // We only update the instance if data has changed
    const newData = {
      target: el
    }
    keys(data).forEach(prop => {
      // We only pass data properties that have changed
      if (data[prop] !== oldData[prop]) {
        // If title/content is a function, we execute it here
        newData[prop] =
          (prop === 'title' || prop === 'content') && isFunction(data[prop])
            ? data[prop](el)
            : data[prop]
      }
    })
    el[BV_POPOVER].updateData(newData)
  }
}

// Remove Popover from our element
const removePopover = el => {
  if (el[BV_POPOVER]) {
    el[BV_POPOVER].$destroy()
    el[BV_POPOVER] = null
  }
  delete el[BV_POPOVER]
}

// Export our directive
export const VBPopover = {
  bind(el, bindings, vnode) {
    applyPopover(el, bindings, vnode)
  },
  // We use `componentUpdated` here instead of `update`, as the former
  // waits until the containing component and children have finished updating
  componentUpdated(el, bindings, vnode) {
    // Performed in a `$nextTick()` to prevent endless render/update loops
    vnode.context.$nextTick(() => {
      applyPopover(el, bindings, vnode)
    })
  },
  unbind(el) {
    removePopover(el)
  }
}
