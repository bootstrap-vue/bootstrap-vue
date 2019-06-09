import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'

export const props = {
  id: {
    type: String,
    default: null
  },
  header: {
    type: String,
    default: null
  },
  headerTag: {
    type: String,
    default: 'header'
  },
  headerVariant: {
    type: String,
    default: null
  },
  headerClasses: {
    type: [String, Array, Object],
    default: null
  },
  ariaDescribedby: {
    type: String,
    default: null
  }
}

// @vue/component
export const BDropdownGroup = /*#__PURE__*/ Vue.extend({
  name: 'BDropdownGroup',
  functional: true,
  inheritAttrs: false,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}
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
      .filter(Boolean)
      .join(' ')
      .trim()

    return h('li', [
      header || h(false),
      h(
        'ul',
        mergeData(data, {
          staticClass: 'list-unstyled',
          attrs: {
            id: props.id || null,
            'aria-describedby': adb || null
          }
        }),
        normalizeSlot('default', {}, $scopedSlots, $slots)
      )
    ])
  }
})

export default BDropdownGroup
