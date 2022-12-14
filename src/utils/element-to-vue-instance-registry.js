import { isVue3 } from '../vue'

let registry = null
if (isVue3) {
  registry = new WeakMap()
}

export const registerElementToInstance = (element, instance) => {
  if (!isVue3) {
    return
  }

  registry.set(element, instance)
}

export const removeElementToInstance = element => {
  if (!isVue3) {
    return
  }

  registry.delete(element)
}

export const getInstanceFromElement = element => {
  if (!isVue3) {
    return element.__vue__
  }

  let currentElement = element

  while (currentElement) {
    if (registry.has(currentElement)) {
      /* istanbul ignore next */
      return registry.get(currentElement)
    }
    currentElement = currentElement.parentNode
  }

  return null
}
