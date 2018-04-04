import { keys } from '../utils/object'

const allListenTypes = {hover: true, click: true, focus: true}

const BVBoundListeners = '__BV_boundEventListeners__'

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
      const boundListeners = vnode.elm[BVBoundListeners] || {}
      boundListeners[type] = boundListeners[type] || []
      boundListeners[type].push(listener)
      vnode.elm[BVBoundListeners] = boundListeners
    }
  })

  // Return the list of targets
  return targets
}

const unbindTargets = (vnode, binding, listenTypes) => {
  keys(allListenTypes).forEach(type => {
    if (listenTypes[type] || binding.modifiers[type]) {
      const boundListeners = vnode.elm[BVBoundListeners] && vnode.elm[BVBoundListeners][type]
      if (boundListeners) {
        boundListeners.forEach(listener => vnode.elm.removeEventListener(type, listener))
        delete vnode.elm[BVBoundListeners][type]
      }
    }
  })
}

export {
  bindTargets,
  unbindTargets
}

export default bindTargets
