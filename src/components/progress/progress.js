import Vue from 'vue'
import BProgressBar from './progress-bar'

// @vue/component
export default Vue.extend({
  name: 'BProgress',
  provide() {
    return { bvProgress: this }
  },
  props: {
    // These props can be inherited via the child b-progress-bar(s)
    variant: {
      type: String,
      default: null
    },
    striped: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: null
    },
    precision: {
      type: Number,
      default: 0
    },
    showProgress: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 100
    },
    // This prop is not inherited by child b-progress-bar(s)
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    progressHeight() {
      return { height: this.height || null }
    }
  },
  render(h) {
    let childNodes = this.$slots.default
    if (!childNodes) {
      childNodes = h(BProgressBar, {
        props: {
          value: this.value,
          max: this.max,
          precision: this.precision,
          variant: this.variant,
          animated: this.animated,
          striped: this.striped,
          showProgress: this.showProgress,
          showValue: this.showValue
        }
      })
    }
    return h('div', { class: ['progress'], style: this.progressHeight }, [childNodes])
  }
})
