import { keys } from '../utils/object'

const allListenTypes = {hover: true, click: true, focus: true}

const bindTargets = (vnode, binding, listenTypes, fn) => {
  const targets = keys(binding.modifiers || {})
    .filter(t => !allListenTypes[t])

  if (binding.value) {
    targets.push(binding.value)
  }

  const listener = () => {
    fn({targets, vnode})
  }

  keys(allListenTypes).forEach(type => {
    if (listenTypes[type] || binding.modifiers[type]) {
      vnode.elm.addEventListener(type, listener)
      const boundListeners = vnode.elm['BV_boundEventListeners'] || {}
      boundListeners[type] = boundListeners[type] || []
      boundListeners[type].push(listener)
      vnode.elm['BV_boundEventListeners'] = boundListeners
    }
  })

  // Return the list of targets
  return targets
}

const unbindTargets = (vnode, binding, listenTypes) => {
  const targets = keys(binding.modifiers || {})
    .filter(t => !allListenTypes[t])

  if (binding.value) {
    targets.push(binding.value)
  }

  keys(allListenTypes).forEach(type => {
    if (listenTypes[type] || binding.modifiers[type]) {
      const boundListeners = vnode.elm['BV_boundEventListeners'] && vnode.elm['BV_boundEventListeners'][type]
      if (boundListeners) {
        boundListeners.forEach(boundListener => vnode.elm.removeEventListener(type, boundListener))
        delete vnode.elm['BV_boundEventListeners'][type]
      }
    }
  })

  // Return the list of targets
  return targets
}

export {
  bindTargets,
  unbindTargets,
}

export default bindTargets;
