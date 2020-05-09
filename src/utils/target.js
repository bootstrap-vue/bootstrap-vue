import { concat } from './array'
import { eventOn, eventOff } from './events'
import { isString } from './inspect'
import { keys } from './object'

const allListenTypes = { hover: true, click: true, focus: true }

const BVBoundListeners = '__BV_boundEventListeners__'

const RX_SPLIT_SEPARATOR = /\s+/

export const getTargets = ({ modifiers, arg, value }) => {
  value = isString(value) ? value.split(RX_SPLIT_SEPARATOR) : value

  const targets = keys(modifiers || {}).filter(t => !allListenTypes[t])

  // Add ID from `arg` (if provided), and support value
  // as a single string ID or an array of string IDs
  // If `value` is not an array or string, then it gets filtered out
  concat(arg, value).forEach(t => isString(t) && targets.push(t))

  // Return only unique and truthy target IDs
  return targets.filter((t, index, arr) => t && arr.indexOf(t) === index)
}

export const bindTargets = (vnode, binding, listenTypes, fn) => {
  const targets = getTargets(binding)

  const listener = evt => {
    if (!evt.defaultPrevented) {
      fn({ targets, vnode, evt })
    }
  }

  keys(allListenTypes).forEach(type => {
    if (listenTypes[type] || binding.modifiers[type]) {
      eventOn(vnode.elm, type, listener)
      const boundListeners = vnode.elm[BVBoundListeners] || {}
      boundListeners[type] = boundListeners[type] || []
      boundListeners[type].push(listener)
      vnode.elm[BVBoundListeners] = boundListeners
    }
  })

  // Return the list of targets
  return targets
}

export const unbindTargets = (vnode, binding, listenTypes) => {
  keys(allListenTypes).forEach(type => {
    if (listenTypes[type] || binding.modifiers[type]) {
      const boundListeners = vnode.elm[BVBoundListeners] && vnode.elm[BVBoundListeners][type]
      if (boundListeners) {
        boundListeners.forEach(listener => eventOff(vnode.elm, type, listener))
        delete vnode.elm[BVBoundListeners][type]
      }
    }
  })
}

export default bindTargets
