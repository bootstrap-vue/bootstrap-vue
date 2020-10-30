import Vue, { mergeData } from '../../vue'
import { NAME_MEDIA } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { SLOT_NAME_DEFAULT } from '../../constants/slot-names'
import { normalizeSlot } from '../../utils/normalize-slot'
import { BMediaAside } from './media-aside'
import { BMediaBody } from './media-body'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: {
      type: String,
      default: 'div'
    },
    noBody: {
      type: Boolean,
      default: false
    },
    rightAlign: {
      type: Boolean,
      default: false
    },
    verticalAlign: {
      type: String,
      default: 'top'
    }
  },
  NAME_MEDIA
)

// --- Main component ---
// @vue/component
export const BMedia = /*#__PURE__*/ Vue.extend({
  name: NAME_MEDIA,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots, children }) {
    const { noBody, rightAlign, verticalAlign } = props
    const $children = noBody ? children : []

    if (!noBody) {
      const slotScope = {}
      const $slots = slots()
      const $scopedSlots = scopedSlots || {}

      $children.push(
        h(BMediaBody, normalizeSlot(SLOT_NAME_DEFAULT, slotScope, $scopedSlots, $slots))
      )

      const $aside = normalizeSlot('aside', slotScope, $scopedSlots, $slots)
      if ($aside) {
        $children[rightAlign ? 'push' : 'unshift'](
          h(BMediaAside, { props: { right: rightAlign, verticalAlign } }, $aside)
        )
      }
    }

    return h(props.tag, mergeData(data, { staticClass: 'media' }), $children)
  }
})
