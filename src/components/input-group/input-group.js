import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { htmlOrText } from '../../utils/html'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import { BInputGroupPrepend } from './input-group-prepend'
import { BInputGroupAppend } from './input-group-append'
import { BInputGroupText } from './input-group-text'

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
export const BInputGroup = /*#__PURE__*/ Vue.extend({
  name: 'BInputGroup',
  functional: true,
  props: props,
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    const $scopedSlots = scopedSlots || {}

    const childNodes = []

    // Prepend prop/slot
    if (props.prepend || props.prependHTML || hasNormalizedSlot('prepend', $scopedSlots, $slots)) {
      childNodes.push(
        h(BInputGroupPrepend, [
          // Prop
          props.prepend || props.prependHTML
            ? h(BInputGroupText, { domProps: htmlOrText(props.prependHTML, props.prepend) })
            : h(false),
          // Slot
          normalizeSlot('prepend', {}, $scopedSlots, $slots) || h(false)
        ])
      )
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
    if (props.append || props.appendHTML || hasNormalizedSlot('append', $scopedSlots, $slots)) {
      childNodes.push(
        h(BInputGroupAppend, [
          // prop
          props.append || props.appendHTML
            ? h(BInputGroupText, { domProps: htmlOrText(props.appendHTML, props.append) })
            : h(false),
          // Slot
          normalizeSlot('append', {}, $scopedSlots, $slots) || h(false)
        ])
      )
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

export default BInputGroup
