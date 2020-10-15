import Vue from '../../vue'
import { NAME_PROGRESS } from '../../constants/components'
import { getComponentConfig } from '../../utils/config'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BProgressBar } from './progress-bar'

// @vue/component
export const BProgress = /*#__PURE__*/ Vue.extend({
  name: NAME_PROGRESS,
  mixins: [normalizeSlotMixin],
  provide() {
    return { bvProgress: this }
  },
  props: {
    // These props can be inherited via the child b-progress-bar(s)
    variant: {
      type: String,
      default: () => getComponentConfig(NAME_PROGRESS, 'variant')
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
      type: String
      // default: null
    },
    precision: {
      type: [Number, String],
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
      type: [Number, String],
      default: 100
    },
    // This prop is not inherited by child b-progress-bar(s)
    value: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    progressHeight() {
      return { height: this.height || null }
    }
  },
  render(h) {
    let childNodes = this.normalizeSlot()
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
