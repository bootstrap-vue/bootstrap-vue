import { isVue3 } from '../vue'

export const getInstanceFromDirective = (vnode, bindings) =>
  isVue3 ? bindings.instance : vnode.context
