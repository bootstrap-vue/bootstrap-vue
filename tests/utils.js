// --- Utils for testing ---

export const wrapWithMethods = (Component, methods) => ({
  compatConfig: {
    MODE: 3,
    INSTANCE_LISTENERS: false,
    INSTANCE_SCOPED_SLOTS: false
  },
  inheritAttrs: false,
  components: { wrappedComponent: Component },
  methods,
  template: `
    <wrapped-component v-bind="$attrs">
      <template v-for="(_, name) in $slots" :slot="name" slot-scope="slotData"><slot :name="name" v-bind="slotData" /></template>
    </wrapped-component>
  `
})

export const waitNT = ctx => new Promise(resolve => ctx.$nextTick(resolve))
export const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve))
