import {
  CLASS_NAME_DROPDOWN_HEADER,
  CLASS_NAME_LIST_UNSTYLED,
  CLASS_NAME_TEXT
} from '../../constants/class-names'
import { NAME_DROPDOWN_GROUP } from '../../constants/components'
import { ROLE_GROUP, ROLE_HEADING, ROLE_PRESENTATION } from '../../constants/roles'
import Vue, { mergeData } from '../../utils/vue'
import identity from '../../utils/identity'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import { omit } from '../../utils/object'
import { suffixClass } from '../../utils/string'

// --- Props ---
export const props = {
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
}

// --- Main component ---
// @vue/component
export const BDropdownGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_DROPDOWN_GROUP,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}
    const slotScope = {}

    let headerId = null
    let $header = h()
    if (hasNormalizedSlot('header', $scopedSlots, $slots) || props.header) {
      headerId = props.id ? `_bv_${props.id}_group_dd_header` : null
      $header = h(
        props.headerTag,
        {
          staticClass: CLASS_NAME_DROPDOWN_HEADER,
          class: [
            props.headerClasses,
            { [suffixClass(CLASS_NAME_TEXT, props.variant)]: props.variant }
          ],
          attrs: {
            id: headerId,
            role: ROLE_HEADING
          }
        },
        normalizeSlot('header', slotScope, $scopedSlots, $slots) || props.header
      )
    }

    const ariaDescribedBy = [headerId, props.ariaDescribedBy]
      .filter(identity)
      .join(' ')
      .trim()

    return h('li', mergeData(omit(data, ['attrs']), { attrs: { role: ROLE_PRESENTATION } }), [
      $header,
      h(
        'ul',
        {
          staticClass: CLASS_NAME_LIST_UNSTYLED,
          attrs: {
            ...data.attrs,
            id: props.id || null,
            role: ROLE_GROUP,
            'aria-describedby': ariaDescribedBy || null
          }
        },
        normalizeSlot('default', slotScope, $scopedSlots, $slots)
      )
    ])
  }
})
