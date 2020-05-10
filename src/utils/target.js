import { concat } from './array'
import { hasClass } from './dom'
import { eventOn, eventOff } from './events'
import { isString } from './inspect'
import { keys } from './object'
import KeyCodes from './key-codes'

const { ENTER, SPACE } = KeyCodes

const keyDownEvents = [ENTER, SPACE]

const standardTags = ['BUTTON', 'A']

const allListenTypes = { hover: true, click: true, focus: true, keydown: true }

const BVBoundListeners = '__BV_boundEventListeners__'

const RX_SPLIT_SEPARATOR = /\s+/

export const getTargets = ({ modifiers, arg, value }) => {
  // Any modifiers are condisered target IDs
  const targets = keys(modifiers || {}).filter(t => !allListenTypes[t])

  // If value is a string, split out individual targets (if space delimited)
  value = isString(value) ? value.split(RX_SPLIT_SEPARATOR) : value

  // Add ID from `arg` (if provided), and support value
  // as a single string ID or an array of string IDs
  // If `value` is not an array or string, then it gets filtered out
  concat(arg, value).forEach(t => isString(t) && targets.push(t))

  // Return only unique and truthy target IDs
  return targets.filter((t, index, arr) => t && arr.indexOf(t) === index)
}

export const bindTargets = (vnode, binding, listenTypes = [], fn) => {
  const targets = getTargets(binding)

  // To trigger adding ENTER/SPACE handlers
  const needsKeyDown = !arrayIncludes(standardTags, vnode.elm.tagName)
  listenTypes = needsKeyDown ? listenTypes.push('keydown') : listenTypes
 
  const listener = evt => {
    const el = evt.currentTarget
    const ignore = evt.type === 'keydown' && !arrayIncludes(keyDownEvents, evt.keyCode)
    if (!evt.defaultPrevented && !ignore && !el.disabled && !hasClass(el, 'disabled')) {
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
  const needsKeyDown = !arrayIncludes(standardTags, vnode.elm.tagName)
  listenTypes = needsKeyDown ? listenTypes.push('keydown') : listenTypes

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
