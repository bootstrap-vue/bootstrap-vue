import { keys } from '../utils/object'

const allListenTypes = {hover: true, click: true, focus: true}

export default function targets (vnode, binding, listenTypes, fn) {
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
    }
  })

  // Return the list of targets
  return targets
}
