import Vue, { mergeData } from '../../utils/vue'
import { normalizeSlot } from '../../utils/normalize-slot'

const NAME = 'BSkeletonWrapper'

// @vue/component
export const BSkeletonWrapper = /*#__PURE__*/ Vue.extend({
  name: NAME,
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

    return normalizeSlot('default', slotScope, $scopedSlots, $slots) || h()
  }
})
