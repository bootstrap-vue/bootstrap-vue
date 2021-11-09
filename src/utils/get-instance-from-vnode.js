import { isVue3 } from '../vue'

export const getInstanceFromVNode = vnode =>
  isVue3 ? vnode.__vueParentComponent.ctx : vnode.__vue__
