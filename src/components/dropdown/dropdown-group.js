import { extend, mergeData } from '../../vue'
import { NAME_DROPDOWN_GROUP } from '../../constants/components'
import { PROP_TYPE_ARRAY_OBJECT_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { SLOT_NAME_DEFAULT, SLOT_NAME_HEADER } from '../../constants/slots'
import { isTag } from '../../utils/dom'
import { identity } from '../../utils/identity'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import { omit } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    ariaDescribedby: makeProp(PROP_TYPE_STRING),
    header: makeProp(PROP_TYPE_STRING),
    headerClasses: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    headerTag: makeProp(PROP_TYPE_STRING, 'header'),
    headerVariant: makeProp(PROP_TYPE_STRING),
    id: makeProp(PROP_TYPE_STRING)
  },
  NAME_DROPDOWN_GROUP
)

// --- Main component ---

// @vue/component
export const BDropdownGroup = /*#__PURE__*/ extend({
  name: NAME_DROPDOWN_GROUP,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const { id, variant, header, headerTag } = props
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}
    const slotScope = {}
    const headerId = id ? `_bv_${id}_group_dd_header` : null

    let $header = h()
    if (hasNormalizedSlot(SLOT_NAME_HEADER, $scopedSlots, $slots) || header) {
      $header = h(
        headerTag,
        {
          staticClass: 'dropdown-header',
          class: [props.headerClasses, { [`text-${variant}`]: variant }],
          attrs: {
            id: headerId,
            role: isTag(headerTag, 'header') ? null : 'heading'
          }
        },
        normalizeSlot(SLOT_NAME_HEADER, slotScope, $scopedSlots, $slots) || header
      )
    }

    return h('li', mergeData(omit(data, ['attrs']), { attrs: { role: 'presentation' } }), [
      $header,
      h(
        'ul',
        {
          staticClass: 'list-unstyled',
          attrs: {
            ...(data.attrs || {}),
            id,
            role: 'group',
            'aria-describedby':
              [headerId, props.ariaDescribedBy]
                .filter(identity)
                .join(' ')
                .trim() || null
          }
        },
        normalizeSlot(SLOT_NAME_DEFAULT, slotScope, $scopedSlots, $slots)
      )
    ])
  }
})
