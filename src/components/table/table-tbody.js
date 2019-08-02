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
export const BTableTbody = /*#__PURE__*/ Vue.extend({
  name: 'BTableTbody',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide() /* istanbul ignore next: until tests are written */ {
    return {
      bvTableTbody: this
    }
  },
  inject: {
    bvTable: {
      default: null
    }
  },
  props: props,
  computed: {
    isTransitionGroup() {
      return this.tbodyTransitionProps || this.tbodyTransitionHandlers
    },
    tbodyAttrs() /* istanbul ignore next: until tests are written */ {
      return { role: 'rowgroup', ...this.$attrs }
    },
    tbodyProps() {
      return this.tbodyTransitionProps ? { ...this.tbodyTransitionProps, tag: 'tbody' } : {}
    },
    tbodyListeners() {
      const handlers = this.tbodyTransitionHandlers || {}
      return { this.$listeners, ...handlers }
    }
  },
  render(h) /* istanbul ignore next: until tests are written */ {
    return h(
      this.isTransitionGroup ? 'transition-group' : 'tbody',
      {
        props: this.tbodyProps,
        attrs: this.theadAttrs,
        // Pass down any listeners
        on: this.tbodyListeners
      },
      this.normalizeSlot('default', {})
    )
  }
})
