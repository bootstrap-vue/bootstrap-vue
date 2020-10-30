import Vue, { mergeData } from '../../vue'
import { NAME_DROPDOWN_GROUP } from '../../constants/components'
import { SLOT_NAME_DEFAULT, SLOT_NAME_HEADER } from '../../constants/slot-names'
import { makePropsConfigurable } from '../../utils/config'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import identity from '../../utils/identity'

export const props = makePropsConfigurable(
  {
    id: {
      type: String
      // default: null
    },
    header: {
      type: String
      // default: null
    },
    headerTag: {
      type: String,
      default: 'header'
    },
    headerVariant: {
      type: String
      // default: null
    },
    headerClasses: {
      type: [String, Array, Object]
      // default: null
    },
    ariaDescribedby: {
      type: String
      // default: null
    }
  },
  NAME_DROPDOWN_GROUP
)

// @vue/component
export const BDropdownGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_GROUP,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}
    const $attrs = data.attrs || {}
    data.attrs = {}
    let header
    let headerId = null

    if (hasNormalizedSlot(SLOT_NAME_HEADER, $scopedSlots, $slots) || props.header) {
      headerId = props.id ? `_bv_${props.id}_group_dd_header` : null
      header = h(
        props.headerTag,
        {
          staticClass: 'dropdown-header',
          class: [props.headerClasses, { [`text-${props.variant}`]: props.variant }],
          attrs: {
            id: headerId,
            role: 'heading'
          }
        },
        normalizeSlot(SLOT_NAME_HEADER, {}, $scopedSlots, $slots) || props.header
      )
    }

    const adb = [headerId, props.ariaDescribedBy]
      .filter(identity)
      .join(' ')
      .trim()

    return h('li', mergeData(data, { attrs: { role: 'presentation' } }), [
      header || h(),
      h(
        'ul',
        {
          staticClass: 'list-unstyled',
          attrs: {
            ...$attrs,
            id: props.id || null,
            role: 'group',
            'aria-describedby': adb || null
          }
        },
        normalizeSlot(SLOT_NAME_DEFAULT, {}, $scopedSlots, $slots)
      )
    ])
  }
})
