import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import InputGroupPrepend from './input-group-prepend'
import InputGroupAppend from './input-group-append'
import InputGroupText from './input-group-text'
import { htmlOrText } from '../../utils/html'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'

export const props = {
  id: {
    type: String
  },
  size: {
    type: String
  },
  prepend: {
    type: String
  },
  prependHTML: {
    type: String
  },
  append: {
    type: String
  },
  appendHTML: {
    type: String
  },
  tag: {
    type: String,
    default: 'div'
  }
}

// @vue/component
export default Vue.extend({
  name: 'BInputGroup',
  functional: true,
  props: props,
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}

    const childNodes = []

    // Prepend prop
    if (props.prepend) {
      childNodes.push(
        h(InputGroupPrepend, [
          h(InputGroupText, {
            domProps: htmlOrText(props.prependHTML, props.prepend)
          })
        ])
      )
    } else {
      childNodes.push(h(false))
    }

    // Prepend slot
    if (hasNormalizedSlot('prepend', $scopedSlots, $slots)) {
      childNodes.push(h(InputGroupPrepend, normalizeSlot('prepend', {}, $scopedSlots, $slots)))
    } else {
      childNodes.push(h(false))
    }

    // Default slot
    if (hasNormalizedSlot('default', $scopedSlots, $slots)) {
      childNodes.push(...normalizeSlot('default', {}, $scopedSlots, $slots))
    } else {
      childNodes.push(h(false))
    }

    // Append prop
    if (props.append) {
      childNodes.push(
        h(InputGroupAppend, [
          h(InputGroupText, {
            domProps: htmlOrText(props.appendHTML, props.append)
          })
        ])
      )
    } else {
      childNodes.push(h(false))
    }

    // Append slot
    if (hasNormalizedSlot('prepend', $scopedSlots, $slots)) {
      childNodes.push(h(InputGroupAppend, normalizeSlot('append', {}, $scopedSlots, $slots)))
    } else {
      childNodes.push(h(false))
    }

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'input-group',
        class: {
          [`input-group-${props.size}`]: Boolean(props.size)
        },
        attrs: {
          id: props.id || null,
          role: 'group'
        }
      }),
      childNodes
    )
  }
})
