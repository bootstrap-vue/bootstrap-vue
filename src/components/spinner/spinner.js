import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'
import { normalizeSlot } from '../../utils/normalize-slot'

const NAME = 'BSpinner'

// @vue/component
export const BSpinner = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props: {
    type: {
      type: String,
      default: 'border' // SCSS currently supports 'border' or 'grow'
    },
    label: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: () => getComponentConfig(NAME, 'variant')
    },
    small: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'status'
    },
    tag: {
      type: String,
      default: 'span'
    }
  },
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}
    let label = normalizeSlot('label', {}, $scopedSlots, $slots) || props.label
    if (label) {
      label = h('span', { staticClass: 'sr-only' }, label)
    }
    return h(
      props.tag,
      mergeData(data, {
        attrs: {
          role: label ? props.role || 'status' : null,
          'aria-hidden': label ? null : 'true'
        },
        class: {
          [`spinner-${props.type}`]: Boolean(props.type),
          [`spinner-${props.type}-sm`]: props.small,
          [`text-${props.variant}`]: Boolean(props.variant)
        }
      }),
      [label || h(false)]
    )
  }
})

export default BSpinner
