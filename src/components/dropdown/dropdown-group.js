import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import identity from '../../utils/identity'

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

// @vue/component
export const BDropdownGroup = /*#__PURE__*/ Vue.extend({
  name: 'BDropdownGroup',
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}
    const $attrs = data.attrs || {}
    data.attrs = {}
    let header
    let headerId = null

    if (hasNormalizedSlot('header', $scopedSlots, $slots) || props.header) {
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
        normalizeSlot('header', {}, $scopedSlots, $slots) || props.header
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
        normalizeSlot('default', {}, $scopedSlots, $slots)
      )
    ])
  }
})
