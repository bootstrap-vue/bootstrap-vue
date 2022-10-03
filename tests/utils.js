import { isVue3 } from '../src/vue'

// --- Utils for testing ---

export const wrapWithMethods = (Component, methods) => ({
  inheritAttrs: false,
  components: { wrappedComponent: Component },
  methods,
  template: `
    <wrapped-component v-bind="$attrs" v-on="$listeners">
      <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData"><slot :name="name" v-bind="slotData" /></template>
    </wrapped-component>
  `
})

export const waitNT = ctx => new Promise(resolve => ctx.$nextTick(resolve))
export const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve))

export const getInstanceFromVNode = vnode =>
  isVue3 ? vnode.__vueParentComponent.ctx : vnode.__vue__
