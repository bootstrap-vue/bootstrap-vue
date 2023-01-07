import { isVue3 } from '../vue'

export function safeVueInstance(target) {
  if (!isVue3) {
    return target
  }

  return new Proxy(target, {
    get(target, prop) {
      return prop in target ? target[prop] : undefined
    }
  })
}
