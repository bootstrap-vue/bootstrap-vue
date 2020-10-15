import Vue, { mergeData } from '../../vue'
import { NAME_SPINNER } from '../../constants/components'
import { SLOT_NAME_LABEL } from '../../constants/slot-names'
import { getComponentConfig } from '../../utils/config'
import { normalizeSlot } from '../../utils/normalize-slot'

// @vue/component
export const BSpinner = /*#__PURE__*/ Vue.extend({
  name: NAME_SPINNER,
  functional: true,
  props: {
    type: {
      type: String,
      default: 'border' // SCSS currently supports 'border' or 'grow'
    },
    label: {
      type: String
      // default: null
    },
    variant: {
      type: String,
      default: () => getComponentConfig(NAME_SPINNER, 'variant')
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
    let label = normalizeSlot(SLOT_NAME_LABEL, {}, $scopedSlots, $slots) || props.label
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
          [`spinner-${props.type}`]: props.type,
          [`spinner-${props.type}-sm`]: props.small,
          [`text-${props.variant}`]: props.variant
        }
      }),
      [label || h()]
    )
  }
})
