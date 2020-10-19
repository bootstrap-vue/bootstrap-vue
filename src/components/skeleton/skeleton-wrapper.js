import Vue, { mergeData } from '../../vue'
import { NAME_SKELETON_WRAPPER } from '../../constants/components'
import { SLOT_NAME_DEFAULT } from '../../constants/slot-names'
import { normalizeSlot } from '../../utils/normalize-slot'

// @vue/component
export const BSkeletonWrapper = /*#__PURE__*/ Vue.extend({
  name: NAME_SKELETON_WRAPPER,
  functional: true,
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  render(h, { data, props, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}
    const slotScope = {}

    if (props.loading) {
      return h(
        'div',
        mergeData(data, {
          attrs: {
            role: 'alert',
            'aria-live': 'polite',
            'aria-busy': true
          },
          staticClass: 'b-skeleton-wrapper',
          key: 'loading'
        }),
        [normalizeSlot('loading', slotScope, $scopedSlots, $slots) || h()]
      )
    }

    return normalizeSlot(SLOT_NAME_DEFAULT, slotScope, $scopedSlots, $slots) || h()
  }
})
