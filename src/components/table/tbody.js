import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  tbodyTransitionProps: {
    type: Object
    // default: undefined
  },
  tbodyTransitionHandlers: {
    type: Object
    // default: undefined
  }
}

// @vue/component
export const BTbody = /*#__PURE__*/ Vue.extend({
  name: 'BTbody',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide() {
    return {
      bvTableTbody: this
    }
  },
  inject: {
    bvTable: {
      default: null
    }
  },
  props,
  computed: {
    isTransitionGroup() {
      return this.tbodyTransitionProps || this.tbodyTransitionHandlers
    },
    tbodyAttrs() {
      return { role: 'rowgroup', ...this.$attrs }
    },
    tbodyProps() {
      return this.tbodyTransitionProps ? { ...this.tbodyTransitionProps, tag: 'tbody' } : {}
    },
    tbodyListeners() {
      const handlers = this.tbodyTransitionHandlers || {}
      return { ...this.$listeners, ...handlers }
    }
  },
  render(h) {
    return h(
      this.isTransitionGroup ? 'transition-group' : 'tbody',
      {
        props: this.tbodyProps,
        attrs: this.tbodyAttrs,
        // Pass down any listeners
        on: this.tbodyListeners
      },
      this.normalizeSlot('default', {})
    )
  }
})
