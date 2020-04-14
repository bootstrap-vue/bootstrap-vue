import Vue from '../../utils/vue'
import { toFloat } from '../../utils/number'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// --- Constants ---
const NAME = 'BAspect'
const CLASS_NAME = 'b-aspect'

const RX_ASPECT = /^\d+(\.\d*)?[/:]\d+(\.\d*)?$/
const RX_SEPARATOR = /[/:]/

// --- Main Component ---
export const BAspect = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [normalizeSlotMixin],
  props: {
    aspect: {
      // Accepts a number (i.e. `16 / 9`, `1`, `4 / 3`)
      // Or a string (i.e. '16/9', '16:9', '4:3' '1:1')
      type: [Number, String],
      default: '1:1'
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    padding() {
      const aspect = this.aspect
      let ratio = 1
      if (RX_ASPECT.test(aspect)) {
        // Width and/or Height can be a decimal value below `1`, so
        // we only fallback to `1` if the value is `0` or `NaN`
        const [width, height] = aspect.split(RX_SEPARATOR).map(v => toFloat(v) || 1)
        ratio = width / height
      } else {
        ratio = toFloat(aspect) || 1
      }
      return `${100 / Math.abs(ratio)}%`
    }
  },
  render(h) {
    const $sizer = h('div', {
      staticClass: `${CLASS_NAME}-sizer flex-grow-1`,
      style: { paddingBottom: this.padding, height: 0 }
    })
    const $content = h(
      'div',
      {
        staticClass: `${CLASS_NAME}-content flex-grow-1 w-100 mw-100`,
        style: { marginLeft: '-100%' }
      },
      [this.normalizeSlot('default')]
    )
    return h(this.tag, { staticClass: `${CLASS_NAME} d-flex` }, [$sizer, $content])
  }
})
