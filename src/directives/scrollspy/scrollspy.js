import ScrollSpy from './scrollspy.class'
import { isBrowser } from '../../utils/env'
import { isNumber, isObject, isString } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { keys } from '../../utils/object'

// Key we use to store our instance
const BV_SCROLLSPY = '__BV_ScrollSpy__'

// Pre-compiled regular expressions
const onlyDigitsRE = /^\d+$/
const offsetRE = /^(auto|position|offset)$/

// Build a ScrollSpy config based on bindings (if any)
// Arguments and modifiers take precedence over passed value config object
/* istanbul ignore next: not easy to test */
const parseBindings = bindings => /* istanbul ignore next: not easy to test */ {
  const config = {}

  // If argument, assume element ID
  if (bindings.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.element = `#${bindings.arg}`
  }

  // Process modifiers
  keys(bindings.modifiers).forEach(mod => {
    if (onlyDigitsRE.test(mod)) {
      // Offset value
      config.offset = toInteger(mod, 0)
    } else if (offsetRE.test(mod)) {
      // Offset method
      config.method = mod
    }
  })

  // Process value
  if (isString(bindings.value)) {
    // Value is a CSS ID or selector
    config.element = bindings.value
  } else if (isNumber(bindings.value)) {
    // Value is offset
    config.offset = Math.round(bindings.value)
  } else if (isObject(bindings.value)) {
    // Value is config object
    // Filter the object based on our supported config options
    keys(bindings.value)
      .filter(k => !!ScrollSpy.DefaultType[k])
      .forEach(k => {
        config[k] = bindings.value[k]
      })
  }

  return config
}

// Add or update ScrollSpy on our element
const applyScrollspy = (el, bindings, vnode) => /* istanbul ignore next: not easy to test */ {
  if (!isBrowser) {
    /* istanbul ignore next */
    return
  }
  const config = parseBindings(bindings)
  if (el[BV_SCROLLSPY]) {
    el[BV_SCROLLSPY].updateConfig(config, vnode.context.$root)
  } else {
    el[BV_SCROLLSPY] = new ScrollSpy(el, config, vnode.context.$root)
  }
}

// Remove ScrollSpy on our element
/* istanbul ignore next: not easy to test */
const removeScrollspy = el => /* istanbul ignore next: not easy to test */ {
  if (el[BV_SCROLLSPY]) {
    el[BV_SCROLLSPY].dispose()
    el[BV_SCROLLSPY] = null
    delete el[BV_SCROLLSPY]
  }
}

/*
 * Export our directive
 */
export const VBScrollspy = {
  bind(el, bindings, vnode) /* istanbul ignore next: not easy to test */ {
    applyScrollspy(el, bindings, vnode)
  },
  inserted(el, bindings, vnode) /* istanbul ignore next: not easy to test */ {
    applyScrollspy(el, bindings, vnode)
  },
  update(el, bindings, vnode) /* istanbul ignore next: not easy to test */ {
    if (bindings.value !== bindings.oldValue) {
      applyScrollspy(el, bindings, vnode)
    }
  },
  componentUpdated(el, bindings, vnode) /* istanbul ignore next: not easy to test */ {
    if (bindings.value !== bindings.oldValue) {
      applyScrollspy(el, bindings, vnode)
    }
  },
  unbind(el) /* istanbul ignore next: not easy to test */ {
    removeScrollspy(el)
  }
}
