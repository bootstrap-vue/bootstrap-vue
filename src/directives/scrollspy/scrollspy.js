import { IS_BROWSER } from '../../constants/env'
import { isNumber, isObject, isString } from '../../utils/inspect'
import { mathRound } from '../../utils/math'
import { toInteger } from '../../utils/number'
import { keys } from '../../utils/object'
import { BVScrollspy } from './helpers/bv-scrollspy.class'

// Key we use to store our instance
const BV_SCROLLSPY = '__BV_Scrollspy__'

// Pre-compiled regular expressions
const onlyDigitsRE = /^\d+$/
const offsetRE = /^(auto|position|offset)$/

// Build a Scrollspy config based on bindings (if any)
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
    config.offset = mathRound(bindings.value)
  } else if (isObject(bindings.value)) {
    // Value is config object
    // Filter the object based on our supported config options
    keys(bindings.value)
      .filter(k => !!BVScrollspy.DefaultType[k])
      .forEach(k => {
        config[k] = bindings.value[k]
      })
  }

  return config
}

// Add or update Scrollspy on our element
const applyScrollspy = (el, bindings, vnode) => /* istanbul ignore next: not easy to test */ {
  if (!IS_BROWSER) {
    /* istanbul ignore next */
    return
  }
  const config = parseBindings(bindings)
  if (el[BV_SCROLLSPY]) {
    el[BV_SCROLLSPY].updateConfig(config, vnode.context.$root)
  } else {
    el[BV_SCROLLSPY] = new BVScrollspy(el, config, vnode.context.$root)
  }
}

// Remove Scrollspy on our element
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
  /* istanbul ignore next: not easy to test */
  bind(el, bindings, vnode) {
    applyScrollspy(el, bindings, vnode)
  },
  /* istanbul ignore next: not easy to test */
  inserted(el, bindings, vnode) {
    applyScrollspy(el, bindings, vnode)
  },
  /* istanbul ignore next: not easy to test */
  update(el, bindings, vnode) {
    if (bindings.value !== bindings.oldValue) {
      applyScrollspy(el, bindings, vnode)
    }
  },
  /* istanbul ignore next: not easy to test */
  componentUpdated(el, bindings, vnode) {
    if (bindings.value !== bindings.oldValue) {
      applyScrollspy(el, bindings, vnode)
    }
  },
  /* istanbul ignore next: not easy to test */
  unbind(el) {
    removeScrollspy(el)
  }
}
