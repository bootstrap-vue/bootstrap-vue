/*
 * ScrollSpy directive v-b-scrollspy
 */

import ScrollSpy from './scrollspy.class'
import { keys } from '../../utils/object'
import { isServer } from '../../utils/env'

// Key we use to store our Instance
const BVSS = '__BV_ScrollSpy__'

// Generate config from bindings
function makeConfig(binding) /* istanbul ignore next: not easy to test */ {
  const config = {}

  // If Argument, assume element ID
  if (binding.arg) {
    // Element ID specified as arg. We must pre-pend #
    config.element = '#' + binding.arg
  }

  // Process modifiers
  keys(binding.modifiers).forEach(mod => {
    if (/^\d+$/.test(mod)) {
      // Offest value
      config.offset = parseInt(mod, 10)
    } else if (/^(auto|position|offset)$/.test(mod)) {
      // Offset method
      config.method = mod
    }
  })

  // Process value
  if (typeof binding.value === 'string') {
    // Value is a CSS ID or selector
    config.element = binding.value
  } else if (typeof binding.value === 'number') {
    // Value is offset
    config.offset = Math.round(binding.value)
  } else if (typeof binding.value === 'object') {
    // Value is config object
    // Filter the object based on our supported config options
    keys(binding.value)
      .filter(k => Boolean(ScrollSpy.DefaultType[k]))
      .forEach(k => {
        config[k] = binding.value[k]
      })
  }

  return config
}

function addBVSS(el, binding, vnode) /* istanbul ignore next: not easy to test */ {
  if (isServer) {
    return
  }
  const cfg = makeConfig(binding)
  if (!el[BVSS]) {
    el[BVSS] = new ScrollSpy(el, cfg, vnode.context.$root)
  } else {
    el[BVSS].updateConfig(cfg, vnode.context.$root)
  }
  return el[BVSS]
}

function removeBVSS(el) /* istanbul ignore next: not easy to test */ {
  if (el[BVSS]) {
    el[BVSS].dispose()
    el[BVSS] = null
  }
}

/*
 * Export our directive
 */

export default {
  bind(el, binding, vnode) /* istanbul ignore next: not easy to test */ {
    addBVSS(el, binding, vnode)
  },
  inserted(el, binding, vnode) /* istanbul ignore next: not easy to test */ {
    addBVSS(el, binding, vnode)
  },
  update(el, binding, vnode) /* istanbul ignore next: not easy to test */ {
    addBVSS(el, binding, vnode)
  },
  componentUpdated(el, binding, vnode) /* istanbul ignore next: not easy to test */ {
    addBVSS(el, binding, vnode)
  },
  unbind(el) /* istanbul ignore next: not easy to test */ {
    if (isServer) {
      return
    }
    // Remove scroll event listener on scrollElId
    removeBVSS(el)
  }
}
