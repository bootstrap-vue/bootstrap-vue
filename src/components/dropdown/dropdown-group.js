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
  ariaDescribedby: {
    type: String,
    default: null
  }
}

// @vue/component
export default Vue.extend({
  name: 'BDropdownGroup',
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}
    let header
    let headerId = null
    if (hasNormalizedSlot('header', $scopedSlots, $slots) || this.header) {
      headerId = this.id ? `_bv_${this.id}_dd_header` : null
      header = h(
        props.headerTag,
        {
          staticClass: 'dropdown-header',
          attrs: { id: headerId }
        },
        normalizeSlot('header', {}, $scopedSlots, $slots) || this.header
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
