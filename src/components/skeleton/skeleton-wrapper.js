import Vue from '../../utils/vue'
import { normalizeSlot } from '../../utils/normalize-slot'
import { mergeData } from 'vue-functional-data-merge'

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
    const $loading = h(
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
      [normalizeSlot('loading', {}, $scopedSlots, $slots) || h()]
    )
    const $default = normalizeSlot('default', $scopedSlots, $slots) || h()

    return props.loading ? $loading : $default
  }
})
