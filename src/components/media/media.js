import { SLOT_NAME_DEFAULT } from '../../constants/slot-names'
import Vue, { mergeData } from '../../utils/vue'
import { normalizeSlot } from '../../utils/normalize-slot'
import { BMediaBody } from './media-body'
import { BMediaAside } from './media-aside'

// --- Props ---

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  rightAlign: {
    type: Boolean,
    default: false
  },
  verticalAlign: {
    type: String,
    default: 'top'
  },
  noBody: {
    type: Boolean,
    default: false
  }
}

// --- Main component ---
// @vue/component
export const BMedia = /*#__PURE__*/ Vue.extend({
  name: 'BMedia',
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots, children }) {
    const $childNodes = props.noBody ? children : []

    if (!props.noBody) {
      const $slots = slots()
      const $scopedSlots = scopedSlots || {}
      const slotScope = {}

      const $aside = normalizeSlot('aside', slotScope, $scopedSlots, $slots)
      const $default = normalizeSlot(SLOT_NAME_DEFAULT, slotScope, $scopedSlots, $slots)

      if ($aside && !props.rightAlign) {
        $childNodes.push(
          h(
            BMediaAside,
            { staticClass: 'mr-3', props: { verticalAlign: props.verticalAlign } },
            $aside
          )
        )
      }

      $childNodes.push(h(BMediaBody, $default))

      if ($aside && props.rightAlign) {
        $childNodes.push(
          h(
            BMediaAside,
            { staticClass: 'ml-3', props: { verticalAlign: props.verticalAlign } },
            $aside
          )
        )
      }
    }

    return h(props.tag, mergeData(data, { staticClass: 'media' }), $childNodes)
  }
})
