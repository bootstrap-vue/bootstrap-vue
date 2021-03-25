import { Vue } from '../../vue'
import { NAME_ASPECT } from '../../constants/components'
import { PROP_TYPE_NUMBER_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { RX_ASPECT, RX_ASPECT_SEPARATOR } from '../../constants/regex'
import { mathAbs } from '../../utils/math'
import { toFloat } from '../../utils/number'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Constants ---

const CLASS_NAME = 'b-aspect'

// --- Props ---

export const props = makePropsConfigurable(
  {
    // Accepts a number (i.e. `16 / 9`, `1`, `4 / 3`)
    // Or a string (i.e. '16/9', '16:9', '4:3' '1:1')
    aspect: makeProp(PROP_TYPE_NUMBER_STRING, '1:1'),
    tag: makeProp(PROP_TYPE_STRING, 'div')
  },
  NAME_ASPECT
)

// --- Main component ---

// @vue/component
export const BAspect = /*#__PURE__*/ Vue.extend({
  name: NAME_ASPECT,
  mixins: [normalizeSlotMixin],
  props,
  computed: {
    padding() {
      const { aspect } = this
      let ratio = 1
      if (RX_ASPECT.test(aspect)) {
        // Width and/or Height can be a decimal value below `1`, so
        // we only fallback to `1` if the value is `0` or `NaN`
        const [width, height] = aspect.split(RX_ASPECT_SEPARATOR).map(v => toFloat(v) || 1)
        ratio = width / height
      } else {
        ratio = toFloat(aspect) || 1
      }
      return `${100 / mathAbs(ratio)}%`
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
      this.normalizeSlot()
    )

    return h(this.tag, { staticClass: `${CLASS_NAME} d-flex` }, [$sizer, $content])
  }
})
