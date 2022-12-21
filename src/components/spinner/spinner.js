import { extend, mergeData } from '../../vue'
import { NAME_SPINNER } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { SLOT_NAME_LABEL } from '../../constants/slots'
import { normalizeSlot } from '../../utils/normalize-slot'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    label: makeProp(PROP_TYPE_STRING),
    role: makeProp(PROP_TYPE_STRING, 'status'),
    small: makeProp(PROP_TYPE_BOOLEAN, false),
    tag: makeProp(PROP_TYPE_STRING, 'span'),
    type: makeProp(PROP_TYPE_STRING, 'border'),
    variant: makeProp(PROP_TYPE_STRING)
  },
  NAME_SPINNER
)

// --- Main component ---

// @vue/component
export const BSpinner = /*#__PURE__*/ extend({
  name: NAME_SPINNER,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}

    let $label = normalizeSlot(SLOT_NAME_LABEL, {}, $scopedSlots, $slots) || props.label
    if ($label) {
      $label = h('span', { staticClass: 'sr-only' }, $label)
    }

    return h(
      props.tag,
      mergeData(data, {
        attrs: {
          role: $label ? props.role || 'status' : null,
          'aria-hidden': $label ? null : 'true'
        },
        class: {
          [`spinner-${props.type}`]: props.type,
          [`spinner-${props.type}-sm`]: props.small,
          [`text-${props.variant}`]: props.variant
        }
      }),
      [$label || h()]
    )
  }
})
